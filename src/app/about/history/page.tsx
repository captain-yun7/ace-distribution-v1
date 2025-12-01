'use client';

import Link from 'next/link';

export default function HistoryPage() {
  const historyData = [
    {
      year: '2024',
      events: [
        { month: '03', title: '연 매출 245억 돌파' },
        { month: '01', title: '거래처 500개 돌파' },
      ],
    },
    {
      year: '2022',
      events: [
        { month: '06', title: '에이스베이커리 브랜드 런칭' },
        { month: '03', title: '물류센터 확장 이전 (하남시)' },
      ],
    },
    {
      year: '2020',
      events: [
        { month: '12', title: '창립 10주년' },
        { month: '05', title: '배송 차량 20대 증차' },
      ],
    },
    {
      year: '2018',
      events: [
        { month: '09', title: 'HACCP 협력업체 인증 취득' },
        { month: '04', title: '콜드체인 시스템 도입' },
      ],
    },
    {
      year: '2015',
      events: [
        { month: '08', title: '냉동/냉장 운송 인증 취득' },
        { month: '03', title: '거래처 200개 돌파' },
      ],
    },
    {
      year: '2012',
      events: [
        { month: '06', title: '물류창고 확장' },
        { month: '02', title: '온라인 주문 시스템 구축' },
      ],
    },
    {
      year: '2010',
      events: [
        { month: '03', title: '에이스유통 설립' },
        { month: '03', title: '대표이사 안종일 취임' },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-primary to-secondary-dark flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">기업 연혁</h1>
          <p className="text-xl opacity-90">15년간의 성장 이야기</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-beige-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-primary">홈</Link>
            <span>/</span>
            <Link href="/about/intro" className="hover:text-primary">회사소개</Link>
            <span>/</span>
            <span className="text-primary font-medium">기업 연혁</span>
          </div>
        </div>
      </div>

      {/* Intro Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '2010', label: '설립 연도' },
              { number: '15년', label: '업력' },
              { number: '500+', label: '누적 거래처' },
              { number: '245억', label: '연 매출' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-beige-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">HISTORY</h2>
            <p className="text-lg text-text-secondary">에이스유통이 걸어온 길</p>
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-primary/20" />

            {historyData.map((yearGroup, yearIndex) => (
              <div key={yearIndex} className="relative mb-16">
                {/* Year Label */}
                <div className="flex justify-center mb-8">
                  <div className="bg-primary text-white px-8 py-3 rounded-full text-2xl font-bold shadow-lg relative z-10">
                    {yearGroup.year}
                  </div>
                </div>

                {/* Events */}
                <div className="space-y-6">
                  {yearGroup.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`flex items-center gap-4 ${
                        eventIndex % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      }`}
                    >
                      <div className={`flex-1 ${eventIndex % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow inline-block">
                          <span className="text-primary font-semibold">{event.month}월</span>
                          <p className="text-text-primary font-medium mt-1">{event.title}</p>
                        </div>
                      </div>

                      {/* Center Dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow" />
                      </div>

                      <div className="flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Start Point */}
            <div className="flex justify-center">
              <div className="bg-secondary text-white px-6 py-2 rounded-full text-sm font-medium relative z-10">
                창립
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">주요 이정표</h2>
            <p className="text-lg text-text-secondary">에이스유통의 핵심 성장 동력</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: '물류 인프라 구축',
                description: '하남시 물류센터 확장으로 수도권 전역 당일 배송 체계 확립',
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: '품질 인증 획득',
                description: 'HACCP 협력업체 인증, 콜드체인 인증으로 신뢰도 제고',
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: '자체 브랜드 런칭',
                description: '에이스베이커리 브랜드로 B2B 제빵 시장 진출',
              },
            ].map((milestone, index) => (
              <div key={index} className="bg-beige-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-primary mb-4 flex justify-center">
                  {milestone.icon}
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3">{milestone.title}</h3>
                <p className="text-text-secondary">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 bg-secondary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">미래 비전</h2>
          <p className="text-xl opacity-90 mb-12">
            에이스유통은 다음 15년을 향해 더 큰 도약을 준비합니다
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-white/20 rounded-2xl p-8">
              <div className="text-5xl font-bold text-primary-light mb-4">2030</div>
              <h3 className="text-xl font-bold mb-3">연 매출 500억 달성</h3>
              <p className="opacity-80">지속적인 성장을 통한 중견기업 도약</p>
            </div>
            <div className="border border-white/20 rounded-2xl p-8">
              <div className="text-5xl font-bold text-primary-light mb-4">1000+</div>
              <h3 className="text-xl font-bold mb-3">전국 거래처 확대</h3>
              <p className="opacity-80">수도권을 넘어 전국 네트워크 구축</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
