'use client';

import Link from 'next/link';

export default function SocialPage() {
  const csrActivities = [
    {
      title: '지역 사회 기부',
      description: '매월 지역 복지시설에 빵과 식품을 기부하고 있습니다. 소외 계층의 따뜻한 한 끼를 책임집니다.',
      stats: '연간 1,000만원 상당',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: '환경 보호 활동',
      description: '친환경 포장재 사용, 배송 차량 효율화 등 탄소 발자국을 줄이기 위한 노력을 지속합니다.',
      stats: '포장재 30% 절감',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: '지역 상생',
      description: '지역 소상공인과의 협력을 통해 지역 경제 활성화에 기여하고 있습니다.',
      stats: '지역 업체 50% 이상 거래',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  const donationHistory = [
    { year: '2024', amount: '1,200만원', description: '지역 아동센터 빵 기부, 무료 급식소 식품 지원' },
    { year: '2023', amount: '1,000만원', description: '독거노인 명절 선물 세트, 지역 복지관 식품 기부' },
    { year: '2022', amount: '800만원', description: '수해 지역 긴급 식품 지원, 아동 급식 후원' },
    { year: '2021', amount: '600만원', description: '코로나 취약계층 식품 꾸러미 전달' },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-accent to-primary flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">사회 공헌</h1>
          <p className="text-xl opacity-90">나눔으로 함께하는 에이스유통</p>
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
            <span className="text-primary font-medium">사회 공헌</span>
          </div>
        </div>
      </div>

      {/* CSR Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-6">나눔 철학</h2>
          <p className="text-xl text-text-secondary leading-relaxed">
            에이스유통은 &quot;함께 성장하는 기업&quot;이라는 가치 아래,
            기업의 이익을 사회와 나누고 지역 사회 발전에 기여하고자 합니다.
            작은 나눔이 모여 큰 변화를 만든다고 믿습니다.
          </p>
        </div>
      </section>

      {/* CSR Activities */}
      <section className="py-20 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">주요 활동</h2>
            <p className="text-lg text-text-secondary">에이스유통의 사회 공헌 활동</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {csrActivities.map((activity, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-primary mb-6 flex justify-center">
                  {activity.icon}
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3">{activity.title}</h3>
                <p className="text-text-secondary mb-4">{activity.description}</p>
                <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full">
                  {activity.stats}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation History */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">기부 현황</h2>
            <p className="text-lg text-text-secondary">연도별 사회 공헌 활동 내역</p>
          </div>

          <div className="space-y-6">
            {donationHistory.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-beige-50 rounded-xl"
              >
                <div className="flex-shrink-0">
                  <span className="inline-block bg-primary text-white text-xl font-bold px-4 py-2 rounded-lg">
                    {item.year}
                  </span>
                </div>
                <div className="flex-grow">
                  <p className="text-text-secondary">{item.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">{item.amount}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-8 p-8 bg-primary rounded-2xl text-white text-center">
            <p className="text-lg opacity-80 mb-2">누적 기부 총액</p>
            <p className="text-4xl font-bold">3,600만원+</p>
          </div>
        </div>
      </section>

      {/* Environmental Efforts */}
      <section className="py-20 bg-beige-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">환경 경영</h2>
            <p className="text-lg text-text-secondary">지속 가능한 미래를 위한 노력</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '친환경 포장재', desc: '생분해성 포장재 도입 확대' },
              { title: '배송 효율화', desc: '최적 경로 설계로 연료 절감' },
              { title: '폐기물 감소', desc: '재고 관리 시스템으로 폐기 최소화' },
              { title: '에너지 절약', desc: '고효율 냉동 설비 운영' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">활동 갤러리</h2>
            <p className="text-text-secondary">나눔의 순간들</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center"
              >
                <svg className="w-12 h-12 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">함께 나눠요</h2>
          <p className="text-xl opacity-80 mb-8">
            에이스유통의 사회 공헌 활동에 함께하고 싶으시다면 연락해주세요
          </p>
          <Link
            href="/support/contact"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full transition-colors text-lg font-medium"
          >
            참여 문의하기
          </Link>
        </div>
      </section>
    </main>
  );
}
