import { Header, Footer, PageHero } from '@/components/layout';

const cultureItems = [
  {
    title: '창립멤버 포상',
    desc: '창립멤버 4인에게 1천만원의 포상금 수여 (총 4천만원), 10년 이상 근속자 금 10돈 지급',
    year: '2020년'
  },
  {
    title: '인재양성 교육비 지원',
    desc: '대학원 등록금 전액 지원 (한양대 경영학과정 2명 지원 중), 유통전문관리사 교육비 전액 지원',
    year: '진행중'
  },
  {
    title: '직무역량 강화',
    desc: '감정노동관리사 교육 전직원 수료, 지게차 자격증 교육비 지원, 직무 관련 자격증 취득 전액 지원',
    year: '진행중'
  },
  {
    title: '마라톤동아리 운영',
    desc: '직원 자발적 참여 단체 마라톤 참가, 참가 직원 전원 나이키 러닝화 제공',
    year: '2023년~'
  },
];

const benefits = [
  { title: '4대 보험', desc: '국민연금, 건강보험, 고용보험, 산재보험 완비' },
  { title: '퇴직금', desc: '근속 1년 이상 퇴직금 지급' },
  { title: '명절 상여', desc: '설, 추석 명절 상여금 지급' },
  { title: '경조사 지원', desc: '경조금 및 경조휴가 제공' },
  { title: '교육비 전액 지원', desc: '대학원, 자격증 등 교육비 전액 지원' },
  { title: '식대 지원', desc: '중식 및 석식 식대 지원' },
  { title: '건강검진', desc: '연 1회 종합 건강검진' },
  { title: '장기근속 포상', desc: '10년 근속자 금 지급' },
];

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

export default function InternalCulturePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="CULTURE"
          title="사내 문화"
          subtitle="함께 일하고 싶은 회사, 에이스유통"
          breadcrumb={[
            { name: 'ACE 스토리', href: '/culture/internal' },
            { name: '사내 문화' }
          ]}
        />

        {/* Company Culture */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">OUR CULTURE</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">에이스유통의 문화</h2>
              <p className="text-sm sm:text-base text-[#6B5D53]">사람 중심의 기업 문화를 만들어갑니다</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {cultureItems.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        <h3 className="text-base sm:text-xl font-bold text-[#4A4039] group-hover:text-[#B8956A] transition-colors">{item.title}</h3>
                        <span className="text-[10px] sm:text-xs font-medium text-[#B8956A] bg-[#B8956A]/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">{item.year}</span>
                      </div>
                      <p className="text-[#6B5D53] text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 sm:py-20 bg-[#FAF6F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">BENEFITS</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">복리후생</h2>
              <p className="text-sm sm:text-base text-[#6B5D53]">직원들의 행복한 삶을 지원합니다</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-6 text-center border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#B8956A]/10 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#4A4039] mb-0.5 sm:mb-1">{benefit.title}</h3>
                  <p className="text-xs sm:text-sm text-[#6B5D53]">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CSR Activities - 사회 공헌 */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">CSR</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">사회 공헌</h2>
              <p className="text-sm sm:text-base text-[#6B5D53]">나눔으로 함께하는 에이스유통</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
              {csrActivities.map((activity, index) => (
                <div key={index} className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-[#4A4039] mb-2 sm:mb-3">{activity.title}</h3>
                  <p className="text-xs sm:text-base text-[#6B5D53] mb-3 sm:mb-4">{activity.desc}</p>
                  <span className="inline-block bg-[#B8956A]/10 text-[#B8956A] font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                    {activity.stats}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation History */}
        <section className="py-12 sm:py-20 bg-[#FAF6F1]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">DONATIONS</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">기부 현황</h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {donationHistory.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl border border-[#E8DCC8]">
                  <span className="inline-block bg-[#B8956A] text-white text-base sm:text-xl font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg w-fit">
                    {item.year}
                  </span>
                  <p className="flex-grow text-sm sm:text-base text-[#6B5D53]">{item.desc}</p>
                  <span className="text-xl sm:text-2xl font-bold text-[#B8956A]">{item.amount}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 p-5 sm:p-8 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-xl sm:rounded-2xl text-white text-center">
              <p className="text-sm sm:text-lg text-white/80 mb-1 sm:mb-2">누적 기부 총액</p>
              <p className="text-2xl sm:text-4xl font-bold">3,600만원+</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
