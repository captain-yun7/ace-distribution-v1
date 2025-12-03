import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';

const partnershipTypes = [
  { title: '제조사 파트너십', desc: '국내외 유수 식품 제조사들과의 직접 거래를 통해 품질 좋은 제품을 합리적인 가격에 공급합니다.', partners: ['삼립식품', 'CJ제일제당', '오뚜기', '풀무원'] },
  { title: '물류 파트너십', desc: '전문 물류 업체들과의 협력을 통해 전국 어디든 신속하고 안전한 배송을 실현합니다.', partners: ['CJ대한통운', '한진택배'] },
  { title: '거래처 파트너십', desc: '전국 500여 개 거래처와의 상생 파트너십으로 서로의 성공을 함께 만들어갑니다.', partners: ['카페/베이커리', '호텔/리조트', '급식업체'] },
];

const caseStudies = [
  { title: '프랜차이즈 카페 A사', category: '카페/베이커리', challenge: '다양한 베이커리 메뉴 운영 필요', solution: '고품질 냉동 베이커리 공급 및 메뉴 컨설팅', result: '베이커리 매출 40% 증가' },
  { title: '호텔 B사', category: '호텔/리조트', challenge: '조식 뷔페용 빵 품질 일관성 유지', solution: '호텔 전용 프리미엄 빵 라인업 개발', result: '고객 만족도 향상, 재구매율 95%' },
  { title: '편의점 C사', category: '유통/편의점', challenge: '전국 매장 물류 효율성 관리', solution: '콜드체인 기반 전국 배송 시스템 구축', result: '배송 시간 30% 단축' },
];

export default function PartnershipPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="PARTNERSHIP"
          title="협력 사례"
          subtitle="함께 성장하는 상생의 파트너십"
          breadcrumb={[
            { name: '기업 문화', href: '/culture/internal' },
            { name: '협력 사례' }
          ]}
        />

        {/* Partnership Types */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">PARTNERS</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">파트너십 유형</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {partnershipTypes.map((type, index) => (
                <div key={index} className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl p-8 border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#4A4039] mb-3">{type.title}</h3>
                  <p className="text-[#6B5D53] mb-6">{type.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {type.partners.map((partner, i) => (
                      <span key={i} className="bg-[#B8956A]/10 text-[#B8956A] text-sm px-3 py-1 rounded-full">
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
        <section className="py-16 bg-gradient-to-br from-[#B8956A] to-[#D4A574] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '500+', label: '협력 거래처' },
                { number: '15년', label: '파트너십 경험' },
                { number: '98%', label: '재계약률' },
                { number: '24시간', label: '고객 지원' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 bg-[#FAF6F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">CASE STUDIES</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">성공 사례</h2>
            </div>

            <div className="space-y-6">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-[#E8DCC8] hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                      <span className="inline-block bg-[#B8956A]/10 text-[#B8956A] text-sm px-3 py-1 rounded-full mb-2">
                        {study.category}
                      </span>
                      <h3 className="text-2xl font-bold text-[#4A4039]">{study.title}</h3>
                    </div>
                    <div className="md:w-3/4 grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-bold text-[#4A4039] mb-2 flex items-center gap-2">
                          <span className="w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xs">!</span>
                          과제
                        </h4>
                        <p className="text-[#6B5D53] text-sm">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#4A4039] mb-2 flex items-center gap-2">
                          <span className="w-6 h-6 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-xs">→</span>
                          솔루션
                        </h4>
                        <p className="text-[#6B5D53] text-sm">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#4A4039] mb-2 flex items-center gap-2">
                          <span className="w-6 h-6 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                          성과
                        </h4>
                        <p className="text-[#6B5D53] text-sm">{study.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">파트너가 되어주세요</h2>
            <p className="text-xl text-white/80 mb-8">
              에이스유통과 함께 성장할 파트너를 기다립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#4A4039] px-8 py-4 rounded-xl font-bold hover:bg-[#FAF6F1] transition-colors"
              >
                파트너십 문의하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/support/faq"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors"
              >
                자주 묻는 질문
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
