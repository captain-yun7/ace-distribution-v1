import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productData = {
  flour: [
    { name: '대한제분 강력분 20kg', code: 'FL-001', brand: '대한제분', origin: '국내산', description: '제빵용 고급 강력분, 글루텐 함량이 높아 빵 반죽에 최적' },
    { name: '곰표 박력분 20kg', code: 'FL-002', brand: '대한제분', origin: '국내산', description: '케이크, 쿠키 등 제과용 박력분' },
    { name: '백설 중력분 20kg', code: 'FL-003', brand: 'CJ제일제당', origin: '국내산', description: '다목적 중력분, 만두피, 국수에 적합' },
    { name: '오뚜기 프리미엄 강력분 1kg', code: 'FL-004', brand: '오뚜기', origin: '국내산', description: '가정용 소포장 강력분' },
    { name: '백설 호밀가루 1kg', code: 'FL-005', brand: 'CJ제일제당', origin: '독일산', description: '건강빵용 호밀가루' },
    { name: '통밀가루 20kg', code: 'FL-006', brand: '대한제분', origin: '미국산', description: '식이섬유 풍부한 통밀가루' },
    { name: '아몬드 파우더 1kg', code: 'FL-007', brand: '에이스유통', origin: '미국산', description: '마카롱, 다쿠아즈용 아몬드 분말' },
    { name: '옥수수 전분 1kg', code: 'FL-008', brand: '대상', origin: '국내산', description: '제과용 옥수수 전분' },
    { name: '타피오카 전분 1kg', code: 'FL-009', brand: '에이스유통', origin: '태국산', description: '쫄깃한 식감을 위한 타피오카 전분' },
    { name: '쌀가루(습식) 3kg', code: 'FL-010', brand: '햇살마루', origin: '국내산', description: '떡, 한과용 습식 쌀가루' },
  ],
  frozen: [
    { name: '크루아상 냉동생지 60g x 50개', code: 'FZ-001', brand: '신라명과', origin: '프랑스산 버터', description: '프랑스산 버터 사용, 바삭한 크루아상' },
    { name: '페스츄리 시트 10장', code: 'FZ-002', brand: '롯데제과', origin: '국내산', description: '다양한 페스츄리 제품용 시트' },
    { name: '모닝빵 생지 40g x 100개', code: 'FZ-003', brand: '파리바게뜨', origin: '국내산', description: '부드러운 모닝빵용 생지' },
    { name: '피자도우 200g x 20개', code: 'FZ-004', brand: '에이스유통', origin: '국내산', description: '얇은 크러스트 피자 도우' },
    { name: '브리오슈 생지 80g x 30개', code: 'FZ-005', brand: '신라명과', origin: '프랑스산 버터', description: '버터 풍미 가득한 브리오슈' },
    { name: '소금빵 생지 50g x 50개', code: 'FZ-006', brand: '에이스유통', origin: '국내산', description: '인기 소금빵 전용 생지' },
    { name: '베이글 생지 100g x 30개', code: 'FZ-007', brand: '에이스유통', origin: '국내산', description: '쫄깃한 베이글용 생지' },
    { name: '식빵 생지 450g x 20개', code: 'FZ-008', brand: '삼립', origin: '국내산', description: '부드러운 식빵용 생지' },
  ],
  dairy: [
    { name: '프레지덩 무염버터 500g', code: 'DA-001', brand: 'President', origin: '프랑스', description: '프랑스산 프리미엄 무염버터' },
    { name: '앵커 무염버터 454g', code: 'DA-002', brand: 'Anchor', origin: '뉴질랜드', description: '뉴질랜드산 그래스페드 버터' },
    { name: '서울우유 가염버터 450g', code: 'DA-003', brand: '서울우유', origin: '국내산', description: '국내산 가염버터' },
    { name: '매일 휘핑크림 1L', code: 'DA-004', brand: '매일유업', origin: '국내산', description: '생크림 케이크용 휘핑크림' },
    { name: '서울우유 동물성 생크림 1L', code: 'DA-005', brand: '서울우유', origin: '국내산', description: '유지방 38% 프리미엄 생크림' },
    { name: '필라델피아 크림치즈 1.36kg', code: 'DA-006', brand: 'Philadelphia', origin: '미국', description: '치즈케이크용 크림치즈' },
    { name: '마스카포네 치즈 500g', code: 'DA-007', brand: 'Galbani', origin: '이탈리아', description: '티라미수용 마스카포네' },
    { name: '연유 397g', code: 'DA-008', brand: '매일유업', origin: '국내산', description: '베이킹용 가당 연유' },
    { name: '파르메산 치즈 가루 1kg', code: 'DA-009', brand: 'Kraft', origin: '미국', description: '토핑용 파르메산 치즈' },
    { name: '모짜렐라 슈레드 2.5kg', code: 'DA-010', brand: '상하치즈', origin: '국내산', description: '피자, 그라탕용 모짜렐라' },
  ],
  sugar: [
    { name: '백설탕 15kg', code: 'SG-001', brand: 'CJ제일제당', origin: '국내산', description: '제과제빵용 정백당' },
    { name: '황설탕 15kg', code: 'SG-002', brand: 'CJ제일제당', origin: '국내산', description: '풍미 깊은 황설탕' },
    { name: '흑설탕 5kg', code: 'SG-003', brand: '삼양사', origin: '국내산', description: '쿠키, 브라우니용 흑설탕' },
    { name: '슈가파우더 5kg', code: 'SG-004', brand: '에이스유통', origin: '국내산', description: '데코레이션용 슈가파우더' },
    { name: '물엿 5kg', code: 'SG-005', brand: '오뚜기', origin: '국내산', description: '광택 및 보습용 물엿' },
    { name: '올리고당 2.5kg', code: 'SG-006', brand: 'CJ제일제당', origin: '국내산', description: '저칼로리 올리고당' },
    { name: '메이플시럽 1L', code: 'SG-007', brand: 'Kirkland', origin: '캐나다', description: '100% 순수 메이플시럽' },
    { name: '아가베시럽 1kg', code: 'SG-008', brand: '에이스유통', origin: '멕시코', description: '저GI 천연 감미료' },
    { name: '꿀 2.4kg', code: 'SG-009', brand: '꽃샘', origin: '국내산', description: '국내산 천연 아카시아꿀' },
  ],
  nut: [
    { name: '호두분태 1kg', code: 'NT-001', brand: '에이스유통', origin: '미국산', description: '브라우니, 쿠키용 호두 분태' },
    { name: '아몬드 슬라이스 1kg', code: 'NT-002', brand: '에이스유통', origin: '미국산', description: '데코레이션용 아몬드 슬라이스' },
    { name: '아몬드 홀 1kg', code: 'NT-003', brand: '에이스유통', origin: '미국산', description: '통아몬드' },
    { name: '피칸 1kg', code: 'NT-004', brand: '에이스유통', origin: '미국산', description: '피칸파이용 피칸' },
    { name: '마카다미아 500g', code: 'NT-005', brand: '에이스유통', origin: '호주산', description: '쿠키용 마카다미아' },
    { name: '캐슈넛 1kg', code: 'NT-006', brand: '에이스유통', origin: '베트남산', description: '베이킹용 캐슈넛' },
    { name: '헤이즐넛 1kg', code: 'NT-007', brand: '에이스유통', origin: '터키산', description: '누텔라, 프랄린용 헤이즐넛' },
    { name: '잣 500g', code: 'NT-008', brand: '에이스유통', origin: '국내산', description: '한과, 떡용 국내산 잣' },
    { name: '땅콩분태 1kg', code: 'NT-009', brand: '에이스유통', origin: '국내산', description: '토핑용 땅콩 분태' },
  ],
  coffee: [
    { name: '에스프레소 원두 1kg', code: 'CF-001', brand: 'Lavazza', origin: '이탈리아', description: '에스프레소용 블렌드 원두' },
    { name: '드립커피 원두 1kg', code: 'CF-002', brand: 'illy', origin: '이탈리아', description: '드립커피용 아라비카 원두' },
    { name: '커피 시럽 1L', code: 'CF-003', brand: '모닌', origin: '프랑스', description: '바닐라 커피 시럽' },
    { name: '카라멜 시럽 1L', code: 'CF-004', brand: '모닌', origin: '프랑스', description: '카라멜 마끼아또용' },
    { name: '헤이즐넛 시럽 1L', code: 'CF-005', brand: '모닌', origin: '프랑스', description: '헤이즐넛 라떼용' },
    { name: '말차 파우더 500g', code: 'CF-006', brand: '오설록', origin: '국내산', description: '말차라떼, 디저트용' },
    { name: '초코파우더 1kg', code: 'CF-007', brand: 'Van Houten', origin: '네덜란드', description: '핫초코, 모카용' },
    { name: '녹차 파우더 500g', code: 'CF-008', brand: '오설록', origin: '국내산', description: '베이킹용 녹차가루' },
  ],
  chocolate: [
    { name: '발로나 다크 초콜릿 70% 3kg', code: 'CH-001', brand: 'Valrhona', origin: '프랑스', description: '프리미엄 다크 커버춰 초콜릿' },
    { name: '발로나 밀크 초콜릿 40% 3kg', code: 'CH-002', brand: 'Valrhona', origin: '프랑스', description: '프리미엄 밀크 커버춰' },
    { name: '칼리바우트 화이트 초콜릿 2.5kg', code: 'CH-003', brand: 'Callebaut', origin: '벨기에', description: '화이트 커버춰 초콜릿' },
    { name: '코코아 파우더 1kg', code: 'CH-004', brand: 'Van Houten', origin: '네덜란드', description: '네덜란드산 코코아 파우더' },
    { name: '초코칩 다크 1kg', code: 'CH-005', brand: '롯데제과', origin: '국내산', description: '쿠키, 머핀용 다크 초코칩' },
    { name: '초코칩 밀크 1kg', code: 'CH-006', brand: '롯데제과', origin: '국내산', description: '쿠키용 밀크 초코칩' },
    { name: '가나슈 베이스 2kg', code: 'CH-007', brand: '에이스유통', origin: '국내산', description: '가나슈 제조용 베이스' },
    { name: '코팅 초콜릿 다크 2kg', code: 'CH-008', brand: '에이스유통', origin: '국내산', description: '디핑용 코팅 초콜릿' },
  ],
  fruit: [
    { name: '냉동 블루베리 1kg', code: 'FR-001', brand: '에이스유통', origin: '칠레산', description: '머핀, 파이용 냉동 블루베리' },
    { name: '냉동 라즈베리 1kg', code: 'FR-002', brand: '에이스유통', origin: '칠레산', description: '디저트용 냉동 라즈베리' },
    { name: '냉동 망고 다이스 1kg', code: 'FR-003', brand: '에이스유통', origin: '베트남산', description: '망고 디저트용' },
    { name: '건포도 1kg', code: 'FR-004', brand: '에이스유통', origin: '미국산', description: '스콘, 빵용 건포도' },
    { name: '건크랜베리 1kg', code: 'FR-005', brand: '에이스유통', origin: '미국산', description: '쿠키, 샐러드용 건크랜베리' },
    { name: '딸기잼 2kg', code: 'FR-006', brand: '복음자리', origin: '국내산', description: '프리미엄 딸기잼' },
    { name: '블루베리잼 2kg', code: 'FR-007', brand: '복음자리', origin: '국내산', description: '블루베리 필링용' },
    { name: '레몬 커드 1kg', code: 'FR-008', brand: '에이스유통', origin: '국내산', description: '레몬파이, 타르트용' },
    { name: '사과 필링 3kg', code: 'FR-009', brand: '에이스유통', origin: '국내산', description: '애플파이용 사과 필링' },
    { name: '체리 토핑 2kg', code: 'FR-010', brand: '에이스유통', origin: '미국산', description: '치즈케이크 토핑용' },
  ],
};

