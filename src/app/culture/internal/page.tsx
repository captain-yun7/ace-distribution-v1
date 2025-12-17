import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';

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
            { name: '기업 문화', href: '/culture/internal' },
            { name: '사내 문화' }
          ]}
        />

        {/* Company Culture */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">OUR CULTURE</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">에이스유통의 문화</h2>
              <p className="text-[#6B5D53]">사람 중심의 기업 문화를 만들어갑니다</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {cultureItems.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl p-8 border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-[#4A4039] group-hover:text-[#B8956A] transition-colors">{item.title}</h3>
                        <span className="text-xs font-medium text-[#B8956A] bg-[#B8956A]/10 px-2 py-1 rounded-full">{item.year}</span>
                      </div>
                      <p className="text-[#6B5D53] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-[#FAF6F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">BENEFITS</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">복리후생</h2>
              <p className="text-[#6B5D53]">직원들의 행복한 삶을 지원합니다</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-[#B8956A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#4A4039] mb-1">{benefit.title}</h3>
                  <p className="text-sm text-[#6B5D53]">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-20 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">함께할 동료를 찾습니다</h2>
            <p className="text-xl text-white/80 mb-8">
              에이스유통과 함께 성장할 열정 있는 인재를 기다립니다
            </p>
            <Link
              href="/support/contact"
              className="inline-flex items-center gap-2 bg-white text-[#4A4039] px-8 py-4 rounded-xl font-bold hover:bg-[#FAF6F1] transition-colors"
            >
              채용 문의하기
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
