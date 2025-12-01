'use client';

import Link from 'next/link';

export default function PartnershipPage() {
  const partnershipTypes = [
    {
      title: '제조사 파트너십',
      description: '국내외 유수 식품 제조사들과의 직접 거래를 통해 품질 좋은 제품을 합리적인 가격에 공급합니다.',
      partners: ['삼립식품', 'CJ제일제당', '오뚜기', '풀무원'],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: '물류 파트너십',
      description: '전문 물류 업체들과의 협력을 통해 전국 어디든 신속하고 안전한 배송을 실현합니다.',
      partners: ['CJ대한통운', '한진택배', '롯데글로벌로지스'],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
    },
    {
      title: '거래처 파트너십',
      description: '전국 500여 개 거래처와의 상생 파트너십으로 서로의 성공을 함께 만들어갑니다.',
      partners: ['카페/베이커리', '호텔/리조트', '편의점', '급식업체'],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  const caseStudies = [
    {
      title: '프랜차이즈 카페 A사',
      category: '카페/베이커리',
      challenge: '다양한 베이커리 메뉴 운영 필요, 인력 및 공간 제약',
      solution: '고품질 냉동 베이커리 공급 및 메뉴 컨설팅',
      result: '베이커리 매출 40% 증가, 인건비 20% 절감',
    },
    {
      title: '호텔 B사',
      category: '호텔/리조트',
      challenge: '조식 뷔페용 빵 품질 일관성 유지 어려움',
      solution: '호텔 전용 프리미엄 빵 라인업 개발 및 공급',
      result: '고객 만족도 향상, 재구매율 95%',
    },
    {
      title: '편의점 C사',
      category: '유통/편의점',
      challenge: '전국 매장 물류 효율성 및 신선도 관리',
      solution: '콜드체인 기반 전국 배송 시스템 구축',
      result: '배송 시간 30% 단축, 폐기율 50% 감소',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">협력 사례</h1>
          <p className="text-xl opacity-90">함께 성장하는 상생의 파트너십</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-beige-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-primary">홈</Link>
            <span>/</span>
            <Link href="/culture/internal" className="hover:text-primary">기업문화</Link>
            <span>/</span>
            <span className="text-primary font-medium">협력 사례</span>
          </div>
        </div>
      </div>

      {/* Partnership Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">파트너십 유형</h2>
            <p className="text-lg text-text-secondary">에이스유통과 함께하는 다양한 협력 방식</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnershipTypes.map((type, index) => (
              <div
                key={index}
                className="bg-beige-50 rounded-2xl p-8 hover:shadow-lg transition-all"
              >
                <div className="text-primary mb-6">{type.icon}</div>
                <h3 className="text-2xl font-bold text-text-primary mb-3">{type.title}</h3>
                <p className="text-text-secondary mb-6">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.partners.map((partner, i) => (
                    <span
                      key={i}
                      className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: '협력 거래처' },
              { number: '15년', label: '파트너십 경험' },
              { number: '98%', label: '재계약률' },
              { number: '24시간', label: '고객 지원' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">성공 사례</h2>
            <p className="text-lg text-text-secondary">파트너와 함께 만든 성과</p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/4">
                    <span className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full mb-2">
                      {study.category}
                    </span>
                    <h3 className="text-2xl font-bold text-text-primary">{study.title}</h3>
                  </div>
                  <div className="md:w-3/4 grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xs">!</span>
                        과제
                      </h4>
                      <p className="text-text-secondary">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-xs">→</span>
                        솔루션
                      </h4>
                      <p className="text-text-secondary">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                        성과
                      </h4>
                      <p className="text-text-secondary">{study.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">파트너 혜택</h2>
            <p className="text-lg text-text-secondary">에이스유통과 함께하면 누릴 수 있는 혜택</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '경쟁력 있는 가격', desc: '대량 구매력을 통한 합리적인 가격 제공' },
              { title: '안정적인 공급', desc: '체계적인 재고 관리로 품절 없는 공급' },
              { title: '품질 보증', desc: '콜드체인 유지 및 철저한 품질 관리' },
              { title: '전담 서비스', desc: '고객사별 전담 담당자 배정' },
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{benefit.title}</h3>
                <p className="text-text-secondary">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">파트너가 되어주세요</h2>
          <p className="text-xl opacity-80 mb-8">
            에이스유통과 함께 성장할 파트너를 기다립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support/contact"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full transition-colors text-lg font-medium"
            >
              파트너십 문의하기
            </Link>
            <Link
              href="/support/faq"
              className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full transition-colors text-lg font-medium"
            >
              자주 묻는 질문
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