async function main() {
  console.log('Adding more products...');

  // Get all categories
  const categories = await prisma.productCategory.findMany();
  const categoryMap = new Map(categories.map(c => [c.name, c.id]));

  let totalAdded = 0;

  for (const [categoryName, products] of Object.entries(productData)) {
    const categoryId = categoryMap.get(categoryName);
    if (!categoryId) {
      console.log(`Category ${categoryName} not found, skipping...`);
      continue;
    }

    for (const product of products) {
      try {
        await prisma.product.upsert({
          where: { code: product.code },
          update: {
            name: product.name,
            description: product.description,
            brand: product.brand,
            origin: product.origin,
            categoryId,
            isFeatured: Math.random() > 0.7, // 30% featured
            imageUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400`,
          },
          create: {
            code: product.code,
            name: product.name,
            description: product.description,
            brand: product.brand,
            origin: product.origin,
            categoryId,
            isFeatured: Math.random() > 0.7,
            order: totalAdded,
            imageUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400`,
          },
        });
        totalAdded++;
      } catch (e) {
        console.log(`Error adding ${product.name}: ${e}`);
      }
    }
    console.log(`Added products for category: ${categoryName}`);
  }

  console.log(`Total products added: ${totalAdded}`);

  // Show final count
  const finalCount = await prisma.product.count();
  console.log(`Total products in database: ${finalCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
