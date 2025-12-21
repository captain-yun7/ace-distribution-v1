import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { order: 1, name: 'flour-mix', displayName: '밀가루 믹스류', description: '제과제빵용 밀가루 및 믹스 제품' },
  { order: 2, name: 'dairy', displayName: '유제품', description: '버터, 크림, 치즈 등 유제품' },
  { order: 3, name: 'paste', displayName: '앙금류', description: '팥앙금, 고구마앙금 등 앙금류' },
  { order: 4, name: 'chocolate', displayName: '초콜릿제품', description: '초콜릿, 코코아 등 초콜릿 제품' },
  { order: 5, name: 'nuts', displayName: '견과류', description: '아몬드, 호두, 캐슈넛 등 견과류' },
  { order: 6, name: 'frozen', displayName: '냉동 완제/반제품', description: '냉동 생지, 완제품 등' },
  { order: 7, name: 'fruit', displayName: '과일 가공품', description: '과일 퓨레, 필링, 잼 등' },
  { order: 8, name: 'sugar', displayName: '당류', description: '설탕, 물엿, 시럽 등 당류' },
  { order: 9, name: 'sausage', displayName: '소시지류', description: '베이커리용 소시지 제품' },
  { order: 10, name: 'additives', displayName: '기타 첨가물', description: '향료, 색소, 개량제 등 첨가물' },
];

async function main() {
  console.log('🌱 Seeding categories...');

  // 기존 카테고리 삭제 (제품이 없는 경우에만)
  // await prisma.productCategory.deleteMany({});

  for (const category of categories) {
    const existing = await prisma.productCategory.findUnique({
      where: { name: category.name },
    });

    if (existing) {
      // 기존 카테고리 업데이트
      await prisma.productCategory.update({
        where: { name: category.name },
        data: {
          displayName: category.displayName,
          description: category.description,
          order: category.order,
          isPublished: true,
        },
      });
      console.log(`✅ Updated: ${category.displayName}`);
    } else {
      // 새 카테고리 생성
      await prisma.productCategory.create({
        data: {
          name: category.name,
          displayName: category.displayName,
          description: category.description,
          order: category.order,
          isPublished: true,
        },
      });
      console.log(`✅ Created: ${category.displayName}`);
    }
  }

  // 기존에 있던 카테고리 중 새 목록에 없는 것들은 비활성화
  const existingCategories = await prisma.productCategory.findMany();
  const newCategoryNames = categories.map(c => c.name);

  for (const existing of existingCategories) {
    if (!newCategoryNames.includes(existing.name)) {
      await prisma.productCategory.update({
        where: { id: existing.id },
        data: { isPublished: false },
      });
      console.log(`⚠️ Unpublished: ${existing.displayName}`);
    }
  }

  console.log('✨ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
