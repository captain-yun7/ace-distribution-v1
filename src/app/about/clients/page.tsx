'use client';

import { Header, Footer, PageHero } from '@/components/layout';

const majorClients = [
  {
    name: '스파필드 팥고당',
    description: '프리미엄 팥 디저트 전문점',
    locations: '하남, 고양 외 8개 지점',
    category: '베이커리/디저트',
  },
  {
    name: '롯데백화점 한나식빵',
    description: '백화점 입점 프리미엄 식빵 브랜드',
    locations: '롯데백화점 외 20여개 지점',
    category: '베이커리',
  },
  {
    name: '더베이크',
    description: '지하철 역사 내 베이커리',
    locations: '17여개 지점',
    category: '프랜차이즈',
  },
  {
    name: '곤트란쉐리에',
    description: '프렌치 베이커리 전문점',
    locations: '30여개 지점',
    category: '프랜차이즈',
  },
];

const clientStats = [
  { number: '420+', label: '전국 거래처', desc: '개인제과 포함' },
  { number: '15년', label: '파트너십 경험', desc: '2010년 설립 이래' },
  { number: '20대', label: '전용 배송차량', desc: '전국 배송망' },
  { number: '당일', label: '수도권 배송', desc: '익일 전국 배송' },
];

export default function ClientsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="OUR CLIENTS"
          title="주요 고객사"
          subtitle="에이스유통과 함께하는 파트너사"
          breadcrumb={[
            { name: '회사 소개', href: '/about/intro' },
            { name: '주요 고객사' }
          ]}
        />

        {/* Stats Section */}
        <section className="py-16 bg-white border-b border-[#E8DCC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {clientStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-black text-[#B8956A] mb-2">{stat.number}</div>
                  <div className="text-lg font-bold text-[#4A4039] mb-1">{stat.label}</div>
                  <div className="text-sm text-[#6B5D53]">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Introduction */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">PARTNERSHIP</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-6">신뢰를 바탕으로 한 파트너십</h2>
              <p className="text-[#6B5D53] max-w-3xl mx-auto leading-relaxed">
                에이스유통은 국내 대·중·소상공인을 고객으로 다양한 베이커리 및 카페 원부자재를 공급하고 있습니다.
                국내 베이커리/카페 시장을 선도하는 식품 기업들과 기업 초기 설립시부터 함께 해온 파트너십을 유지하고 있습니다.
              </p>
            </div>

            {/* Major Clients Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {majorClients.map((client, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl p-8 border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-[#B8956A]/10 text-[#B8956A] text-xs font-bold rounded-full mb-3">
                        {client.category}
                      </span>
                      <h3 className="text-xl font-bold text-[#4A4039] mb-2 group-hover:text-[#B8956A] transition-colors">
                        {client.name}
                      </h3>
                      <p className="text-[#6B5D53] mb-2">{client.description}</p>
                      <p className="text-sm text-[#B8956A] font-medium">{client.locations}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-[#4A4039] to-[#6B5D53] rounded-3xl p-10 lg:p-16 text-white text-center">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">그 외 기타 개인제과</h3>
              <p className="text-white/80 text-lg mb-8">
                전국 420여개 이상 거래처 보유 및 관리
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
                  <span className="text-[#D4A574] font-bold">프랜차이즈</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
                  <span className="text-[#D4A574] font-bold">개인 베이커리</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
                  <span className="text-[#D4A574] font-bold">카페</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
                  <span className="text-[#D4A574] font-bold">호텔/리조트</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-[#FAF6F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">WHY ACE</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-6">고객사가 에이스를 선택하는 이유</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: '품질 보증',
                  desc: 'HACCP 협력업체 인증, 콜드체인 시스템으로 신선한 제품 공급',
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: '가격 경쟁력',
                  desc: '해외 직수입 및 대량구매로 인한 구매원가 절감',
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  ),
                  title: '신속 배송',
                  desc: '20대 전용 배송차량으로 정해진 배송날짜 外 어느때라도 배송 가능',
                },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#B8956A]/10 to-[#D4A574]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#B8956A] group-hover:from-[#B8956A] group-hover:to-[#D4A574] group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#4A4039] mb-3">{item.title}</h3>
                  <p className="text-[#6B5D53]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              에이스유통과 함께하세요
            </h2>
            <p className="text-xl text-white/80 mb-8">
              15년 전통의 신뢰와 전문성으로 귀사의 성공을 지원합니다
            </p>
            <a
              href="/support/contact"
              className="inline-flex items-center gap-2 bg-white text-[#4A4039] px-8 py-4 rounded-xl font-bold hover:bg-[#FAF6F1] transition-colors"
            >
              거래 문의하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
