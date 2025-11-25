'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('grain');
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef([]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

      {/* Modern Floating Consultation Button */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 group">
        <Link
          href="/contact"
          className="relative bg-gradient-to-r from-[#A67C52] to-[#B8956A] text-white px-4 py-6 rounded-l-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 flex flex-col items-center gap-2 font-bold hover:translate-x-[-4px] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#B8956A] to-[#D4A574] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <svg className="w-6 h-6 relative z-10 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span style={{ writingMode: 'vertical-rl' }} className="text-sm tracking-wider relative z-10">
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

          {/* Premium Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
              className="relative px-5 py-2.5 text-sm font-semibold text-white group-hover/header:text-[#4A4039] transition-all duration-500 overflow-hidden group/btn"
            >
              <span className="relative z-10">로그인</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/50 group-hover/header:bg-[#B8956A]/50 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              href="/register"
              className="relative px-6 py-2.5 text-sm font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/30 rounded-full hover:bg-white hover:text-[#B8956A] hover:border-[#B8956A] transition-all duration-500 group-hover/header:bg-[#B8956A] group-hover/header:text-white group-hover/header:border-[#B8956A] overflow-hidden group/btn"
            >
              <span className="relative z-10">회원가입</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-white group-hover/header:text-[#4A4039] transition-colors duration-500">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Modern Hero Section with Enhanced Effects */}
      <section className="relative h-screen overflow-hidden">
        {/* Fixed Background with Zoom Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover animate-hero-zoom"
            poster="https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=3000&auto=format&fit=crop"
          >
            <source src="https://player.vimeo.com/external/434045526.hd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f86e7fab02&profile_id=175&download=1" type="video/mp4" />
          </video>

          {/* Multi-layer Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        </div>

        {/* Hero Content with Modern Typography */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Animated Main Title */}
            <div className="mb-16">
              <div className="overflow-hidden mb-4">
                <h1 className="text-6xl lg:text-7xl font-extralight text-white tracking-[0.3em] uppercase animate-slideUp bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  Right Food
                </h1>
              </div>
              <div className="overflow-hidden mb-10">
                <h1 className="text-6xl lg:text-7xl font-extralight text-white tracking-[0.3em] uppercase animate-slideUp animation-delay-200 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  Right Person
                </h1>
              </div>

              {/* Animated Decorative Elements */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#B8956A] to-[#D4A574] animate-expandWidth"></div>
                <div className="w-2 h-2 bg-[#B8956A] rounded-full animate-pulse"></div>
              </div>

              {/* Enhanced Subtitle */}
              <div className="max-w-3xl">
                <p className="text-xl text-white/90 font-light leading-relaxed tracking-wide animate-fadeInUp animation-delay-400">
                  생명 존중 정신을 바탕으로
                  <span className="text-[#FFE5CC] font-medium mx-2 text-2xl">인류 건강문화</span>에
                  기여하겠습니다
                </p>
              </div>
            </div>

            {/* Modern CTA Buttons */}
            <div className="flex gap-6 items-center animate-fadeInUp animation-delay-600">
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-3 px-10 py-5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#B8956A] to-[#D4A574] rounded-full transform transition-transform duration-500 group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4A574] to-[#B8956A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 text-white font-semibold text-lg">제품 둘러보기</span>
                <svg className="relative z-10 w-6 h-6 text-white group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-white px-10 py-5 border-2 border-white/30 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                <span className="font-semibold text-lg">회사 소개</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Animated Side Stats */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block animate-fadeInRight animation-delay-800">
            <div className="flex flex-col items-end gap-10 text-white/80">
              <div className="text-right group cursor-pointer">
                <div className="text-xs uppercase tracking-[0.3em] mb-2 opacity-70 group-hover:opacity-100 transition-opacity">Since</div>
                <div className="text-3xl font-light tracking-wider group-hover:text-[#FFE5CC] transition-colors">1994</div>
              </div>
              <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
              <div className="text-right group cursor-pointer">
                <div className="text-xs uppercase tracking-[0.3em] mb-2 opacity-70 group-hover:opacity-100 transition-opacity">Products</div>
                <div className="text-3xl font-light tracking-wider group-hover:text-[#FFE5CC] transition-colors">1,000+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 text-white text-center hidden lg:block">
          <div className="text-xs font-light tracking-[0.3em] mb-4 uppercase opacity-70">Scroll</div>
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 border-2 border-white/40 rounded-full animate-ping"></div>
            <div className="relative w-14 h-14 border-2 border-white/80 rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
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
              30년의 경험과 전문성으로 고객사의 성공적인 비즈니스를 위한 최적의 솔루션을 제공합니다
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
                bgImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop'
              },
              {
                title: '고객 중심',
                subtitle: 'Customer Focus',
                desc: '고객의 니즈를 정확히 파악하여 맞춤형 솔루션을 제공합니다',
                bgImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop'
              },
              {
                title: '전문성',
                subtitle: 'Expertise',
                desc: '30년간 축적된 노하우와 전문 지식을 바탕으로 서비스합니다',
                bgImage: 'https://images.unsplash.com/photo-1553531087-b25a0b9a68ab?w=600&h=400&fit=crop'
              },
              {
                title: '혁신 추구',
                subtitle: 'Innovation',
                desc: '시장 트렌드를 선도하며 새로운 가치를 창출합니다',
                bgImage: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=600&h=400&fit=crop'
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
              30년 전통의 신뢰와 혁신
            </h2>
            <p className="text-lg text-[#6B5D53] max-w-2xl mx-auto">
              1994년 창립 이래, 대한민국 식품 유통의 새로운 기준을 만들어가고 있습니다
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
                    year: '1994',
                    title: '에이스유통 창립',
                    desc: '서울 강남에서 소규모 식자재 유통업체로 시작',
                    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
                    position: 'left'
                  },
                  {
                    year: '2000',
                    title: 'HACCP 인증 획득',
                    desc: '업계 최초 식품안전관리인증 획득으로 품질 경쟁력 확보',
                    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
                    position: 'right'
                  },
                  {
                    year: '2010',
                    title: '전국 물류망 구축',
                    desc: '전국 5개 물류센터 설립, 당일 배송 시스템 구축',
                    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
                    position: 'left'
                  },
                  {
                    year: '2020',
                    title: '글로벌 파트너십',
                    desc: '해외 20개국 생산자와 직거래 시스템 구축',
                    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc31?w=800&h=600&fit=crop',
                    position: 'right'
                  },
                  {
                    year: '2024',
                    title: '미래를 향한 도약',
                    desc: 'AI 기반 재고관리 시스템 도입, ESG 경영 선언',
                    image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&h=600&fit=crop',
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
                number: '30년',
                label: '업계 경력',
                icon: (
                  <svg className="w-12 h-12 text-[#B8956A] mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 7h14l-.89-3.11A1 1 0 0017.22 3H6.78a1 1 0 00-.89.89L5 7zm14.71 2H4.29L3.1 4.11A3 3 0 015.78 1h12.44a3 3 0 012.68 3.11L19.71 9zM12 13a1 1 0 011 1v5h2v-5a3 3 0 00-6 0v5h2v-5a1 1 0 011-1z"/>
                    <path d="M5.29 9l.44 1.76A1 1 0 006.7 12h10.6a1 1 0 00.97-1.24L17.71 9H5.29z"/>
                  </svg>
                )
              },
              {
                number: '1,000+',
                label: '제품 종류',
                icon: (
                  <svg className="w-12 h-12 text-[#B8956A] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                )
              },
              {
                number: '500+',
                label: '파트너사',
                icon: (
                  <svg className="w-12 h-12 text-[#B8956A] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                )
              },
              {
                number: '24시간',
                label: '배송 시스템',
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

      {/* Modern Product Categories Section */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        id="products"
        className="py-32 bg-gradient-to-b from-[#FFF8F0] to-white relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-40 -left-20 w-96 h-96 bg-[#B8956A]/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 -right-20 w-96 h-96 bg-[#D4A574]/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <div className={`text-center mb-20 ${isVisible.products ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4A4039] to-[#6B5D53] mb-6">
              추천제품
            </h2>
            <p className="text-xl text-[#6B5D53]">고객님을 위한 엄선된 프리미엄 식자재</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Modern Tab Navigation */}
            <div className="flex gap-2 mb-12 justify-center">
              {['grain', 'nut', 'sugar'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 rounded-full font-semibold transition-all duration-500 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-[#B8956A] to-[#D4A574] text-white shadow-lg scale-105'
                      : 'bg-white text-[#8B7D73] hover:text-[#6B5D53] hover:bg-gray-50 shadow-md'
                  }`}
                >
                  {tab === 'grain' ? '곡류가공품' : tab === 'nut' ? '견과가공품' : '당류가공품'}
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
                    className={`group block ${isVisible.products ? `animate-fadeInScale animation-delay-${index * 200}` : 'opacity-0'}`}
                  >
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
                      {/* Modern Header */}
                      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                        <div className="text-sm text-gray-600 font-medium">{product.title}</div>
                        <div className="text-xl font-bold text-gray-800">{product.subtitle}</div>
                      </div>

                      {/* Product Image Container */}
                      <div className="relative h-64 bg-gradient-to-br from-white to-gray-50 p-8 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      {/* Modern Footer */}
                      <div className="p-6 bg-white">
                        <div className="flex items-center gap-2 mb-4">
                          <span className={`inline-block bg-gradient-to-r ${product.categoryColor} text-white text-xs font-bold px-4 py-2 rounded-full`}>
                            {product.category}
                          </span>
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-4 py-2 rounded-full">
                            프랑스산
                          </span>
                        </div>
                        <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-[#B8956A] transition-colors duration-300">
                          {product.productName}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            {/* Modern View All Button */}
            <div className="flex justify-center mt-16">
              <Link
                href="/products/all"
                className="group relative inline-flex items-center gap-3 px-10 py-5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#B8956A] to-[#D4A574] rounded-full transform transition-transform duration-500 group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4A574] to-[#B8956A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 text-white font-bold text-lg">모든 제품 보기</span>
                <svg className="relative z-10 w-6 h-6 text-white group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Info Cards Section */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        id="info"
        className="py-32 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className={`text-center mb-20 ${isVisible.info ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4A4039] to-[#6B5D53] mb-6">
              왜 에이스유통인가?
            </h2>
            <p className="text-xl text-[#6B5D53]">30년 전통의 신뢰와 품질로 함께합니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: '철저한 품질관리',
                description: 'HACCP 인증을 통한 체계적인 품질관리 시스템으로 안전한 식품을 제공합니다',
                image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
                icon: (
                  <svg className="w-8 h-8 text-[#B8956A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: '신속한 배송',
                description: '전국 당일 배송 시스템으로 신선한 상태의 제품을 빠르게 전달합니다',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
                icon: (
                  <svg className="w-8 h-8 text-[#B8956A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: '전문 상담 서비스',
                description: '전문 상담사가 제품 선택부터 구매까지 친절하게 안내해드립니다',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
                icon: (
                  <svg className="w-8 h-8 text-[#B8956A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )
              }
            ].map((card, index) => (
              <div
                key={index}
                className={`group ${isVisible.info ? `animate-fadeInUp animation-delay-${index * 200}` : 'opacity-0'}`}
              >
                <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    {/* Icon Badge */}
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-xl transform group-hover:rotate-12 transition-transform duration-500">
                      {card.icon}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{card.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Notice Section */}
      <section
        ref={(el) => (sectionsRef.current[4] = el)}
        id="notice"
        className="py-32 bg-gradient-to-br from-[#FAF6F1] to-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className={`text-center mb-20 ${isVisible.notice ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4A4039] to-[#6B5D53] mb-6">
              최신소식
            </h2>
            <p className="text-xl text-[#6B5D53]">에이스유통의 새로운 소식을 전합니다</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Modern Notice List */}
            <div className={`${isVisible.notice ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#B8956A] to-[#D4A574] px-8 py-6 flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">공지사항</h3>
                  <Link href="/community/notice" className="text-white/90 hover:text-white transition-colors">
                    더보기 →
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { title: '[공지] 2024년 설 연휴 배송 안내', date: '2024.01.15', isNew: true },
                    { title: '[안내] 신제품 입고 안내 - 프랑스산 치즈', date: '2024.01.10', isNew: true },
                    { title: '[공지] 홈페이지 리뉴얼 안내', date: '2024.01.05', isNew: false },
                    { title: '[안내] 겨울철 배송 관련 안내사항', date: '2024.01.02', isNew: false },
                  ].map((item, index) => (
                    <Link key={index} href="#" className="block p-6 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-gray-800 font-medium group-hover:text-[#B8956A] transition-colors">
                              {item.title}
                            </h4>
                            {item.isNew && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-[#B8956A] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Modern News List */}
            <div className={`${isVisible.notice ? 'animate-slideInRight' : 'opacity-0'}`}>
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#D4A574] to-[#B8956A] px-8 py-6 flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">보도자료</h3>
                  <Link href="/community/news" className="text-white/90 hover:text-white transition-colors">
                    더보기 →
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { title: '에이스유통, 유럽 프리미엄 치즈 독점 공급 계약 체결', date: '2024.01.12', isHot: true },
                    { title: '식품안전관리 우수업체 인증 획득', date: '2024.01.08', isHot: false },
                    { title: '2023년 매출 전년 대비 30% 성장', date: '2024.01.03', isHot: false },
                    { title: '친환경 물류센터 준공식 개최', date: '2023.12.28', isHot: false },
                  ].map((item, index) => (
                    <Link key={index} href="#" className="block p-6 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-gray-800 font-medium group-hover:text-[#B8956A] transition-colors">
                              {item.title}
                            </h4>
                            {item.isHot && (
                              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                                HOT
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-[#B8956A] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
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
            30년 전통의 에이스유통이 귀사의 성공적인 비즈니스를 도와드립니다
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

      {/* Modern Footer */}
      <footer className="bg-gradient-to-b from-[#F5EFE7] to-[#FAF6F1] border-t border-[#E8DCC8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-gradient">ACE</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700 leading-tight">에이스유통</span>
                  <span className="text-xs font-medium text-gray-600 leading-tight">주식회사</span>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="text-sm text-[#6B5D53] text-center md:text-right">
              <p className="mb-2">
                대표 : 안종철 | 주소 : 경기도 의왕시 생포로 119번길 31(전현동 302-3)
              </p>
              <p className="mb-2">
                Tel. 02) 471-1644~6 | Fax. 02) 476-1372 | Email. ace32865@hanmail.net
              </p>
              <p className="text-xs text-[#8B7D73] mt-4">
                ⓒ Copyright 2016. 에이스유통(주) All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}