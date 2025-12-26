'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import Image from 'next/image';
import { useCompanyCulture } from '@/hooks/company';

export default function InternalCulturePage() {
  // Fetch DB data
  const { culture: dbCultureItems } = useCompanyCulture('CULTURE');
  const { culture: dbBenefits } = useCompanyCulture('BENEFIT');
  const { culture: dbCsrActivities } = useCompanyCulture('CSR');

  // Icon mappings
  const cultureIconMap: Record<string, string> = {
    '창립멤버 포상': 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    '인재양성 교육비 지원': 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
    '직무역량 강화': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    '마라톤동아리 운영': 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
  };

  const benefitIconMap: Record<string, string> = {
    '4대 보험': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    '퇴직금': 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
    '명절 상여': 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
    '경조사 지원': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    '교육비 전액 지원': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    '식대 지원': 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    '건강검진': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    '장기근속 포상': 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  };

  const csrIconMap: Record<string, string> = {
    '취약계층 제빵재료 지원': 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11',
    '지역아동센터 후원': 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    '지역 상생': 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11',
  };

  // Fallback data
  const cultureItems = dbCultureItems.length > 0
    ? dbCultureItems.map(item => ({ ...item, icon: cultureIconMap[item.title] || 'M5 13l4 4L19 7' }))
    : [
    {
      title: '창립멤버 포상',
      desc: '창립멤버 4인에게 1천만원의 포상금 수여 (총 4천만원), 10년 이상 근속자 금 10돈 지급',
      year: '2020년',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
    },
    {
      title: '인재양성 교육비 지원',
      desc: '대학원 등록금 전액 지원 (한양대 경영학과정 2명 지원 중), 유통전문관리사 교육비 전액 지원',
      year: '진행중',
      icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
    },
    {
      title: '직무역량 강화',
      desc: '감정노동관리사 교육 전직원 수료, 지게차 자격증 교육비 지원, 직무 관련 자격증 취득 전액 지원',
      year: '진행중',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
    },
    {
      title: '마라톤동아리 운영',
      desc: '직원 자발적 참여 단체 마라톤 참가, 참가 직원 전원 나이키 러닝화 제공',
      year: '2023년~',
      icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
    },
  ];

  const benefits = dbBenefits.length > 0
    ? dbBenefits.map(item => ({ ...item, icon: benefitIconMap[item.title] || 'M5 13l4 4L19 7' }))
    : [
    { title: '4대 보험', desc: '국민연금, 건강보험, 고용보험, 산재보험 완비', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { title: '퇴직금', desc: '근속 1년 이상 퇴직금 지급', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
    { title: '명절 상여', desc: '설, 추석 명절 상여금 지급', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7' },
    { title: '경조사 지원', desc: '경조금 및 경조휴가 제공', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { title: '교육비 전액 지원', desc: '대학원, 자격증 등 교육비 전액 지원', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { title: '식대 지원', desc: '중식 및 석식 식대 지원', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { title: '건강검진', desc: '연 1회 종합 건강검진', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { title: '장기근속 포상', desc: '10년 근속자 금 지급', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  ];

  const csrActivities = dbCsrActivities.length > 0
    ? dbCsrActivities.map(item => ({ ...item, icon: csrIconMap[item.title] || 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' }))
    : [
    { title: '취약계층 제빵재료 지원', desc: '취약계층 및 소상공인에게 제빵재료를 지원하여 자립을 돕고 있습니다.', icon: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11' },
    { title: '지역아동센터 후원', desc: '지역 아동센터에 빵과 간식 재료를 정기적으로 후원합니다.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { title: '지역 상생', desc: '지역 베이커리 및 소상공인과의 협력을 통해 지역 경제 활성화에 기여', icon: 'M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11' },
  ];

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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon || 'M5 13l4 4L19 7'} />
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

            {/* 창립멤버 포상 사진 */}
            <div className="mt-10 sm:mt-16">
              <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-[#E8DCC8] overflow-hidden">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-[#4A4039] mb-2">창립멤버 포상 현장</h3>
                  <p className="text-sm sm:text-base text-[#6B5D53]">2020년 창립멤버 4인에게 각 1천만원의 포상금을 수여했습니다</p>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-full max-w-2xl aspect-[16/9] rounded-lg sm:rounded-xl overflow-hidden">
                    <Image
                      src="/images/posang.png"
                      alt="창립멤버 포상 - 에이스유통 직원들이 포상금을 수여받는 모습"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 672px"
                    />
                  </div>
                </div>
              </div>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon || 'M5 13l4 4L19 7'} />
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={activity.icon || 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'} />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-[#4A4039] mb-2 sm:mb-3">{activity.title}</h3>
                  <p className="text-xs sm:text-base text-[#6B5D53] mb-3 sm:mb-4">{activity.desc}</p>
                  {activity.year && (
                    <span className="inline-block bg-[#B8956A]/10 text-[#B8956A] font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                      {activity.year}
                    </span>
                  )}
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

            {/* 후원 증서 */}
            <div className="mt-8 sm:mt-12">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-[#E8DCC8] overflow-hidden">
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-[#4A4039] mb-2">희망브릿지 후원 증서</h3>
                  <p className="text-sm sm:text-base text-[#6B5D53]">사회 공헌 활동의 일환으로 희망브릿지에 정기 후원하고 있습니다</p>
                </div>
                <div className="flex justify-center">
                  <div className="relative w-full max-w-xs aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden shadow-lg border border-[#E8DCC8]">
                    <Image
                      src="/images/patron.png"
                      alt="희망브릿지 후원 증서 - 에이스유통 기부 인증"
                      fill
                      className="object-contain bg-white"
                      sizes="(max-width: 768px) 280px, 320px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
