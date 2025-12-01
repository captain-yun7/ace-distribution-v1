'use client';

import Link from 'next/link';

export default function InternalCulturePage() {
  const cultureItems = [
    {
      title: '소통하는 문화',
      description: '매월 전체 회의를 통해 경영 현황을 공유하고, 열린 소통 문화를 만들어갑니다.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
    },
    {
      title: '함께 성장하는 문화',
      description: '직원 역량 강화를 위한 교육 지원과 자기계발 기회를 제공합니다.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: '건강한 문화',
      description: '워라밸을 존중하며, 정시 퇴근과 연차 사용을 권장합니다.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: '즐거운 문화',
      description: '분기별 회식, 워크숍 등 다양한 팀 빌딩 활동으로 즐거운 직장을 만듭니다.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const benefits = [
    { title: '4대 보험', description: '국민연금, 건강보험, 고용보험, 산재보험 완비' },
    { title: '퇴직금', description: '근속 1년 이상 퇴직금 지급' },
    { title: '명절 상여', description: '설, 추석 명절 상여금 지급' },
    { title: '경조사 지원', description: '경조금 및 경조휴가 제공' },
    { title: '교육 지원', description: '직무 관련 교육비 지원' },
    { title: '식대 지원', description: '중식 및 석식 식대 지원' },
    { title: '건강검진', description: '연 1회 종합 건강검진' },
    { title: '우수사원 포상', description: '분기/연간 우수사원 포상' },
  ];

  const events = [
    {
      title: '신년회',
      date: '매년 1월',
      description: '새해 다짐과 함께하는 전직원 신년회',
    },
    {
      title: '봄 워크숍',
      date: '매년 4월',
      description: '팀워크 강화를 위한 야외 워크숍',
    },
    {
      title: '창립기념일',
      date: '매년 3월',
      description: '회사 창립을 기념하는 특별 행사',
    },
    {
      title: '연말 송년회',
      date: '매년 12월',
      description: '한 해를 마무리하는 송년의 밤',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-primary to-accent flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">사내 문화</h1>
          <p className="text-xl opacity-90">함께 일하고 싶은 회사, 에이스유통</p>
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
            <span className="text-primary font-medium">사내 문화</span>
          </div>
        </div>
      </div>

      {/* Company Culture */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">에이스유통의 문화</h2>
            <p className="text-lg text-text-secondary">사람 중심의 기업 문화를 만들어갑니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureItems.map((item, index) => (
              <div
                key={index}
                className="bg-beige-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all group"
              >
                <div className="text-primary mb-6 flex justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{item.title}</h3>
                <p className="text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-beige-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">복리후생</h2>
            <p className="text-lg text-text-secondary">직원들의 행복한 삶을 지원합니다</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-text-primary mb-1">{benefit.title}</h3>
                <p className="text-sm text-text-secondary">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">주요 행사</h2>
            <p className="text-lg text-text-secondary">함께 만들어가는 특별한 순간들</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 text-center"
              >
                <span className="inline-block bg-primary text-white text-sm px-4 py-1 rounded-full mb-4">
                  {event.date}
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-2">{event.title}</h3>
                <p className="text-text-secondary">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">사내 갤러리</h2>
            <p className="text-text-secondary">에이스유통의 일상을 담은 순간들</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center"
              >
                <svg className="w-12 h-12 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-20 bg-secondary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">함께할 동료를 찾습니다</h2>
          <p className="text-xl opacity-80 mb-8">
            에이스유통과 함께 성장할 열정 있는 인재를 기다립니다
          </p>
          <Link
            href="/support/contact"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full transition-colors text-lg font-medium"
          >
            채용 문의하기
          </Link>
        </div>
      </section>
    </main>
  );
}
