import { Header, Footer, PageHero } from '@/components/layout';

export default function PhilosophyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="PHILOSOPHY"
          title="경영철학"
          subtitle="에이스유통의 비전과 미션"
          breadcrumb={[
            { name: '회사 소개', href: '/about/intro' },
            { name: '경영철학' }
          ]}
        />

        {/* Vision & Mission */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">VISION & MISSION</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">에이스유통이 추구하는 가치</h2>
              <p className="text-[#6B5D53] max-w-2xl mx-auto">
                고객과 함께 성장하며 식품 유통의 새로운 기준을 제시합니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Vision */}
              <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-3xl p-8 lg:p-12 border border-[#E8DCC8] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#B8956A]/10 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-[#B8956A] tracking-widest">VISION</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#4A4039] mt-2 mb-4">
                    고객·상품·임직원이<br />함께 성장하는 기업
                  </h3>
                  <p className="text-[#6B5D53] leading-relaxed">
                    고객 만족을 통해 새로운 가치를 만들고, 그 성과를 바탕으로 임직원이 행복하게 일할 수 있는
                    기업 문화를 구축하며, 지속 가능한 F&B 생태계를 선도하는 국내 대표 F&B 유통 솔루션 기업을 지향합니다.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="bg-gradient-to-br from-[#4A4039] to-[#6B5D53] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-[#D4A574] tracking-widest">MISSION</span>
                  <h3 className="text-2xl lg:text-3xl font-bold mt-2 mb-4">
                    좋은 상품을 정확하게,<br />정직하게 전달
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    고객에게 신뢰할 수 있는 가치를 제공합니다. 에이스유통은 편리하고 유용한 제품을 안정적으로 공급함으로써
                    고객의 성장과 일상의 품질 향상에 기여합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-[#FAF6F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">CORE VALUES</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">핵심 가치</h2>
              <p className="text-[#6B5D53]">에이스유통을 이끄는 4가지 핵심 가치</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: '고객 만족',
                  subtitle: 'CUSTOMER',
                  description: '고객의 성공이 곧 우리의 성공, 고객 만족을 최우선으로',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: '신뢰',
                  subtitle: 'TRUST',
                  description: '정직한 거래와 약속 이행으로 쌓아온 15년의 신뢰',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
                {
                  title: '품질',
                  subtitle: 'QUALITY',
                  description: '엄격한 품질 관리로 최상의 제품만을 공급',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ),
                },
                {
                  title: '성장',
                  subtitle: 'GROWTH',
                  description: '고객과 함께 성장하는 지속 가능한 파트너십',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                },
              ].map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center border border-[#E8DCC8] hover:shadow-xl hover:border-[#B8956A]/30 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#B8956A]/10 to-[#D4A574]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#B8956A] group-hover:from-[#B8956A] group-hover:to-[#D4A574] group-hover:text-white transition-all duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#4A4039] mb-1">{value.title}</h3>
                  <p className="text-sm text-[#B8956A] font-medium mb-3">{value.subtitle}</p>
                  <p className="text-[#6B5D53]">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CEO Message */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-3xl p-8 lg:p-12 border border-[#E8DCC8] relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#B8956A]/5 to-transparent rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-[#D4A574]/5 to-transparent rounded-full"></div>

              <div className="relative">
                <div className="text-center mb-10">
                  <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">CEO MESSAGE</span>
                  <h2 className="text-3xl font-bold text-[#4A4039] mb-2">인사말</h2>
                  <p className="text-[#B8956A] font-medium">대표이사 안종일</p>
                </div>

                <div className="flex items-start gap-4 mb-8">
                  <svg className="w-12 h-12 text-[#B8956A]/30 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <div className="space-y-6 text-[#6B5D53] leading-relaxed text-lg">
                    <p>
                      안녕하세요, 에이스유통 대표 안종일입니다.
                    </p>
                    <p>
                      저희 에이스유통은 2010년 창업 이래, <span className="text-[#B8956A] font-semibold">&apos;품질 우선&apos;</span>과 <span className="text-[#B8956A] font-semibold">&apos;고객 만족&apos;</span>을 경영의 핵심 가치로 삼아
                      대한민국 식품 유통의 발전에 기여해 왔습니다. 15년간 쌓아온 노하우와 신뢰를 바탕으로,
                      앞으로도 고객 여러분께 더 나은 서비스와 제품을 제공하기 위해 끊임없이 노력하겠습니다.
                    </p>
                    <p>
                      에이스유통은 단순한 유통 기업을 넘어, 고객의 성공을 함께 만들어가는
                      진정한 파트너가 되겠습니다.
                    </p>
                    <p className="font-semibold text-[#4A4039]">
                      감사합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Management Principles */}
        <section className="py-20 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#D4A574] tracking-[0.3em] uppercase mb-4 block">MANAGEMENT PRINCIPLES</span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">경영 원칙</h2>
              <p className="text-white/70">지속 가능한 성장을 위한 에이스유통의 경영 원칙</p>
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
                <div key={index} className="border border-white/20 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group">
                  <span className="text-6xl font-bold text-[#D4A574]/30 group-hover:text-[#D4A574]/50 transition-colors">{principle.number}</span>
                  <h3 className="text-2xl font-bold mt-4 mb-3">{principle.title}</h3>
                  <p className="text-white/70">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
