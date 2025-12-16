'use client';

import { Header, Footer, PageHero } from '@/components/layout';

export default function HistoryPage() {
  const timeline = [
    { year: '2025.06', title: '전략적 파트너십 체결', desc: 'IP 굿즈 및 에듀 콘텐츠 기업 ㈜토이트론과 전략적 계약 체결' },
    { year: '2024.12', title: '연매출 245억 달성', desc: '지속적인 성장으로 연매출 245억원 달성' },
    { year: '2022.10', title: '물류센터 확장 이전', desc: '하남시 물류센터 확장 이전, 물류 역량 강화' },
    { year: '2020.09', title: '창립 10주년', desc: '에이스유통 창립 10주년 기념' },
    { year: '2020.07', title: '특허 취득 및 차량 증차', desc: '제과제빵류 운반 및 보관용 냉장/냉동장치 특허 취득, 배송차량 20대 증차' },
    { year: '2019.06', title: '우수기술기업 인증', desc: '제과제빵 재료 유통물류 및 기술마케팅 부문 우수기술기업 인증 획득' },
    { year: '2018.01', title: 'HACCP 협력업체 인증', desc: 'HACCP 협력업체 인증 취득, 콜드체인 시스템 도입' },
    { year: '2015.06', title: '본사 사옥 신축 이전', desc: '경기도 하남시 천현동에 자체 물류센터 보유 사옥 신축, 냉동/냉장 운송 인증 취득' },
    { year: '2012.04', title: '물류창고 확장', desc: '물류창고 확장 이전' },
    { year: '2010.03', title: '에이스유통㈜ 법인 설립', desc: '카페·베이커리 원재료 유통 사업 시작' },
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
                title: '품질 인증 획득',
                description: 'HACCP 협력업체 인증, 콜드체인 인증으로 신뢰도 제고',
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: '자체 브랜드 런칭',
                description: '에이스베이커리 브랜드로 B2B 제빵 시장 진출',
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

      {/* Future Vision */}
      <section className="py-20 bg-gradient-to-r from-[#4A4039] to-[#6B5D53] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-sm font-medium text-[#D4A574] tracking-[0.3em] uppercase mb-4 block">FUTURE VISION</span>
          <h2 className="text-4xl font-bold mb-6">미래 비전</h2>
          <p className="text-xl text-white/90 mb-12">
            에이스유통은 다음 15년을 향해 더 큰 도약을 준비합니다
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-5xl font-black text-[#D4A574] mb-4">2030</div>
              <h3 className="text-xl font-bold mb-3">연 매출 500억 달성</h3>
              <p className="text-white/80">지속적인 성장을 통한 중견기업 도약</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-5xl font-black text-[#D4A574] mb-4">1000+</div>
              <h3 className="text-xl font-bold mb-3">전국 거래처 확대</h3>
              <p className="text-white/80">수도권을 넘어 전국 네트워크 구축</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
