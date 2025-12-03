import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';

const trends = [
  { title: '2024 베이커리 트렌드: 건강과 지속가능성', category: '트렌드 분석', date: '2024.12', desc: '글루텐프리, 비건 베이커리의 성장과 친환경 포장재의 확산에 대한 심층 분석', tags: ['건강', '비건', '지속가능성'] },
  { title: '프리미엄 초콜릿 시장 동향', category: '시장 분석', date: '2024.11', desc: '싱글오리진 초콜릿과 빈투바 트렌드가 이끄는 프리미엄 시장의 변화', tags: ['초콜릿', '프리미엄', '싱글오리진'] },
  { title: '소비자가 원하는 베이커리 메뉴', category: '소비자 조사', date: '2024.10', desc: 'MZ세대가 선호하는 베이커리 메뉴와 구매 패턴 분석', tags: ['소비자', 'MZ세대', '트렌드'] },
  { title: '냉동생지 시장의 성장', category: '시장 분석', date: '2024.09', desc: '편의성과 품질을 모두 갖춘 냉동생지 시장의 급성장 배경', tags: ['냉동생지', '편의성', '시장분석'] },
];

export default function TrendPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="TREND REPORT"
          title="트렌드 리포트"
          subtitle="업계 최신 트렌드와 시장 분석"
          breadcrumb={[
            { name: '콘텐츠 / 홍보', href: '/content/recipe' },
            { name: '트렌드 리포트' }
          ]}
        />

        {/* Stats */}
        <section className="py-12 bg-white border-b border-[#E8DCC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '50+', label: '발행 리포트' },
                { value: '15년', label: '업계 경험' },
                { value: '월간', label: '발행 주기' },
                { value: '무료', label: '구독 비용' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-[#B8956A]">{stat.value}</div>
                  <div className="text-sm text-[#6B5D53] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trend Articles */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {trends.map((trend, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-[2/1] bg-gradient-to-br from-[#B8956A]/20 to-[#D4A574]/20 flex items-center justify-center relative">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="absolute top-4 left-4 bg-[#B8956A] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {trend.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-[#6B5D53] mb-2">{trend.date}</div>
                    <h3 className="text-xl font-bold text-[#4A4039] mb-3 group-hover:text-[#B8956A] transition-colors">{trend.title}</h3>
                    <p className="text-[#6B5D53] text-sm mb-4">{trend.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {trend.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-[#FAF6F1] text-[#6B5D53] px-3 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">맞춤형 트렌드 리포트가 필요하신가요?</h2>
            <p className="text-white/80 mb-8">에이스유통의 전문 컨설팅 서비스를 통해 귀사에 맞는 트렌드 분석을 받아보세요.</p>
            <Link
              href="/support/contact"
              className="inline-flex items-center gap-2 bg-white text-[#4A4039] px-6 py-3 rounded-xl font-bold hover:bg-[#FAF6F1] transition-colors"
            >
              상담 신청하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
