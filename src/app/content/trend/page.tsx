'use client';

import Link from 'next/link';

export default function TrendPage() {
  const reports = [
    {
      id: 1,
      title: '2024 베이커리 트렌드 리포트',
      date: '2024.11.15',
      category: '연간 리포트',
      summary: '건강 지향 베이커리, 비건 옵션, 프리미엄 재료 사용 등 2024년 베이커리 시장의 주요 트렌드를 분석합니다.',
      tags: ['베이커리', '트렌드', '2024'],
    },
    {
      id: 2,
      title: 'MZ세대가 주도하는 디저트 트렌드',
      date: '2024.10.28',
      category: '소비자 분석',
      summary: '인스타그래머블한 디저트, 이색 맛 조합, 로컬 카페 문화 등 MZ세대의 디저트 소비 패턴을 분석합니다.',
      tags: ['MZ세대', '디저트', '소비트렌드'],
    },
    {
      id: 3,
      title: '냉동 베이커리 시장 동향',
      date: '2024.10.10',
      category: '시장 분석',
      summary: '편의점, 카페, 호텔 등 B2B 냉동 베이커리 시장의 성장세와 향후 전망을 분석합니다.',
      tags: ['냉동베이커리', 'B2B', '시장분석'],
    },
    {
      id: 4,
      title: '친환경 패키징 트렌드',
      date: '2024.09.20',
      category: '산업 동향',
      summary: '지속 가능한 포장재 사용 증가, 생분해성 용기 도입 등 식품 업계의 친환경 패키징 동향을 살펴봅니다.',
      tags: ['친환경', '패키징', 'ESG'],
    },
    {
      id: 5,
      title: '글루텐프리 제품 시장 현황',
      date: '2024.09.05',
      category: '제품 분석',
      summary: '건강에 대한 관심 증가로 성장하는 글루텐프리 베이커리 시장의 현황과 주요 제품을 분석합니다.',
      tags: ['글루텐프리', '건강', '제품분석'],
    },
    {
      id: 6,
      title: '카페 창업 트렌드 2024',
      date: '2024.08.22',
      category: '창업 가이드',
      summary: '소규모 전문점, 무인 카페, 복합 문화공간 등 2024년 카페 창업 트렌드와 성공 사례를 소개합니다.',
      tags: ['카페창업', '트렌드', '성공사례'],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">트렌드 리포트</h1>
          <p className="text-xl opacity-90">식품 유통 및 베이커리 산업 동향 분석</p>
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
            <span className="text-primary font-medium">트렌드 리포트</span>
          </div>
        </div>
      </div>

      {/* Featured Report */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-[4/3] md:aspect-auto bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-white text-lg font-medium">FEATURED REPORT</span>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block bg-secondary text-white text-sm px-4 py-1 rounded-full mb-4 w-fit">
                  최신 리포트
                </span>
                <h2 className="text-3xl font-bold text-text-primary mb-4">
                  2024 베이커리 트렌드 리포트
                </h2>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  건강 지향 베이커리, 비건 옵션, 프리미엄 재료 사용 등
                  2024년 베이커리 시장의 주요 트렌드를 심층 분석한 연간 리포트입니다.
                  업계 전문가들의 인사이트와 함께 향후 전망을 제시합니다.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm text-text-light">2024.11.15</span>
                  <span className="text-sm text-text-light">|</span>
                  <span className="text-sm text-text-light">조회수 1,234</span>
                </div>
                <button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full transition-colors w-fit">
                  리포트 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report List */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">리포트 아카이브</h2>
            <p className="text-text-secondary">에이스유통이 분석한 산업 동향 리포트</p>
          </div>

          <div className="space-y-6">
            {reports.map((report) => (
              <article
                key={report.id}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                        {report.category}
                      </span>
                      <span className="text-sm text-text-light">{report.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-text-secondary mb-3">{report.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {report.tags.map((tag, index) => (
                        <span key={index} className="text-xs text-text-light bg-beige-100 px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <button className="text-primary font-medium hover:underline flex items-center gap-1">
                      자세히 보기
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            <button className="w-10 h-10 rounded-full bg-primary text-white">1</button>
            <button className="w-10 h-10 rounded-full bg-beige-200 text-text-secondary hover:bg-beige-300">2</button>
            <button className="w-10 h-10 rounded-full bg-beige-200 text-text-secondary hover:bg-beige-300">3</button>
            <button className="w-10 h-10 rounded-full bg-beige-200 text-text-secondary hover:bg-beige-300">
              <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-secondary-dark text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">리포트 구독하기</h2>
          <p className="opacity-80 mb-8">
            최신 트렌드 리포트를 이메일로 받아보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="px-6 py-3 rounded-full text-text-primary w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full transition-colors">
              구독하기
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
