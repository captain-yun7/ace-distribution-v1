'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const mainSlides = [
    {
      title: '지루가능으면 빵도 맞았다!',
      subtitle: '최고로 엄선된 재료만을 제공해 드립니다',
      bgImage: '/images/main_visual_1.jpg'
    },
    {
      title: '지루가능으면 빵도 맞았다!',
      subtitle: '최고로 엄선된 재료만을 제공해 드립니다',
      bgImage: '/images/main_visual_2.jpg'
    },
    {
      title: '지루가능으면 빵도 맞았다!',
      subtitle: '최고로 엄선된 재료만을 제공해 드립니다',
      bgImage: '/images/main_visual_3.jpg'
    }
  ];

  // 자동 슬라이드 (5초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [mainSlides.length]);

  return (
    <div className="min-h-screen bg-white">

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img
                src="/images/logo.png"
                alt="에이스유통주식회사"
                className="h-12 w-auto"
              />
            </Link>

            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              <div className="relative group">
                <button className="text-gray-900 font-medium text-base py-8 hover:text-primary">
                  회사소개
                </button>
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/about/greeting" className="block px-6 py-3 hover:bg-gray-50">인사말</Link>
                  <Link href="/about/location" className="block px-6 py-3 hover:bg-gray-50">찾아오시는길</Link>
                </div>
              </div>

              <div className="relative group">
                <button className="text-gray-900 font-medium text-base py-8 hover:text-primary">
                  제품소개
                </button>
                <div className="absolute top-full left-0 w-56 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all max-h-96 overflow-y-auto">
                  <Link href="/products/all" className="block px-6 py-3 hover:bg-gray-50">전체</Link>
                  <Link href="/products/legume" className="block px-6 py-3 hover:bg-gray-50">두서류가공품</Link>
                  <Link href="/products/grain" className="block px-6 py-3 hover:bg-gray-50">곡류가공품</Link>
                  <Link href="/products/nut" className="block px-6 py-3 hover:bg-gray-50">견과가공품</Link>
                  <Link href="/products/dairy" className="block px-6 py-3 hover:bg-gray-50">유지 및 유가공품</Link>
                  <Link href="/products/coffee" className="block px-6 py-3 hover:bg-gray-50">커피오가공품</Link>
                  <Link href="/products/sugar" className="block px-6 py-3 hover:bg-gray-50">당류가공품</Link>
                  <Link href="/products/frozen" className="block px-6 py-3 hover:bg-gray-50">냉동생지류</Link>
                  <Link href="/products/flour" className="block px-6 py-3 hover:bg-gray-50">잡가루</Link>
                  <Link href="/products/vegetable" className="block px-6 py-3 hover:bg-gray-50">과채가공품</Link>
                  <Link href="/products/meat" className="block px-6 py-3 hover:bg-gray-50">축산가공품</Link>
                </div>
              </div>

              <div className="relative group">
                <button className="text-gray-900 font-medium text-base py-8 hover:text-primary">
                  커뮤니티
                </button>
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/community/notice" className="block px-6 py-3 hover:bg-gray-50">공지사항</Link>
                  <Link href="/community/news" className="block px-6 py-3 hover:bg-gray-50">보도자료</Link>
                  <Link href="/community/recipe" className="block px-6 py-3 hover:bg-gray-50">레시피</Link>
                  <Link href="/community/qna" className="block px-6 py-3 hover:bg-gray-50">Q&A</Link>
                </div>
              </div>

              <Link href="/contact" className="text-gray-900 font-medium text-base py-8 hover:text-primary">
                온라인 문의
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Slider */}
      <section className="relative h-[500px] overflow-hidden">
        {mainSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image with Blur */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.bgImage}')` }}
              />
              {/* Overlay for blur effect */}
              <div className="absolute inset-0 backdrop-blur-[2px] bg-white/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-2xl">
                <h2 className="text-5xl font-bold text-primary mb-4 drop-shadow-lg">{slide.title}</h2>
                <p className="text-xl text-gray-800 mb-8 drop-shadow">{slide.subtitle}</p>
                <Link
                  href="/products"
                  className="inline-block bg-primary text-white px-8 py-3 font-medium hover:bg-primary-dark transition shadow-lg"
                >
                  제품 보러가기
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {mainSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                currentSlide === index ? 'bg-primary' : 'bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Main Product Grid */}
            <div className="flex-1">
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: '🍞',
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
                    icon: '🥖',
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
                    icon: '🥐',
                    title: '아티장 베이커를 위한',
                    subtitle: '프리미엄 밀가루',
                    category: '밀가루',
                    categoryColor: 'bg-red-600',
                    productName: '아뺑드 밀가루 T65',
                    tags: ['#르빵임태언셰프', '#공동연구개발', '#아티장베이커'],
                    image: '/images/product3.jpg',
                    link: '/products/t65'
                  }
                ].map((product, index) => (
                  <Link
                    key={index}
                    href={product.link}
                    className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="p-6 bg-gray-50 flex items-center gap-3">
                      <div className="text-4xl">{product.icon}</div>
                      <div>
                        <div className="text-sm text-gray-600">{product.title}</div>
                        <div className="font-bold text-lg">{product.subtitle}</div>
                      </div>
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

              {/* Bottom Banner */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-100 rounded-lg p-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">👨‍🍳</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">고급 제빵 재료를 찾고 계신가요?</h3>
                    <p className="text-gray-600">프랑스 정통 제빵 재료로 최고의 퀄리티를 만들어보세요</p>
                  </div>
                </div>
                <Link
                  href="/products"
                  className="bg-primary text-white px-8 py-3 rounded font-medium hover:bg-primary-dark transition whitespace-nowrap"
                >
                  제품 보기
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 space-y-6">
              {/* Brand Categories */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6">주요 브랜드</h3>
                <div className="space-y-3">
                  {[
                    { name: '아뺑드', count: 45, color: 'bg-amber-600' },
                    { name: '르스쿠르', count: 28, color: 'bg-blue-600' },
                    { name: '그랑페르마쥬', count: 32, color: 'bg-red-600' },
                    { name: '기타 브랜드', count: 19, color: 'bg-gray-600' }
                  ].map((brand, index) => (
                    <Link
                      key={index}
                      href={`/brand/${brand.name}`}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${brand.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                          {brand.count}
                        </div>
                        <span className="font-medium text-lg group-hover:text-primary transition">
                          {brand.name}
                        </span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* All Category */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6">All Category</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: '두서류가공품', icon: '🫘' },
                    { name: '곡류가공품', icon: '🌾' },
                    { name: '유가공품', icon: '🧈' },
                    { name: '냉동생지류', icon: '❄️' },
                    { name: '잡가루', icon: '🍞' },
                    { name: '과채가공품', icon: '🥬' }
                  ].map((category, index) => (
                    <Link
                      key={index}
                      href={`/category/${category.name}`}
                      className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition group"
                    >
                      <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                        {category.icon}
                      </div>
                      <span className="text-xs font-medium text-center group-hover:text-primary transition leading-tight">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 공지사항 */}
            <div className="bg-white border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">공지사항</h3>
                <Link href="/community/notice" className="text-sm text-gray-600 hover:text-primary">
                  더보기 +
                </Link>
              </div>
              <ul className="divide-y divide-gray-200">
                {[
                  { title: '[공지] 2024년 설 연휴 배송 안내', date: '2024.01.15' },
                  { title: '[안내] 신제품 입고 안내 - 프랑스산 치즈', date: '2024.01.10' },
                  { title: '[공지] 홈페이지 리뉴얼 안내', date: '2024.01.05' },
                  { title: '[안내] 겨울철 배송 관련 안내사항', date: '2024.01.02' },
                ].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="block px-6 py-4 hover:bg-gray-50 group">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 group-hover:text-primary">{item.title}</span>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 보도자료 */}
            <div className="bg-white border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">보도자료</h3>
                <Link href="/community/news" className="text-sm text-gray-600 hover:text-primary">
                  더보기 +
                </Link>
              </div>
              <ul className="divide-y divide-gray-200">
                {[
                  { title: '에이스유통, 유럽 프리미엄 치즈 독점 공급 계약 체결', date: '2024.01.12' },
                  { title: '식품안전관리 우수업체 인증 획득', date: '2024.01.08' },
                  { title: '2023년 매출 전년 대비 30% 성장', date: '2024.01.03' },
                  { title: '친환경 물류센터 준공식 개최', date: '2023.12.28' },
                ].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="block px-6 py-4 hover:bg-gray-50 group">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 group-hover:text-primary">{item.title}</span>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Menu */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-2">제품 카탈로그</h3>
              <p className="mb-4 opacity-90">전체 제품 라인업을 확인하세요</p>
              <Link href="/catalog" className="inline-block border-2 border-white px-6 py-2 hover:bg-white hover:text-primary transition">
                다운로드
              </Link>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">1:1 문의</h3>
              <p className="mb-4 opacity-90">궁금한 사항을 문의해주세요</p>
              <Link href="/contact/inquiry" className="inline-block border-2 border-white px-6 py-2 hover:bg-white hover:text-primary transition">
                문의하기
              </Link>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2">대량구매</h3>
              <p className="mb-4 opacity-90">대량 구매 시 특별 할인 혜택</p>
              <Link href="/contact/bulk" className="inline-block border-2 border-white px-6 py-2 hover:bg-white hover:text-primary transition">
                상담신청
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6">
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
            <div className="text-sm text-gray-600 text-center md:text-right">
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
