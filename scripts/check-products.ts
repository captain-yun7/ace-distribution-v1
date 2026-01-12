import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: { name: true, description: true }
  });

  const plainProducts: string[] = [];

  for (const p of products) {
    const hasRich = p.description && (
      p.description.includes('text-gray-600') ||
      p.description.includes('list-disc')
    );
    if (!hasRich) {
      plainProducts.push(p.name);
    }
  }

  console.log(`기존 텍스트 제품 (${plainProducts.length}개):`);
  plainProducts.slice(0, 30).forEach(n => console.log(`  - ${n}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
