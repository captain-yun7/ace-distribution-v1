import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting company content seeding...');

  // 1. 기업 연혁 데이터
  console.log('📅 Seeding timeline...');
  const timelineData = [
    { year: '2026', title: '신사옥 신축 및 이전 예정', desc: '하남시 감북동 소재 신사옥 신축 및 이전 예정', order: 1 },
    { year: '2025', title: '전략적 파트너십 체결', desc: 'IP 굿즈 및 에듀 콘텐츠 기업 ㈜토이트론과 전략적 계약 체결', order: 2, imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop' },
    { year: '2024', title: '연매출 245억 달성', desc: '지속적인 성장으로 연매출 245억원 달성', order: 3 },
    { year: '2023', title: '일터혁신 사업장 선정', desc: '노사발전재단 일터혁신 사업장으로 선정', order: 4 },
    { year: '2022', title: '물류센터 확장 이전', desc: '하남시 물류센터 확장 이전, 물류 역량 강화', order: 5 },
    { year: '2022', title: '중소기업 경영인상 수상', desc: '경기도 하남시 중소기업 경영인상 수상', order: 6 },
    { year: '2021', title: '에이스제빵소 상표권 등록', desc: '에이스제빵소 브랜드 상표권 등록', order: 7 },
    { year: '2020', title: '창립 10주년', desc: '에이스유통 창립 10주년 기념행사 개최', order: 8 },
    { year: '2020', title: '특허 취득 및 차량 증차', desc: '제과제빵류 운반 및 보관용 냉장/냉동장치 특허 취득, 배송차량 20대 증차', order: 9, imageUrl: '/특허증.png' },
    { year: '2019', title: '우수기술기업 인증', desc: '제과제빵 재료 유통물류 및 기술마케팅 부문 우수기술기업 인증 획득', order: 10, imageUrl: '/우수기술기업 인증서.png' },
    { year: '2019', title: '매출 200억 달성', desc: '베이커리 소상공인 무료 세미나 개최, 에이스제빵소 운영 시작', order: 11 },
    { year: '2018', title: '기업인 협의회 인증', desc: '경기도 하남시 기업인 협의회 인증', order: 12 },
    { year: '2016', title: '메인비즈 인증', desc: '중소기업청 메인비즈(경영혁신형 중소기업) 인증', order: 13 },
    { year: '2015', title: '본사 사옥 신축 이전', desc: '경기도 하남시 천현동에 자체 물류센터 보유 사옥 신축', order: 14, imageUrl: '/사업장.png' },
    { year: '2012', title: '매출 100억 달성', desc: '물류창고 확장 이전, 연매출 100억원 달성', order: 15 },
    { year: '2010', title: '에이스유통㈜ 법인 설립', desc: '카페·베이커리 원재료 유통 사업 시작 (직원 5명)', order: 16, imageUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=600&fit=crop' },
  ];

  for (const data of timelineData) {
    await prisma.companyTimeline.upsert({
      where: { id: `timeline-${data.year}-${data.order}` },
      update: data,
      create: {
        id: `timeline-${data.year}-${data.order}`,
        ...data,
      },
    });
  }

  // 2. 인증서 데이터
  console.log('🏆 Seeding certificates...');
  const certificatesData = [
    {
      title: '특허증 (냉장/냉동 장치)',
      description: '제과제빵류 운반 및 보관용 냉장/냉동장치 특허 (제 10-2445173호)',
      date: '2020년 취득',
      imageUrl: '/images/certificates/patent.jpg',
      order: 1,
    },
    {
      title: '상표등록증 (에이스제빵소)',
      description: '에이스제빵소 브랜드 상표권 등록',
      date: '2021년 등록',
      imageUrl: '/images/certificates/trademark.png',
      order: 2,
    },
    {
      title: '우수기술기업 인증서',
      description: '제과제빵 재료 유통물류 및 기술마케팅 부문 기술력 인증',
      date: '2019년 취득',
      imageUrl: '/images/certificates/tech-company.png',
      order: 3,
    },
    {
      title: '메인비즈 인증',
      description: '중소벤처기업부 경영혁신형 중소기업 인증',
      date: '2016년 취득',
      imageUrl: '/images/certificates/mainbiz.png',
      order: 4,
    },
    {
      title: '일터혁신 사업장',
      description: '노사발전재단 일터혁신 사업장 선정, 직무 분석 및 평가체계 개선 추진',
      date: '2023년 선정',
      imageUrl: '/images/certificates/workplace-innovation.png',
      order: 5,
    },
  ];

  for (const data of certificatesData) {
    await prisma.companyCertificate.upsert({
      where: { id: `cert-${data.order}` },
      update: data,
      create: {
        id: `cert-${data.order}`,
        ...data,
      },
    });
  }

  // 3. 주요 고객사
  console.log('🤝 Seeding clients...');
  const clientsData = [
    { name: '스파필드 팥고당 입점 (하남, 고양 외 8개 지점)', order: 1 },
    { name: '롯데 백화점 한나식빵 입점 (롯데백화점 외 20여개 지점)', order: 2 },
    { name: '지하철 역사 내 더베이크 (17여개 지점)', order: 3 },
    { name: '곤트란쉐리에 (30여개 지점)', order: 4 },
    { name: '그 외 기타 개인제과 (전국 420여개 이상 거래처 보유/관리)', order: 5 },
  ];

  for (const data of clientsData) {
    await prisma.companyClient.upsert({
      where: { id: `client-${data.order}` },
      update: data,
      create: {
        id: `client-${data.order}`,
        ...data,
      },
    });
  }

  // 4. 핵심가치
  console.log('⭐ Seeding core values...');
  const coreValuesData = [
    {
      title: '품질 최우선',
      subtitle: 'Quality First',
      description: '엄격한 품질관리 시스템으로 최고의 제품만을 선별합니다',
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
      order: 1,
    },
    {
      title: '고객 중심',
      subtitle: 'Customer Focus',
      description: '고객의 니즈를 정확히 파악하여 맞춤형 솔루션을 제공합니다',
      imageUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=400&fit=crop',
      order: 2,
    },
    {
      title: '전문성',
      subtitle: 'Expertise',
      description: '16년간 축적된 노하우와 전문 지식을 바탕으로 서비스합니다',
      imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop',
      order: 3,
    },
    {
      title: '혁신 추구',
      subtitle: 'Innovation',
      description: '시장 트렌드를 선도하며 새로운 가치를 창출합니다',
      imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop',
      order: 4,
    },
  ];

  for (const data of coreValuesData) {
    await prisma.companyCoreValue.upsert({
      where: { id: `value-${data.order}` },
      update: data,
      create: {
        id: `value-${data.order}`,
        ...data,
      },
    });
  }

  // 5. 사내문화 - 문화 항목
  console.log('🎨 Seeding company culture...');
  const cultureItemsData = [
    {
      type: 'CULTURE' as const,
      title: '창립멤버 포상',
      desc: '창립멤버 4인에게 1천만원의 포상금 수여 (총 4천만원)\n10년 이상 근속자 금 10돈 지급\n전직원 금 1돈 지급',
      year: '2020년',
      imageUrl: '/포상금.png',
      order: 1,
    },
    {
      type: 'CULTURE' as const,
      title: '인재양성 교육비 지원',
      desc: '대학원 등록금 전액 지원 (한양대 경영학과정 2명 지원 중)\n유통전문관리사 교육비 전액 지원',
      year: '진행중',
      order: 2,
    },
    {
      type: 'CULTURE' as const,
      title: '직무역량 강화',
      desc: '감정노동관리사 교육 전직원 수료\n지게차 자격증 교육비 지원\n직무 관련 자격증 취득 전액 지원',
      year: '진행중',
      order: 3,
    },
    {
      type: 'CULTURE' as const,
      title: '마라톤동아리 운영',
      desc: '직원 자발적 참여 단체 마라톤 참가\n참가 직원 전원 나이키 러닝화 제공',
      year: '2023년~',
      order: 4,
    },
  ];

  for (const data of cultureItemsData) {
    await prisma.companyCulture.upsert({
      where: { id: `culture-${data.order}` },
      update: data,
      create: {
        id: `culture-${data.order}`,
        ...data,
      },
    });
  }

  // 6. 사내문화 - 복리후생
  const benefitsData = [
    { type: 'BENEFIT' as const, title: '4대 보험', desc: '국민연금, 건강보험,\n고용보험, 산재보험\n완비', order: 1 },
    { type: 'BENEFIT' as const, title: '퇴직금', desc: '근속 1년 이상\n퇴직금 지급', order: 2 },
    { type: 'BENEFIT' as const, title: '명절 상여', desc: '설, 추석 명절\n상여금 지급', order: 3 },
    { type: 'BENEFIT' as const, title: '경조사 지원', desc: '경조금 및\n경조휴가 제공', order: 4 },
    { type: 'BENEFIT' as const, title: '교육비 전액 지원', desc: '대학원, 자격증 등\n교육비 전액 지원', order: 5 },
    { type: 'BENEFIT' as const, title: '식대 지원', desc: '중식 및 석식\n식대 지원', order: 6 },
    { type: 'BENEFIT' as const, title: '건강검진', desc: '연 1회 종합\n건강검진', order: 7 },
    { type: 'BENEFIT' as const, title: '장기근속 포상', desc: '10년 근속자\n금 지급', order: 8 },
  ];

  for (const data of benefitsData) {
    await prisma.companyCulture.upsert({
      where: { id: `benefit-${data.order}` },
      update: data,
      create: {
        id: `benefit-${data.order}`,
        ...data,
      },
    });
  }

  // 7. 사내문화 - 사회공헌
  const csrData = [
    {
      type: 'CSR' as const,
      title: '베이커리 세미나 개최',
      desc: '소상공인 매출 증대를 위한 무료 세미나를\n6년째 연 2회 개최하며 지역 경제 활성화를 지원합니다.',
      order: 1,
    },
    {
      type: 'CSR' as const,
      title: '재해 이웃돕기 후원',
      desc: '산불 피해 이재민의 일상 회복을 위해\n희망브리지를 통해 긴급 구호 성금을 기부합니다.',
      order: 2,
    },
    {
      type: 'CSR' as const,
      title: '지역 상생 협력',
      desc: '지역 베이커리 및 소상공인과 협력하여\n매출 다각화와 지역 경제 활성화에 기여합니다.',
      order: 3,
    },
  ];

  for (const data of csrData) {
    await prisma.companyCulture.upsert({
      where: { id: `csr-${data.order}` },
      update: data,
      create: {
        id: `csr-${data.order}`,
        ...data,
      },
    });
  }

  // 8. 기부 내역
  console.log('💝 Seeding donations...');
  const donationsData = [
    {
      year: '2024',
      amount: '1,200만원',
      desc: '지역 아동센터 빵 기부, 무료 급식소 식품 지원',
      order: 1,
    },
    {
      year: '2023',
      amount: '1,000만원',
      desc: '독거노인 명절 선물 세트, 지역 복지관 식품 기부',
      order: 2,
    },
    {
      year: '2022',
      amount: '800만원',
      desc: '수해 지역 긴급 식품 지원, 아동 급식 후원',
      order: 3,
    },
    {
      year: '2021',
      amount: '600만원',
      desc: '코로나 취약계층 식품 꾸러미 전달',
      order: 4,
    },
  ];

  for (const data of donationsData) {
    await prisma.companyDonation.upsert({
      where: { id: `donation-${data.year}` },
      update: data,
      create: {
        id: `donation-${data.year}`,
        ...data,
      },
    });
  }

  // 9. CompanyInfo 데이터 (Hero, Mission, CEO 메시지)
  console.log('📝 Seeding company info content...');

  // Hero 섹션
  await prisma.companyInfo.upsert({
    where: { key: 'hero_section' },
    update: {
      title: 'Hero 섹션',
      content: '',
      data: {
        mainTitle: '최상의 원재료로',
        subTitle: '완성하는 <span class="text-[#D4A574]">프리미엄</span> 베이킹',
        description: '16년간 축적된 노하우와 엄격한 품질 관리로\n최고의 베이커리 원재료를 공급합니다.',
        since: 'Since 2010',
        cta1Text: '제품 보기',
        cta1Link: '/products/all',
        cta2Text: '회사 소개',
        cta2Link: '/about/intro',
      },
    },
    create: {
      key: 'hero_section',
      title: 'Hero 섹션',
      content: '',
      data: {
        mainTitle: '최상의 원재료로',
        subTitle: '완성하는 <span class="text-[#D4A574]">프리미엄</span> 베이킹',
        description: '16년간 축적된 노하우와 엄격한 품질 관리로\n최고의 베이커리 원재료를 공급합니다.',
        since: 'Since 2010',
        cta1Text: '제품 보기',
        cta1Link: '/products/all',
        cta2Text: '회사 소개',
        cta2Link: '/about/intro',
      },
    },
  });

  // 미션/비전
  await prisma.companyInfo.upsert({
    where: { key: 'mission_vision' },
    update: {
      title: '미션 & 비전',
      content: '',
      data: {
        title: '최고의 품질로 성공을 만들어갑니다',
        subtitle: '16년의 경험과 전문성으로 고객사의 성공적인 비즈니스를 위한 최적의 솔루션을 제공합니다',
      },
    },
    create: {
      key: 'mission_vision',
      title: '미션 & 비전',
      content: '',
      data: {
        title: '최고의 품질로 성공을 만들어갑니다',
        subtitle: '16년의 경험과 전문성으로 고객사의 성공적인 비즈니스를 위한 최적의 솔루션을 제공합니다',
      },
    },
  });

  // CEO 메시지
  await prisma.companyInfo.upsert({
    where: { key: 'ceo_message' },
    update: {
      title: 'CEO 메시지',
      content: '',
      data: {
        title: '좋은 상품을 정직하게 유통하는\n신뢰받는 파트너가 되겠습니다',
        paragraphs: [
          '에이스유통주식회사는 카페·베이커리 산업을 위한 프리미엄 원재료 공급, 전문 소싱, 콜드체인 물류, 품질관리(QC)를 기반으로 성장해온 F&B B2B 솔루션 기업입니다.',
          '2010년 설립 이후 자체 물류센터와 체계적인 유통 인프라를 구축하며 국내 프랜차이즈, 베이커리 카페, 전문 제과점 등 다양한 파트너에게 신뢰성 높은 제품을 안정적으로 공급해왔습니다.',
          '당사는 원재료의 선별력과 정교한 품질관리, 신속한 공급망 운영을 통해 고객이 필요로 하는 제품을 정확하고 안정적으로 전달하는 데 집중해 왔으며, 업계에서 견고한 파트너십을 확보해 왔습니다.',
          '에이스유통은 앞으로도 고품질 원재료와 안정적인 공급 체계를 중심으로 고객의 비즈니스를 확실하게 지원하는 신뢰받는 유통 파트너로 자리매김하겠습니다.',
        ],
        ceoName: '안종일',
        companyName: '에이스유통주식회사',
      },
    },
    create: {
      key: 'ceo_message',
      title: 'CEO 메시지',
      content: '',
      data: {
        title: '좋은 상품을 정직하게 유통하는\n신뢰받는 파트너가 되겠습니다',
        paragraphs: [
          '에이스유통주식회사는 카페·베이커리 산업을 위한 프리미엄 원재료 공급, 전문 소싱, 콜드체인 물류, 품질관리(QC)를 기반으로 성장해온 F&B B2B 솔루션 기업입니다.',
          '2010년 설립 이후 자체 물류센터와 체계적인 유통 인프라를 구축하며 국내 프랜차이즈, 베이커리 카페, 전문 제과점 등 다양한 파트너에게 신뢰성 높은 제품을 안정적으로 공급해왔습니다.',
          '당사는 원재료의 선별력과 정교한 품질관리, 신속한 공급망 운영을 통해 고객이 필요로 하는 제품을 정확하고 안정적으로 전달하는 데 집중해 왔으며, 업계에서 견고한 파트너십을 확보해 왔습니다.',
          '에이스유통은 앞으로도 고품질 원재료와 안정적인 공급 체계를 중심으로 고객의 비즈니스를 확실하게 지원하는 신뢰받는 유통 파트너로 자리매김하겠습니다.',
        ],
        ceoName: '안종일',
        companyName: '에이스유통주식회사',
      },
    },
  });

  console.log('✅ Company content seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
