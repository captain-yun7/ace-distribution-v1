/**
 * 원본 사이트에서 모든 제품 정보를 크롤링하여 Rich HTML로 업데이트
 * 실행: npx ts-node scripts/crawl-all-products.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url);
  return response.text();
}

// 제품 상세 페이지에서 정보 추출
async function fetchProductDetail(idx: number): Promise<{
  name: string;
  brand: string;
  description: string;
  features: Record<string, string>;
} | null> {
  try {
    const url = `https://www.xn--9t4b11d32atjr15b.com/product/product_view.php?idx=${idx}`;
    const html = await fetchPage(url);

    // 제품명 추출 - pv_info 안의 <h4> 태그에서
    const nameMatch = html.match(/<div class="pv_info">[\s\S]*?<h4>([^<]+)<\/h4>/);
    let name = nameMatch ? nameMatch[1].trim() : '';

    // 괄호 안의 영문명 제거
    name = name.replace(/\s*\([^)]*\)\s*$/, '').trim();

    if (!name) {
      return null;
    }

    // 설명에서 브랜드와 내용 추출
    const descMatch = html.match(/\[([^\]]+)\]<br\/?>([\s\S]*?)<\/p>/);
    let brand = '';
    let rawDescription = '';

    if (descMatch) {
      brand = descMatch[1].trim();
      rawDescription = descMatch[2]
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]*>/g, '')
        .trim();
    }

    // 제품특징 추출 (테이블에서)
    const features: Record<string, string> = {};

    // 중량, 유통기한, 보관방법, 원산지 등 추출
    const featurePatterns = [
      /중량[^:：]*[:：]\s*([^\n<]+)/i,
      /유통기한[^:：]*[:：]\s*([^\n<]+)/i,
      /보관방법[^:：]*[:：]\s*([^\n<]+)/i,
      /원산지[^:：]*[:：]\s*([^\n<]+)/i,
      /규격[^:：]*[:：]\s*([^\n<]+)/i,
      /용량[^:：]*[:：]\s*([^\n<]+)/i,
    ];

    const featureLabels = ['중량', '유통기한', '보관방법', '원산지', '규격', '용량'];

    // pvi_feature 섹션에서 특징 추출
    const featureSection = html.match(/<div class="pvi_feature">([\s\S]*?)<\/div>/);
    if (featureSection) {
      const featureText = featureSection[1]
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]*>/g, '')
        .trim();

      const lines = featureText.split('\n');
      for (const line of lines) {
        const match = line.match(/^-?\s*([^:：]+)\s*[:：]\s*(.+)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim();
          if (key && value) {
            features[key] = value;
          }
        }
      }
    }

    return { name, brand, description: rawDescription, features };
  } catch (error) {
    return null;
  }
}

// Rich HTML 생성
function generateRichHtml(
  brand: string,
  rawDescription: string,
  features: Record<string, string>
): string {
  const lines = rawDescription.split('\n').filter(line => line.trim());
  const descLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('-')) {
      descLines.push(trimmed.substring(1).trim());
    } else if (trimmed.length > 0 && !trimmed.startsWith('[')) {
      descLines.push(trimmed);
    }
  }

  let html = '';

  // 브랜드 정보
  if (brand) {
    html += `<p class="text-gray-600 mb-4">[${brand}]</p>\n`;
  }

  // 제품 설명 (bullet points)
  if (descLines.length > 0) {
    html += '<ul class="list-disc pl-5 mb-6 space-y-1 text-gray-700">\n';
    for (const line of descLines) {
      if (line) {
        html += `  <li>${line}</li>\n`;
      }
    }
    html += '</ul>\n';
  }

  // 제품특징 테이블
  if (Object.keys(features).length > 0) {
    html += '\n<div class="mt-6">\n';
    html += '  <h4 class="text-lg font-semibold text-amber-800 mb-3 pb-2 border-b-2 border-amber-200">제품특징</h4>\n';
    html += '  <table class="w-full text-sm">\n';
    html += '    <tbody>\n';

    for (const [key, value] of Object.entries(features)) {
      html += `      <tr class="border-b border-gray-100">\n`;
      html += `        <td class="py-2 pr-4 text-gray-500 font-medium w-24">${key}</td>\n`;
      html += `        <td class="py-2 text-gray-700">${value}</td>\n`;
      html += `      </tr>\n`;
    }

    html += '    </tbody>\n';
    html += '  </table>\n';
    html += '</div>';
  }

  return html || rawDescription;
}

// 정규화된 이름으로 비교
function normalizeName(name: string): string {
  return name
    .replace(/\s+/g, '')
    .replace(/\([^)]*\)/g, '')  // 괄호 제거
    .replace(/_/g, '')          // 언더스코어 제거
    .replace(/-/g, '')          // 하이픈 제거
    .replace(/\d+[gG]$/,'')     // 끝의 무게 제거 (예: 500g)
    .replace(/\d+[kK][gG]$/,'') // 끝의 무게 제거 (예: 5kg)
    .toLowerCase()
    .trim();
}

// 핵심 단어로 매칭
function getKeywords(name: string): string[] {
  const normalized = name
    .replace(/\([^)]*\)/g, '')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .toLowerCase();

  return normalized.split(/\s+/).filter(w => w.length >= 2);
}

async function main() {
  console.log('=== 제품 정보 크롤링 시작 ===\n');

  // DB에서 모든 제품 가져오기
  const dbProducts = await prisma.product.findMany({
    select: { id: true, name: true, brand: true, description: true }
  });

  console.log(`DB 제품 수: ${dbProducts.length}개\n`);

  // idx 1~500 범위에서 크롤링
  let successCount = 0;
  let notFoundCount = 0;
  let errorCount = 0;

  for (let idx = 1; idx <= 500; idx++) {
    try {
      const detail = await fetchProductDetail(idx);

      if (!detail || !detail.name) {
        continue; // 빈 페이지 건너뛰기
      }

      // DB에서 이름으로 매칭
      const normalizedCrawlName = normalizeName(detail.name);
      const crawlKeywords = getKeywords(detail.name);

      const matchedProduct = dbProducts.find(p => {
        const normalizedDbName = normalizeName(p.name);
        const dbKeywords = getKeywords(p.name);

        // 정규화된 이름으로 비교
        if (normalizedDbName === normalizedCrawlName) return true;
        if (normalizedDbName.includes(normalizedCrawlName)) return true;
        if (normalizedCrawlName.includes(normalizedDbName)) return true;

        // 키워드 매칭 (70% 이상 일치)
        if (crawlKeywords.length >= 2 && dbKeywords.length >= 2) {
          const matchCount = crawlKeywords.filter(kw =>
            dbKeywords.some(dbKw => dbKw.includes(kw) || kw.includes(dbKw))
          ).length;
          const matchRatio = matchCount / Math.min(crawlKeywords.length, dbKeywords.length);
          if (matchRatio >= 0.7) return true;
        }

        return false;
      });

      if (!matchedProduct) {
        notFoundCount++;
        continue;
      }

      // Rich HTML 생성
      const richHtml = generateRichHtml(detail.brand, detail.description, detail.features);

      // DB 업데이트
      await prisma.product.update({
        where: { id: matchedProduct.id },
        data: {
          description: richHtml,
          brand: detail.brand || matchedProduct.brand,
        }
      });

      successCount++;

      if (successCount % 50 === 0) {
        console.log(`Progress: ${successCount} products updated (idx=${idx})`);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 80));

    } catch (error) {
      errorCount++;
    }
  }

  console.log('\n=== 완료 ===');
  console.log(`성공: ${successCount}개`);
  console.log(`DB에 없음: ${notFoundCount}개`);
  console.log(`에러: ${errorCount}개`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
