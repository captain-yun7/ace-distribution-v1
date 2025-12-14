import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Product Categories (8개 - 메인 페이지 기준)
  const categories = await Promise.all([
    prisma.productCategory.upsert({
      where: { name: 'grain' },
      update: {},
      create: {
        name: 'grain',
        displayName: '곡류가공품',
        description: '밀가루, 전분류 등 프리미엄 곡류 가공품',
        order: 1,
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
        isPublished: true,
      },
    }),
    prisma.productCategory.upsert({
      where: { name: 'nut' },
      update: {},
      create: {
        name: 'nut',
        displayName: '견과가공품',
        description: '아몬드, 호두 등 프리미엄 견과류 가공품',
        order: 2,
        imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop',
        isPublished: true,
      },
    }),
    prisma.productCategory.upsert({
      where: { name: 'dairy' },
      update: {},
      create: {
        name: 'dairy',
        displayName: '유지/유가공품',
        description: '버터, 크림류 등 유제품 가공품',
        order: 3,
        imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop',
        isPublished: true,
      },
    }),
    prisma.productCategory.upsert({
      where: { name: 'sugar' },
      update: {},
      create: {
        name: 'sugar',
        displayName: '당류가공품',
        description: '설탕, 시럽류 등 당류 가공품',
        order: 4,
        imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop',
        isPublished: true,
      },
    }),
    prisma.productCategory.upsert({
      where: { name: 'frozen' },
      update: {},
      create: {
        name: 'frozen',
        displayName: '냉동생지류',
        description: '냉동 베이커리 생지류',
        order: 5,
        imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop',
        isPublished: true,
      },
    }),
    prisma.productCategory.upsert({
      where: { name: 'coffee' },
      update: {},
      create: {
        name: 'coffee',
        displayName: '커피가공품',
        description: '커피, 코코아 등 음료 원료',
        order: 6,
        imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop',
        isPublished: true,
      },
    }),
    prisma.productCategory.upsert({
      where: { name: 'vegetable' },
      update: {},
      create: {
        name: 'vegetable',
        displayName: '과채가공품',
        description: '과일, 채소류 가공품',
        order: 7,
        imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=400&fit=crop',
        isPublished: true,
      },
    }),
    prisma.productCategory.upsert({
      where: { name: 'meat' },
      update: {},
      create: {
        name: 'meat',
        displayName: '축산가공품',
        description: '육류 가공품',
        order: 8,
        imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop',
        isPublished: true,
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} product categories`);

  // 2. Sample Products
  const grainCategory = categories.find(c => c.name === 'grain')!;
  const nutCategory = categories.find(c => c.name === 'nut')!;
  const dairyCategory = categories.find(c => c.name === 'dairy')!;
  const sugarCategory = categories.find(c => c.name === 'sugar')!;
  const frozenCategory = categories.find(c => c.name === 'frozen')!;
  const coffeeCategory = categories.find(c => c.name === 'coffee')!;

  const products = await Promise.all([
    // 곡류가공품 (4개)
    prisma.product.upsert({
      where: { code: 'GR-T55-001' },
      update: {},
      create: {
        categoryId: grainCategory.id,
        name: '프랑스산 밀가루 T55',
        code: 'GR-T55-001',
        description: '바게트, 치아바타에 최적화된 프리미엄 밀가루입니다. 프랑스 전통 제빵에 사용되는 고품질 밀가루로, 글루텐 함량이 적당하여 바삭한 크러스트와 부드러운 크럼을 만들어냅니다.',
        brand: 'Grands Moulins de Paris',
        manufacturer: '그랑 물랭 드 파리',
        origin: '프랑스',
        specs: { weight: '25kg', protein: '10.5%', ash: '0.55%' },
        features: ['프랑스 전통 제빵용', '바게트/치아바타 최적화', '글루텐 10.5%', '회분 0.55%'],
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
        order: 1,
        isPublished: true,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { code: 'GR-T65-001' },
      update: {},
      create: {
        categoryId: grainCategory.id,
        name: '프랑스산 밀가루 T65',
        code: 'GR-T65-001',
        description: '크로와상, 브리오슈 등 버터 빵류에 최적화된 밀가루입니다.',
        brand: 'Grands Moulins de Paris',
        manufacturer: '그랑 물랭 드 파리',
        origin: '프랑스',
        specs: { weight: '25kg', protein: '11.5%', ash: '0.65%' },
        features: ['크로와상/브리오슈용', '고단백', '부드러운 식감'],
        imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=300&fit=crop',
        order: 2,
        isPublished: true,
        isFeatured: false,
      },
    }),
    prisma.product.upsert({
      where: { code: 'GR-RYE-001' },
      update: {},
      create: {
        categoryId: grainCategory.id,
        name: '독일산 호밀가루',
        code: 'GR-RYE-001',
        description: '호밀빵, 사워도우에 최적화된 독일산 호밀가루입니다.',
        brand: 'Aurora Mühlen',
        manufacturer: '아우로라 뮐렌',
        origin: '독일',
        specs: { weight: '25kg', type: 'Type 1150' },
        features: ['호밀빵 전용', '사워도우 최적화', '풍부한 향'],
        imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=300&h=300&fit=crop',
        order: 3,
        isPublished: true,
        isFeatured: false,
      },
    }),
    prisma.product.upsert({
      where: { code: 'GR-WW-001' },
      update: {},
      create: {
        categoryId: grainCategory.id,
        name: '통밀가루 100%',
        code: 'GR-WW-001',
        description: '건강빵, 통밀빵에 최적화된 100% 통밀가루입니다.',
        brand: 'ACE Premium',
        manufacturer: '에이스유통',
        origin: '국내',
        specs: { weight: '20kg', fiber: '12%' },
        features: ['100% 통밀', '식이섬유 풍부', '건강빵 최적화'],
        imageUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=300&h=300&fit=crop',
        order: 4,
        isPublished: true,
        isFeatured: false,
      },
    }),

    // 견과가공품 (3개)
    prisma.product.upsert({
      where: { code: 'NT-AMS-001' },
      update: {},
      create: {
        categoryId: nutCategory.id,
        name: '프리미엄 아몬드 슬라이스',
        code: 'NT-AMS-001',
        description: '토핑용으로 최적화된 프리미엄 아몬드 슬라이스입니다. 균일한 두께와 신선한 품질을 자랑합니다.',
        brand: 'Blue Diamond',
        manufacturer: '블루다이아몬드',
        origin: '미국',
        specs: { weight: '11.34kg', thickness: '2mm' },
        features: ['균일한 두께', '프리미엄 등급', '토핑용 최적화'],
        imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=300&fit=crop',
        order: 1,
        isPublished: true,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { code: 'NT-WN-001' },
      update: {},
      create: {
        categoryId: nutCategory.id,
        name: '호두 분태',
        code: 'NT-WN-001',
        description: '빵, 쿠키 믹싱용 호두 분태입니다.',
        brand: 'ACE Premium',
        manufacturer: '에이스유통',
        origin: '미국',
        specs: { weight: '11.34kg', size: '4-6mm' },
        features: ['믹싱용', '균일한 크기', '신선도 유지'],
        imageUrl: 'https://images.unsplash.com/photo-1563412885-7daeb4e0e57a?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1563412885-7daeb4e0e57a?w=300&h=300&fit=crop',
        order: 2,
        isPublished: true,
        isFeatured: false,
      },
    }),
    prisma.product.upsert({
      where: { code: 'NT-HZ-001' },
      update: {},
      create: {
        categoryId: nutCategory.id,
        name: '헤이즐넛 페이스트',
        code: 'NT-HZ-001',
        description: '초콜릿, 크림 제조용 헤이즐넛 페이스트입니다.',
        brand: 'Callebaut',
        manufacturer: '칼리바우트',
        origin: '벨기에',
        specs: { weight: '5kg', purity: '100%' },
        features: ['100% 헤이즐넛', '초콜릿 믹싱용', '부드러운 질감'],
        imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop',
        order: 3,
        isPublished: true,
        isFeatured: false,
      },
    }),

    // 유지/유가공품 (3개)
    prisma.product.upsert({
      where: { code: 'DR-BT-001' },
      update: {},
      create: {
        categoryId: dairyCategory.id,
        name: '프랑스산 AOP 버터',
        code: 'DR-BT-001',
        description: '크로와상, 파이 제조용 프리미엄 AOP 인증 버터입니다.',
        brand: 'President',
        manufacturer: '프레지덩',
        origin: '프랑스',
        specs: { weight: '2.5kg', fatContent: '82%' },
        features: ['AOP 인증', '유지방 82%', '크로와상 최적화'],
        imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop',
        order: 1,
        isPublished: true,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { code: 'DR-CR-001' },
      update: {},
      create: {
        categoryId: dairyCategory.id,
        name: '휘핑크림 35%',
        code: 'DR-CR-001',
        description: '케이크 데코레이션용 휘핑크림입니다.',
        brand: 'Elle & Vire',
        manufacturer: '엘르앤비르',
        origin: '프랑스',
        specs: { weight: '1L', fatContent: '35%' },
        features: ['유지방 35%', '안정적인 휘핑', '부드러운 맛'],
        imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&h=300&fit=crop',
        order: 2,
        isPublished: true,
        isFeatured: false,
      },
    }),
    prisma.product.upsert({
      where: { code: 'DR-CC-001' },
      update: {},
      create: {
        categoryId: dairyCategory.id,
        name: '크림치즈 블록',
        code: 'DR-CC-001',
        description: '치즈케이크용 프리미엄 크림치즈입니다.',
        brand: 'Philadelphia',
        manufacturer: '필라델피아',
        origin: '미국',
        specs: { weight: '2kg', fatContent: '33%' },
        features: ['치즈케이크 최적화', '부드러운 질감', '크리미한 맛'],
        imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=300&fit=crop',
        order: 3,
        isPublished: true,
        isFeatured: false,
      },
    }),

    // 당류가공품 (2개)
    prisma.product.upsert({
      where: { code: 'SG-VS-001' },
      update: {},
      create: {
        categoryId: sugarCategory.id,
        name: '바닐라 시럽',
        code: 'SG-VS-001',
        description: '음료, 디저트용 프리미엄 바닐라 시럽입니다.',
        brand: 'Monin',
        manufacturer: '모닌',
        origin: '프랑스',
        specs: { weight: '1L', sugar: '60%' },
        features: ['천연 바닐라 향', '음료/디저트용', '프리미엄 등급'],
        imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop',
        order: 1,
        isPublished: true,
        isFeatured: false,
      },
    }),
    prisma.product.upsert({
      where: { code: 'SG-HN-001' },
      update: {},
      create: {
        categoryId: sugarCategory.id,
        name: '아카시아 꿀',
        code: 'SG-HN-001',
        description: '베이킹용 순수 아카시아 꿀입니다.',
        brand: 'ACE Premium',
        manufacturer: '에이스유통',
        origin: '국내',
        specs: { weight: '3kg', purity: '100%' },
        features: ['100% 순수 꿀', '베이킹 최적화', '깔끔한 단맛'],
        imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=300&fit=crop',
        order: 2,
        isPublished: true,
        isFeatured: false,
      },
    }),

    // 냉동생지류 (2개)
    prisma.product.upsert({
      where: { code: 'FZ-CR-001' },
      update: {},
      create: {
        categoryId: frozenCategory.id,
        name: '냉동 크로와상 생지',
        code: 'FZ-CR-001',
        description: '발효 완료된 프리미엄 냉동 크로와상 생지입니다.',
        brand: 'Délifrance',
        manufacturer: '델리프랑스',
        origin: '프랑스',
        specs: { weight: '60g x 80ea', layers: '27겹' },
        features: ['27겹 레이어링', '발효 완료', '바로 굽기 가능'],
        imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=300&fit=crop',
        order: 1,
        isPublished: true,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { code: 'FZ-DN-001' },
      update: {},
      create: {
        categoryId: frozenCategory.id,
        name: '냉동 도넛 생지',
        code: 'FZ-DN-001',
        description: '이스트 도넛용 냉동 생지입니다.',
        brand: 'ACE Premium',
        manufacturer: '에이스유통',
        origin: '국내',
        specs: { weight: '50g x 100ea' },
        features: ['이스트 발효', '균일한 크기', '간편 조리'],
        imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&h=300&fit=crop',
        order: 2,
        isPublished: true,
        isFeatured: false,
      },
    }),

    // 커피가공품 (2개)
    prisma.product.upsert({
      where: { code: 'CF-BL-001' },
      update: {},
      create: {
        categoryId: coffeeCategory.id,
        name: '원두 커피 블렌드',
        code: 'CF-BL-001',
        description: '에스프레소용 프리미엄 원두 블렌드입니다.',
        brand: 'ACE Premium',
        manufacturer: '에이스유통',
        origin: '브라질/콜롬비아',
        specs: { weight: '1kg', roast: '미디엄 다크' },
        features: ['에스프레소 최적화', '미디엄 다크 로스팅', '풍부한 크레마'],
        imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=300&fit=crop',
        order: 1,
        isPublished: true,
        isFeatured: true,
      },
    }),
    prisma.product.upsert({
      where: { code: 'CF-CC-001' },
      update: {},
      create: {
        categoryId: coffeeCategory.id,
        name: '코코아 파우더',
        code: 'CF-CC-001',
        description: '베이킹용 프리미엄 코코아 파우더입니다.',
        brand: 'Valrhona',
        manufacturer: '발로나',
        origin: '프랑스',
        specs: { weight: '1kg', cocoaContent: '22-24%' },
        features: ['코코아 22-24%', '베이킹 최적화', '진한 초콜릿 향'],
        imageUrl: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&h=300&fit=crop',
        order: 2,
        isPublished: true,
        isFeatured: false,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} sample products`);

  // 3. Company Info
  await prisma.companyInfo.upsert({
    where: { key: 'about' },
    update: {},
    create: {
      key: 'about',
      title: '회사소개',
      content: `
        <h2>에이스유통 주식회사</h2>
        <p>2009년 설립 이래, 에이스유통은 프리미엄 베이커리 원재료 유통 전문기업으로서
        대한민국 제과제빵 산업의 발전에 기여해왔습니다.</p>
        <p>15년간 축적된 노하우와 엄격한 품질 관리로 최고의 원재료를 공급하고 있으며,
        전국 물류 네트워크를 통해 신속한 배송 서비스를 제공합니다.</p>
      `,
      data: {
        foundedYear: 2009,
        employees: 50,
        partners: 500,
      },
    },
  });

  await prisma.companyInfo.upsert({
    where: { key: 'location' },
    update: {},
    create: {
      key: 'location',
      title: '찾아오시는 길',
      content: `
        <h3>본사</h3>
        <p>경기도 하남시 샘재로 119번길 31 (천현동)</p>
        <p>전화: 02-471-1644~6</p>
        <p>팩스: 02-471-1647</p>
        <p>이메일: ace32865@hanmail.net</p>
      `,
      data: {
        address: '경기도 하남시 샘재로 119번길 31 (천현동)',
        phone: '02-471-1644~6',
        fax: '02-471-1647',
        email: 'ace32865@hanmail.net',
        lat: 37.5506,
        lng: 127.2142,
      },
    },
  });

  console.log('✅ Created company info');

  // 4. Sample Banners
  await prisma.banner.upsert({
    where: { id: 'main-hero-1' },
    update: {},
    create: {
      id: 'main-hero-1',
      title: '프리미엄 베이커리 원재료',
      description: '최상의 원재료로 완성하는 프리미엄 베이킹',
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=3000&auto=format&fit=crop',
      linkUrl: '/products/all',
      linkText: '제품 보기',
      position: 'HOME_MAIN',
      order: 1,
      isActive: true,
    },
  });

  await prisma.banner.upsert({
    where: { id: 'main-hero-2' },
    update: {},
    create: {
      id: 'main-hero-2',
      title: '신선한 베이커리',
      description: '갓 구운 신선함을 전달합니다',
      imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=3000&auto=format&fit=crop',
      linkUrl: '/products/frozen',
      linkText: '냉동생지 보기',
      position: 'HOME_MAIN',
      order: 2,
      isActive: true,
    },
  });

  console.log('✅ Created banners');

  // 5. Sample News
  await prisma.news.upsert({
    where: { id: 'news-1' },
    update: {},
    create: {
      id: 'news-1',
      title: '2024년 신제품 라인업 발표',
      category: 'PRESS_RELEASE',
      content: '<p>에이스유통이 2024년 신제품 라인업을 발표했습니다. 프랑스산 프리미엄 밀가루와 새로운 냉동 생지 제품이 추가됩니다.</p>',
      excerpt: '프랑스산 프리미엄 밀가루와 새로운 냉동 생지 제품 출시',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      isPinned: true,
      views: 150,
    },
  });

  await prisma.news.upsert({
    where: { id: 'news-2' },
    update: {},
    create: {
      id: 'news-2',
      title: '물류센터 확장 이전 안내',
      category: 'NOTICE',
      content: '<p>보다 나은 서비스 제공을 위해 물류센터를 확장 이전합니다. 새로운 시설에서 더욱 빠르고 정확한 배송이 가능합니다.</p>',
      excerpt: '더 넓은 물류센터로 이전하여 배송 서비스를 개선합니다',
      thumbnailUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
      isPinned: false,
      views: 89,
    },
  });

  console.log('✅ Created sample news');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
