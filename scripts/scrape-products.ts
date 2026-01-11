/**
 * 기존 에이스유통 사이트에서 제품 데이터 크롤링
 * 실행: npx ts-node scripts/scrape-products.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 기존 사이트 카테고리 -> 현재 DB 카테고리 매핑
const CATEGORY_MAP: Record<string, string> = {
  '두·서류가공품': 'paste',
  '두서류가공품': 'paste',
  '곡류가공품': 'flour-mix',
  '견과가공품': 'nuts',
  '유지 및 유가공품': 'dairy',
  '유지및유가공품': 'dairy',
  '카카오가공품': 'chocolate',
  '당류가공품': 'sugar',
  '냉동생지류': 'frozen',
  '첨가물': 'additives',
  '과채가공품': 'fruit',
  '축산가공품': 'sausage',
};

interface ProductData {
  name: string;
  brand: string | null;
  specs: string | null;
  storage: string | null;
  ingredients: string | null;
  description: string | null;
  imageUrl: string | null;
  categoryName: string;
  originalIdx: number;
}

async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url);
  return response.text();
}

// HTML에서 제품 목록 파싱
function parseProductList(html: string): { idx: number; name: string; imageUrl: string }[] {
  const products: { idx: number; name: string; imageUrl: string }[] = [];

  // product_view.php?idx=XXX 패턴으로 제품 ID 추출
  const idxMatches = html.matchAll(/product_view\.php\?idx=(\d+)/g);
  const idxSet = new Set<number>();

  for (const match of idxMatches) {
    idxSet.add(parseInt(match[1]));
  }

  // 제품명과 이미지 추출 (간략히)
  for (const idx of idxSet) {
    products.push({
      idx,
      name: '', // 상세 페이지에서 가져옴
      imageUrl: '',
    });
  }

  return products;
}

// 제품 상세 페이지 파싱
function parseProductDetail(html: string, idx: number): ProductData | null {
  try {
    // 제품명 추출 - 두 번째 <h4> 태그에서 (첫 번째는 "에이스식품")
    const h4Matches = html.match(/<h4>([^<]+)<\/h4>/gi);
    let nameMatch: RegExpMatchArray | null = null;
    if (h4Matches && h4Matches.length >= 2) {
      // 두 번째 h4 태그에서 제품명 추출
      const secondH4 = h4Matches[1];
      nameMatch = secondH4.match(/<h4>([^<]+)<\/h4>/i);
    }

    // 제품 설명 추출 - <p class="txt">에서
    const descMatch = html.match(/<p[^>]*class="[^"]*txt[^"]*"[^>]*>([\s\S]*?)<\/p>/i);

    // 이미지 URL 추출
    const imgMatch = html.match(/\/data\/product\/[^"'\s]+\.(jpg|jpeg|png|gif)/i);

    // 카테고리 추출 - 네비게이션에서
    const categoryMatch = html.match(/<div[^>]*class="[^"]*location[^"]*"[^>]*>[\s\S]*?<a[^>]*>([^<]*가공품|냉동생지류|첨가물)[^<]*<\/a>/i) ||
                          html.match(/>([^<]*가공품)<\/a>/i) ||
                          html.match(/>(냉동생지류|첨가물)<\/a>/i);

    // 브랜드 추출 - 제품명에서 ) 앞부분
    let brand: string | null = null;
    let productName = nameMatch ? nameMatch[1].trim() : `제품 ${idx}`;

    const brandExtract = productName.match(/^([^)]+)\)\s*(.+)$/);
    if (brandExtract) {
      brand = brandExtract[1].trim();
      // 브랜드 제거하지 않고 전체 이름 유지
    }

    // 규격, 보관방법 추출
    const specsMatch = html.match(/중량\s*:\s*([^<\n]+)/i);
    const storageMatch = html.match(/보관방법\s*:\s*([^<\n]+)/i);

    const name = productName || `제품 ${idx}`;

    return {
      name,
      brand,
      specs: specsMatch ? specsMatch[1].trim() : null,
      storage: storageMatch ? storageMatch[1].trim() : null,
      ingredients: null,
      description: descMatch ? descMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() : null,
      imageUrl: imgMatch ? `https://www.xn--9t4b11d32atjr15b.com${imgMatch[0]}` : null,
      categoryName: categoryMatch ? categoryMatch[1].trim() : '기타',
      originalIdx: idx,
    };
  } catch (error) {
    console.error(`Error parsing product ${idx}:`, error);
    return null;
  }
}

// 모든 페이지에서 제품 ID 수집
async function collectAllProductIds(): Promise<number[]> {
  const allIds: Set<number> = new Set();
  const baseUrl = 'https://www.xn--9t4b11d32atjr15b.com/product/all_list.php';

  // 총 396개 제품, 페이지당 12개 = 약 33페이지
  // 페이지네이션은 start 파라미터 사용 (0, 12, 24, ...)
  for (let start = 0; start <= 400; start += 12) {
    try {
      const url = `${baseUrl}?start=${start}`;
      console.log(`Fetching start=${start}...`);
      const html = await fetchPage(url);

      const idxMatches = html.matchAll(/product_view\.php\?idx=(\d+)/g);
      let count = 0;
      for (const match of idxMatches) {
        allIds.add(parseInt(match[1]));
        count++;
      }

      console.log(`  Found ${count} product IDs (total: ${allIds.size})`);

      if (count === 0) {
        console.log(`No products found at start=${start}, stopping.`);
        break;
      }

      // 서버 부하 방지를 위한 딜레이
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`Error fetching start=${start}:`, error);
    }
  }

  return Array.from(allIds).sort((a, b) => a - b);
}

// 제품 상세 정보 수집
async function fetchProductDetails(idx: number): Promise<ProductData | null> {
  try {
    const url = `https://www.xn--9t4b11d32atjr15b.com/product/product_view.php?idx=${idx}`;
    const html = await fetchPage(url);
    return parseProductDetail(html, idx);
  } catch (error) {
    console.error(`Error fetching product ${idx}:`, error);
    return null;
  }
}

// 카테고리 ID 가져오기 또는 생성
async function getOrCreateCategory(categoryName: string): Promise<string> {
  const mappedName = CATEGORY_MAP[categoryName] || CATEGORY_MAP[categoryName.replace(/\s/g, '')] || null;

  if (mappedName) {
    const existing = await prisma.productCategory.findFirst({
      where: { name: mappedName },
    });
    if (existing) {
      return existing.id;
    }
  }

  // 매핑되지 않은 카테고리는 새로 생성
  const slug = categoryName.toLowerCase().replace(/[^a-z가-힣0-9]/g, '-').replace(/-+/g, '-');

  const existing = await prisma.productCategory.findFirst({
    where: {
      OR: [
        { name: slug },
        { displayName: categoryName },
      ]
    },
  });

  if (existing) {
    return existing.id;
  }

  // 새 카테고리 생성
  const newCategory = await prisma.productCategory.create({
    data: {
      name: slug,
      displayName: categoryName,
      description: `${categoryName} 카테고리`,
      order: 100,
      isPublished: true,
    },
  });

  console.log(`Created new category: ${categoryName} -> ${newCategory.id}`);
  return newCategory.id;
}

// 제품 코드 생성
function generateProductCode(idx: number, categoryName: string): string {
  const prefix = categoryName.substring(0, 2).toUpperCase();
  return `ACE-${prefix}-${idx.toString().padStart(4, '0')}`;
}

async function main() {
  console.log('Starting product scraping...');

  // 1. 모든 제품 ID 수집
  console.log('\n=== Step 1: Collecting product IDs ===');
  const productIds = await collectAllProductIds();
  console.log(`Found ${productIds.length} products`);

  // 2. 각 제품 상세 정보 수집 및 DB 저장
  console.log('\n=== Step 2: Fetching product details and saving to DB ===');

  let successCount = 0;
  let errorCount = 0;
  let skipCount = 0;

  for (let i = 0; i < productIds.length; i++) {
    const idx = productIds[i];
    console.log(`Processing ${i + 1}/${productIds.length}: idx=${idx}`);

    try {
      // 이미 존재하는지 확인
      const existingProduct = await prisma.product.findFirst({
        where: {
          OR: [
            { code: { contains: `-${idx.toString().padStart(4, '0')}` } },
            { name: { contains: `[${idx}]` } },
          ],
        },
      });

      if (existingProduct) {
        console.log(`  Skipping: already exists`);
        skipCount++;
        continue;
      }

      const product = await fetchProductDetails(idx);

      if (!product) {
        console.log(`  Error: could not parse product`);
        errorCount++;
        continue;
      }

      // 카테고리 ID 가져오기
      const categoryId = await getOrCreateCategory(product.categoryName);

      // 제품 코드 생성
      const code = generateProductCode(idx, product.categoryName);

      // DB에 저장
      await prisma.product.create({
        data: {
          categoryId,
          name: product.name,
          code,
          description: product.description || `${product.name} 제품입니다.`,
          brand: product.brand,
          manufacturer: undefined,
          origin: undefined,
          price: undefined,
          specs: product.specs ? { 규격: product.specs, 보관방법: product.storage, 주요원료: product.ingredients } : undefined,
          features: undefined,
          imageUrl: product.imageUrl,
          thumbnailUrl: product.imageUrl,
          images: undefined,
          brochureUrl: undefined,
          order: idx,
          stock: 0,
          isPublished: false, // 이미지는 일단 비공개
          isFeatured: false,
        },
      });

      console.log(`  Saved: ${product.name} (${code})`);
      successCount++;

      // 서버 부하 방지
      await new Promise(resolve => setTimeout(resolve, 200));

    } catch (error) {
      console.error(`  Error processing idx=${idx}:`, error);
      errorCount++;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Total: ${productIds.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Skipped: ${skipCount}`);
  console.log(`Errors: ${errorCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
