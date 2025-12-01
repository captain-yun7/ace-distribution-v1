'use client';

import Link from 'next/link';

export default function AboutIntroPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#4A4039] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl font-black text-white">ACE</span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-tight">에이스유통</span>
              <span className="text-xs font-medium text-white/60 leading-tight">주식회사</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Page Hero */}
      <section className="relative h-[300px] bg-gradient-to-r from-[#4A4039] to-[#6B5D53] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
          <span className="text-sm font-medium text-[#D4A574] tracking-[0.3em] uppercase mb-4">ABOUT US</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">기업소개</h1>
          <p className="text-white/80 text-lg">에이스유통을 소개합니다</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-[#FAF6F1] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-[#6B5D53]">
            <Link href="/" className="hover:text-[#B8956A]">홈</Link>
            <span>/</span>
            <span>회사 소개</span>
            <span>/</span>
            <span className="text-[#B8956A] font-medium">기업소개</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Overview */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">COMPANY OVERVIEW</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-6">
                카페·베이커리 원재료 유통의<br />
                <span className="text-[#B8956A]">새로운 기준</span>을 만들어갑니다
              </h2>
              <p className="text-[#6B5D53] leading-relaxed mb-6">
                에이스유통주식회사는 카페·베이커리 산업을 위한 프리미엄 원재료 공급,
                전문 소싱, 콜드체인 물류, 품질관리(QC)를 기반으로 성장해온
                <strong className="text-[#4A4039]"> F&B B2B 솔루션 기업</strong>입니다.
              </p>
              <p className="text-[#6B5D53] leading-relaxed">
                2010년 설립 이후 자체 물류센터와 체계적인 유통 인프라를 구축하며
                국내 프랜차이즈, 베이커리 카페, 전문 제과점 등 다양한 파트너에게
                신뢰성 높은 제품을 안정적으로 공급해왔습니다.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#FAF6F1] to-[#F5EFE7] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-full flex items-center justify-center">
                    <span className="text-4xl font-black text-white">ACE</span>
                  </div>
                  <p className="text-[#4A4039] font-bold text-xl">에이스유통주식회사</p>
                  <p className="text-[#6B5D53] text-sm mt-2">Since 2010</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#B8956A]/20 to-[#D4A574]/20 rounded-2xl -z-10"></div>
            </div>
          </div>

          {/* Company Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {[
              { label: '회사명', value: '에이스유통주식회사', icon: '🏢' },
              { label: '설립년도', value: '2010년', icon: '📅' },
              { label: '대표이사', value: '안종일', icon: '👤' },
              { label: '사업자등록번호', value: '126-86-32865', icon: '📋' },
            ].map((item, index) => (
              <div key={index} className="bg-[#FAF6F1] rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-sm text-[#6B5D53] mb-1">{item.label}</p>
                <p className="text-lg font-bold text-[#4A4039]">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Business Info */}
          <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-3xl p-8 lg:p-12 mb-24">
            <h3 className="text-2xl font-bold text-[#4A4039] mb-8 text-center">사업 현황</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: '사업분야', value: '베이커리·카페 원재료 유통', icon: '🍞' },
                { label: '본사 위치', value: '경기도 하남시 샘재로 119번길 31', icon: '📍' },
                { label: '직원수', value: '29명', icon: '👥' },
                { label: '주요 고객수', value: '전국 400~500개 업체', icon: '🤝' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <p className="text-sm text-[#6B5D53] mb-2">{item.label}</p>
                  <p className="text-[#4A4039] font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Management Status */}
          <div className="mb-24">
            <h3 className="text-2xl font-bold text-[#4A4039] mb-8 text-center">경영 현황</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border-2 border-[#B8956A]/20 rounded-2xl p-8 text-center hover:border-[#B8956A] transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-[#6B5D53] mb-2">2024년 매출</p>
                <p className="text-3xl font-bold text-[#B8956A]">245.7억원</p>
              </div>
              <div className="bg-white border-2 border-[#B8956A]/20 rounded-2xl p-8 text-center hover:border-[#B8956A] transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <p className="text-sm text-[#6B5D53] mb-2">기술인증</p>
                <p className="text-xl font-bold text-[#4A4039]">우수기술기업</p>
              </div>
              <div className="bg-white border-2 border-[#B8956A]/20 rounded-2xl p-8 text-center hover:border-[#B8956A] transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <p className="text-sm text-[#6B5D53] mb-2">특허</p>
                <p className="text-sm font-bold text-[#4A4039]">제과제빵류 냉장/냉동장치</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-[#4A4039] rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl font-bold mb-8 text-center">연락처 정보</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm mb-1">전화번호</p>
                <p className="font-semibold">02) 471-1644~6</p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm mb-1">이메일</p>
                <p className="font-semibold">ace32865@hanmail.net</p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm mb-1">팩스</p>
                <p className="font-semibold">02) 476-1372</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#4A4039] to-[#3A3029] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/50 text-sm">
            Copyright 2010. 에이스유통주식회사 All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
