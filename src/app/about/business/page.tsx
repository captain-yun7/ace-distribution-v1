import { Header, Footer, PageHero } from '@/components/layout';

export default function BusinessPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="BUSINESS"
          title="사업장 소개"
          subtitle="물류 혁신을 통한 안정적인 공급망"
          breadcrumb={[
            { name: '회사 소개', href: '/about/intro' },
            { name: '사업장 소개' }
          ]}
        />

        {/* Logistics Center */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">LOGISTICS CENTER</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">자체 물류센터 보유</h2>
              <p className="text-[#6B5D53] max-w-2xl mx-auto">
                520평 면적의 자체 물류센터와 SCM 효율화를 통해 최적의 공급망을 운영합니다
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-3xl p-8 lg:p-10 border border-[#E8DCC8]">
                <h3 className="text-xl font-bold text-[#4A4039] mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  물류 혁신 성과
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#B8956A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#4A4039] mb-1">배송 준비시간 75% 단축</p>
                      <p className="text-sm text-[#6B5D53]">주문발주 및 피킹 상차 프로세스 병목현상 해결로 4일 → 1일로 단축</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#B8956A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#4A4039] mb-1">ERP/IT 기반 물류 시스템</p>
                      <p className="text-sm text-[#6B5D53]">고객 만족도 증가 및 물류 경쟁력 강화</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#B8956A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#4A4039] mb-1">터미닉스 해충방제 시스템</p>
                      <p className="text-sm text-[#6B5D53]">청결하고 쾌적한 창고 유지</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: '저온창고 운영', desc: '저온창고와 해충방제 시스템을 통한 양질의 제품 공급 최우선', icon: (
                    <svg className="w-8 h-8 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  )},
                  { title: '권역별 배송 시스템', desc: '서울/경기/춘천/강원 권역별 맞춤 배송 서비스', icon: (
                    <svg className="w-8 h-8 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )},
                  { title: '전 상품 공급 시스템', desc: '국내 제조 모든 상품과 수입 베이커리 부자재 공급 가능', icon: (
                    <svg className="w-8 h-8 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )},
                  { title: '유연한 배송 시스템', desc: '정해진 배송날짜 외 필요 시 어느때라도 배송 가능', icon: (
                    <svg className="w-8 h-8 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  )},
                ].map((item, index) => (
                  <div key={index} className="bg-white border-2 border-[#E8DCC8] rounded-2xl p-6 hover:border-[#B8956A]/50 hover:shadow-lg transition-all duration-300 group">
                    <div className="mb-3">{item.icon}</div>
                    <h4 className="font-bold text-[#4A4039] mb-2 group-hover:text-[#B8956A] transition-colors">{item.title}</h4>
                    <p className="text-sm text-[#6B5D53]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ace Bakery Brand */}
        <section className="py-20 bg-[#FAF6F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#B8956A] to-[#D4A574] rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full"></div>

              <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-sm font-medium text-white/80 tracking-[0.3em] uppercase mb-4 block">OUR BRAND</span>
                  <h3 className="text-3xl font-bold mb-6">에이스제빵소</h3>
                  <p className="text-white/90 leading-relaxed mb-4">
                    &apos;에이스제빵소&apos;는 에이스유통의 베이커리 전문성을 대표하는 공식 브랜드로,
                    2019년 상표 등록을 통해 품질 보증과 브랜드 신뢰성을 확보했습니다.
                  </p>
                  <p className="text-white/90 leading-relaxed">
                    해당 마크는 에이스유통의 기준을 충족한 제품에만 사용되며,
                    고객에게 안정적인 품질과 차별화된 가치를 제공합니다.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <div className="text-center">
                      <span className="text-4xl font-black text-[#B8956A]">ACE</span>
                      <p className="text-[#4A4039] font-bold text-sm mt-1">제빵소</p>
                      <p className="text-[#6B5D53] text-xs">Since 2019</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Network */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">DELIVERY NETWORK</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">전국 유통망</h2>
              <p className="text-[#6B5D53] max-w-3xl mx-auto">
                배송차량 20대 규모의 전문 배송차량과 자체 물류센터를 기반으로
                카페·베이커리 원재료를 전국 어디든 안정적으로 공급할 수 있는 국내 소수의 전문 기업입니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                { value: '20대', label: '배송차량 보유' },
                { value: '520평', label: '물류센터 면적' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-8 bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl border border-[#E8DCC8]">
                  <div className="text-4xl lg:text-5xl font-bold text-[#B8956A] mb-2">{stat.value}</div>
                  <p className="text-[#4A4039] font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Coverage Map */}
            <div className="bg-gradient-to-br from-[#FAF6F1] to-white border-2 border-[#E8DCC8] rounded-3xl p-8">
              <h4 className="text-xl font-bold text-[#4A4039] mb-8 text-center">주요 배송 권역</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['서울', '경기', '춘천', '강원'].map((city, index) => (
                  <div key={index} className="text-center p-6 bg-white rounded-xl border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-lg transition-all duration-300 group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="font-bold text-[#4A4039] text-lg">{city}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Advantages */}
        <section className="py-20 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#D4A574] tracking-[0.3em] uppercase mb-4 block">COMPETITIVE ADVANTAGES</span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">에이스유통의 경쟁력</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: '정교한 콜드체인 운영',
                  desc: '신선도 유지를 위한 철저한 온도관리',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  )
                },
                {
                  title: '직영 배송 체계',
                  desc: '자체 배송 차량으로 신속하고 안정적인 배송',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )
                },
                {
                  title: '전국 단위 커버리지',
                  desc: '지역에 관계없이 신선한 원재료 공급',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-6 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-white/70">{item.desc}</p>
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
