'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F0] overflow-x-hidden">

      {/* Bread-shaped Floating Consultation Button */}
      <div className="fixed right-4 bottom-6 z-40 group">
        <Link
          href="/support/contact"
          className="relative flex flex-col items-center"
        >
          <div className="relative w-20 h-24 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
            <svg viewBox="0 0 80 96" className="w-full h-full drop-shadow-lg">
              <ellipse cx="40" cy="60" rx="36" ry="32" fill="url(#breadGradient)" />
              <ellipse cx="40" cy="36" rx="32" ry="28" fill="url(#breadTopGradient)" />
              <ellipse cx="28" cy="30" rx="12" ry="8" fill="rgba(255,255,255,0.3)" />
              <path d="M25 45 Q40 38 55 45" stroke="#A67C52" strokeWidth="2" fill="none" opacity="0.4" />
              <path d="M28 55 Q40 48 52 55" stroke="#A67C52" strokeWidth="1.5" fill="none" opacity="0.3" />
              <defs>
                <linearGradient id="breadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D4A574" />
                  <stop offset="100%" stopColor="#B8956A" />
                </linearGradient>
                <linearGradient id="breadTopGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E8C9A0" />
                  <stop offset="50%" stopColor="#D4A574" />
                  <stop offset="100%" stopColor="#C4956A" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pt-2">
              <svg className="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="10" r="1.5" fill="currentColor"/>
                <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
          </div>
          <span className="mt-1 text-xs font-bold text-[#8B6F47] bg-white/90 px-3 py-1 rounded-full shadow-md backdrop-blur-sm group-hover:bg-[#B8956A] group-hover:text-white transition-all duration-300">
            상담문의
          </span>
        </Link>
      </div>

      {/* Premium Header with Enhanced Visual Hierarchy */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 group/header hover:bg-white hover:shadow-[0_4px_30px_rgba(0,0,0,0.1)] bg-gradient-to-b from-black/40 to-transparent">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between h-20 lg:h-24 px-6 lg:px-12">
          {/* Logo with Premium Styling */}
          <Link href="/" className="flex items-center transition-all duration-500 group/logo relative">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="text-4xl font-black tracking-tight text-white group-hover/header:text-[#8B6F47] transition-all duration-500 drop-shadow-lg">
                  ACE
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B8956A] to-[#D4A574] group-hover/logo:w-full transition-all duration-500"></span>
              </div>
              <div className="hidden sm:flex flex-col border-l-2 border-white/30 group-hover/header:border-[#B8956A]/30 pl-4 transition-all duration-500">
                <span className="text-sm font-bold text-white group-hover/header:text-[#4A4039] transition-all duration-500 tracking-wide">에이스유통</span>
                <span className="text-xs font-medium text-white/70 group-hover/header:text-[#6B5D53] transition-all duration-500">주식회사</span>
              </div>
            </div>
          </Link>

          {/* Premium Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-2">
              {[
                { title: '회사 소개', items: [
                  { name: '기업소개', href: '/about/intro', desc: '에이스유통을 소개합니다' },
                  { name: '기업 연혁', href: '/about/history', desc: '30년의 발자취' },
                  { name: '경영철학', href: '/about/philosophy', desc: '우리의 가치와 비전' },
                  { name: '사업장 소개', href: '/about/business', desc: '전국 물류 네트워크' },
                  { name: '조직 및 인증서', href: '/about/certification', desc: '신뢰의 증명' }
                ]},
                { title: '판매 제품', items: [
                  { name: '전체', href: '/products/all', desc: '모든 제품 보기' },
                  { name: '두서류가공품', href: '/products/legume', desc: '콩류 가공식품' },
                  { name: '곡류가공품', href: '/products/grain', desc: '밀가루, 전분류' },
                  { name: '견과가공품', href: '/products/nut', desc: '아몬드, 호두 등' },
                  { name: '유지 및 유가공품', href: '/products/dairy', desc: '버터, 크림류' },
                  { name: '커피오가공품', href: '/products/coffee', desc: '커피, 코코아' },
                  { name: '당류가공품', href: '/products/sugar', desc: '설탕, 시럽류' },
                  { name: '냉동생지류', href: '/products/frozen', desc: '냉동 베이커리' },
                  { name: '잡가루', href: '/products/flour', desc: '특수 가루류' },
                  { name: '과채가공품', href: '/products/vegetable', desc: '과일, 채소류' },
                  { name: '축산가공품', href: '/products/meat', desc: '육류 가공품' }
                ]},
                { title: '콘텐츠 / 홍보', items: [
                  { name: '레시피', href: '/content/recipe', desc: '셰프의 레시피' },
                  { name: '트렌드 리포트', href: '/content/trend', desc: '업계 최신 트렌드' },
                  { name: '언론보도', href: '/content/news', desc: '미디어 소식' }
                ]},
                { title: '기업 문화', items: [
                  { name: '사내 문화', href: '/culture/internal', desc: '함께 성장하는 문화' },
                  { name: '사회 공헌', href: '/culture/social', desc: '나눔의 가치 실현' },
                  { name: '협력 사례', href: '/culture/partnership', desc: '파트너십 스토리' }
                ]},
                { title: '고객 지원', items: [
                  { name: 'FAQ', href: '/support/faq', desc: '자주 묻는 질문' },
                  { name: '공지사항', href: '/support/notice', desc: '새로운 소식' },
                  { name: '자료실', href: '/support/resources', desc: '카탈로그, 인증서' },
                  { name: '고객문의', href: '/support/contact', desc: '1:1 상담 신청' },
                  { name: '찾아오시는 길', href: '/support/location', desc: '오시는 방법' }
                ]}
              ].map((menu) => (
                <li key={menu.title} className="relative group">
                  <button className="relative px-5 py-3 text-[15px] font-semibold text-white group-hover/header:text-[#4A4039] transition-all duration-500 tracking-wide">
                    <span className="relative z-10">{menu.title}</span>
                    {/* Elegant underline animation */}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#B8956A] to-[#D4A574] group-hover:w-[calc(100%-20px)] transition-all duration-500 rounded-full"></span>
                    {/* Subtle glow on hover */}
                    <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 group-hover/header:bg-[#B8956A]/5 transition-all duration-500"></span>
                  </button>

                  {/* Premium Dropdown Menu */}
                  <div className="fixed left-0 right-0 top-20 lg:top-24 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-white/98 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border-t border-[#B8956A]/10"></div>

                    {/* Content */}
                    <div className="relative max-w-6xl mx-auto px-8 py-10">
                      {/* Menu Title */}
                      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                        <div className="w-1 h-8 bg-gradient-to-b from-[#B8956A] to-[#D4A574] rounded-full"></div>
                        <h3 className="text-2xl font-bold text-[#4A4039]">{menu.title}</h3>
                      </div>

                      {/* Menu Items Grid */}
                      <div className={`grid gap-3 ${menu.items.length > 6 ? 'grid-cols-4' : menu.items.length > 3 ? 'grid-cols-3' : 'grid-cols-3'}`}>
                        {menu.items.map((item, idx) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-br hover:from-[#FAF6F1] hover:to-white transition-all duration-300 border border-transparent hover:border-[#B8956A]/10"
                            style={{ animationDelay: `${idx * 50}ms` }}
                          >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B8956A]/10 to-[#D4A574]/10 flex items-center justify-center flex-shrink-0 group-hover/item:from-[#B8956A] group-hover/item:to-[#D4A574] transition-all duration-300">
                              <svg className="w-5 h-5 text-[#B8956A] group-hover/item:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="block text-[15px] font-semibold text-[#4A4039] group-hover/item:text-[#B8956A] transition-colors duration-300 mb-1">
                                {item.name}
                              </span>
                              <span className="block text-xs text-[#8B7D73] truncate">
                                {item.desc}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-white group-hover/header:text-[#4A4039] transition-colors duration-500">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section - Bakery Style with Full Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Full Background Image/Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover animate-hero-zoom"
            poster="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=3000&auto=format&fit=crop"
          >
            <source src="https://player.vimeo.com/external/434045526.hd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f86e7fab02&profile_id=175&download=1" type="video/mp4" />
          </video>

          {/* Warm Bakery Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A4039]/90 via-[#4A4039]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#A67C52]/20 via-transparent to-[#4A4039]/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="mb-8 animate-fadeInUp">
                <span className="inline-block px-5 py-2 bg-[#A67C52]/80 backdrop-blur-sm text-white text-sm font-bold rounded-full">
                  프리미엄 식자재 유통 전문
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 animate-fadeInUp animation-delay-200">
                <span className="block">갓 구운 신선함,</span>
                <span className="block text-[#D4A574]">당신만을 위해!</span>
              </h1>

              {/* Decorative Line */}
              <div className="flex items-center gap-4 mb-8 animate-fadeInUp animation-delay-400">
                <div className="w-24 h-[2px] bg-gradient-to-r from-[#D4A574] to-[#A67C52]"></div>
                <div className="w-2 h-2 bg-[#D4A574] rounded-full animate-pulse"></div>
              </div>

              {/* Description */}
              <p className="text-xl text-white/90 leading-relaxed mb-10 max-w-xl animate-fadeInUp animation-delay-400">
                15년 전통의 에이스유통이 엄선한 프리미엄 베이커리 원재료로
                당신의 특별한 레시피를 완성하세요.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 animate-fadeInUp animation-delay-600">
                <Link
                  href="/products/all"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-[#A67C52] text-white font-bold rounded-full hover:bg-[#8B6F47] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  제품 보기
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/about/intro"
                  className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-white/50 text-white font-bold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  회사 소개
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-10">
          <div className="text-xs text-white/70 tracking-[0.3em] uppercase mb-3">Scroll</div>
          <div className="w-8 h-12 border-2 border-white/50 rounded-full mx-auto flex justify-center">
            <div className="w-1.5 h-3 bg-white/80 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        ref={(el) => { sectionsRef.current[0] = el; }}
        id="whychoose"
        className="py-24 bg-[#FDF8F3]"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className={`text-center mb-16 ${isVisible.whychoose ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🌾</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#4A4039] mb-4 font-display">
              Why Choose Us?
            </h2>
            <p className="text-[#6B5D53] max-w-2xl mx-auto">
              에이스유통이 15년간 쌓아온 신뢰와 전문성으로 고객님의 성공적인 비즈니스를 지원합니다.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
                title: '프리미엄 원재료',
                subtitle: 'Premium Ingredients',
                desc: '전 세계에서 엄선한 최고급 베이커리 원재료만을 취급합니다. 품질 하나는 타협하지 않습니다.',
                link: '/products/all'
              },
              {
                image: 'https://images.unsplash.com/photo-1556217477-d325251ece38?w=600&h=400&fit=crop',
                title: '전문 컨설팅',
                subtitle: 'Expert Consulting',
                desc: '베이커리 전문가들이 제품 선택부터 레시피 개발까지 맞춤형 솔루션을 제공합니다.',
                link: '/support/contact'
              },
              {
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
                title: '신속 배송',
                subtitle: 'Fast Delivery',
                desc: '자체 물류 시스템으로 당일/익일 배송을 보장합니다. 신선함을 그대로 전달합니다.',
                link: '/about/business'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`group bg-[#FAF6F1] rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 ${
                  isVisible.whychoose ? `animate-fadeInScale animation-delay-${index * 200}` : 'opacity-0'
                }`}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <span className="text-xs font-bold text-[#A67C52] tracking-wider uppercase">
                    {item.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-[#4A4039] mt-2 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[#6B5D53] mb-6 leading-relaxed">
                    {item.desc}
                  </p>
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-2 text-[#A67C52] font-semibold group-hover:gap-4 transition-all"
                  >
                    자세히 보기
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section
        ref={(el) => { sectionsRef.current[1] = el; }}
        id="products"
        className="py-24 bg-[#FAF6F1]"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className={`text-center mb-16 ${isVisible.products ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="text-sm font-bold text-[#A67C52] tracking-widest uppercase mb-4 block font-display italic">
              Our Products
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#4A4039] mb-4">
              제품 카테고리
            </h2>
            <p className="text-[#6B5D53]">
              다양한 카테고리의 프리미엄 베이커리 원재료를 만나보세요
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: '곡류가공품', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop', href: '/products/grain' },
              { name: '견과가공품', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop', href: '/products/nut' },
              { name: '유지/유가공품', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop', href: '/products/dairy' },
              { name: '당류가공품', image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop', href: '/products/sugar' },
              { name: '냉동생지류', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop', href: '/products/frozen' },
              { name: '커피가공품', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop', href: '/products/coffee' },
              { name: '과채가공품', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=400&fit=crop', href: '/products/vegetable' },
              { name: '축산가공품', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop', href: '/products/meat' },
            ].map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className={`group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  isVisible.products ? `animate-fadeInScale animation-delay-${index * 100}` : 'opacity-0'
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-lg font-bold">{category.name}</h3>
                </div>
                <div className="absolute inset-0 bg-[#A67C52]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">자세히 보기 →</span>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/products/all"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#A67C52] text-white font-bold rounded-full hover:bg-[#8B6F47] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              전체 제품 보기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Visit Us Today Section */}
      <section
        ref={(el) => { sectionsRef.current[2] = el; }}
        id="visit"
        className="py-24 bg-[#FDF8F3]"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={isVisible.visit ? 'animate-fadeInUp' : 'opacity-0'}>
              <span className="text-sm font-bold text-[#A67C52] tracking-widest uppercase mb-4 block font-display italic">
                Visit Us Today
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#4A4039] mb-6">
                직접 방문하여<br />
                <span className="text-[#A67C52]">품질을 확인하세요</span>
              </h2>
              <p className="text-[#6B5D53] leading-relaxed mb-8">
                에이스유통의 자체 물류센터를 방문하시면 다양한 제품을 직접 확인하실 수 있습니다.
                전문 상담원이 귀사에 맞는 최적의 솔루션을 제안해 드립니다.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#A67C52]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#A67C52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#4A4039]">주소</h4>
                    <p className="text-[#6B5D53]">경기도 하남시 샘재로 119번길 31(천현동)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#A67C52]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#A67C52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#4A4039]">영업시간</h4>
                    <p className="text-[#6B5D53]">월-금 09:00 ~ 18:00 (주말/공휴일 휴무)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#A67C52]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#A67C52]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#4A4039]">연락처</h4>
                    <p className="text-[#6B5D53]">02-471-1644~6</p>
                  </div>
                </div>
              </div>

              <Link
                href="/support/location"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#A67C52] text-white font-bold rounded-full hover:bg-[#8B6F47] transition-all duration-300"
              >
                찾아오시는 길
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right Content - Image Grid */}
            <div className={`grid grid-cols-2 gap-4 ${isVisible.visit ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=500&fit=crop"
                    alt="베이커리 제품"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop"
                    alt="도넛"
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
                    alt="케이크"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=500&fit=crop"
                    alt="타르트"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Gallery */}
      <section
        ref={(el) => { sectionsRef.current[3] = el; }}
        id="featured"
        className="py-16 bg-[#FAF6F1]"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className={`flex items-center justify-between mb-10 ${isVisible.featured ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div>
              <span className="text-sm font-bold text-[#A67C52] tracking-widest uppercase font-display italic">Featured</span>
              <h2 className="text-3xl font-black text-[#4A4039]">이달의 추천 제품</h2>
            </div>
            <Link href="/products/all" className="text-[#A67C52] font-semibold hover:underline">
              더보기 →
            </Link>
          </div>

          <div className={`grid md:grid-cols-2 gap-8 ${isVisible.featured ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
            {/* Large Feature Card */}
            <div className="group relative rounded-3xl overflow-hidden shadow-xl h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop"
                alt="프리미엄 크로와상"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-3 py-1 bg-[#A67C52] text-white text-xs font-bold rounded-full mb-3 font-display">
                  BEST SELLER
                </span>
                <h3 className="text-3xl font-bold text-white mb-2">프랑스산 밀가루 T55</h3>
                <p className="text-white/90 mb-4">바게트, 치아바타에 최적화된 프리미엄 밀가루</p>
                <Link href="/products/grain" className="inline-flex items-center gap-2 text-white font-semibold">
                  제품 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Small Feature Cards */}
            <div className="grid grid-rows-2 gap-8">
              <div className="group relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&h=300&fit=crop"
                  alt="견과류"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-[#D4A574] text-white text-xs font-bold rounded-full mb-2 font-display">
                    NEW
                  </span>
                  <h3 className="text-xl font-bold text-white">프리미엄 아몬드 슬라이스</h3>
                </div>
              </div>
              <div className="group relative rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=300&fit=crop"
                  alt="커피"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-[#8B6F47] text-white text-xs font-bold rounded-full mb-2 font-display">
                    HOT
                  </span>
                  <h3 className="text-xl font-bold text-white">원두 커피 블렌드</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#A67C52] to-[#8B6F47] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            함께 성장할 파트너를 찾고 계신가요?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            15년 전통의 에이스유통이 귀사의 성공을 함께 만들어갑니다
          </p>
          <Link
            href="/support/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#A67C52] font-bold text-lg rounded-full hover:bg-[#FAF6F1] transition-all duration-300 shadow-xl"
          >
            무료 상담 신청
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4A4039] py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Footer Top */}
          <div className="grid md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
            {/* Logo & Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-black text-white">ACE</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">에이스유통</span>
                  <span className="text-xs text-white/60">주식회사</span>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-md">
                카페·베이커리 원재료 유통 전문기업으로서 프리미엄 품질과 신속한 배송으로
                고객의 성공을 지원합니다.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <div className="space-y-3 text-sm text-white/70">
                <p>경기도 하남시 샘재로 119번길 31</p>
                <p>02-471-1644~6</p>
                <p>ace32865@hanmail.net</p>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/about/intro" className="block text-white/70 hover:text-white transition-colors">회사 소개</Link>
                <Link href="/products/all" className="block text-white/70 hover:text-white transition-colors">제품 보기</Link>
                <Link href="/support/contact" className="block text-white/70 hover:text-white transition-colors">문의하기</Link>
                <Link href="/support/location" className="block text-white/70 hover:text-white transition-colors">찾아오시는 길</Link>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/50">
              © 2010-2025 에이스유통주식회사. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-white/50">
              <Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
              <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
