'use client';

import { Header, Footer, PageHero } from '@/components/layout';
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
    { title: '특허증 (냉장/냉동 장치)', description: '제과제빵류 운반 및 보관용\n냉장/냉동장치 특허 (제 10-2445173호)', date: '2020년 취득', imageUrl: '/images/certificates/patent.png' },
    { title: '상표등록증 (에이스제빵소)', description: '에이스제빵소 브랜드 상표권 등록', date: '2021년 등록', imageUrl: '/images/certificates/trademark.png' },
    { title: '우수기술기업 인증서', description: '제과제빵 재료 유통물류 및\n기술마케팅 부문 기술력 인증', date: '2019년 취득', imageUrl: '/images/certificates/tech-company.png' },
    { title: '메인비즈 인증', description: '중소벤처기업부 경영혁신형 중소기업 인증', date: '2016년 취득', imageUrl: '/images/certificates/mainbiz.png' },
    { title: '일터혁신 사업장', description: '노사발전재단 일터혁신 사업장 선정\n직무 분석 및 평가체계 개선 추진', date: '2023년 선정', imageUrl: '/images/certificates/workplace-innovation.png' },
  ];

  const coreValues = dbCoreValues.length > 0 ? dbCoreValues : [
    { title: '고객 만족', subtitle: 'CUSTOMER', description: '고객의 성공이 곧 우리의 성공\n고객 만족을 최우선으로' },
    { title: '신뢰', subtitle: 'TRUST', description: '정직한 거래와 약속 이행으로\n쌓아온 15년의 신뢰' },
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
    warehouseSize: '520평',
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
              { id: 'certification', label: '조직 및 인증서' },
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
                <div key={index} className="text-center">
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
          <div className="text-center mb-12 sm:mb-20">
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">HISTORY</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4 sm:mb-6">
              신뢰와 품질로 쌓아온 <span className="text-[#B8956A]">{yearsInBusiness}년의 역사</span>
            </h2>
          </div>

          {/* Timeline with Images */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#B8956A] via-[#D4A574] to-[#B8956A] hidden lg:block"></div>
            <div className="space-y-8 sm:space-y-16 lg:space-y-24">
              {/* 2010 - 창립 */}
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#B8956A] text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl z-10 hidden lg:block">2010</div>
                <div className="w-full lg:w-5/12 lg:mr-auto lg:pr-12">
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden group hover:shadow-3xl transition-shadow duration-500">
                    <div className="h-40 sm:h-56 overflow-hidden bg-[#FAF6F1] flex items-center justify-center p-4">
                      <img
                        src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=600&fit=crop"
                        alt="에이스유통㈜ 창립"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4 sm:p-8">
                      <span className="lg:hidden inline-block bg-[#B8956A] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-4">2010</span>
                      <h3 className="text-lg sm:text-2xl font-bold text-[#4A4039] mb-2 sm:mb-3">에이스유통㈜ 창립</h3>
                      <p className="text-sm sm:text-base text-[#6B5D53] leading-relaxed">직원 5명으로 카페·베이커리 원재료 유통 사업 시작</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2015 - 본사 사옥 신축 */}
              <div className="relative flex items-center lg:flex-row-reverse">
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#B8956A] text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl z-10 hidden lg:block">2015</div>
                <div className="w-full lg:w-5/12 lg:ml-auto lg:pl-12">
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden group hover:shadow-3xl transition-shadow duration-500">
                    <div className="h-40 sm:h-56 overflow-hidden bg-[#FAF6F1] flex items-center justify-center p-4">
                      <img
                        src="/images/business-location.png"
                        alt="본사 사옥 신축 이전"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4 sm:p-8">
                      <span className="lg:hidden inline-block bg-[#B8956A] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-4">2015</span>
                      <h3 className="text-lg sm:text-2xl font-bold text-[#4A4039] mb-2 sm:mb-3">본사 사옥 신축 이전</h3>
                      <p className="text-sm sm:text-base text-[#6B5D53] leading-relaxed">경기도 하남시 천현동에 자체 물류센터 보유 사옥 신축</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2019 - 우수기술기업 인증 */}
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#B8956A] text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl z-10 hidden lg:block">2019</div>
                <div className="w-full lg:w-5/12 lg:mr-auto lg:pr-12">
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden group hover:shadow-3xl transition-shadow duration-500">
                    <div className="h-40 sm:h-56 overflow-hidden bg-white flex items-center justify-center p-4">
                      <img
                        src="/images/certificates/tech-company.png"
                        alt="우수기술기업 인증"
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4 sm:p-8">
                      <span className="lg:hidden inline-block bg-[#B8956A] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-4">2019</span>
                      <h3 className="text-lg sm:text-2xl font-bold text-[#4A4039] mb-2 sm:mb-3">우수기술기업 인증</h3>
                      <p className="text-sm sm:text-base text-[#6B5D53] leading-relaxed">제과제빵 재료 유통물류 및 기술마케팅 부문 우수기술기업 인증 획득</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2020 - 창립 10주년 & 특허 취득 */}
              <div className="relative flex items-center lg:flex-row-reverse">
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#B8956A] text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl z-10 hidden lg:block">2020</div>
                <div className="w-full lg:w-5/12 lg:ml-auto lg:pl-12">
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden group hover:shadow-3xl transition-shadow duration-500">
                    <div className="h-40 sm:h-56 overflow-hidden bg-white flex items-center justify-center p-4">
                      <img
                        src="/images/certificates/patent.png"
                        alt="창립 10주년 & 특허 취득"
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4 sm:p-8">
                      <span className="lg:hidden inline-block bg-[#B8956A] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-4">2020</span>
                      <h3 className="text-lg sm:text-2xl font-bold text-[#4A4039] mb-2 sm:mb-3">창립 10주년 & 특허 취득</h3>
                      <p className="text-sm sm:text-base text-[#6B5D53] leading-relaxed">제과제빵류 운반 및 보관용 냉장/냉동장치 특허 취득</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2025 - 전략적 파트너십 체결 */}
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#B8956A] text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl z-10 hidden lg:block">2025</div>
                <div className="w-full lg:w-5/12 lg:mr-auto lg:pr-12">
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden group hover:shadow-3xl transition-shadow duration-500">
                    <div className="h-40 sm:h-56 overflow-hidden bg-[#FAF6F1] flex items-center justify-center p-4">
                      <img
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                        alt="전략적 파트너십 체결"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4 sm:p-8">
                      <span className="lg:hidden inline-block bg-[#B8956A] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-4">2025</span>
                      <h3 className="text-lg sm:text-2xl font-bold text-[#4A4039] mb-2 sm:mb-3">전략적 파트너십 체결</h3>
                      <p className="text-sm sm:text-base text-[#6B5D53] leading-relaxed">IP 굿즈 및 에듀 콘텐츠 기업 ㈜토이트론과 전략적 계약 체결</p>
                    </div>
                  </div>
                </div>
              </div>
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

      {/* Section 5: 조직 및 인증서 */}
      <section id="certification" className="py-12 sm:py-20 lg:py-32 bg-white scroll-mt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">CERTIFICATION</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">보유 인증서</h2>
            <p className="text-sm sm:text-base text-[#6B5D53]">신뢰할 수 있는 기업 인증 현황</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-12 sm:mb-20">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A]/50 hover:shadow-xl transition-all duration-300 group flex flex-col">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#FAF6F1] to-white flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                  <img
                    src={cert.imageUrl || ''}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 border border-black"
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

          {/* 주요 고객사 */}
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">CLIENTS</span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#4A4039] mb-3 sm:mb-4">주요 고객사</h3>
            <p className="text-[#6B5D53]">에이스유통과 함께하는 믿음직한 파트너</p>
          </div>

          {/* 고객사 목록 */}
          <div className="mb-10 overflow-x-auto pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 min-w-max lg:min-w-0">
              {(dbClients.length > 0 ? dbClients : [
                { name: '스파필드 팥고당 입점 (하남, 고양 외 8개 지점)', description: null },
                { name: '롯데 백화점 한나식빵 입점 (롯데백화점 외 20여개 지점)', description: null },
                { name: '지하철 역사 내 더베이크 (17여개 지점)', description: null },
                { name: '곤트란쉐리에 (30여개 지점)', description: null },
                { name: '그 외 기타 개인제과 (전국 420여개 이상 거래처 보유/관리)', description: null },
              ]).map((client, index) => (
                <div key={index} className="group bg-gradient-to-br from-white to-[#FAF6F1] rounded-2xl p-6 border-2 border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 min-w-[240px] lg:min-w-0">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-[#4A4039] leading-relaxed group-hover:text-[#B8956A] transition-colors">
                      {client.name.split('(')[0]}<br />
                      {client.name.includes('(') && `(${client.name.split('(')[1]}`}
                    </p>
                    {client.description && (
                      <p className="text-xs text-[#6B5D53] mt-2">{client.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 협력사 로고 그리드 */}
          <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl p-6 sm:p-8 border border-[#E8DCC8]">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-4">
              {[
                { src: '/images/000. 협력사 로고/1. CJ.png', alt: 'CJ' },
                { src: '/images/000. 협력사 로고/2. 롯데푸드.png', alt: '롯데푸드' },
                { src: '/images/000. 협력사 로고/3. 동원.png', alt: '동원' },
                { src: '/images/000. 협력사 로고/4. 오뚜기.png', alt: '오뚜기' },
                { src: '/images/000. 협력사 로고/5. 삼양식품.png', alt: '삼양식품' },
                { src: '/images/000. 협력사 로고/6. 매일.png', alt: '매일' },
                { src: '/images/000. 협력사 로고/7. 빙그레.png', alt: '빙그레' },
                { src: '/images/000. 협력사 로고/8. 동서식품', alt: '동서식품' },
                { src: '/images/000. 협력사 로고/9. 사조동아원.png', alt: '사조동아원' },
                { src: '/images/000. 협력사 로고/10. 대한제분.png', alt: '대한제분' },
                { src: '/images/000. 협력사 로고/11. tjsdls.png', alt: '선일' },
                { src: '/images/000. 협력사 로고/12. 서울식품.png', alt: '서울식품' },
                { src: '/images/000. 협력사 로고/13. 제니코.png', alt: '제니코' },
                { src: '/images/000. 협력사 로고/14. 대두식품.png', alt: '대두식품' },
                { src: '/images/000. 협력사 로고/15. 주식회사 조흥.png', alt: '주식회사 조흥' },
                { src: '/images/000. 협력사 로고/16. 구르메.png', alt: '구르메' },
                { src: '/images/000. 협력사 로고/17. (주)지성비엔씨.png', alt: '(주)지성비엔씨' },
                { src: '/images/000. 협력사 로고/18. GALIM.png', alt: 'GALIM' },
                { src: '/images/000. 협력사 로고/19. 경일포장.png', alt: '경일포장' },
                { src: '/images/000. 협력사 로고/20. 굿모닝서울.png', alt: '굿모닝서울' },
                { src: '/images/000. 협력사 로고/21. 꼬미다.png', alt: '꼬미다' },
                { src: '/images/000. 협력사 로고/22. 네이처F&B.png', alt: '네이처F&B' },
                { src: '/images/000. 협력사 로고/23. 트라이이.png', alt: '트라이이' },
                { src: '/images/000. 협력사 로고/24. 정우유통.png', alt: '정우유통' },
                { src: '/images/000. 협력사 로고/25. 미스터푸드.png', alt: '미스터푸드' },
                { src: '/images/000. 협력사 로고/26. 에스푸드.png', alt: '에스푸드' },
                { src: '/images/000. 협력사 로고/27. teabreak.png', alt: 'Teabreak' },
                { src: '/images/000. 협력사 로고/28. 떡의친구.png', alt: '떡의친구' },
                { src: '/images/000. 협력사 로고/29. 오트리푸드.png', alt: '오트리푸드' },
                { src: '/images/000. 협력사 로고/30. 제원인터네셔널.png', alt: '제원인터네셔널' },
                { src: '/images/000. 협력사 로고/31. ek코퍼레이션.png', alt: 'EK코퍼레이션' },
                { src: '/images/000. 협력사 로고/32. 베이크플러스.png', alt: '베이크플러스' },
                { src: '/images/000. 협력사 로고/33. 웰넛.png', alt: '웰넛' },
                { src: '/images/000. 협력사 로고/34. 새로피엔엘.png', alt: '새로피엔엘' },
                { src: '/images/000. 협력사 로고/35. 석강.png', alt: '석강' },
                { src: '/images/000. 협력사 로고/36. 보라티알.png', alt: '보라티알' },
                { src: '/images/000. 협력사 로고/37. 솜인터네셔널.png', alt: '솜인터네셔널' },
                { src: '/images/000. 협력사 로고/38. egg solutions.png', alt: 'Egg Solutions' },
                { src: '/images/000. 협력사 로고/39. 엘홀딩스.png', alt: '엘홀딩스' },
                { src: '/images/000. 협력사 로고/40. LOLUX.png', alt: 'LOLUX' },
                { src: '/images/000. 협력사 로고/41. 오뗄.png', alt: '오뗄' },
                { src: '/images/000. 협력사 로고/42. 리치스.png', alt: '리치스' },
                { src: '/images/000. 협력사 로고/43. 디벨라.png', alt: '디벨라' },
                { src: '/images/000. 협력사 로고/44. 마루비시.png', alt: '마루비시' },
              ].map((logo, index) => (
                <div key={index} className="bg-white rounded-lg p-2 sm:p-3 border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-md transition-all duration-300 flex items-center justify-center aspect-square">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
