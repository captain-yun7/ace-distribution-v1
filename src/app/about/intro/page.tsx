'use client';

import { Header, Footer, PageHero } from '@/components/layout';

export default function AboutIntroPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        badge="ABOUT US"
        title="기업소개"
        subtitle="에이스유통을 소개합니다"
        breadcrumb={[
          { name: '회사 소개', href: '/about/intro' },
          { name: '기업소개' }
        ]}
      />

      {/* Main Content */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Overview */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">COMPANY OVERVIEW</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-6 leading-tight">
                카페·베이커리 원재료 유통의<br />
                <span className="text-[#B8956A]">새로운 기준</span>을 만들어갑니다
              </h2>
              <div className="space-y-6 text-[#6B5D53] leading-relaxed">
                <p>
                  에이스유통주식회사는 카페·베이커리 산업을 위한 프리미엄 원재료 공급,
                  전문 소싱, 콜드체인 물류, 품질관리(QC)를 기반으로 성장해온
                  <strong className="text-[#4A4039]"> F&B B2B 솔루션 기업</strong>입니다.
                </p>
                <p>
                  2010년 설립 이후 자체 물류센터와 체계적인 유통 인프라를 구축하며
                  국내 프랜차이즈, 베이커리 카페, 전문 제과점 등 다양한 파트너에게
                  신뢰성 높은 제품을 안정적으로 공급해왔습니다.
                </p>
                <p>
                  당사는 원재료의 선별력과 정교한 품질관리, 신속한 공급망 운영을 통해
                  고객이 필요로 하는 제품을 정확하고 안정적으로 전달하는 데 집중해 왔습니다.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#FAF6F1] to-[#F5EFE7] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1608198093002-ad4e005571d1?w=800&h=600&fit=crop"
                  alt="에이스유통 물류센터"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#B8956A]/20 to-[#D4A574]/20 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#D4A574]/20 to-[#B8956A]/20 rounded-full -z-10"></div>
            </div>
          </div>

          {/* Company Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {[
              { label: '회사명', value: '에이스유통주식회사', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )},
              { label: '설립년도', value: '2010년', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )},
              { label: '대표이사', value: '안종일', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )},
              { label: '사업자등록번호', value: '126-86-32865', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )},
            ].map((item, index) => (
              <div key={index} className="bg-white border-2 border-[#F5EFE7] rounded-2xl p-8 text-center hover:border-[#B8956A]/30 hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#B8956A]/10 to-[#D4A574]/10 rounded-2xl flex items-center justify-center text-[#B8956A] group-hover:from-[#B8956A] group-hover:to-[#D4A574] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <p className="text-sm text-[#6B5D53] mb-2">{item.label}</p>
                <p className="text-lg font-bold text-[#4A4039]">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Business Overview */}
          <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-3xl p-8 lg:p-12 mb-32">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">BUSINESS OVERVIEW</span>
              <h3 className="text-3xl font-bold text-[#4A4039]">사업 현황</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: '사업분야', value: '베이커리·카페 원재료 유통', icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                )},
                { label: '본사 위치', value: '경기도 하남시', icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )},
                { label: '직원수', value: '29명', icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )},
                { label: '주요 고객수', value: '전국 500+ 업체', icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )},
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl shadow-lg flex items-center justify-center text-[#B8956A] group-hover:shadow-xl transition-shadow">
                    {item.icon}
                  </div>
                  <p className="text-sm text-[#6B5D53] mb-2">{item.label}</p>
                  <p className="text-[#4A4039] font-bold text-lg">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Management Status */}
          <div className="mb-32">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">ACHIEVEMENTS</span>
              <h3 className="text-3xl font-bold text-[#4A4039]">경영 현황</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border-2 border-[#F5EFE7] rounded-3xl p-10 text-center hover:border-[#B8956A] hover:shadow-2xl transition-all duration-300 group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-[#6B5D53] mb-2">2024년 매출</p>
                <p className="text-4xl font-black text-[#B8956A] mb-2">245.7<span className="text-xl">억원</span></p>
                <p className="text-xs text-[#8B7D73]">전년 대비 15% 성장</p>
              </div>
              <div className="bg-white border-2 border-[#F5EFE7] rounded-3xl p-10 text-center hover:border-[#B8956A] hover:shadow-2xl transition-all duration-300 group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <p className="text-sm text-[#6B5D53] mb-2">기술인증</p>
                <p className="text-2xl font-bold text-[#4A4039] mb-2">우수기술기업</p>
                <p className="text-xs text-[#8B7D73]">2019년 인증 획득</p>
              </div>
              <div className="bg-white border-2 border-[#F5EFE7] rounded-3xl p-10 text-center hover:border-[#B8956A] hover:shadow-2xl transition-all duration-300 group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <p className="text-sm text-[#6B5D53] mb-2">특허 보유</p>
                <p className="text-lg font-bold text-[#4A4039] mb-2">냉장/냉동장치</p>
                <p className="text-xs text-[#8B7D73]">제과제빵류 운반/보관용</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gradient-to-r from-[#4A4039] to-[#6B5D53] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 text-center">연락처 정보</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-14 h-14 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm mb-2">전화번호</p>
                  <p className="font-bold text-xl">02) 471-1644~6</p>
                </div>
                <div>
                  <div className="w-14 h-14 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm mb-2">이메일</p>
                  <p className="font-bold text-xl">ace32865@hanmail.net</p>
                </div>
                <div>
                  <div className="w-14 h-14 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm mb-2">팩스</p>
                  <p className="font-bold text-xl">02) 476-1372</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
