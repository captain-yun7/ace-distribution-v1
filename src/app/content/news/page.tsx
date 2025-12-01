'use client';

import Link from 'next/link';

export default function NewsPage() {
  const news = [
    {
      id: 1,
      title: '에이스유통, 2024년 연 매출 245억 돌파',
      date: '2024.11.20',
      source: '식품산업신문',
      summary: '에이스유통이 2024년 연 매출 245억원을 달성하며 창사 이래 최대 실적을 기록했다. 콜드체인 시스템 강화와 거래처 확대가 주효했다는 분석이다.',
      type: '기업 뉴스',
    },
    {
      id: 2,
      title: '하남시 물류센터 확장, 수도권 당일 배송 강화',
      date: '2024.10.15',
      source: '유통저널',
      summary: '에이스유통이 하남시 물류센터를 확장 이전하며 수도권 전역 당일 배송 체계를 구축했다. 약 1000평 규모의 최신 설비를 갖추고 있다.',
      type: '기업 뉴스',
    },
    {
      id: 3,
      title: '에이스베이커리, B2B 제빵 시장 새 강자로 부상',
      date: '2024.09.28',
      source: '베이커리투데이',
      summary: '에이스유통의 자체 브랜드 에이스베이커리가 B2B 제빵 시장에서 빠르게 성장하고 있다. 고품질 냉동 베이커리로 카페, 호텔 등에서 호평.',
      type: '브랜드 뉴스',
    },
    {
      id: 4,
      title: '식품 유통업계, 콜드체인 투자 확대 추세',
      date: '2024.09.10',
      source: '물류신문',
      summary: '식품 유통업계가 콜드체인 시스템 투자를 확대하고 있다. 에이스유통을 포함한 주요 업체들이 신선도 유지를 위한 설비 투자에 나섰다.',
      type: '업계 뉴스',
    },
    {
      id: 5,
      title: '에이스유통, 거래처 500개 돌파 기념 이벤트',
      date: '2024.08.25',
      source: '식품경제',
      summary: '에이스유통이 거래처 500개 돌파를 기념해 파트너사 감사 이벤트를 진행한다. 15년간의 성장에 함께해 준 고객사에 대한 감사의 의미를 담았다.',
      type: '기업 뉴스',
    },
    {
      id: 6,
      title: '소규모 베이커리 카페, 냉동 베이커리로 경쟁력 확보',
      date: '2024.08.05',
      source: '카페비즈',
      summary: '소규모 베이커리 카페들이 냉동 베이커리를 활용해 메뉴 다양화와 비용 절감을 실현하고 있다. 에이스유통 등 전문 유통업체 수요 증가.',
      type: '업계 뉴스',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-text-primary to-secondary-dark flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">언론보도</h1>
          <p className="text-xl opacity-90">에이스유통 관련 뉴스 및 언론 기사</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-beige-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-primary">홈</Link>
            <span>/</span>
            <Link href="/content/recipe" className="hover:text-primary">콘텐츠</Link>
            <span>/</span>
            <span className="text-primary font-medium">언론보도</span>
          </div>
        </div>
      </div>

      {/* Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {['전체', '기업 뉴스', '브랜드 뉴스', '업계 뉴스'].map((filter) => (
              <button
                key={filter}
                className={`px-6 py-2 rounded-full transition-all ${
                  filter === '전체'
                    ? 'bg-primary text-white'
                    : 'bg-beige-100 text-text-secondary hover:bg-beige-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all group"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                      {item.type}
                    </span>
                    <span className="text-sm text-text-light">{item.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-text-secondary mb-4 line-clamp-3">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-light flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      {item.source}
                    </span>
                    <button className="text-primary font-medium hover:underline flex items-center gap-1">
                      기사 보기
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full transition-colors">
              더 보기
            </button>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-beige-100 rounded-3xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-4">보도자료 문의</h2>
            <p className="text-text-secondary mb-8">
              에이스유통 관련 취재 및 보도자료 요청은<br />
              아래 연락처로 문의해 주시기 바랍니다.
            </p>
            <div className="space-y-2 text-text-primary">
              <p className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <strong>031-792-8195</strong>
              </p>
              <p className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <strong>ace@acedist.co.kr</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
