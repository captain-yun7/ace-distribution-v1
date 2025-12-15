'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// Hero slide images - Premium bakery images
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=3000&auto=format&fit=crop',
    alt: '갓 구운 크로와상'
  },
  {
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=3000&auto=format&fit=crop',
    alt: '프리미엄 베이커리'
  },
  {
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=3000&auto=format&fit=crop',
    alt: '신선한 빵'
  },
  {
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=3000&auto=format&fit=crop',
    alt: '아티장 브레드'
  }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('grain');
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionsRef = useRef([]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero slider auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* Premium Vertical Consultation Button */}
      <Link
        href="/support/contact"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 group"
      >
        <div className="flex flex-col items-center justify-center w-12 py-6 bg-[#4A4039] hover:bg-[#3A3029] transition-all duration-300 shadow-lg hover:shadow-xl rounded-l-lg">
          <span className="text-white text-sm font-semibold tracking-widest [writing-mode:vertical-rl]">
            상담하기
          </span>
        </div>
      </Link>

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

      {/* Hero Section with Image Slider */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0 overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Warm Bakery Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A4039]/90 via-[#4A4039]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#A67C52]/20 via-transparent to-[#4A4039]/70" />
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? 'w-10 bg-white'
                  : 'w-4 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`슬라이드 ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content - Left Aligned */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
            <div className="max-w-3xl">
              {/* Premium Badge */}
              <div className="mb-10 animate-fadeInUp">
                <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-md text-white text-sm font-medium tracking-widest uppercase border border-white/20">
                  <span className="w-2 h-2 bg-[#D4A574] rounded-full"></span>
                  Premium Bakery Ingredients
                </span>
              </div>

              {/* English Tagline */}
              <p className="italic text-xl md:text-2xl text-[#D4A574] mb-4 animate-fadeInUp animation-delay-200 tracking-wide">
                Freshly Baked Excellence
              </p>

              {/* Main Title - Korean */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 animate-fadeInUp animation-delay-200">
                <span className="block mb-2">최상의 원재료로</span>
                <span className="block text-white/90">완성하는 <span className="text-[#D4A574]">프리미엄</span> 베이킹</span>
              </h1>

              {/* Decorative Line */}
              <div className="flex items-center gap-6 mb-10 animate-fadeInUp animation-delay-400">
                <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4A574] to-transparent"></div>
                <span className="italic text-white/60 text-sm tracking-wider">Since 2010</span>
                <div className="w-20 h-[1px] bg-gradient-to-l from-[#D4A574] to-transparent"></div>
              </div>

              {/* Description */}
              <p className="text-lg text-white/80 leading-relaxed mb-12 max-w-lg animate-fadeInUp animation-delay-400 font-light">
                15년간 축적된 노하우와 엄격한 품질 관리로<br />
                최고의 베이커리 원재료를 공급합니다.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-5 animate-fadeInUp animation-delay-600">
                <Link
                  href="/products/all"
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-[#B8956A] text-white font-semibold tracking-wide hover:bg-[#A67C52] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 rounded-lg"
                >
                  제품 보기
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/about/intro"
                  className="group inline-flex items-center gap-3 px-10 py-4 border border-white/40 text-white font-semibold tracking-wide hover:bg-white/10 backdrop-blur-sm transition-all duration-300 rounded-lg"
                >
                  회사 소개
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white text-center hidden lg:block">
          <div className="text-xs font-light tracking-[0.3em] mb-3 uppercase opacity-70">Scroll</div>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Renewed Mission & Vision Section - Modern Corporate Style */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        id="mission"
        className="py-24 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Clean & Minimal */}
          <div className={`text-center mb-20 ${isVisible.mission ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">Our Mission</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#4A4039] mb-6">
              최고의 품질로 성공을 만들어갑니다
            </h2>
            <p className="text-lg text-[#6B5D53] max-w-2xl mx-auto">
              15년의 경험과 전문성으로 고객사의 성공적인 비즈니스를 위한 최적의 솔루션을 제공합니다
            </p>
          </div>

          {/* Process Flow Section */}
          <div className={`mb-32 ${isVisible.mission ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
            <div className="relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8DCC8] to-transparent -translate-y-1/2"></div>

              {/* Process Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {[
                  {
                    step: '01',
                    title: '글로벌 소싱',
                    desc: '전세계 우수 생산지',
                    icon: (
                      <svg className="w-12 h-12 text-[#B8956A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  {
                    step: '02',
                    title: '품질 검증',
                    desc: 'HACCP 인증 시스템',
                    icon: (
                      <svg className="w-12 h-12 text-[#B8956A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  {
                    step: '03',
                    title: '직수입 유통',
                    desc: '가격 경쟁력 확보',
                    icon: (
                      <svg className="w-12 h-12 text-[#B8956A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    )
                  },
                  {
                    step: '04',
                    title: '재고 관리',
                    desc: '실시간 재고 시스템',
                    icon: (
                      <svg className="w-12 h-12 text-[#B8956A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )
                  },
                  {
                    step: '05',
                    title: '신속 배송',
                    desc: '당일/익일 배송',
                    icon: (
                      <svg className="w-12 h-12 text-[#B8956A]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                    )
                  },
                  {
                    step: '06',
                    title: '사후 관리',
                    desc: '지속적 품질 관리',
                    icon: (
                      <svg className="w-12 h-12 text-[#B8956A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative text-center group">
                    {/* Icon Circle */}
                    <div className="relative z-10 w-24 h-24 mx-auto mb-6 bg-white border-4 border-[#F5EFE7] rounded-full flex items-center justify-center group-hover:border-[#B8956A] transition-all duration-300 shadow-lg">
                      {item.icon}
                    </div>
                    {/* Step Number */}
                    <span className="absolute top-0 right-1/2 translate-x-1/2 text-xs font-bold text-[#B8956A] bg-white px-2 py-1 rounded-full shadow-md">
                      {item.step}
                    </span>
                    {/* Content */}
                    <h4 className="text-base font-bold text-[#4A4039] mb-2">{item.title}</h4>
                    <p className="text-sm text-[#8B7D73]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Values - Card Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: '품질 최우선',
                subtitle: 'Quality First',
                desc: '엄격한 품질관리 시스템으로 최고의 제품만을 선별합니다',
                bgImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop'
              },
              {
                title: '고객 중심',
                subtitle: 'Customer Focus',
                desc: '고객의 니즈를 정확히 파악하여 맞춤형 솔루션을 제공합니다',
                bgImage: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=400&fit=crop'
              },
              {
                title: '전문성',
                subtitle: 'Expertise',
                desc: '15년간 축적된 노하우와 전문 지식을 바탕으로 서비스합니다',
                bgImage: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop'
              },
              {
                title: '혁신 추구',
                subtitle: 'Innovation',
                desc: '시장 트렌드를 선도하며 새로운 가치를 창출합니다',
                bgImage: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop'
              }
            ].map((value, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer ${isVisible.mission ? `animate-fadeInScale animation-delay-${index * 100}` : 'opacity-0'}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img src={value.bgImage} alt={value.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative p-8 h-80 flex flex-col justify-end">
                  <span className="text-[#FFE5CC] text-xs font-medium tracking-wider uppercase mb-2">{value.subtitle}</span>
                  <h3 className="text-white text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{value.desc}</p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#B8956A]/90 to-[#B8956A]/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-16 h-16 mx-auto mb-4 border-2 border-white rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">{value.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Renewed Company Story Section - Timeline Style */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        id="story"
        className="py-24 bg-gradient-to-b from-[#FAF6F1] to-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B8956A' fill-opacity='0.3'%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-20 ${isVisible.story ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">Our Story</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#4A4039] mb-6">
              15년 전통의 신뢰와 혁신
            </h2>
            <p className="text-lg text-[#6B5D53] max-w-2xl mx-auto">
              2010년 창립 이래, 카페·베이커리 원재료 유통의 새로운 기준을 만들어가고 있습니다
            </p>
          </div>

          {/* Timeline Section */}
          <div className={`mb-32 ${isVisible.story ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
            <div className="relative">
              {/* Vertical Line */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#B8956A] via-[#D4A574] to-[#B8956A]"></div>

              {/* Timeline Items */}
              <div className="space-y-24">
                {[
                  {
                    year: '2010',
                    title: '에이스유통㈜ 창립',
                    desc: '직원 5명으로 카페·베이커리 원재료 유통 사업 시작',
                    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=600&fit=crop',
                    position: 'left'
                  },
                  {
                    year: '2015',
                    title: '본사 사옥 신축 이전',
                    desc: '경기도 하남시 천현동에 자체 물류센터 보유 사옥 신축',
                    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=600&fit=crop',
                    position: 'right'
                  },
                  {
                    year: '2019',
                    title: '우수기술기업 인증',
                    desc: '제과제빵 재료 유통물류 및 기술마케팅 부문 우수기술기업 인증 획득',
                    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop',
                    position: 'left'
                  },
                  {
                    year: '2020',
                    title: '창립 10주년 & 특허 취득',
                    desc: '제과제빵류 운반 및 보관용 냉장/냉동장치 특허 취득',
                    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop',
                    position: 'right'
                  },
                  {
                    year: '2025',
                    title: '전략적 파트너십 체결',
                    desc: 'IP 굿즈 및 에듀 콘텐츠 기업 ㈜토이트론과 전략적 계약 체결',
                    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
                    position: 'left'
                  }
                ].map((item, index) => (
                  <div key={index} className={`relative flex items-center ${item.position === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Year Badge */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#B8956A] text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl z-10 hidden lg:block">
                      {item.year}
                    </div>

                    {/* Content Card */}
                    <div className={`w-full lg:w-5/12 ${item.position === 'right' ? 'lg:ml-auto lg:pl-12' : 'lg:mr-auto lg:pr-12'}`}>
                      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden group hover:shadow-3xl transition-shadow duration-500">
                        {/* Image */}
                        <div className="h-56 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        {/* Content */}
                        <div className="p-8">
                          <span className="lg:hidden inline-block bg-[#B8956A] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                            {item.year}
                          </span>
                          <h3 className="text-2xl font-bold text-[#4A4039] mb-3">{item.title}</h3>
                          <p className="text-[#6B5D53] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievement Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                number: '15년',
                label: '업계 경력',
                icon: (
                  <svg className="w-12 h-12 text-[#B8956A] mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 7h14l-.89-3.11A1 1 0 0017.22 3H6.78a1 1 0 00-.89.89L5 7zm14.71 2H4.29L3.1 4.11A3 3 0 015.78 1h12.44a3 3 0 012.68 3.11L19.71 9zM12 13a1 1 0 011 1v5h2v-5a3 3 0 00-6 0v5h2v-5a1 1 0 011-1z"/>
                    <path d="M5.29 9l.44 1.76A1 1 0 006.7 12h10.6a1 1 0 00.97-1.24L17.71 9H5.29z"/>
                  </svg>
                )
              },
              {
                number: '245억',
                label: '연간 매출',
                icon: (
                  <svg className="w-12 h-12 text-[#B8956A] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )
              },
              {
                number: '500+',
                label: '거래처',
                icon: (
                  <svg className="w-12 h-12 text-[#B8956A] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                )
              },
              {
                number: '20대',
                label: '전용 배송차량',
                icon: (
                  <svg className="w-12 h-12 text-[#B8956A] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
                  </svg>
                )
              }
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${isVisible.story ? `animate-fadeInScale animation-delay-${index * 100}` : 'opacity-0'}`}
              >
                <div className="mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#B8956A] mb-2">{stat.number}</div>
                <div className="text-sm text-[#6B5D53] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Product Showcase Section */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        id="products"
        className="py-32 bg-gradient-to-br from-[#FAF6F1] via-white to-[#FFF8F0] relative overflow-hidden"
      >
        {/* Premium Background Effects */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-[#B8956A]/20 to-[#D4A574]/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-gradient-to-tl from-[#D4A574]/20 to-[#B8956A]/10 rounded-full blur-3xl animate-float animation-delay-600"></div>

          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B8956A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Premium Section Header */}
          <div className={`text-center mb-20 ${isVisible.products ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="inline-block text-sm font-bold text-[#B8956A] tracking-[0.3em] uppercase mb-4">
              PREMIUM SELECTION
            </span>
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              <span className="text-[#4A4039]">추천</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8956A] to-[#D4A574]"> 제품</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-20 h-[2px] bg-gradient-to-r from-transparent to-[#B8956A]"></span>
              <p className="text-lg text-[#6B5D53] font-medium">고객님을 위한 엄선된 프리미엄 식자재</p>
              <span className="w-20 h-[2px] bg-gradient-to-l from-transparent to-[#B8956A]"></span>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Premium Tab Navigation with Badge */}
            <div className="flex gap-4 mb-16 justify-center relative">
              {[
                { id: 'grain', name: '곡류가공품', badge: 'HOT' },
                { id: 'nut', name: '견과가공품', badge: 'NEW' },
                { id: 'sugar', name: '당류가공품', badge: null }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-10 py-4 rounded-2xl font-bold transition-all duration-500 transform ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#B8956A] via-[#C5A474] to-[#D4A574] text-white shadow-2xl scale-105 border-2 border-white'
                      : 'bg-white text-[#6B5D53] hover:text-[#4A4039] shadow-lg hover:shadow-xl border-2 border-[#F5EFE7]'
                  }`}
                >
                  <span className="relative z-10">{tab.name}</span>
                  {tab.badge && activeTab === tab.id && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B8956A] to-[#D4A574] rounded-2xl blur opacity-50"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Modern Product Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {(activeTab === 'grain' ? [
                {
                  title: '프리미엄',
                  subtitle: '제빵개량제',
                  category: '제빵재료',
                  categoryColor: 'from-amber-600 to-amber-500',
                  productName: '아뺑드 DH PRO (제빵개량제)',
                  tags: ['#식빵및과자빵', '#포카치아', '#밀가루100%대비'],
                  image: '/images/product1.png',
                  link: '/products/dhpro'
                },
                {
                  title: '바게트, 치아바타',
                  subtitle: '프랑스산 밀가루',
                  category: '밀가루',
                  categoryColor: 'from-orange-500 to-orange-400',
                  productName: '아뺑드 밀가루 T55',
                  tags: ['#바게트', '#치아바타', '#여러분야의빵'],
                  image: '/images/product2.jpg',
                  link: '/products/t55'
                },
                {
                  title: '아티장 베이커를 위한',
                  subtitle: '프리미엄 밀가루',
                  category: '밀가루',
                  categoryColor: 'from-red-600 to-red-500',
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
                  categoryColor: 'from-amber-700 to-amber-600',
                  productName: '아몬드 슬라이스 (Almond Slice)',
                  tags: ['#제과제빵', '#토핑', '#고소함'],
                  image: '/images/GOODS2_1505956856.jpg',
                  link: '/products/almond-slice'
                },
                {
                  title: '고급',
                  subtitle: '피칸',
                  category: '견과가공품',
                  categoryColor: 'from-amber-600 to-amber-500',
                  productName: '피칸 (Pecan)',
                  tags: ['#프리미엄', '#제과', '#건강간식'],
                  image: '/images/GOODS2_1506042521.jpg',
                  link: '/products/pecan'
                },
                {
                  title: '천연',
                  subtitle: '코코넛 파우더',
                  category: '견과가공품',
                  categoryColor: 'from-green-700 to-green-600',
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
                  categoryColor: 'from-yellow-700 to-yellow-600',
                  productName: '업소용 물엿',
                  tags: ['#요리용', '#제과제빵', '#대용량'],
                  image: '/images/GOODS2_1619681459.png',
                  link: '/products/syrup'
                },
                {
                  title: '제과제빵용',
                  subtitle: '백설탕',
                  category: '당류가공품',
                  categoryColor: 'from-gray-100 to-gray-50',
                  productName: '백설탕 (White Sugar)',
                  tags: ['#제과제빵', '#요리', '#정제'],
                  image: '/images/GOODS2_1619681613.png',
                  link: '/products/white-sugar'
                },
                {
                  title: '프리미엄',
                  subtitle: '글루코스 시럽',
                  category: '당류가공품',
                  categoryColor: 'from-amber-500 to-amber-400',
                  productName: '글루코스 시럽 (Glucose Syrup)',
                  tags: ['#제과', '#글레이즈', '#고급'],
                  image: '/images/GOODS2_1619681845.png',
                  link: '/products/glucose'
                }
                ]).map((product, index) => (
                  <Link
                    key={index}
                    href={product.link}
                    className={`group block h-full ${isVisible.products ? `animate-fadeInScale animation-delay-${index * 200}` : 'opacity-0'}`}
                  >
                    <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
                      {/* Clean Image Section */}
                      <div className="relative h-72 bg-gradient-to-b from-[#FAF6F1] to-white overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                          <img
                            src={product.image}
                            alt={product.productName}
                            className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Simple Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`inline-block bg-gradient-to-r ${product.categoryColor} text-white text-[11px] font-bold px-3 py-1.5 rounded-md`}>
                            {product.category}
                          </span>
                        </div>
                      </div>

                      {/* Clean Content Section */}
                      <div className="p-6 flex-grow flex flex-col">
                        {/* Title Area */}
                        <div className="mb-4">
                          <p className="text-xs text-[#B8956A] font-semibold tracking-wide uppercase mb-1">
                            {product.title}
                          </p>
                          <h3 className="text-xl font-bold text-[#4A4039] leading-tight">
                            {product.productName}
                          </h3>
                        </div>

                        {/* Tags - Simple Style */}
                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[#F5EFE7]">
                          {product.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="text-[11px] text-[#6B5D53] bg-[#FAF6F1] px-2.5 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Hover Indicator */}
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-[#8B7D73]">프랑스산</span>
                          <svg className="w-5 h-5 text-[#B8956A] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l2 4-2-4zM17 8l-2-4 2 4zm0 0l-6 8-6-8m6 8v8" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            {/* Premium CTA Button */}
            <div className="flex justify-center mt-20 relative">
              {/* Decorative Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-1 bg-gradient-to-r from-transparent via-[#B8956A]/20 to-transparent"></div>
              </div>

              <Link
                href="/products/all"
                className="group relative inline-flex items-center gap-4 px-12 py-6 transform transition-all duration-700 hover:scale-105"
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#B8956A] via-[#C5A474] to-[#D4A574] rounded-2xl transform transition-all duration-500 group-hover:rotate-1"></div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                {/* Shadow and Glow */}
                <div className="absolute inset-0 rounded-2xl shadow-2xl group-hover:shadow-[0_20px_60px_-10px_rgba(184,149,106,0.5)]"></div>

                {/* Button Content */}
                <span className="relative z-10 text-white font-black text-lg tracking-wide">모든 제품 보기</span>

                {/* Animated Arrow */}
                <div className="relative z-10 flex items-center">
                  <svg className="w-6 h-6 text-white transform group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-pulse"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Premium News & Notice Section - Magazine Style */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        id="notice"
        className="py-32 bg-white relative overflow-hidden"
      >
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#B8956A]/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#D4A574]/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Premium Section Header */}
          <div className={`mb-16 ${isVisible.notice ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="inline-block text-xs font-bold text-[#B8956A] tracking-[0.4em] uppercase mb-3">NEWS & UPDATES</span>
                <h2 className="text-4xl lg:text-5xl font-black text-[#4A4039]">
                  최신 소식
                </h2>
              </div>
              <Link
                href="/news/all"
                className="hidden md:flex items-center gap-2 px-6 py-3 border-2 border-[#B8956A] text-[#B8956A] rounded-full hover:bg-[#B8956A] hover:text-white transition-all duration-300 font-semibold"
              >
                전체보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Modern Tab Navigation */}
            <div className="flex gap-1 border-b border-gray-200">
              {['전체', '공지사항', '보도자료', '이벤트'].map((tab, index) => (
                <button
                  key={tab}
                  className={`px-6 py-3 text-sm font-semibold transition-all duration-300 relative ${
                    index === 0
                      ? 'text-[#B8956A]'
                      : 'text-gray-500 hover:text-[#4A4039]'
                  }`}
                >
                  {tab}
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#B8956A]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Magazine-style Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Featured Article - Large Card */}
            <div className={`lg:col-span-7 ${isVisible.notice ? 'animate-fadeInScale' : 'opacity-0'}`}>
              <Link href="#" className="group block relative h-full">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl h-full">
                  {/* Featured Image */}
                  <div className="relative h-[500px] overflow-hidden bg-gradient-to-br from-[#FAF6F1] to-[#F5EFE7]">
                    <img
                      src="https://images.unsplash.com/photo-1452195100486-9cc805987862?w=800&h=600&fit=crop"
                      alt="Featured News"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Featured Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-bold text-[#4A4039]">FEATURED</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-white/90 text-sm">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">보도자료</span>
                        <span>2024.01.15</span>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight group-hover:text-[#FFE5CC] transition-colors duration-300">
                        에이스유통, 유럽 3대 치즈 브랜드와<br />
                        독점 공급 계약 체결
                      </h3>
                      <p className="text-white/90 text-lg">
                        프랑스, 이탈리아, 스위스 프리미엄 치즈 브랜드들과의 파트너십 강화로
                        국내 최고의 유럽 치즈 공급망 구축
                      </p>
                      <div className="flex items-center gap-2 text-white font-semibold">
                        자세히 보기
                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Side Articles - Modern List */}
            <div className={`lg:col-span-5 ${isVisible.notice ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
              <div className="space-y-6">
                {/* Sub-featured Article */}
                <Link href="#" className="group block">
                  <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2.5 py-1 bg-[#B8956A] text-white text-xs font-bold rounded-md">공지</span>
                          <span className="text-xs text-gray-500">2024.01.14</span>
                        </div>
                        <h4 className="text-lg font-bold text-[#4A4039] mb-2 group-hover:text-[#B8956A] transition-colors">
                          2024년 설 연휴 배송 일정 안내
                        </h4>
                        <p className="text-sm text-[#6B5D53] line-clamp-2">
                          설 연휴 기간 동안 원활한 제품 공급을 위한 특별 배송 일정을 안내해드립니다.
                        </p>
                      </div>
                      <div className="w-20 h-20 bg-[#B8956A]/10 rounded-xl flex items-center justify-center group-hover:bg-[#B8956A]/20 transition-colors">
                        <svg className="w-8 h-8 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Article List with Modern Cards */}
                <div className="space-y-4">
                  {[
                    {
                      category: '보도자료',
                      title: '식품안전관리 우수업체 인증 획득',
                      date: '2024.01.12',
                      badge: 'NEW',
                      excerpt: 'HACCP 인증에 이어 식품안전 최고등급 획득'
                    },
                    {
                      category: '이벤트',
                      title: '신규 회원 가입 특별 혜택 안내',
                      date: '2024.01.10',
                      badge: 'EVENT',
                      excerpt: '첫 구매 시 20% 할인 쿠폰 제공'
                    },
                    {
                      category: '공지사항',
                      title: '홈페이지 리뉴얼 오픈',
                      date: '2024.01.08',
                      badge: null,
                      excerpt: '더욱 편리해진 서비스를 경험해보세요'
                    },
                    {
                      category: '보도자료',
                      title: '2023년 매출 전년 대비 30% 성장',
                      date: '2024.01.05',
                      badge: null,
                      excerpt: '프리미엄 식자재 시장 선도 기업으로 도약'
                    }
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="group block bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#B8956A]/20"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-[#B8956A]">{item.category}</span>
                            <span className="text-xs text-gray-400">·</span>
                            <span className="text-xs text-gray-500">{item.date}</span>
                            {item.badge && (
                              <>
                                <span className="text-xs text-gray-400">·</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                  item.badge === 'NEW' ? 'bg-red-100 text-red-600' :
                                  item.badge === 'EVENT' ? 'bg-purple-100 text-purple-600' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  {item.badge}
                                </span>
                              </>
                            )}
                          </div>
                          <h4 className="font-semibold text-[#4A4039] group-hover:text-[#B8956A] transition-colors mb-1 line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1">{item.excerpt}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-[#B8956A] flex-shrink-0 mt-1 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* View All Button - Mobile */}
                <Link
                  href="/news/all"
                  className="md:hidden flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-[#B8956A] text-[#B8956A] rounded-full hover:bg-[#B8956A] hover:text-white transition-all duration-300 font-semibold"
                >
                  전체 소식 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A67C52] via-[#B8956A] to-[#D4A574] bg-gradient-animate"></div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 animate-fadeInUp">
            최고의 식자재 파트너가<br />필요하신가요?
          </h2>
          <p className="text-2xl text-white/95 mb-12 animate-fadeInUp animation-delay-200">
            15년 전통의 에이스유통이 귀사의 성공적인 비즈니스를 도와드립니다
          </p>
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 px-12 py-6 animate-fadeInUp animation-delay-400"
          >
            <div className="absolute inset-0 bg-white rounded-full transform transition-transform duration-500 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10 text-[#A67C52] font-bold text-xl">상담 신청하기</span>
            <svg className="relative z-10 w-6 h-6 text-[#A67C52] group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* CEO Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#FAF6F1] to-[#F5EFE7] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#B8956A]/20 to-[#D4A574]/20 rounded-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-[#B8956A] font-semibold">대표이사 안종일</p>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#B8956A]/20 to-[#D4A574]/20 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#D4A574]/20 to-[#B8956A]/20 rounded-full -z-10"></div>
            </div>

            {/* CEO Message Content */}
            <div>
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">CEO MESSAGE</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-8 leading-tight">
                좋은 상품을 정직하게 유통하는<br />
                <span className="text-[#B8956A]">신뢰받는 파트너</span>가 되겠습니다
              </h2>

              <div className="space-y-6 text-[#6B5D53] leading-relaxed">
                <p>
                  에이스유통주식회사는 카페·베이커리 산업을 위한 프리미엄 원재료 공급, 전문 소싱,
                  콜드체인 물류, 품질관리(QC)를 기반으로 성장해온 F&B B2B 솔루션 기업입니다.
                </p>
                <p>
                  2010년 설립 이후 자체 물류센터와 체계적인 유통 인프라를 구축하며 국내 프랜차이즈,
                  베이커리 카페, 전문 제과점 등 다양한 파트너에게 신뢰성 높은 제품을 안정적으로 공급해왔습니다.
                </p>
                <p>
                  당사는 원재료의 선별력과 정교한 품질관리, 신속한 공급망 운영을 통해 고객이 필요로 하는
                  제품을 정확하고 안정적으로 전달하는 데 집중해 왔으며, 업계에서 견고한 파트너십을 확보해 왔습니다.
                </p>
                <p className="font-medium text-[#4A4039]">
                  에이스유통은 앞으로도 고품질 원재료와 안정적인 공급 체계를 중심으로 고객의 비즈니스를
                  확실하게 지원하는 신뢰받는 유통 파트너로 자리매김하겠습니다.
                </p>
              </div>

              {/* CEO Signature */}
              <div className="mt-10 pt-8 border-t border-[#E8DCC8]">
                <p className="text-[#B8956A] font-bold text-lg">에이스유통주식회사</p>
                <p className="text-[#4A4039] font-bold text-xl mt-1">대표이사 안종일</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gradient-to-b from-[#4A4039] to-[#3A3029] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Top */}
          <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
            {/* Logo & Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-black text-white">ACE</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-tight">에이스유통</span>
                  <span className="text-xs font-medium text-white/60 leading-tight">주식회사</span>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                카페·베이커리 원재료 유통 전문기업<br />
                프리미엄 품질과 신속한 배송으로<br />
                고객의 성공을 지원합니다.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <div className="space-y-3 text-sm text-white/70">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  경기도 하남시 샘재로 119번길 31(천현동 392-3)
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  02) 471-1644~6
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  ace32865@hanmail.net
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Fax. 02) 476-1372
                </p>
              </div>
            </div>

            {/* Business Info */}
            <div>
              <h4 className="text-white font-bold mb-4">Business Info</h4>
              <div className="space-y-2 text-sm text-white/70">
                <p>대표이사 : 안종일</p>
                <p>사업자등록번호 : 126-86-32865</p>
                <p>설립년도 : 2010년</p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/50">
              Copyright 2010. 에이스유통주식회사 All rights reserved.
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