'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('grain'); // grain, nut, sugar

  return (
    <div className="min-h-screen bg-white">

      {/* Floating Consultation Button */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
        <Link
          href="/contact"
          className="bg-[#A67C52] text-white px-4 py-6 rounded-l-lg shadow-xl hover:bg-[#B8956A] transition-all duration-300 flex flex-col items-center gap-2 font-bold"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span style={{ writingMode: 'vertical-rl' }} className="text-sm tracking-wider">
            상담문의
          </span>
        </Link>
      </div>

      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 group/header hover:bg-white hover:shadow-md bg-transparent">
        <div className="flex items-center h-24">
          {/* Logo - Far Left */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-all duration-300 pl-8 group">
            <img
              src="/images/logo.png"
              alt="에이스유통주식회사"
              className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Main Navigation - Spread Wide */}
          <nav className="hidden lg:flex items-center flex-1 justify-center space-x-20">
            {/* 회사 소개 */}
            <div className="relative group">
              <button className="text-white font-medium text-base py-8 whitespace-nowrap cursor-pointer relative tracking-wider group-hover/header:text-gray-800 transition-colors duration-200 uppercase">
                회사 소개
                {/* 호버 시 인디케이터 */}
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-[1px] flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-[1px] h-6 bg-gray-300"></span>
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                </span>
              </button>
              {/* 전체 너비 드롭다운 */}
              <div className="fixed left-0 right-0 top-[96px] bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-t border-gray-200 shadow-sm">
                <div className="flex justify-center items-center gap-12 py-6">
                  <Link href="/about/intro" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">기업소개</Link>
                  <Link href="/about/history" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">기업 연혁</Link>
                  <Link href="/about/philosophy" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">경영철학</Link>
                  <Link href="/about/business" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">사업장 소개</Link>
                  <Link href="/about/certification" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">조직 및 인증서</Link>
                </div>
              </div>
            </div>

            {/* 판매 제품 */}
            <div className="relative group">
              <button className="text-white font-medium text-base py-8 whitespace-nowrap cursor-pointer relative tracking-wider group-hover/header:text-gray-800 transition-colors duration-200 uppercase">
                판매 제품
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-[1px] flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-[1px] h-6 bg-gray-300"></span>
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                </span>
              </button>
              <div className="fixed left-0 right-0 top-[96px] bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-t border-gray-200 shadow-sm">
                <div className="flex justify-center items-center gap-10 py-6 flex-wrap max-w-7xl mx-auto">
                  <Link href="/products/all" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">전체</Link>
                  <Link href="/products/legume" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">두서류가공품</Link>
                  <Link href="/products/grain" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">곡류가공품</Link>
                  <Link href="/products/nut" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">견과가공품</Link>
                  <Link href="/products/dairy" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">유지 및 유가공품</Link>
                  <Link href="/products/coffee" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">커피오가공품</Link>
                  <Link href="/products/sugar" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">당류가공품</Link>
                  <Link href="/products/frozen" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">냉동생지류</Link>
                  <Link href="/products/flour" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">잡가루</Link>
                  <Link href="/products/vegetable" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">과채가공품</Link>
                  <Link href="/products/meat" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">축산가공품</Link>
                </div>
              </div>
            </div>

            {/* 콘텐츠 / 홍보 */}
            <div className="relative group">
              <button className="text-white font-medium text-base py-8 whitespace-nowrap cursor-pointer relative tracking-wider group-hover/header:text-gray-800 transition-colors duration-200 uppercase">
                콘텐츠 / 홍보
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-[1px] flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-[1px] h-6 bg-gray-300"></span>
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                </span>
              </button>
              <div className="fixed left-0 right-0 top-[96px] bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-t border-gray-200 shadow-sm">
                <div className="flex justify-center items-center gap-12 py-6">
                  <Link href="/content/recipe" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">레시피</Link>
                  <Link href="/content/trend" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">트렌드 리포트</Link>
                  <Link href="/content/news" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">언론보도</Link>
                </div>
              </div>
            </div>

            {/* 기업 문화 */}
            <div className="relative group">
              <button className="text-white font-medium text-base py-8 whitespace-nowrap cursor-pointer relative tracking-wider group-hover/header:text-gray-800 transition-colors duration-200 uppercase">
                기업 문화
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-[1px] flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-[1px] h-6 bg-gray-300"></span>
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                </span>
              </button>
              <div className="fixed left-0 right-0 top-[96px] bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-t border-gray-200 shadow-sm">
                <div className="flex justify-center items-center gap-12 py-6">
                  <Link href="/culture/internal" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">사내 문화</Link>
                  <Link href="/culture/social" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">사회 공헌</Link>
                  <Link href="/culture/partnership" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">협력 사례</Link>
                </div>
              </div>
            </div>

            {/* 고객 지원 */}
            <div className="relative group">
              <button className="text-white font-medium text-base py-8 whitespace-nowrap cursor-pointer relative tracking-wider group-hover/header:text-gray-800 transition-colors duration-200 uppercase">
                고객 지원
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-[1px] flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-[1px] h-6 bg-gray-300"></span>
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                </span>
              </button>
              <div className="fixed left-0 right-0 top-[96px] bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-t border-gray-200 shadow-sm">
                <div className="flex justify-center items-center gap-12 py-6">
                  <Link href="/support/faq" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">FAQ</Link>
                  <Link href="/support/notice" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">공지사항</Link>
                  <Link href="/support/resources" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">자료실</Link>
                  <Link href="/support/contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">고객문의</Link>
                  <Link href="/support/location" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">찾아오시는 길</Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Right Side - Login/Language */}
          <div className="hidden lg:flex items-center gap-3 pr-8">
            <Link href="/login" className="text-white text-base font-bold hover:text-primary drop-shadow-md transition-all px-3 py-2 rounded-lg hover:bg-white/40 group-hover/header:text-gray-900 group-hover/header:drop-shadow-none">로그인</Link>
            <span className="text-white/70 font-bold group-hover/header:text-gray-400">|</span>
            <Link href="/register" className="text-white text-base font-bold hover:text-primary drop-shadow-md transition-all px-3 py-2 rounded-lg hover:bg-white/40 group-hover/header:text-gray-900 group-hover/header:drop-shadow-none">회원가입</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/main_visual_1.jpg')` }}
          />
          {/* Beige overlay for warm tone */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A4039]/60 via-[#4A4039]/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-4xl">
            <h1 className="text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
              Right Food<br />Right Person
            </h1>
            <p className="text-2xl text-white/95 mb-12 font-medium leading-relaxed">
              생명 존중 정신을 바탕으로<br />
              인류 건강문화에 기여하겠습니다.
            </p>
            <Link
              href="/products"
              className="inline-block bg-[#B8956A] text-white px-12 py-5 font-bold text-lg hover:bg-[#A67C52] transition-all duration-300 shadow-xl hover:shadow-2xl rounded-sm"
            >
              제품 둘러보기
            </Link>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 text-white text-center hidden lg:block">
          <div className="text-sm font-medium mb-3 tracking-wider">SCROLL</div>
          <div className="w-12 h-12 border-2 border-white/80 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 bg-[#FAF6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Statement */}
          <div className="text-center mb-24">
            <h2 className="text-7xl font-bold text-[#4A4039] mb-8 tracking-tight uppercase" style={{ letterSpacing: '-0.02em' }}>
              Quality is Our Mission
            </h2>
            <p className="text-2xl text-[#6B5D53] font-light max-w-3xl mx-auto leading-relaxed">
              최고의 식재료로 귀사의 성공을 만들어가는 파트너
            </p>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {/* Value 1 - Widest Variety (Bread/Bakery) */}
            <div className="text-center group">
              <div className="mb-8 transition-transform duration-300 group-hover:scale-110">
                <svg className="w-32 h-32 mx-auto" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Croissant/Bread */}
                  <ellipse cx="60" cy="60" rx="45" ry="35" fill="#D4B896" opacity="0.3"/>
                  <path d="M25 55 Q30 35, 50 30 Q70 28, 85 35 Q95 40, 95 60 Q95 75, 85 82 Q70 88, 50 85 Q30 82, 25 70 Z"
                    fill="#B8956A" opacity="0.6"/>
                  {/* Texture lines */}
                  <path d="M35 50 Q45 48, 55 50" stroke="#8B6F47" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
                  <path d="M40 60 Q55 58, 70 60" stroke="#8B6F47" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
                  <path d="M35 70 Q50 68, 65 70" stroke="#8B6F47" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
                  {/* Scoring marks */}
                  <circle cx="45" cy="45" r="2" fill="#A67C52"/>
                  <circle cx="60" cy="48" r="2" fill="#A67C52"/>
                  <circle cx="75" cy="50" r="2" fill="#A67C52"/>
                  <circle cx="50" cy="65" r="2" fill="#A67C52"/>
                  <circle cx="68" cy="68" r="2" fill="#A67C52"/>
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-[#4A4039] mb-3 uppercase tracking-wide">Widest Variety</h3>
              <div className="w-16 h-1 bg-[#B8956A] mx-auto mb-4"></div>
              <p className="text-[#6B5D53] leading-relaxed text-lg font-light">
                10개 품목 1,000여 종의<br />
                다양한 식자재 라인업
              </p>
            </div>

            {/* Value 2 - Quality Sourcing (Wheat/Grain) */}
            <div className="text-center group">
              <div className="mb-8 transition-transform duration-300 group-hover:scale-110">
                <svg className="w-32 h-32 mx-auto" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Wheat stalks */}
                  <g>
                    {/* Left wheat */}
                    <path d="M40 90 L40 35" stroke="#A67C52" strokeWidth="3" strokeLinecap="round"/>
                    <ellipse cx="40" cy="40" rx="8" ry="4" fill="#D4B896"/>
                    <ellipse cx="40" cy="48" rx="9" ry="5" fill="#D4B896"/>
                    <ellipse cx="40" cy="57" rx="10" ry="5" fill="#B8956A"/>
                    <ellipse cx="40" cy="66" rx="9" ry="5" fill="#B8956A"/>
                    <ellipse cx="40" cy="74" rx="8" ry="4" fill="#D4B896"/>

                    {/* Center wheat */}
                    <path d="M60 95 L60 30" stroke="#8B6F47" strokeWidth="3.5" strokeLinecap="round"/>
                    <ellipse cx="60" cy="35" rx="9" ry="5" fill="#D4B896"/>
                    <ellipse cx="60" cy="44" rx="11" ry="6" fill="#D4B896"/>
                    <ellipse cx="60" cy="54" rx="12" ry="6" fill="#B8956A"/>
                    <ellipse cx="60" cy="64" rx="11" ry="6" fill="#B8956A"/>
                    <ellipse cx="60" cy="74" rx="10" ry="5" fill="#D4B896"/>
                    <ellipse cx="60" cy="83" rx="9" ry="4" fill="#D4B896"/>

                    {/* Right wheat */}
                    <path d="M80 90 L80 35" stroke="#A67C52" strokeWidth="3" strokeLinecap="round"/>
                    <ellipse cx="80" cy="40" rx="8" ry="4" fill="#D4B896"/>
                    <ellipse cx="80" cy="48" rx="9" ry="5" fill="#D4B896"/>
                    <ellipse cx="80" cy="57" rx="10" ry="5" fill="#B8956A"/>
                    <ellipse cx="80" cy="66" rx="9" ry="5" fill="#B8956A"/>
                    <ellipse cx="80" cy="74" rx="8" ry="4" fill="#D4B896"/>
                  </g>
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-[#4A4039] mb-3 uppercase tracking-wide">Quality Sourcing</h3>
              <div className="w-16 h-1 bg-[#B8956A] mx-auto mb-4"></div>
              <p className="text-[#6B5D53] leading-relaxed text-lg font-light">
                HACCP 인증 시스템으로<br />
                검증된 프리미엄 품질
              </p>
            </div>

            {/* Value 3 - Best Pricing (Nuts/Seeds) */}
            <div className="text-center group">
              <div className="mb-8 transition-transform duration-300 group-hover:scale-110">
                <svg className="w-32 h-32 mx-auto" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Mixed nuts arrangement */}
                  {/* Almond */}
                  <ellipse cx="45" cy="45" rx="12" ry="18" fill="#D4B896" transform="rotate(-25 45 45)"/>
                  <path d="M45 35 Q45 40, 45 50" stroke="#A67C52" strokeWidth="1.5"/>

                  {/* Walnut */}
                  <circle cx="75" cy="50" r="16" fill="#B8956A" opacity="0.8"/>
                  <path d="M65 45 Q75 50, 85 45" stroke="#8B6F47" strokeWidth="2" fill="none"/>
                  <path d="M65 55 Q75 50, 85 55" stroke="#8B6F47" strokeWidth="2" fill="none"/>

                  {/* Hazelnut */}
                  <circle cx="40" cy="75" r="13" fill="#A67C52"/>
                  <circle cx="40" cy="75" r="8" fill="#D4B896" opacity="0.6"/>

                  {/* Cashew */}
                  <path d="M70 75 Q80 72, 85 78 Q85 85, 78 88 Q68 88, 65 82 Z" fill="#D4B896"/>
                  <path d="M72 80 Q77 78, 80 81" stroke="#B8956A" strokeWidth="1.5" fill="none"/>

                  {/* Small seeds scattered */}
                  <circle cx="58" cy="40" r="3" fill="#8B6F47"/>
                  <circle cx="62" cy="68" r="3" fill="#8B6F47"/>
                  <ellipse cx="55" cy="82" rx="2.5" ry="4" fill="#A67C52" transform="rotate(20 55 82)"/>
                  <ellipse cx="68" cy="42" rx="2.5" ry="4" fill="#A67C52" transform="rotate(-30 68 42)"/>
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-[#4A4039] mb-3 uppercase tracking-wide">Best Pricing</h3>
              <div className="w-16 h-1 bg-[#B8956A] mx-auto mb-4"></div>
              <p className="text-[#6B5D53] leading-relaxed text-lg font-light">
                직수입 유통 시스템으로<br />
                최고의 가격 경쟁력 제공
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#4A4039] mb-4">우리의 이야기</h2>
            <p className="text-xl text-[#6B5D53]">에이스유통과 함께한 30년의 여정</p>
          </div>

          {/* Story Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
                  alt="30년의 전통"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A4039]/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">30년의 전통</h3>
                  <p className="text-white/90">1994년부터 이어온 신뢰의 역사</p>
                </div>
              </div>
              <Link href="/about/greeting" className="inline-flex items-center text-[#B8956A] font-semibold hover:text-[#A67C52] transition">
                자세히 보기
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop"
                  alt="전국 유통 네트워크"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A4039]/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">전국 유통 네트워크</h3>
                  <p className="text-white/90">어디서나 빠르고 정확하게</p>
                </div>
              </div>
              <Link href="/about/location" className="inline-flex items-center text-[#B8956A] font-semibold hover:text-[#A67C52] transition">
                자세히 보기
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop"
                  alt="함께 성장하는 파트너십"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A4039]/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">함께 성장하는 파트너십</h3>
                  <p className="text-white/90">고객의 성공이 우리의 목표입니다</p>
                </div>
              </div>
              <Link href="/about/greeting" className="inline-flex items-center text-[#B8956A] font-semibold hover:text-[#A67C52] transition">
                자세히 보기
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-[#FFF8F0] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-8 left-[15%] w-64 h-64">
            <svg viewBox="0 0 200 200" className="text-primary">
              {/* Shopping bag */}
              <rect x="60" y="70" width="80" height="100" rx="5" fill="currentColor" opacity="0.3"/>
              <path d="M75,70 L75,60 C75,45 85,35 100,35 C115,35 125,45 125,60 L125,70" stroke="currentColor" strokeWidth="4" fill="none"/>
            </svg>
          </div>
          <div className="absolute top-8 right-[15%] w-64 h-64">
            <svg viewBox="0 0 200 200" className="text-secondary">
              {/* Food packaging boxes */}
              <rect x="40" y="60" width="50" height="50" fill="currentColor" opacity="0.2" rx="3"/>
              <rect x="100" y="60" width="50" height="50" fill="currentColor" opacity="0.25" rx="3"/>
              <rect x="70" y="120" width="50" height="50" fill="currentColor" opacity="0.15" rx="3"/>
            </svg>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-5xl font-bold text-[#4A4039] mb-3">추천제품</h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-[#B8956A] to-transparent"></div>
            </div>
            <p className="text-[#6B5D53] mt-4 text-lg">고객님을 위한 엄선된 프리미엄 식자재</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex gap-4 mb-8 border-b border-[#E8DCC8] justify-center">
              <button
                  onClick={() => setActiveTab('grain')}
                  className={`px-6 py-3 font-semibold transition-colors relative cursor-pointer ${
                    activeTab === 'grain'
                      ? 'text-[#B8956A]'
                      : 'text-[#8B7D73] hover:text-[#6B5D53]'
                  }`}
                >
                  곡류가공품
                  {activeTab === 'grain' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8956A]"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('nut')}
                  className={`px-6 py-3 font-semibold transition-colors relative cursor-pointer ${
                    activeTab === 'nut'
                      ? 'text-[#B8956A]'
                      : 'text-[#8B7D73] hover:text-[#6B5D53]'
                  }`}
                >
                  견과가공품
                  {activeTab === 'nut' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8956A]"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('sugar')}
                  className={`px-6 py-3 font-semibold transition-colors relative cursor-pointer ${
                    activeTab === 'sugar'
                      ? 'text-[#B8956A]'
                      : 'text-[#8B7D73] hover:text-[#6B5D53]'
                  }`}
                >
                  당류가공품
                  {activeTab === 'sugar' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8956A]"></div>
                  )}
                </button>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {(activeTab === 'grain' ? [
                {
                  title: '프리미엄',
                  subtitle: '제빵개량제',
                  category: '제빵재료',
                  categoryColor: 'bg-amber-600',
                  productName: '아뺑드 DH PRO (제빵개량제)',
                  tags: ['#식빵및과자빵', '#포카치아', '#밀가루100%대비'],
                  image: '/images/product1.png',
                  link: '/products/dhpro'
                },
                {
                  title: '바게트, 치아바타',
                  subtitle: '프랑스산 밀가루',
                  category: '밀가루',
                  categoryColor: 'bg-orange-500',
                  productName: '아뺑드 밀가루 T55',
                  tags: ['#바게트', '#치아바타', '#여러분야의빵'],
                  image: '/images/product2.jpg',
                  link: '/products/t55'
                },
                {
                  title: '아티장 베이커를 위한',
                  subtitle: '프리미엄 밀가루',
                  category: '밀가루',
                  categoryColor: 'bg-red-600',
                  productName: '아뺑드 밀가루 T65',
                  tags: ['#르빵임태언셰프', '#공동연구개발', '#아티장베이커'],
                  image: '/images/product3.jpg',
                  link: '/products/t65'
                }
              ] : activeTab === 'nut' ? [
                {
                  title: '프리미엄',
                  subtitle: '아몬드 슬라이스',
                  category: '견과가공품',
                  categoryColor: 'bg-amber-700',
                  productName: '아몬드 슬라이스 (Almond Slice)',
                  tags: ['#제과제빵', '#토핑', '#고소함'],
                  image: '/images/GOODS2_1505956856.jpg',
                  link: '/products/almond-slice'
                },
                {
                  title: '고급',
                  subtitle: '피칸',
                  category: '견과가공품',
                  categoryColor: 'bg-amber-600',
                  productName: '피칸 (Pecan)',
                  tags: ['#프리미엄', '#제과', '#건강간식'],
                  image: '/images/GOODS2_1506042521.jpg',
                  link: '/products/pecan'
                },
                {
                  title: '천연',
                  subtitle: '코코넛 파우더',
                  category: '견과가공품',
                  categoryColor: 'bg-green-700',
                  productName: '코코넛 파우더 (Coconut Powder)',
                  tags: ['#천연재료', '#디저트', '#베이킹'],
                  image: '/images/GOODS2_1619680932.png',
                  link: '/products/coconut'
                }
              ] : [
                {
                  title: '업소용',
                  subtitle: '물엿',
                  category: '당류가공품',
                  categoryColor: 'bg-yellow-700',
                  productName: '업소용 물엿',
                  tags: ['#요리용', '#제과제빵', '#대용량'],
                  image: '/images/GOODS2_1619681459.png',
                  link: '/products/syrup'
                },
                {
                  title: '제과제빵용',
                  subtitle: '백설탕',
                  category: '당류가공품',
                  categoryColor: 'bg-white',
                  productName: '백설탕 (White Sugar)',
                  tags: ['#제과제빵', '#요리', '#정제'],
                  image: '/images/GOODS2_1619681613.png',
                  link: '/products/white-sugar'
                },
                {
                  title: '프리미엄',
                  subtitle: '글루코스 시럽',
                  category: '당류가공품',
                  categoryColor: 'bg-amber-500',
                  productName: '글루코스 시럽 (Glucose Syrup)',
                  tags: ['#제과', '#글레이즈', '#고급'],
                  image: '/images/GOODS2_1619681845.png',
                  link: '/products/glucose'
                }
                ]).map((product, index) => (
                  <Link
                    key={index}
                    href={product.link}
                    className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="p-6 bg-gray-50">
                      <div className="text-sm text-gray-600">{product.title}</div>
                      <div className="font-bold text-lg">{product.subtitle}</div>
                    </div>

                    {/* Product Image */}
                    <div className="relative aspect-[4/3] bg-white overflow-hidden flex items-center justify-center p-6">
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Footer */}
                    <div className="p-6">
                      <div className="mb-3">
                        <span className={`inline-block ${product.categoryColor} text-white text-xs font-bold px-3 py-1 rounded`}>
                          {product.category}
                        </span>
                        <span className="inline-block ml-2 bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded">
                          프랑스산
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition">
                        {product.productName}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs text-gray-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All Products Button */}
              <div className="flex justify-center mt-12">
                <Link
                  href="/products/all"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#B8956A] text-white font-bold text-lg rounded-lg hover:bg-[#A67C52] transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  모든 제품 보기
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-[15%] w-64 h-64">
            <svg viewBox="0 0 200 200" className="text-[#B8956A]">
              <rect x="50" y="50" width="100" height="100" fill="currentColor" opacity="0.3" rx="10"/>
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="4"/>
              <path d="M70,100 L90,120 L130,80" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute top-8 right-[12%] w-72 h-72">
            <svg viewBox="0 0 200 200" className="text-[#B8956A]">
              <polygon points="100,20 180,180 20,180" fill="currentColor" opacity="0.2"/>
            </svg>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-5xl font-bold text-[#4A4039] mb-3">왜 에이스유통인가?</h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-[#B8956A] to-transparent"></div>
            </div>
            <p className="text-[#6B5D53] mt-4 text-lg">30년 전통의 신뢰와 품질로 함께합니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - 품질관리 */}
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
                  alt="품질관리"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">철저한 품질관리</h3>
              <p className="text-gray-600">HACCP 인증을 통한 체계적인 품질관리 시스템으로 안전한 식품을 제공합니다</p>
            </div>

            {/* Card 2 - 신속배송 */}
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop"
                  alt="신속배송"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">신속한 배송</h3>
              <p className="text-gray-600">전국 당일 배송 시스템으로 신선한 상태의 제품을 빠르게 전달합니다</p>
            </div>

            {/* Card 3 - 고객만족 */}
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
                  alt="고객서비스"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">전문 상담 서비스</h3>
              <p className="text-gray-600">전문 상담사가 제품 선택부터 구매까지 친절하게 안내해드립니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <section className="py-20 bg-[#FAF6F1] relative">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-visible">
          <div className="absolute top-0 left-[15%] w-64 h-64">
            <svg viewBox="0 0 200 200" className="text-[#B8956A]">
              <rect x="40" y="60" width="120" height="80" fill="currentColor" opacity="0.3" rx="5"/>
              <line x1="60" y1="80" x2="140" y2="80" stroke="currentColor" strokeWidth="3"/>
              <line x1="60" y1="100" x2="140" y2="100" stroke="currentColor" strokeWidth="3"/>
              <line x1="60" y1="120" x2="120" y2="120" stroke="currentColor" strokeWidth="3"/>
            </svg>
          </div>
          <div className="absolute top-4 right-[15%] w-64 h-64">
            <svg viewBox="0 0 200 200" className="text-[#8B6F47]">
              <path d="M50,100 L100,50 L150,100 L100,150 Z" fill="currentColor" opacity="0.2"/>
              <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-5xl font-bold text-[#4A4039] mb-3">최신소식</h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-[#B8956A] to-transparent"></div>
            </div>
            <p className="text-[#6B5D53] mt-4 text-lg">에이스유통의 새로운 소식을 전합니다</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 공지사항 */}
            <div className="bg-white border border-[#E8DCC8]">
              <div className="border-b border-[#E8DCC8] px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#4A4039]">공지사항</h3>
                <Link href="/community/notice" className="text-sm text-[#6B5D53] hover:text-[#B8956A]">
                  더보기 +
                </Link>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { title: '[공지] 2024년 설 연휴 배송 안내', date: '2024.01.15', image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=300&h=200&fit=crop' },
                  { title: '[안내] 신제품 입고 안내 - 프랑스산 치즈', date: '2024.01.10', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=200&fit=crop' },
                  { title: '[공지] 홈페이지 리뉴얼 안내', date: '2024.01.05', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop' },
                  { title: '[안내] 겨울철 배송 관련 안내사항', date: '2024.01.02', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&h=200&fit=crop' },
                ].map((item, index) => (
                  <Link key={index} href="#" className="block hover:bg-[#FFF8F0] group">
                    <div className="flex gap-4 p-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[#4A4039] group-hover:text-[#B8956A] font-medium mb-1 truncate">
                          {item.title}
                        </div>
                        <div className="text-sm text-[#8B7D73]">{item.date}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 보도자료 */}
            <div className="bg-white border border-[#E8DCC8]">
              <div className="border-b border-[#E8DCC8] px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-[#4A4039]">보도자료</h3>
                <Link href="/community/news" className="text-sm text-[#6B5D53] hover:text-[#B8956A]">
                  더보기 +
                </Link>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { title: '에이스유통, 유럽 프리미엄 치즈 독점 공급 계약 체결', date: '2024.01.12', image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=300&h=200&fit=crop' },
                  { title: '식품안전관리 우수업체 인증 획득', date: '2024.01.08', image: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=300&h=200&fit=crop' },
                  { title: '2023년 매출 전년 대비 30% 성장', date: '2024.01.03', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop' },
                  { title: '친환경 물류센터 준공식 개최', date: '2023.12.28', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&h=200&fit=crop' },
                ].map((item, index) => (
                  <Link key={index} href="#" className="block hover:bg-[#FFF8F0] group">
                    <div className="flex gap-4 p-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[#4A4039] group-hover:text-[#B8956A] font-medium mb-1 truncate">
                          {item.title}
                        </div>
                        <div className="text-sm text-[#8B7D73]">{item.date}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#A67C52] to-[#B8956A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            최고의 식자재 파트너가 필요하신가요?
          </h2>
          <p className="text-xl text-white/95 mb-8">
            30년 전통의 에이스유통이 귀사의 성공적인 비즈니스를 도와드립니다
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#A67C52] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#FFF8F0] transition-colors shadow-xl"
          >
            상담 신청하기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F5EFE7] border-t border-[#E8DCC8] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/images/logo.png"
                alt="에이스유통주식회사"
                className="h-10 w-auto"
              />
            </div>

            {/* Company Info */}
            <div className="text-sm text-[#6B5D53] text-center md:text-right">
              <p className="mb-1">
                대표 : 안종철 | 주소 : 경기도 의왕시 생포로 119번길 31(전현동 302-3) | Tel. 02) 471-1644~6 | Fax. 02) 476-1372
              </p>
              <p>
                Email. ace32865@hanmail.net | ⓒ Copyright 2016. 에이스유통(주) All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
