'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import { ClientsSection } from '@/components/sections';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  useCompanyTimeline,
  useCompanyCertificates,
  useCompanyCoreValues,
  useCompanyClients,
} from '@/hooks/company';

// 업력 자동 계산 함수
const calculateYearsInBusiness = () => {
  const foundingYear = 2010;
  const currentYear = new Date().getFullYear();
  return currentYear - foundingYear;
};

interface CompanyKPI {
  id: string;
  key: string;
  value: string;
  label: string;
}

export default function AboutIntroPage() {
  const yearsInBusiness = calculateYearsInBusiness();
  const [kpiData, setKpiData] = useState<CompanyKPI[]>([]);

  // Company DB data with hooks
  const { timeline: dbTimeline } = useCompanyTimeline();
  const { certificates: dbCertificates } = useCompanyCertificates();
  const { coreValues: dbCoreValues } = useCompanyCoreValues();
  const { clients: dbClients } = useCompanyClients();

  // Fallback data
  const timeline = dbTimeline.length > 0 ? dbTimeline : [
    { year: '2026', title: '신사옥 신축 및 이전 예정', desc: '하남시 감북동 소재 신사옥 신축 및 이전 예정' },
    { year: '2025', title: '중기부 장관 표창장 수상', desc: '중기부 장관 표창장 수상' },
    { year: '2025', title: '서울대 경영인상 수상', desc: '서울대 경영인상 수상' },
    { year: '2025', title: '하남시 의장 표창장 수상', desc: '하남시 의장 표창장 수상' },
    { year: '2025', title: '토이트론 전략적 신주인수 계약', desc: 'IP 굿즈 및 에듀 콘텐츠 전문기업 ㈜토이트론과 전략적 신주인수 계약체결' },
    { year: '2023', title: '일터혁신 사업장 선정', desc: '노사발전재단 일터혁신 사업장으로 선정' },
    { year: '2022', title: '하남 시장 표창장 수상', desc: '하남 시장 표창장 수상' },
    { year: '2021', title: '에이스제빵소 상표권 등록', desc: '에이스제빵소 브랜드 상표권 등록' },
    { year: '2020', title: '창립 10주년', desc: '에이스유통 창립 10주년 기념행사 개최' },
    { year: '2020', title: '특허 취득 및 차량 증차', desc: '제과제빵류 운반 및 보관용 냉장/냉동장치 특허 취득, 배송차량 20대 증차' },
    { year: '2019', title: '우수기술기업 인증', desc: '제과제빵 재료 유통물류 및 기술마케팅 부문 우수기술기업 인증 획득' },
    { year: '2019', title: '매출 200억 달성', desc: '베이커리 소상공인 무료 세미나 개최, 에이스제빵소 운영 시작' },
    { year: '2018', title: '기업인 협의회 인증', desc: '경기도 하남시 기업인 협의회 인증' },
    { year: '2017', title: '삼양사 감사패 수상', desc: '㈜삼양사 식자재유통사업부문 감사패 수상' },
    { year: '2016', title: '메인비즈 인증', desc: '중소기업청 메인비즈(경영혁신형 중소기업) 인증' },
    { year: '2015', title: '본사 사옥 신축 이전', desc: '경기도 하남시 천현동에 자체 물류센터 보유 사옥 신축' },
    { year: '2012', title: '매출 100억 달성', desc: '물류창고 확장 이전, 연매출 100억원 달성' },
    { year: '2010', title: '에이스유통㈜ 법인 설립', desc: '카페·베이커리 원재료 유통 사업 시작 (직원 5명)' },
  ];

  const certifications = dbCertificates.length > 0 ? dbCertificates : [
    { title: '특허증 (냉장/냉동 장치)', description: '제과제빵류 운반 및 보관용\n냉장/냉동장치 특허 (제 10-2445173호)', date: '2020년 취득', imageUrl: '/images/certificates/patent.jpg' },
    { title: '상표등록증 (에이스제빵소)', description: '에이스제빵소 브랜드 상표권 등록', date: '2021년 등록', imageUrl: '/images/certificates/trademark.png' },
    { title: '우수기술기업 인증서', description: '제과제빵 재료 유통물류 및\n기술마케팅 부문 기술력 인증', date: '2019년 취득', imageUrl: '/images/certificates/tech-company.png' },
    { title: '메인비즈 인증', description: '중소벤처기업부 경영혁신형 중소기업 인증', date: '2016년 취득', imageUrl: '/images/certificates/mainbiz.png' },
    { title: '일터혁신 사업장', description: '노사발전재단 일터혁신 사업장 선정\n직무 분석 및 평가체계 개선 추진', date: '2023년 선정', imageUrl: '/images/certificates/workplace-innovation.png' },
  ];

  const coreValues = dbCoreValues.length > 0 ? dbCoreValues : [
    { title: '고객 만족', subtitle: 'CUSTOMER', description: '고객의 성공이 곧 우리의 성공\n고객 만족을 최우선으로' },
    { title: '신뢰', subtitle: 'TRUST', description: '정직한 거래와 약속 이행으로\n쌓아온 16년의 신뢰' },
    { title: '품질', subtitle: 'QUALITY', description: '엄격한 품질 관리로\n최상의 제품만을 공급' },
    { title: '성장', subtitle: 'GROWTH', description: '고객과 함께 성장하는\n지속 가능한 파트너십' },
  ];

  // KPI 데이터 fetch (관리자 페이지에서 수정 가능)
  useEffect(() => {
    const fetchKPI = async () => {
      try {
        const res = await fetch('/api/company-kpi');
        if (res.ok) {
          const data = await res.json();
          setKpiData(data);
        }
      } catch (error) {
        console.error('KPI fetch error:', error);
      }
    };
    fetchKPI();
  }, []);

  // 기본 KPI 데이터 (DB에 없을 경우)
  const defaultKPI = {
    revenue: '245.7억원',
    employees: '35명',
    clients: '420+',
    deliveryVehicles: '20대',
    warehouseSize: '900평',
  };

  const getKPIValue = (key: string, defaultValue: string) => {
    const kpi = kpiData.find(k => k.key === key);
    return kpi ? kpi.value : defaultValue;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        badge="ABOUT US"
        title="기업 개요"
        subtitle="에이스유통을 소개합니다"
        breadcrumb={[
          { name: '기업 개요' }
        ]}
      />

      {/* Navigation Tabs */}
      <nav className="sticky top-20 lg:top-24 bg-white border-b border-[#E8DCC8] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {[
              { id: 'overview', label: '기업 소개' },
              { id: 'history', label: '기업 연혁' },
              { id: 'philosophy', label: '경영 철학' },
              { id: 'business', label: '사업 소개' },
              { id: 'location', label: '사업장 소개' },
              { id: 'family', label: '패밀리사 소개' },
              { id: 'certification', label: '인증 및 수상' },
            ].map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-[#6B5D53] hover:text-[#B8956A] whitespace-nowrap transition-colors"
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Section 1: 기업 개요 */}
      <section id="overview" className="py-12 sm:py-20 lg:py-32 scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Overview */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center mb-16 sm:mb-32">
            <div>
              <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">COMPANY OVERVIEW</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4 sm:mb-6 leading-tight">
                카페·베이커리 원재료 유통의<br />
                <span className="text-[#B8956A]">새로운 기준</span>을 만들어갑니다
              </h2>
              <div className="space-y-6 text-[#6B5D53] leading-relaxed">
                <p>
                  에이스유통주식회사는 카페·베이커리 산업을 위한<br className="hidden sm:block" />
                  프리미엄 원재료 공급, 전문 소싱, 콜드체인 물류,<br className="hidden sm:block" />
                  품질관리(QC)를 기반으로 성장해온
                  <strong className="text-[#4A4039]"> F&B B2B 솔루션 기업</strong>입니다.
                </p>
                <p>
                  2010년 설립 이후 자체 물류센터와<br className="hidden sm:block" />
                  체계적인 유통 인프라를 구축하며 국내 프랜차이즈,<br className="hidden sm:block" />
                  베이커리 카페, 전문 제과점 등 다양한 파트너에게<br className="hidden sm:block" />
                  신뢰성 높은 제품을 안정적으로 공급해왔습니다.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#FAF6F1] to-[#F5EFE7] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/company/business-location.png"
                  alt="에이스유통 물류센터"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Company Info Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-12 sm:mb-20">
            {[
              { label: '회사명', value: '에이스유통주식회사' },
              { label: '설립년도', value: '2010년' },
              { label: '대표이사', value: '안종일' },
            ].map((item, index) => (
              <div key={index} className="bg-white border-2 border-[#F5EFE7] rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center hover:border-[#B8956A]/30 hover:shadow-xl transition-all duration-300">
                <p className="text-xs sm:text-sm text-[#6B5D53] mb-1 sm:mb-2">{item.label}</p>
                <p className="text-sm sm:text-lg font-bold text-[#4A4039]">{item.value}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 2: 기업 연혁 */}
      <section id="history" className="py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-[#FAF6F1] to-white scroll-mt-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">HISTORY</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4 sm:mb-6">
              신뢰와 품질로 쌓아온 <span className="text-[#B8956A]">{yearsInBusiness}년의 역사</span>
            </h2>
          </div>

          {/* Timeline - 중앙 세로선 + 좌우 교차 배치 (Desktop) */}
          <div className="hidden md:block relative">
            {/* 중앙 세로선 */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#D4C4B0]"></div>

            <div className="relative">
              {[
                { year: '2026', items: ['에이스유통㈜ 신사옥 신축 및 이전 (하남시 감북동 소재)'], side: 'left' },
                { year: '2025', items: [
                  '중기부 장관 표창장 수상',
                  '서울대 경영인상 수상',
                  '하남시 의장 표창장 수상',
                  'IP 굿즈 및 에듀 콘텐츠 전문기업\n㈜토이트론과 전략적 신주인수 계약체결'
                ], side: 'right' },
                { year: '2023', items: ['일터혁신 사업장으로 선정'], side: 'right' },
                { year: '2022', items: ['하남 시장 표창장 수상'], side: 'left' },
                { year: '2021', items: ['에이스제빵소 상표권 등록'], side: 'right' },
                { year: '2020', items: [
                  '제과제빵류 운반 및 보관용 냉장&냉동장치에 대한 특허 취득',
                  '에이스유통㈜ 창립 10주년 기념행사 개최'
                ], side: 'left' },
                { year: '2019', items: [
                  '제과제빵 재료의 유통물류 및 기술마케팅 부문 우수기술기업 인증서 획득',
                  '베이커리 소상공인을 위한 무료 세미나 개최 (매년 1회 개최)',
                  '매출 200억원 달성',
                  '에이스제빵소 운영 (베이커리샵)'
                ], side: 'right' },
                { year: '2018', items: ['경기도 하남시 기업인 협의회 인증'], side: 'left' },
                { year: '2017', items: ['㈜삼양사 식자재유통사업부문 감사패 수상'], side: 'right' },
                { year: '2016', items: ['중소기업청 메인비즈 인증'], side: 'left' },
                { year: '2015', items: ['에이스유통㈜ 신사옥 신축 및 이전 (하남시 천현동 소재)'], side: 'right' },
                { year: '2012', items: ['매출 100억원 달성'], side: 'left' },
                { year: '2010', items: ['에이스유통㈜ 창립 (직원 5명)'], side: 'right' },
              ].map((yearData, yearIndex) => (
                <div key={yearIndex} className={`relative flex items-start min-h-[80px] ${yearData.items.length > 2 ? 'mb-8' : 'mb-4'}`}>
                  {/* 왼쪽 영역 */}
                  <div className="w-[calc(50%-60px)] pr-6 flex justify-end pt-1">
                    {yearData.side === 'left' && (
                      <div className="text-right">
                        {yearData.items.map((item, itemIndex) => (
                          <p key={itemIndex} className="text-sm lg:text-base text-[#4A4039] leading-relaxed whitespace-pre-line">
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 중앙 연도 영역 */}
                  <div className="w-[120px] flex justify-center relative z-10">
                    <div className="bg-white px-4 py-1.5 rounded-full border border-[#D4C4B0]">
                      <span className="text-base lg:text-lg font-bold text-[#B8956A]">{yearData.year}</span>
                    </div>
                  </div>

                  {/* 오른쪽 영역 */}
                  <div className="w-[calc(50%-60px)] pl-6 flex justify-start pt-1">
                    {yearData.side === 'right' && (
                      <div className="text-left">
                        {yearData.items.map((item, itemIndex) => (
                          <p key={itemIndex} className="text-sm lg:text-base text-[#4A4039] leading-relaxed whitespace-pre-line">
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline - Mobile (세로 리스트) */}
          <div className="md:hidden relative pl-6">
            {/* 왼쪽 세로선 */}
            <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-[#D4C4B0]"></div>

            <div className="space-y-6">
              {[
                { year: '2026', items: ['에이스유통㈜ 신사옥 신축 및 이전 (하남시 감북동 소재)'] },
                { year: '2025', items: [
                  '중기부 장관 표창장 수상',
                  '서울대 경영인상 수상',
                  '하남시 의장 표창장 수상',
                  'IP 굿즈 및 에듀 콘텐츠 전문기업\n㈜토이트론과 전략적 신주인수 계약체결'
                ] },
                { year: '2023', items: ['일터혁신 사업장으로 선정'] },
                { year: '2022', items: ['하남 시장 표창장 수상'] },
                { year: '2021', items: ['에이스제빵소 상표권 등록'] },
                { year: '2020', items: [
                  '제과제빵류 운반 및 보관용 냉장&냉동장치에 대한 특허 취득',
                  '에이스유통㈜ 창립 10주년 기념행사 개최'
                ] },
                { year: '2019', items: [
                  '제과제빵 재료의 유통물류 및 기술마케팅 부문 우수기술기업 인증서 획득',
                  '베이커리 소상공인을 위한 무료 세미나 개최 (매년 1회 개최)',
                  '매출 200억원 달성',
                  '에이스제빵소 운영 (베이커리샵)'
                ] },
                { year: '2018', items: ['경기도 하남시 기업인 협의회 인증'] },
                { year: '2017', items: ['㈜삼양사 식자재유통사업부문 감사패 수상'] },
                { year: '2016', items: ['중소기업청 메인비즈 인증'] },
                { year: '2015', items: ['에이스유통㈜ 신사옥 신축 및 이전 (하남시 천현동 소재)'] },
                { year: '2012', items: ['매출 100억원 달성'] },
                { year: '2010', items: ['에이스유통㈜ 창립 (직원 5명)'] },
              ].map((yearData, yearIndex) => (
                <div key={yearIndex} className="relative">
                  {/* 점 */}
                  <div className="absolute -left-6 top-1 w-3 h-3 bg-[#B8956A] rounded-full border-2 border-white shadow-sm z-10"></div>

                  {/* 연도 및 내용 */}
                  <div>
                    <span className="text-lg font-bold text-[#B8956A] mb-1 block">{yearData.year}</span>
                    {yearData.items.map((item, itemIndex) => (
                      <p key={itemIndex} className="text-sm text-[#4A4039] leading-relaxed whitespace-pre-line">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: 경영 철학 */}
      <section id="philosophy" className="py-12 sm:py-20 lg:py-32 bg-white scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">PHILOSOPHY</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">경영 철학</h2>
            <p className="text-sm sm:text-base text-[#6B5D53]">에이스유통이 추구하는 가치</p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-20">
            <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#E8DCC8]">
              <span className="text-xs sm:text-sm font-bold text-[#B8956A] tracking-widest">VISION</span>
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#4A4039] mt-2 mb-3 sm:mb-4">
                고객·상품·임직원이<br />함께 성장하는 기업
              </h3>
              <p className="text-sm sm:text-base text-[#6B5D53] leading-relaxed">
                고객 만족을 통해 새로운 가치를 만들고,<br className="hidden sm:block" />
                그 성과를 바탕으로 임직원이 행복하게 일할 수 있는<br className="hidden sm:block" />
                기업 문화를 구축하며, 지속 가능한 F&B 생태계를 선도합니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#4A4039] to-[#6B5D53] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white">
              <span className="text-xs sm:text-sm font-bold text-[#D4A574] tracking-widest">MISSION</span>
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold mt-2 mb-3 sm:mb-4">
                좋은 상품을 정확하게,<br />정직하게 전달
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                고객에게 신뢰할 수 있는 가치를 제공합니다.<br className="hidden sm:block" />
                편리하고 유용한 제품을 안정적으로 공급함으로써<br className="hidden sm:block" />
                고객의 성장과 일상의 품질 향상에 기여합니다.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center border border-[#E8DCC8] hover:shadow-xl hover:border-[#B8956A]/30 transition-all duration-300">
                <h3 className="text-lg sm:text-2xl font-bold text-[#4A4039] mb-1">{value.title}</h3>
                <p className="text-xs sm:text-sm text-[#B8956A] font-medium mb-2 sm:mb-3">{value.subtitle}</p>
                <p className="text-xs sm:text-base text-[#6B5D53] whitespace-pre-line">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: 사업 소개 */}
      <section id="business" className="py-12 sm:py-20 lg:py-32 bg-[#FAF6F1] scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">BUSINESS</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">사업 소개</h2>
            <p className="text-sm sm:text-base text-[#6B5D53]">에이스유통이 제공하는 서비스</p>
          </div>

          {/* Business Cards Grid */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* 베이커리/카페 무료 창업컨설팅 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E8DCC8] hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#4A4039] mb-1">베이커리/카페 무료 창업컨설팅</h3>
                <p className="text-xs sm:text-sm text-[#B8956A] font-medium tracking-wide">STARTUP CONSULTING</p>
                <p className="text-xs sm:text-sm text-[#6B5D53] mt-3 leading-relaxed">
                  성공적인 창업을 위한 전문 컨설팅,<br />
                  입지 분석부터 운영 전략까지 체계적인 창업 솔루션을 제공합니다
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                {[
                  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: '매칭 매입/매각', subtitle: '(및 시장조사)' },
                  { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', title: '기계/인테리어', subtitle: '(업체 제휴)' },
                  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', title: '전문 인력 매칭', subtitle: '(제과제빵 기술자)' },
                  { icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', title: '제과제빵 상품개발', subtitle: '(및 제품 큐레이션)' },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FAF6F1] rounded-full flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <p className="text-xs text-[#4A4039] font-medium text-center">{item.title}</p>
                    <p className="text-[10px] text-[#6B5D53] text-center">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 베이커리/카페 유통 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E8DCC8] hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#4A4039] mb-1">베이커리/카페 유통</h3>
                <p className="text-xs sm:text-sm text-[#B8956A] font-medium tracking-wide">DISTRIBUTION</p>
                <p className="text-xs sm:text-sm text-[#6B5D53] mt-3 leading-relaxed">
                  프리미엄 베이커리 제품 유통<br />
                  신선하고 품질 높은 제품을 한결같이 공급합니다
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                {[
                  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: '품질 검증', subtitle: '(우수업체별 인증)' },
                  { icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', title: '재고 관리', subtitle: '(실시간 재고 시스템)' },
                  { icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0', title: '신속 배송', subtitle: '(당일/익일 배송)' },
                  { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', title: '사후 관리', subtitle: '(지속적 품질 관리)' },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FAF6F1] rounded-full flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <p className="text-xs text-[#4A4039] font-medium text-center">{item.title}</p>
                    <p className="text-[10px] text-[#6B5D53] text-center">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 캐릭터 IP F&B */}
            <div className="bg-gradient-to-br from-[#F5EFE7] to-[#EDE4D8] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#D4C4B0] hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#4A4039] mb-1">캐릭터 IP F&B</h3>
                <p className="text-xs sm:text-sm text-[#8B7355] font-medium tracking-wide">CHARACTER IP F&B</p>
                <p className="text-xs sm:text-sm text-[#6B5D53] mt-3 leading-relaxed">
                  인기 캐릭터와 콜라보레이션,<br />
                  차별화된 메뉴 및 굿즈 개발로 브랜드 경쟁력을 강화합니다
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                {[
                  { icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', title: '파트너십 구축', subtitle: '(토이트론 제휴)' },
                  { icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', title: 'IP 활용 기획', subtitle: '(캐릭터 브랜딩)' },
                  { icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7', title: '상품 개발 및 공급', subtitle: '(메뉴/굿즈 제작)' },
                  { icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z', title: '런칭 지원', subtitle: '(마케팅 전략)' },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/60 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <p className="text-xs text-[#4A4039] font-medium text-center">{item.title}</p>
                    <p className="text-[10px] text-[#6B5D53] text-center">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 물류 파트너십 · 대행 */}
            <div className="bg-gradient-to-br from-[#5C4D3D] to-[#4A4039] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#6B5D53] hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">물류 파트너십 · 대행</h3>
                <p className="text-xs sm:text-sm text-[#D4A574] font-medium tracking-wide">LOGISTICS PARTNERSHIP</p>
                <p className="text-xs sm:text-sm text-white/80 mt-3 leading-relaxed">
                  업계 최고 수준의 노하우와 네트워크를 기반으로<br />
                  고객 맞춤형 서비스를 제공합니다
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                {[
                  { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: '물류센터', subtitle: '(보관/재고관리)' },
                  { icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', title: '콜드체인', subtitle: '(온도 관리 시스템)' },
                  { icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4', title: 'ERP 통합', subtitle: '(실시간 관리)' },
                  { icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0', title: '물류 배송', subtitle: '(전용 차량 운영)' },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <p className="text-xs text-white font-medium text-center">{item.title}</p>
                    <p className="text-[10px] text-white/70 text-center">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 사업장 소개 */}
      <section id="location" className="py-12 sm:py-20 lg:py-32 bg-white scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">LOCATION</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">사업장 소개</h2>
            <p className="text-sm sm:text-base text-[#6B5D53]">전국 유통망과 물류 인프라</p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#E8DCC8]">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="text-sm sm:text-base text-left">
                <h3 className="text-lg sm:text-2xl font-bold text-[#4A4039] mb-4 sm:mb-6">본사 / 물류센터</h3>
                <p className="text-[#6B5D53] mb-3 sm:mb-4">
                  <strong className="text-[#4A4039]">주소:</strong> 경기도 하남시 샘재로 119번길 31(천현동 392-3)
                </p>
                <p className="text-[#6B5D53] mb-3 sm:mb-4">
                  <strong className="text-[#4A4039]">대표전화:</strong> 02) 471-1644~6
                </p>
                <p className="text-[#6B5D53] mb-3 sm:mb-4">
                  <strong className="text-[#4A4039]">이메일:</strong> ace32865@hanmail.net
                </p>
                <p className="text-[#6B5D53] mb-3 sm:mb-4">
                  <strong className="text-[#4A4039]">팩스:</strong> 02) 476-1372
                </p>
              </div>
              <div className="flex items-center justify-end">
                <img
                  src="/images/company/business-location.png"
                  alt="에이스유통 물류센터"
                  className="w-auto h-auto max-h-[250px] sm:max-h-[300px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: 패밀리사 소개 */}
      <section id="family" className="py-12 sm:py-20 lg:py-32 bg-[#FAF6F1] scroll-mt-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">FAMILY COMPANY</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">패밀리사 소개</h2>
            <p className="text-sm sm:text-base text-[#6B5D53]">함께 성장하는 파트너</p>
          </div>

          {/* 토이트론 소개 - 3개 카드로 분리 */}
          <div className="space-y-6">
            {/* 카드 1: 회사 소개 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8DCC8]">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-[#B8956A] mb-3">
                  ㈜토이트론 (Toytron)
                </h3>
                <p className="text-sm sm:text-base text-[#6B5D53] italic mb-6">
                  &ldquo;아이와 같은 눈으로 바라보고, 아이와 같은 생각을 하는 <span className="text-[#B8956A] font-semibold">토이트론</span>&rdquo;
                </p>
                <p className="text-sm sm:text-base text-[#4A4039] leading-relaxed">
                  <span className="text-[#B8956A] font-semibold">토이트론</span>은 아이들에게 미래와 꿈을 보여주고, 상상력과 가능성을 심어주는 완구 전문 기업입니다.<br className="hidden sm:block" />
                  단순히 화려한 겉모습의 장난감이 아닌, 따뜻한 사랑이 담긴 감성적인 완구를 만들어<br className="hidden sm:block" />
                  아이들의 감성 창의력을 키우는 데 주력하고 있습니다.
                </p>
              </div>
            </div>

            {/* 카드 2: 기업 가치 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8DCC8]">
              <div className="text-center mb-6 sm:mb-8">
                <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3 block">CORE VALUES</span>
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#4A4039]">기업 가치</h4>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { title: 'Like a Child', desc: '아이들의 동화를 믿고, 아이들의 꿈을 함께 꾸며, 아이처럼 순수하게 세상을 바라봅니다' },
                  { title: '비타민 같은 완구', desc: '좋은 장난감은 아이의 성장에 필수적인 비타민과 같은 존재라는 철학' },
                  { title: '미래지향적 제품', desc: '자극적이거나 겉모습만 화려한 것이 아닌, 아이의 미래까지 생각하는 장난감 개발' },
                ].map((item, index) => (
                  <div key={index} className="bg-[#FAF6F1] rounded-xl p-4 sm:p-5 text-center">
                    <p className="font-bold text-[#B8956A] mb-2">{item.title}</p>
                    <p className="text-xs sm:text-sm text-[#6B5D53] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 카드 3: 주요 브랜드 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8DCC8]">
              <div className="text-center mb-6 sm:mb-8">
                <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3 block">MAIN BRANDS</span>
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#4A4039]">주요 브랜드</h4>
              </div>
              <div className="space-y-4">
                {[
                  { name: '실바니안 패밀리 (Sylvanian Families)', desc: '토이트론의 대표 완구 브랜드로, 프리미엄 리미티드 제품 라인의 한국 공식 유통을 담당하고 있습니다.' },
                  { name: '달님이', desc: '20년간 국민 캐릭터로 사랑받아온 토이트론의 대표 자체 캐릭터 IP로, 따뜻한 감성을 전달합니다.' },
                  { name: '하프&친구들 (Half & Friends)', desc: '토이트론의 인기 캐릭터 브랜드로, 독창적인 스토리텔링과 개성있는 디자인을 선보입니다.' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-gradient-to-r from-[#FAF6F1] to-white rounded-xl p-4 border border-[#E8DCC8]">
                    <span className="w-6 h-6 bg-[#B8956A] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-[#4A4039] mb-1">
                        <span className="text-[#B8956A]">{item.name}</span>
                      </p>
                      <p className="text-sm text-[#6B5D53]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: 인증 및 수상 */}
      <section id="certification" className="py-12 sm:py-20 lg:py-32 bg-white scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">CERTIFICATION & AWARDS</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">인증 및 수상</h2>
            <p className="text-sm sm:text-base text-[#6B5D53]">신뢰할 수 있는 기업 인증 및 수상 현황</p>
          </div>

          {/* 8장 통합 그리드: 4열 x 2행 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              ...certifications,
              { title: '중기부 장관 표창장', description: '중소벤처기업부 장관 표창', date: '2025년', imageUrl: '/images/awards/minister-award.png' },
              { title: '하남시 의장 표창장', description: '하남시 의회 의장 표창', date: '2025년', imageUrl: '/images/awards/hanam-award.jpg' },
              { title: '서울대 경영인상', description: '서울대학교 식품영양산업 경영인상', date: '2025년', imageUrl: '/images/awards/snu-award.jpg' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A]/50 hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#FAF6F1] to-white flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                  <img
                    src={item.imageUrl || ''}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 border border-[#E8DCC8]"
                  />
                </div>
                <div className="p-3 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-sm sm:text-lg font-bold text-[#4A4039] mb-1 sm:mb-2 group-hover:text-[#B8956A] transition-colors line-clamp-1">{item.title}</h3>
                  <p className="text-[#6B5D53] text-xs sm:text-sm mb-2 sm:mb-3 flex-grow whitespace-pre-line line-clamp-2">{item.description}</p>
                  <span className="text-xs sm:text-sm text-[#B8956A] font-medium mt-auto">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 주요 고객사 */}
      <ClientsSection />

      <Footer />
    </div>
  );
}
