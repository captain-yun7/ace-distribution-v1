import { Header, Footer, PageHero } from '@/components/layout';

const newsItems = [
  { title: '에이스유통, 2024 식품유통대상 수상', category: '수상', date: '2024.11.15', desc: '대한상공회의소 주관 2024 식품유통대상에서 우수기업상 수상', featured: true, image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=400&fit=crop' },
  { title: '친환경 포장재 도입으로 ESG 경영 강화', category: '경영', date: '2024.10.28', desc: '생분해성 포장재 도입과 탄소배출 저감 프로그램 시행', featured: true, image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop' },
  { title: '제2 물류센터 하남 확장 완료', category: '사업확장', date: '2024.09.20', desc: '하남시 천현동에 520평 규모 물류센터 확장 완료', featured: false, image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=400&fit=crop' },
  { title: '베이커리 원재료 유통 전문기업으로 성장', category: '언론보도', date: '2024.08.15', desc: '매일경제 인터뷰: 에이스유통 안종일 대표의 성장 스토리', featured: false, image: 'https://images.unsplash.com/photo-1486427944344-d2f90f9b0678?w=800&h=400&fit=crop' },
  { title: '신규 프리미엄 초콜릿 라인업 런칭', category: '신제품', date: '2024.07.10', desc: '유럽산 프리미엄 커버춰 초콜릿 5종 신규 런칭', featured: false, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&h=400&fit=crop' },
  { title: '상반기 거래처 만족도 조사 결과 발표', category: '고객만족', date: '2024.06.30', desc: '거래처 만족도 95% 달성, 배송 서비스 부문 최고점', featured: false, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop' },
];

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="MEDIA"
          title="언론보도"
          subtitle="에이스유통의 새로운 소식"
          breadcrumb={[
            { name: '콘텐츠 / 홍보', href: '/content/recipe' },
            { name: '언론보도' }
          ]}
        />

        {/* Featured News */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">FEATURED</span>
              <h2 className="text-3xl font-bold text-[#4A4039]">주요 소식</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {newsItems.filter(n => n.featured).map((news, index) => (
                <div key={index} className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-[2/1] relative overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-[#B8956A] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {news.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-[#6B5D53] mb-2">{news.date}</div>
                    <h3 className="text-xl font-bold text-[#4A4039] mb-3 group-hover:text-[#B8956A] transition-colors">{news.title}</h3>
                    <p className="text-[#6B5D53]">{news.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All News */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#4A4039] mb-8">전체 소식</h2>

            <div className="space-y-4">
              {newsItems.map((news, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-lg transition-all duration-300 group flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs bg-[#B8956A]/10 text-[#B8956A] px-3 py-1 rounded-full font-medium">
                        {news.category}
                      </span>
                      <span className="text-xs text-[#6B5D53]">{news.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#4A4039] group-hover:text-[#B8956A] transition-colors">{news.title}</h3>
                    <p className="text-sm text-[#6B5D53] mt-1">{news.desc}</p>
                  </div>
                  <svg className="w-6 h-6 text-[#B8956A] flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contact */}
        <section className="py-16 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">미디어 문의</h2>
            <p className="text-white/80 mb-8">
              취재, 인터뷰 등 미디어 관련 문의는 아래 연락처로 연락 주시기 바랍니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="flex items-center gap-3 justify-center">
                <svg className="w-5 h-5 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>ace32865@hanmail.net</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <svg className="w-5 h-5 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>02) 471-1644~6</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
