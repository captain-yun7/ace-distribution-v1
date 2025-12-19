'use client';

import { Header, Footer, PageHero } from '@/components/layout';

export default function HistoryPage() {
  const timeline = [
    { year: '2026', title: '신사옥 신축 및 이전 예정', desc: '하남시 감북동 소재 신사옥 신축 및 이전 예정' },
    { year: '2025', title: '전략적 파트너십 체결', desc: 'IP 굿즈 및 에듀 콘텐츠 기업 ㈜토이트론과 전략적 계약 체결' },
    { year: '2024', title: '연매출 245억 달성', desc: '지속적인 성장으로 연매출 245억원 달성' },
    { year: '2023', title: '일터혁신 사업장 선정', desc: '노사발전재단 일터혁신 사업장으로 선정' },
    { year: '2022', title: '물류센터 확장 이전', desc: '하남시 물류센터 확장 이전, 물류 역량 강화' },
    { year: '2022', title: '중소기업 경영인상 수상', desc: '경기도 하남시 중소기업 경영인상 수상' },
    { year: '2021', title: '에이스제빵소 상표권 등록', desc: '에이스제빵소 브랜드 상표권 등록' },
    { year: '2020', title: '창립 10주년', desc: '에이스유통 창립 10주년 기념행사 개최' },
    { year: '2020', title: '특허 취득 및 차량 증차', desc: '제과제빵류 운반 및 보관용 냉장/냉동장치 특허 취득, 배송차량 20대 증차' },
    { year: '2019', title: '우수기술기업 인증', desc: '제과제빵 재료 유통물류 및 기술마케팅 부문 우수기술기업 인증 획득' },
    { year: '2019', title: '매출 200억 달성', desc: '베이커리 소상공인 무료 세미나 개최, 에이스제빵소 운영 시작' },
    { year: '2018', title: '기업인 협의회 인증', desc: '경기도 하남시 기업인 협의회 인증' },
    { year: '2016', title: '메인비즈 인증', desc: '중소기업청 메인비즈(경영혁신형 중소기업) 인증' },
    { year: '2015', title: '본사 사옥 신축 이전', desc: '경기도 하남시 천현동에 자체 물류센터 보유 사옥 신축' },
    { year: '2012', title: '매출 100억 달성', desc: '물류창고 확장 이전, 연매출 100억원 달성' },
    { year: '2010', title: '에이스유통㈜ 법인 설립', desc: '카페·베이커리 원재료 유통 사업 시작 (직원 5명)' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        badge="HISTORY"
        title="기업 연혁"
        subtitle="15년의 성장 발자취"
        breadcrumb={[
          { name: '회사 소개', href: '/about/intro' },
          { name: '기업 연혁' }
        ]}
      />

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-[#F5EFE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '2010', label: '설립 연도' },
              { number: '15년', label: '업력' },
              { number: '500+', label: '누적 거래처' },
              { number: '245억', label: '연 매출' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-[#B8956A] mb-2">{stat.number}</div>
                <div className="text-[#6B5D53] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-[#FAF6F1] to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">OUR JOURNEY</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-6">
              신뢰와 품질로 쌓아온 <span className="text-[#B8956A]">역사</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#B8956A] via-[#D4A574] to-[#B8956A]"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-start ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Year Badge */}
                  <div className="absolute left-8 lg:left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10">
                    <span className="text-sm">{item.year}</span>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-28 lg:ml-0 lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-[#F5EFE7] group">
                      <h3 className="text-xl font-bold text-[#4A4039] mb-3 group-hover:text-[#B8956A] transition-colors">{item.title}</h3>
                      <p className="text-[#6B5D53] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">MILESTONES</span>
            <h2 className="text-3xl font-bold text-[#4A4039]">주요 이정표</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: '물류 인프라 구축',
                description: '하남시 물류센터 확장으로 수도권 전역 당일 배송 체계 확립',
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: '우수기술기업 인증',
                description: '제과제빵 재료 유통물류 및 기술마케팅 부문 기술력 인정',
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: '매출 245억 달성',
                description: '지속적인 성장으로 연매출 245억원 달성',
              },
            ].map((milestone, index) => (
              <div key={index} className="bg-[#FAF6F1] rounded-3xl p-10 text-center hover:shadow-xl transition-all duration-300 group">
                <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center text-[#B8956A] group-hover:bg-gradient-to-br group-hover:from-[#B8956A] group-hover:to-[#D4A574] group-hover:text-white transition-all duration-300">
                  {milestone.icon}
                </div>
                <h3 className="text-xl font-bold text-[#4A4039] mb-3">{milestone.title}</h3>
                <p className="text-[#6B5D53] leading-relaxed">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
