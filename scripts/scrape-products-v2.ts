/**
 * 기존 에이스유통 사이트에서 제품 데이터 크롤링 (카테고리별)
 * 실행: npx ts-node scripts/scrape-products-v2.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 기존 사이트 카테고리 ID -> 현재 DB 카테고리 매핑
const CATEGORY_CONFIG = [
  { part1_idx: 43, name: '두·서류가공품', dbCategory: 'paste' },
  { part1_idx: 47, name: '곡류가공품', dbCategory: 'flour-mix' },
  { part1_idx: 55, name: '견과가공품', dbCategory: 'nuts' },
  { part1_idx: 61, name: '유지 및 유가공품', dbCategory: 'dairy' },
  { part1_idx: 68, name: '카카오가공품', dbCategory: 'chocolate' },
  { part1_idx: 73, name: '당류가공품', dbCategory: 'sugar' },
  { part1_idx: 78, name: '냉동생지류', dbCategory: 'frozen' },
  { part1_idx: 83, name: '첨가물', dbCategory: 'additives' },
  { part1_idx: 89, name: '과채가공품', dbCategory: 'fruit' },
  { part1_idx: 95, name: '축산가공품', dbCategory: 'sausage' },
];

interface ProductData {
  name: string;
  brand: string | null;
  description: string | null;
  features: Record<string, string>; // 제품 특징 (중량, 보관방법 등)
  imageUrl: string | null;
  originalIdx: number;
}

async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url);
  return response.text();
}

// 카테고리별 제품 ID 수집
async function collectProductIdsByCategory(part1_idx: number): Promise<number[]> {
  const allIds: Set<number> = new Set();
  const baseUrl = `https://www.xn--9t4b11d32atjr15b.com/product/product_list.php?part1_idx=${part1_idx}`;

  for (let start = 0; start <= 200; start += 12) {
    try {
      const url = `${baseUrl}&start=${start}`;
      const html = await fetchPage(url);

      const idxMatches = html.matchAll(/product_view\.php\?idx=(\d+)/g);
      let count = 0;
      for (const match of idxMatches) {
        allIds.add(parseInt(match[1]));
        count++;
      }

      if (count === 0) break;
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`Error fetching category ${part1_idx} start=${start}:`, error);
    }
  }

  return Array.from(allIds);
}

// 제품 상세 페이지 파싱
function parseProductDetail(html: string, idx: number): ProductData | null {
  try {
    // 제품명 추출 - 두 번째 <h4> 태그에서
    const h4Matches = html.match(/<h4>([^<]+)<\/h4>/gi);
    let productName = `제품 ${idx}`;

    if (h4Matches && h4Matches.length >= 2) {
      const secondH4 = h4Matches[1];
      const nameMatch = secondH4.match(/<h4>([^<]+)<\/h4>/i);
      if (nameMatch) {
        productName = nameMatch[1].trim();
      }
    }

    // 브랜드 추출 - 제품명에서 ) 앞부분
    let brand: string | null = null;
    const brandExtract = productName.match(/^([^)]+)\)\s*(.+)$/);
    if (brandExtract) {
      brand = brandExtract[1].trim();
    }

    // 제품 설명 추출 - <p class="txt">에서 (제품특징 전까지)
    const descMatch = html.match(/<p[^>]*class="[^"]*txt[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    let description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() : null;

    // "제품특징" 이후 텍스트 제거
    if (description) {
      const featuresIdx = description.indexOf('제품특징');
      if (featuresIdx > 0) {
        description = description.substring(0, featuresIdx).trim();
      }
    }

    // 이미지 URL 추출
    const imgMatch = html.match(/\/data\/product\/[^"'\s]+\.(jpg|jpeg|png|gif)/i);

    // 제품 특징 추출 (중량, 보관방법, 권장연령, 맛 등)
    const features: Record<string, string> = {};

    const specsMatch = html.match(/중량\s*:\s*([^<\n-]+)/i);
    if (specsMatch) features['중량'] = specsMatch[1].trim();

    const storageMatch = html.match(/보관방법\s*:\s*([^<\n-]+)/i);
    if (storageMatch) features['보관방법'] = storageMatch[1].trim();

    const ageMatch = html.match(/권장연령\s*:\s*([^<\n-]+)/i);
    if (ageMatch) features['권장연령'] = ageMatch[1].trim();

    const flavorMatch = html.match(/맛\s*:\s*([^<\n-]+)/i);
    if (flavorMatch) features['맛'] = flavorMatch[1].trim();

    const ingredientMatch = html.match(/주요원료\s*:\s*([^<\n-]+)/i);
    if (ingredientMatch) features['주요원료'] = ingredientMatch[1].trim();

    return {
      name: productName,
      brand,
      description,
      features,
      imageUrl: imgMatch ? `https://www.xn--9t4b11d32atjr15b.com${imgMatch[0]}` : null,
      originalIdx: idx,
    };
  } catch (error) {
    console.error(`Error parsing product ${idx}:`, error);
    return null;
  }
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

// 카테고리 ID 가져오기
async function getCategoryId(dbCategoryName: string): Promise<string | null> {
  const category = await prisma.productCategory.findFirst({
    where: { name: dbCategoryName },
  });
  return category?.id || null;
}

// 제품 코드 생성
function generateProductCode(idx: number, categoryPrefix: string): string {
  return `ACE-${categoryPrefix}-${idx.toString().padStart(4, '0')}`;
}

async function main() {
  console.log('Starting category-based product scraping...\n');

  let totalSuccess = 0;
  let totalSkip = 0;
  let totalError = 0;

  for (const config of CATEGORY_CONFIG) {
    console.log(`\n=== Processing: ${config.name} (part1_idx=${config.part1_idx}) ===`);

    // 카테고리 ID 가져오기
    const categoryId = await getCategoryId(config.dbCategory);
    if (!categoryId) {
      console.log(`  Category not found: ${config.dbCategory}, skipping...`);
      continue;
    }

    // 제품 ID 수집
    const productIds = await collectProductIdsByCategory(config.part1_idx);
    console.log(`  Found ${productIds.length} products`);

    const categoryPrefix = config.dbCategory.substring(0, 3).toUpperCase();
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (let i = 0; i < productIds.length; i++) {
      const idx = productIds[i];

      try {
        // 이미 존재하는지 확인
        const code = generateProductCode(idx, categoryPrefix);
        const existingProduct = await prisma.product.findFirst({
          where: { code },
        });

        if (existingProduct) {
          skipCount++;
          continue;
        }

        const product = await fetchProductDetails(idx);
        if (!product) {
          errorCount++;
          continue;
        }

        // DB에 저장
        await prisma.product.create({
          data: {
            categoryId,
            name: product.name,
            code,
            description: product.description || `${product.name} 제품입니다.`,
            brand: product.brand,
            features: Object.keys(product.features).length > 0 ? product.features : undefined,
            imageUrl: product.imageUrl,
            thumbnailUrl: product.imageUrl,
            order: idx,
            stock: 0,
            isPublished: true, // 공개
            isFeatured: false,
          },
        });

        successCount++;

        if ((i + 1) % 10 === 0) {
          console.log(`  Progress: ${i + 1}/${productIds.length}`);
        }

        await new Promise(resolve => setTimeout(resolve, 150));

      } catch (error) {
        console.error(`  Error processing idx=${idx}:`, error);
        errorCount++;
      }
    }

    console.log(`  Results: ${successCount} saved, ${skipCount} skipped, ${errorCount} errors`);
    totalSuccess += successCount;
    totalSkip += skipCount;
    totalError += errorCount;
  }

  console.log('\n=== Final Summary ===');
  console.log(`Total Success: ${totalSuccess}`);
  console.log(`Total Skipped: ${totalSkip}`);
  console.log(`Total Errors: ${totalError}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
