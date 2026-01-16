/**
 * 기존 제품의 description을 Rich Text HTML로 업데이트
 * 실행: npx ts-node scripts/update-product-description.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url);
  return response.text();
}

// 제품 상세 페이지에서 설명과 특징 추출
function parseProductContent(html: string): { description: string; features: Record<string, string> } | null {
  try {
    // 제품 설명 추출 - <p class="txt">에서
    const descMatch = html.match(/<p[^>]*class="[^"]*txt[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    let rawDescription = '';

    if (descMatch) {
      rawDescription = descMatch[1]
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]*>/g, '')
        .trim();
    }

    // 제품특징 섹션에서 특징 추출
    const featureMatch = html.match(/<div class="pvi_feature">[\s\S]*?<p>([\s\S]*?)<\/p>/i);
    const features: Record<string, string> = {};

    if (featureMatch) {
      const featureText = featureMatch[1]
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<[^>]*>/g, '')
        .trim();

      // 각 줄에서 특징 추출
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

    return { description: rawDescription, features };
  } catch (error) {
    console.error('Error parsing product content:', error);
    return null;
  }
}

// HTML 템플릿 생성
function generateRichDescription(
  rawDescription: string,
  features: Record<string, string>
): string {
  // 설명 부분 정리 (브랜드 정보와 설명 분리)
  const lines = rawDescription.split('\n').filter(line => line.trim());

  let brandInfo = '';
  const descLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('[') && trimmed.includes(']')) {
      brandInfo = trimmed;
    } else if (trimmed.startsWith('-') || trimmed.length > 0) {
      descLines.push(trimmed);
    }
  }

  // HTML 생성
  let html = '';

  // 브랜드 정보
  if (brandInfo) {
    html += `<p class="text-gray-600 mb-4">${brandInfo}</p>\n`;
  }

  // 제품 설명
  if (descLines.length > 0) {
    html += '<ul class="list-disc pl-5 mb-6 space-y-1 text-gray-700">\n';
    for (const line of descLines) {
      const cleanLine = line.startsWith('-') ? line.substring(1).trim() : line;
      if (cleanLine) {
        html += `  <li>${cleanLine}</li>\n`;
      }
    }
    html += '</ul>\n';
  }

  // 제품 특징 테이블
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
    html += '</div>\n';
  }

  return html;
}

async function updateSingleProduct(idx: number) {
  console.log(`\nFetching product idx=${idx}...`);

  const url = `https://www.xn--9t4b11d32atjr15b.com/product/product_view.php?idx=${idx}`;
  const html = await fetchPage(url);

  const content = parseProductContent(html);
  if (!content) {
    console.log('  Failed to parse content');
    return null;
  }

  console.log('  Raw description:', content.description.substring(0, 100) + '...');
  console.log('  Features:', content.features);

  const richDescription = generateRichDescription(content.description, content.features);
  console.log('\n=== Generated HTML ===');
  console.log(richDescription);

  return { description: richDescription, features: content.features };
}

// 테스트: 단일 제품
async function testSingle() {
  const result = await updateSingleProduct(85); // 제니코 생이스트

  if (result) {
    console.log('\n=== Would save to DB ===');
    console.log('Description HTML length:', result.description.length);
    console.log('Features:', result.features);
  }
}

// 전체 제품 업데이트
async function updateAllProducts() {
  console.log('Starting product description update...\n');

  // code에서 원본 idx 추출 (ACE-XXX-0085 형식)
  const products = await prisma.product.findMany({
    where: {
      code: { startsWith: 'ACE-' }
    },
    select: { id: true, code: true, name: true }
  });

  console.log(`Found ${products.length} products to update`);

  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    // code에서 idx 추출 (ACE-XXX-0085 -> 85)
    const match = product.code?.match(/ACE-[A-Z]+-(\d+)/);
    if (!match) {
      console.log(`  Skipping ${product.code}: invalid format`);
      continue;
    }

    const idx = parseInt(match[1]);

    try {
      const url = `https://www.xn--9t4b11d32atjr15b.com/product/product_view.php?idx=${idx}`;
      const html = await fetchPage(url);

      const content = parseProductContent(html);
      if (!content) {
        errorCount++;
        continue;
      }

      const richDescription = generateRichDescription(content.description, content.features);

      await prisma.product.update({
        where: { id: product.id },
        data: {
          description: richDescription,
          features: Object.keys(content.features).length > 0 ? content.features : undefined,
        }
      });

      successCount++;

      if (successCount % 20 === 0) {
        console.log(`  Progress: ${successCount}/${products.length}`);
      }

      await new Promise(resolve => setTimeout(resolve, 150));

    } catch (error) {
      console.error(`  Error updating ${product.code}:`, error);
      errorCount++;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
}

// 실행 모드 선택
const mode = process.argv[2] || 'test';

if (mode === 'test') {
  testSingle()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
} else if (mode === 'update') {
  updateAllProducts()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
} else {
  console.log('Usage: npx ts-node scripts/update-product-description.ts [test|update]');
  prisma.$disconnect();
}
