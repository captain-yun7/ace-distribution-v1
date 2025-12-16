import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';

const csrActivities = [
  { title: '취약계층 제빵재료 지원', desc: '취약계층 및 소상공인에게 제빵재료를 지원하여 자립을 돕고 있습니다.', stats: '연간 지속 지원' },
  { title: '지역아동센터 후원', desc: '지역 아동센터에 빵과 간식 재료를 정기적으로 후원합니다.', stats: '월 1회 정기 후원' },
  { title: '지역 상생', desc: '지역 베이커리 및 소상공인과의 협력을 통해 지역 경제 활성화에 기여', stats: '지역 업체 상생 협력' },
];

const donationHistory = [
  { year: '2024', amount: '1,200만원', desc: '지역 아동센터 빵 기부, 무료 급식소 식품 지원' },
  { year: '2023', amount: '1,000만원', desc: '독거노인 명절 선물 세트, 지역 복지관 식품 기부' },
  { year: '2022', amount: '800만원', desc: '수해 지역 긴급 식품 지원, 아동 급식 후원' },
  { year: '2021', amount: '600만원', desc: '코로나 취약계층 식품 꾸러미 전달' },
];

export default function SocialPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="CSR"
          title="사회 공헌"
          subtitle="나눔으로 함께하는 에이스유통"
          breadcrumb={[
            { name: '기업 문화', href: '/culture/internal' },
            { name: '사회 공헌' }
          ]}
        />

        {/* CSR Philosophy */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">PHILOSOPHY</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-6">나눔 철학</h2>
            <p className="text-xl text-[#6B5D53] leading-relaxed">
              에이스유통은 &quot;함께 성장하는 기업&quot;이라는 가치 아래,
              기업의 이익을 사회와 나누고 지역 사회 발전에 기여하고자 합니다.
              작은 나눔이 모여 큰 변화를 만든다고 믿습니다.
            </p>
          </div>
        </section>

        {/* CSR Activities */}
        <section className="py-20 bg-[#FAF6F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">ACTIVITIES</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">주요 활동</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {csrActivities.map((activity, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#4A4039] mb-3">{activity.title}</h3>
                  <p className="text-[#6B5D53] mb-4">{activity.desc}</p>
                  <span className="inline-block bg-[#B8956A]/10 text-[#B8956A] font-semibold px-4 py-2 rounded-full">
                    {activity.stats}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation History */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">DONATIONS</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">기부 현황</h2>
            </div>

            <div className="space-y-4">
              {donationHistory.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-gradient-to-br from-[#FAF6F1] to-white rounded-xl border border-[#E8DCC8]">
                  <span className="inline-block bg-[#B8956A] text-white text-xl font-bold px-4 py-2 rounded-lg w-fit">
                    {item.year}
                  </span>
                  <p className="flex-grow text-[#6B5D53]">{item.desc}</p>
                  <span className="text-2xl font-bold text-[#B8956A]">{item.amount}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-8 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-2xl text-white text-center">
              <p className="text-lg text-white/80 mb-2">누적 기부 총액</p>
              <p className="text-4xl font-bold">3,600만원+</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">함께 나눠요</h2>
            <p className="text-xl text-white/80 mb-8">
              에이스유통의 사회 공헌 활동에 함께하고 싶으시다면 연락해주세요
            </p>
            <Link
              href="/support/contact"
              className="inline-flex items-center gap-2 bg-white text-[#4A4039] px-8 py-4 rounded-xl font-bold hover:bg-[#FAF6F1] transition-colors"
            >
              참여 문의하기
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
