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
    { year: '2025', title: '전략적 파트너십 체결', desc: '하남시 감북동 소재 신사옥 신축 및 이전 예정' },
    { year: '2024', title: '연매출 245억 달성', desc: '지속적인 성장으로 연매출 245억원 달성' },
    { year: '2023', title: '일터혁신 사업장 선정', desc: '노사발전재단 일터혁신 사업장으로 선정' },
    { year: '2022', title: '물류센터 확장 이전', desc: '하남시 물류센터 확장 이전, 물류 역량 강화' },
    { year: '2022', title: '중소기업 경영인상 수상', desc: '경기도 하남시 중소기업 경영인상 수상' },
    { year: '2021', title: '에이스제빵소 상표권 등록', desc: '에이스제빵소 브랜드 상표권 등록' },
    { year: '2020', title: '창립 10주년', desc: '에이스유통 창립 10주년 기념행사 개최' },
    { year: '2020', title: '특허 취득 및 차량 증차', desc: '제과제빵류 운반 및 보관용 냉장/냉동장치 특허 취득, 배송차량 20대 증차' },
    { year: '2019', title: '우수기술기업 인증', desc: '제과제빵 재료 유통물류 및 기술마케팅 부문 우수기술기업 인증 획득' },
    { year: '2019', title: '매출 200억 달성', desc: '베이커리 소상공인 무료 세미나 개최, 에이스제빵소 운영 시작' },
    { year: '2018', title: '기업인 협의회 인증', desc: '경기도 하남시 기업인 협의회 인증' },
    { year: '2016', title: '메인비즈 인증', desc: '중소기업청 메인비즈(경영혁신형 중소기업) 인증' },
    { year: '2015', title: '본사 사옥 신축 이전', desc: '경기도 하남시 천현동에 자체 물류센터 보유 사옥 신축' },
    { year: '2012', title: '매출 100억 달성', desc: '물류창고 확장 이전, 연매출 100억원 달성' },
    { year: '2010', title: '에이스유통㈜ 법인 설립', desc: '카페·베이커리 원재료 유통 사업 시작 (직원 5명)' },
  ];

  const certifications = dbCertificates.length > 0 ? dbCertificates : [
    { title: '특허증 (냉장/냉동 장치)', description: '제과제빵류 운반 및 보관용\n냉장/냉동장치 특허 (제 10-2445173호)', date: '2020년 취득', imageUrl: '/images/인증서/특허증.png' },
    { title: '상표등록증 (에이스제빵소)', description: '에이스제빵소 브랜드 상표권 등록', date: '2021년 등록', imageUrl: '/images/인증서/상표등록증.png' },
    { title: '우수기술기업 인증서', description: '제과제빵 재료 유통물류 및\n기술마케팅 부문 기술력 인증', date: '2019년 취득', imageUrl: '/images/인증서/우수기술기업인증서.png' },
    { title: '메인비즈 인증', description: '중소벤처기업부 경영혁신형 중소기업 인증', date: '2016년 취득', imageUrl: '/images/certificates/mainbiz.png' },
    { title: '일터혁신 사업장', description: '노사발전재단 일터혁신 사업장 선정\n직무 분석 및 평가체계 개선 추진', date: '2023년 선정', imageUrl: '/images/인증서/일터혁신.png' },
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
        title="회사 소개"
        subtitle="에이스유통을 소개합니다"
        breadcrumb={[
          { name: '회사 소개' }
        ]}
      />

      {/* Navigation Tabs */}
      <nav className="sticky top-20 lg:top-24 bg-white border-b border-[#E8DCC8] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {[
              { id: 'overview', label: '기업 개요' },
              { id: 'history', label: '기업 연혁' },
              { id: 'philosophy', label: '경영 철학' },
              { id: 'business', label: '사업장 소개' },
              { id: 'organization', label: '조직도' },
              { id: 'certification', label: '인증서' },
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
                  src="/images/business-location.png"
                  alt="에이스유통 물류센터"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Company Info Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-20">
            {[
              { label: '회사명', value: '에이스유통주식회사' },
              { label: '설립년도', value: '2010년' },
              { label: '대표이사', value: '안종일' },
              { label: '업력', value: `${yearsInBusiness}년` },
            ].map((item, index) => (
              <div key={index} className="bg-white border-2 border-[#F5EFE7] rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center hover:border-[#B8956A]/30 hover:shadow-xl transition-all duration-300">
                <p className="text-xs sm:text-sm text-[#6B5D53] mb-1 sm:mb-2">{item.label}</p>
                <p className="text-sm sm:text-lg font-bold text-[#4A4039]">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Business KPI */}
          <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#E8DCC8]">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">BUSINESS OVERVIEW</span>
              <h3 className="text-xl sm:text-3xl font-bold text-[#4A4039]">사업 현황</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {[
                { label: '연매출', value: getKPIValue('revenue', defaultKPI.revenue) },
                { label: '직원 수', value: getKPIValue('employees', defaultKPI.employees) },
                { label: '주요 고객 수', value: getKPIValue('clients', defaultKPI.clients) },
                { label: '배송 차량', value: getKPIValue('deliveryVehicles', defaultKPI.deliveryVehicles) },
              ].map((item, index) => (
                <div key={index} className="text-center bg-white border border-[#E8DCC8] rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-[#B8956A]/50 hover:shadow-lg transition-all duration-300">
                  <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#B8956A] mb-1 sm:mb-2">{item.value}</p>
                  <p className="text-xs sm:text-sm text-[#6B5D53]">{item.label}</p>
                </div>
              ))}
            </div>
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
                { year: '2025', items: ['IP 굿즈 및 에듀 콘텐츠 전문 기업 ㈜토이트론과 전략적 계약 체결'], side: 'right' },
                { year: '2024', items: ['매출 260억원 달성'], side: 'left' },
                { year: '2023', items: ['일터혁신 사업장으로 선정'], side: 'right' },
                { year: '2022', items: ['경기도 하남시 중소기업 경영인상 수상'], side: 'left' },
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
                { year: '2016', items: ['중소기업청 메인비즈 인증'], side: 'right' },
                { year: '2015', items: ['에이스유통㈜ 신사옥 신축 및 이전 (하남시 천현동 소재)'], side: 'left' },
                { year: '2012', items: ['매출 100억원 달성'], side: 'right' },
                { year: '2010', items: ['에이스유통㈜ 창립 (직원 5명)'], side: 'left' },
              ].map((yearData, yearIndex) => (
                <div key={yearIndex} className="relative flex items-center min-h-[80px] mb-4">
                  {/* 왼쪽 영역 */}
                  <div className="w-[calc(50%-60px)] pr-6 flex justify-end">
                    {yearData.side === 'left' && (
                      <div className="text-right">
                        {yearData.items.map((item, itemIndex) => (
                          <p key={itemIndex} className="text-sm lg:text-base text-[#4A4039] leading-relaxed">
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
                  <div className="w-[calc(50%-60px)] pl-6 flex justify-start">
                    {yearData.side === 'right' && (
                      <div className="text-left">
                        {yearData.items.map((item, itemIndex) => (
                          <p key={itemIndex} className="text-sm lg:text-base text-[#4A4039] leading-relaxed">
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
                { year: '2025', items: ['IP 굿즈 및 에듀 콘텐츠 전문 기업 ㈜토이트론과 전략적 계약 체결'] },
                { year: '2024', items: ['매출 260억원 달성'] },
                { year: '2023', items: ['일터혁신 사업장으로 선정'] },
                { year: '2022', items: ['경기도 하남시 중소기업 경영인상 수상'] },
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
                      <p key={itemIndex} className="text-sm text-[#4A4039] leading-relaxed">
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

      {/* Section 4: 사업장 소개 */}
      <section id="business" className="py-12 sm:py-20 lg:py-32 bg-[#FAF6F1] scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">BUSINESS</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">사업장 소개</h2>
            <p className="text-sm sm:text-base text-[#6B5D53]">전국 유통망과 물류 인프라</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center border border-[#E8DCC8]">
              <p className="text-2xl sm:text-5xl font-bold text-[#B8956A] mb-1 sm:mb-2">{getKPIValue('deliveryVehicles', defaultKPI.deliveryVehicles)}</p>
              <p className="text-xs sm:text-base text-[#4A4039] font-semibold">배송차량 보유</p>
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-center border border-[#E8DCC8]">
              <p className="text-2xl sm:text-5xl font-bold text-[#B8956A] mb-1 sm:mb-2">{getKPIValue('warehouseSize', defaultKPI.warehouseSize)}</p>
              <p className="text-xs sm:text-base text-[#4A4039] font-semibold">물류센터 면적</p>
            </div>
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
                <p className="text-[#6B5D53]">
                  <strong className="text-[#4A4039]">팩스:</strong> 02) 476-1372
                </p>
              </div>
              <div className="bg-[#FAF6F1] rounded-xl sm:rounded-2xl overflow-hidden">
                <img
                  src="/images/business-location.png"
                  alt="에이스유통 물류센터"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 조직도 */}
      <section id="organization" className="py-12 sm:py-20 lg:py-32 bg-white scroll-mt-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">ORGANIZATION</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">조직도</h2>
            <p className="text-sm sm:text-base text-[#6B5D53]">에이스유통의 조직 구성</p>
          </div>

          {/* 조직도 */}
          <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E8DCC8]">
            {/* CEO */}
            <div className="flex justify-center">
              <div className="bg-[#B8956A] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg">
                <p className="text-lg sm:text-2xl font-bold text-center">CEO</p>
              </div>
            </div>

            {/* 연결선 - CEO에서 아래로 (끊김없이) */}
            <div className="flex justify-center">
              <div className="w-[2px] h-10 sm:h-14 bg-[#D4A574]"></div>
            </div>

            {/* 데스크톱: 가로 연결선 + 세로 연결선 + 부서 카드 */}
            <div className="hidden lg:block">
              {/* 가로 연결선 */}
              <div className="relative mx-auto" style={{ width: 'calc(100% - 80px)' }}>
                <div className="h-[2px] bg-[#D4A574]"></div>
                {/* 세로 연결선들 (가로선 위에서 바로 내려오도록) */}
                <div className="absolute top-0 left-0 right-0 flex justify-between">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-[2px] h-8 bg-[#D4A574]"></div>
                  ))}
                </div>
              </div>

              {/* 부서 카드들 */}
              <div className="grid grid-cols-6 gap-4 mt-8">
                {[
                  { name: '경영관리팀', count: 5 },
                  { name: '사업기획팀', count: 3 },
                  { name: '영업관리팀', count: 4 },
                  { name: '영업배송팀', count: 16 },
                  { name: '물류관리팀', count: 6 },
                  { name: '법무팀', count: 1 },
                ].map((dept, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-[#E8DCC8] rounded-2xl p-5 text-center hover:border-[#B8956A] hover:shadow-lg transition-all duration-300 group"
                  >
                    <p className="text-base font-bold text-[#4A4039] group-hover:text-[#B8956A] transition-colors mb-2">{dept.name}</p>
                    <p className="text-2xl font-bold text-[#B8956A]">({dept.count}명)</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 태블릿/모바일: 단순 그리드 */}
            <div className="lg:hidden mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  { name: '경영관리팀', count: 5 },
                  { name: '사업기획팀', count: 3 },
                  { name: '영업관리팀', count: 4 },
                  { name: '영업배송팀', count: 16 },
                  { name: '물류관리팀', count: 6 },
                  { name: '법무팀', count: 1 },
                ].map((dept, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-[#E8DCC8] rounded-xl p-3 sm:p-5 text-center hover:border-[#B8956A] hover:shadow-lg transition-all duration-300 group"
                  >
                    <p className="text-sm sm:text-base font-bold text-[#4A4039] group-hover:text-[#B8956A] transition-colors mb-1 sm:mb-2">{dept.name}</p>
                    <p className="text-lg sm:text-2xl font-bold text-[#B8956A]">({dept.count}명)</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 총 인원 */}
            <div className="flex justify-end mt-6 sm:mt-10">
              <div className="bg-[#4A4039] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg">
                <p className="text-base sm:text-xl">
                  <span className="font-medium">총</span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#D4A574] ml-2">35</span>
                  <span className="font-bold ml-1">명</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: 보유 인증서 */}
      <section id="certification" className="py-12 sm:py-20 lg:py-32 bg-[#FAF6F1] scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">CERTIFICATION</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">보유 인증서</h2>
            <p className="text-sm sm:text-base text-[#6B5D53]">신뢰할 수 있는 기업 인증 현황</p>
          </div>

          {/* 1행: 3개 */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-3 sm:mb-6">
            {certifications.slice(0, 3).map((cert, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A]/50 hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#FAF6F1] to-white flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                  <img
                    src={cert.imageUrl || ''}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 border border-[#E8DCC8]"
                  />
                </div>
                <div className="p-3 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-sm sm:text-lg font-bold text-[#4A4039] mb-1 sm:mb-2 group-hover:text-[#B8956A] transition-colors line-clamp-1">{cert.title}</h3>
                  <p className="text-[#6B5D53] text-xs sm:text-sm mb-2 sm:mb-3 flex-grow whitespace-pre-line">{cert.description}</p>
                  <span className="text-xs sm:text-sm text-[#B8956A] font-medium mt-auto">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
          {/* 2행: 2개 (가운데 정렬) */}
          <div className="flex justify-center gap-3 sm:gap-6 mb-12 sm:mb-20">
            {certifications.slice(3, 5).map((cert, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A]/50 hover:shadow-xl transition-all duration-300 group flex flex-col w-[calc(50%-6px)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#FAF6F1] to-white flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                  <img
                    src={cert.imageUrl || ''}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 border border-[#E8DCC8]"
                  />
                </div>
                <div className="p-3 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-sm sm:text-lg font-bold text-[#4A4039] mb-1 sm:mb-2 group-hover:text-[#B8956A] transition-colors line-clamp-1">{cert.title}</h3>
                  <p className="text-[#6B5D53] text-xs sm:text-sm mb-2 sm:mb-3 flex-grow whitespace-pre-line">{cert.description}</p>
                  <span className="text-xs sm:text-sm text-[#B8956A] font-medium mt-auto">{cert.date}</span>
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
