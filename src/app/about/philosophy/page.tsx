'use client';

import Link from 'next/link';

export default function PhilosophyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-primary to-secondary-dark flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">경영철학</h1>
          <p className="text-xl opacity-90">에이스유통의 비전과 미션</p>
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
            <span className="text-primary font-medium">경영철학</span>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">VISION & MISSION</h2>
            <p className="text-lg text-text-secondary">에이스유통이 추구하는 가치와 목표</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-10 text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-primary mb-4">VISION</h3>
              <p className="text-2xl font-semibold text-text-primary mb-4">
                &quot;고객과 함께 성장하는<br />신뢰의 유통 파트너&quot;
              </p>
              <p className="text-text-secondary leading-relaxed">
                에이스유통은 단순한 제품 공급을 넘어, 고객의 성공이 곧 우리의 성공이라는 신념으로
                함께 성장하는 파트너십을 추구합니다.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-3xl p-10 text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-secondary mb-4">MISSION</h3>
              <p className="text-2xl font-semibold text-text-primary mb-4">
                &quot;최고의 품질과 서비스로<br />식품 유통의 새로운 기준을 제시&quot;
              </p>
              <p className="text-text-secondary leading-relaxed">
                철저한 품질 관리와 신속한 배송 시스템으로 고객에게 최상의 가치를 전달하며,
                식품 유통 업계의 모범이 되겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-beige-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">핵심 가치</h2>
            <p className="text-lg text-text-secondary">에이스유통을 이끄는 4가지 핵심 가치</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: '신뢰',
                subtitle: 'TRUST',
                description: '정직한 거래와 약속 이행으로 쌓아온 15년의 신뢰',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: '품질',
                subtitle: 'QUALITY',
                description: '엄격한 품질 관리로 최상의 제품만을 공급',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
              },
              {
                title: '혁신',
                subtitle: 'INNOVATION',
                description: '변화하는 시장에 맞춘 지속적인 시스템 혁신',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                title: '상생',
                subtitle: 'WIN-WIN',
                description: '고객, 협력사와 함께 성장하는 상생의 파트너십',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-1">{value.title}</h3>
                <p className="text-sm text-primary font-medium mb-3">{value.subtitle}</p>
                <p className="text-text-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-beige-200 to-beige-100 rounded-3xl p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-2">CEO 인사말</h2>
              <p className="text-primary font-medium">대표이사 안종일</p>
            </div>

            <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
              <p>
                안녕하세요, 에이스유통 대표 안종일입니다.
              </p>
              <p>
                저희 에이스유통은 2010년 창업 이래, &apos;품질 우선&apos;과 &apos;고객 만족&apos;을 경영의 핵심 가치로 삼아
                대한민국 식품 유통의 발전에 기여해 왔습니다. 15년간 쌓아온 노하우와 신뢰를 바탕으로,
                앞으로도 고객 여러분께 더 나은 서비스와 제품을 제공하기 위해 끊임없이 노력하겠습니다.
              </p>
              <p>
                에이스유통은 단순한 유통 기업을 넘어, 고객의 성공을 함께 만들어가는
                진정한 파트너가 되겠습니다.
              </p>
              <p className="font-semibold text-text-primary">
                감사합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Management Principles */}
      <section className="py-20 bg-secondary-dark text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">경영 원칙</h2>
            <p className="text-lg opacity-80">지속 가능한 성장을 위한 에이스유통의 경영 원칙</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: '고객 중심 경영',
                description: '고객의 목소리에 귀 기울이고, 고객의 성공이 곧 우리의 성공임을 명심합니다.',
              },
              {
                number: '02',
                title: '정직과 투명성',
                description: '모든 거래에서 정직함을 유지하고, 투명한 경영으로 신뢰를 쌓아갑니다.',
              },
              {
                number: '03',
                title: '지속적인 혁신',
                description: '변화를 두려워하지 않고, 끊임없는 혁신으로 더 나은 서비스를 제공합니다.',
              },
            ].map((principle, index) => (
              <div key={index} className="border border-white/20 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                <span className="text-5xl font-bold text-primary-light opacity-50">{principle.number}</span>
                <h3 className="text-2xl font-bold mt-4 mb-3">{principle.title}</h3>
                <p className="opacity-80">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
