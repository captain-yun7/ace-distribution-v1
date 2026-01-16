/**
 * 예시 제품 하나 Rich HTML로 업데이트
 * 실행: npx ts-node scripts/update-single-product.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ACE-ADD-0085 찾기 (제니코 생이스트)
  const product = await prisma.product.findFirst({
    where: { code: { contains: '0085' } }
  });

  if (product) {
    console.log('Found product:', product.name);
    console.log('Current description:', product.description?.substring(0, 100));

    // Rich HTML로 업데이트
    const richHtml = `<p class="text-gray-600 mb-4">[제니코식품]</p>
<ul class="list-disc pl-5 mb-6 space-y-1 text-gray-700">
  <li>국산 생이스트로써 용해성, 분산성이 우수함</li>
  <li>발효 시 안정성이 높아 균일한 제품 생산 가능</li>
  <li>발효력이 뛰어나 최종 제품이 가볍고 다공성 조직을 가짐</li>
  <li>풍미 향상에 도움을 주며 이미, 이취가 없음</li>
</ul>

<div class="mt-6">
  <h4 class="text-lg font-semibold text-amber-800 mb-3 pb-2 border-b-2 border-amber-200">제품특징</h4>
  <table class="w-full text-sm">
    <tbody>
      <tr class="border-b border-gray-100">
        <td class="py-2 pr-4 text-gray-500 font-medium w-24">중량</td>
        <td class="py-2 text-gray-700">500 g</td>
      </tr>
      <tr class="border-b border-gray-100">
        <td class="py-2 pr-4 text-gray-500 font-medium w-24">유통기한</td>
        <td class="py-2 text-gray-700">40 일</td>
      </tr>
      <tr class="border-b border-gray-100">
        <td class="py-2 pr-4 text-gray-500 font-medium w-24">보관방법</td>
        <td class="py-2 text-gray-700">0~5℃냉장보관</td>
      </tr>
      <tr class="border-b border-gray-100">
        <td class="py-2 pr-4 text-gray-500 font-medium w-24">원산지</td>
        <td class="py-2 text-gray-700">국산</td>
      </tr>
    </tbody>
  </table>
</div>`;

    await prisma.product.update({
      where: { id: product.id },
      data: { description: richHtml }
    });

    console.log('Updated successfully!');
  } else {
    console.log('Product not found');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
