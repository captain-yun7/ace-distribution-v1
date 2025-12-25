'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  useCompanyContent,
  useCompanyTimeline,
  useCompanyCoreValues,
} from '@/hooks/company';

interface Category {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  _count: {
    products: number;
  };
}

interface Product {
  id: string;
  name: string;
  code: string;
  brand: string | null;
  description: string;
  imageUrl: string | null;
  category: {
    id: string;
    name: string;
    displayName: string;
  };
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string;
  thumbnailUrl: string | null;
  imageUrl: string | null;
  isPinned: boolean;
  publishedAt: string;
}

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
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=3000&auto=format&fit=crop',
    alt: '신선한 빵'
  },
  {
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=3000&auto=format&fit=crop',
    alt: '아티장 브레드'
  }
];

const categoryLabels: Record<string, string> = {
  'PRESS_RELEASE': '보도자료',
  'EVENT': '이벤트',
  'NOTICE': '공지',
  'BLOG': '블로그',
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('grain');
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // DB data states
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Company content from DB
  const { content: heroContent } = useCompanyContent('hero_section');
  const { content: missionContent } = useCompanyContent('mission_vision');
  const { content: ceoContent } = useCompanyContent('ceo_message');
  const { timeline } = useCompanyTimeline();
  const { coreValues } = useCompanyCoreValues();

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

  // Fetch DB data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes, newsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products?featured=true&limit=6'),
          fetch('/api/news?limit=5'),
        ]);

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }

        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setFeaturedProducts(productsData.products);
        }

        if (newsRes.ok) {
          const newsData = await newsRes.json();
          setNews(newsData.news);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
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

      {/* Premium Vertical Consultation Button - Hidden on mobile */}
      <Link
        href="/support/contact"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 group hidden md:block"
      >
        <div className="flex flex-col items-center justify-center w-12 py-6 bg-[#4A4039] hover:bg-[#3A3029] transition-all duration-300 shadow-lg hover:shadow-xl rounded-l-lg">
          <span className="text-white text-sm font-semibold tracking-widest [writing-mode:vertical-rl]">
            상담 / 문의
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
                  { name: '경영 철학', href: '/about/philosophy', desc: '우리의 가치와 비전' },
                  { name: '사업장 소개', href: '/about/business', desc: '전국 물류 네트워크' },
                  { name: '조직 및 인증서', href: '/about/certification', desc: '신뢰의 증명' }
                ]},
                { title: '판매 제품', items: [
                  { name: '판매 제품', href: '/products/all', desc: '전체 제품 보기' },
                  { name: '레시피', href: '/content/recipe', desc: '셰프의 레시피' }
                ]},
                { title: 'ACE 스토리', items: [
                  { name: '사내 문화', href: '/culture/internal', desc: '함께 성장하는 문화' },
                  { name: '스토리', href: '/culture/story', desc: '협력 사례와 언론 보도' }
                ]},
                { title: '고객 지원', items: [
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
                            <div className="flex-1 min-w-0 flex items-center">
                              <span className="block text-[15px] font-semibold text-[#4A4039] group-hover/item:text-[#B8956A] transition-colors duration-300">
                                {item.name}
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
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white group-hover/header:text-[#4A4039] transition-colors duration-500"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed top-20 left-0 right-0 bottom-0 bg-white overflow-y-auto">
            <div className="p-6">
              {[
                { title: '회사 소개', items: [
                  { name: '기업소개', href: '/about/intro' },
                  { name: '기업 연혁', href: '/about/intro#history' },
                  { name: '경영 철학', href: '/about/intro#philosophy' },
                  { name: '사업장 소개', href: '/about/intro#business' },
                  { name: '조직 및 인증서', href: '/about/intro#certification' }
                ]},
                { title: '판매 제품', items: [
                  { name: '판매 제품', href: '/products/all' },
                  { name: '레시피', href: '/content/recipe' }
                ]},
                { title: 'ACE 스토리', items: [
                  { name: '사내 문화', href: '/culture/internal' },
                  { name: '스토리', href: '/culture/story' }
                ]},
                { title: '고객 지원', items: [
                  { name: '고객문의', href: '/support/contact' },
                  { name: '찾아오시는 길', href: '/support/location' }
                ]}
              ].map((menu) => (
                <div key={menu.title} className="mb-6">
                  <button
                    onClick={() => setActiveMenu(activeMenu === menu.title ? null : menu.title)}
                    className="w-full flex items-center justify-between py-3 text-lg font-bold text-[#4A4039] border-b border-gray-100"
                  >
                    {menu.title}
                    <svg className={`w-5 h-5 transition-transform ${activeMenu === menu.title ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeMenu === menu.title && (
                    <div className="py-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-3 px-4 text-[#6B5D53] hover:text-[#B8956A] hover:bg-[#FAF6F1] rounded-lg transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Image Slider */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image Slider - 책 넘김 효과 */}
        <div className="absolute inset-0 overflow-hidden">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlide;
            const isPrev = index === (currentSlide - 1 + heroSlides.length) % heroSlides.length;

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out origin-left ${
                  isActive
                    ? 'translate-x-0 opacity-100 z-10'
                    : isPrev
                    ? 'translate-x-full opacity-0 z-0'
                    : '-translate-x-full opacity-0 z-0'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}

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

              {/* Main Title - Korean */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 sm:mb-8 animate-fadeInUp animation-delay-200">
                <span className="block mb-1 sm:mb-2">
                  {heroContent?.data?.mainTitle || '최상의 원재료로'}
                </span>
                <span
                  className="block text-white/90"
                  dangerouslySetInnerHTML={{
                    __html: heroContent?.data?.subTitle || '완성하는 <span class="text-[#D4A574]">프리미엄</span> 베이킹'
                  }}
                />
              </h1>

              {/* Decorative Line */}
              <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10 animate-fadeInUp animation-delay-400">
                <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-[#D4A574] to-transparent"></div>
                <span className="italic text-white/60 text-xs sm:text-sm tracking-wider">
                  {heroContent?.data?.since || 'Since 2010'}
                </span>
                <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-[#D4A574] to-transparent"></div>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-8 sm:mb-12 max-w-lg animate-fadeInUp animation-delay-400 font-light">
                {heroContent?.data?.description || (
                  <>
                    15년간 축적된 노하우와 엄격한 품질 관리로<br className="hidden sm:block" />
                    최고의 베이커리 원재료를 공급합니다.
                  </>
                )}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 animate-fadeInUp animation-delay-600">
                <Link
                  href={heroContent?.data?.cta1Link || '/products/all'}
                  className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3 sm:py-4 bg-[#B8956A] text-white font-semibold tracking-wide hover:bg-[#A67C52] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 rounded-lg text-sm sm:text-base"
                >
                  {heroContent?.data?.cta1Text || '제품 보기'}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={heroContent?.data?.cta2Link || '/about/intro'}
                  className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3 sm:py-4 border border-white/40 text-white font-semibold tracking-wide hover:bg-white/10 backdrop-blur-sm transition-all duration-300 rounded-lg text-sm sm:text-base"
                >
                  {heroContent?.data?.cta2Text || '회사 소개'}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 text-white text-center hidden lg:block">
          <div className="w-12 h-12 border-2 border-white/80 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* Renewed Mission & Vision Section - Modern Corporate Style */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        id="mission"
        className="py-16 sm:py-24 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Clean & Minimal */}
          <div className={`text-center mb-12 sm:mb-20 ${isVisible.mission ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">Our Mission</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#4A4039] mb-4 sm:mb-6 px-2">
              {missionContent?.data?.title || '최고의 품질로 성공을 만들어갑니다'}
            </h2>
            <p className="text-sm sm:text-lg text-[#6B5D53] max-w-2xl mx-auto px-2">
              {missionContent?.data?.description || '15년의 경험과 전문성으로 고객사의 성공적인 비즈니스를 위한 최적의 솔루션을 제공합니다'}
            </p>
          </div>

          {/* Process Flow Section */}
          <div className={`mb-16 sm:mb-32 ${isVisible.mission ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
            <div className="relative">
              {/* Connection Line - 원 아이콘 중앙에 맞춤 (top-12 = 원 높이 절반) */}
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-transparent via-[#E8DCC8] to-transparent"></div>

              {/* Process Steps */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                {[
                  {
                    step: '01',
                    title: '품질 검증',
                    desc: '우수기술기업 인증',
                    icon: (
                      <svg className="w-12 h-12 text-[#B8956A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  {
                    step: '02',
                    title: '재고 관리',
                    desc: '실시간 재고 시스템',
                    icon: (
                      <svg className="w-12 h-12 text-[#B8956A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )
                  },
                  {
                    step: '03',
                    title: '신속 배송',
                    desc: '당일/익일 배송',
                    icon: (
                      <svg className="w-12 h-12 text-[#B8956A]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                    )
                  },
                  {
                    step: '04',
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
                    <div className="relative z-10 w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-6 bg-white border-2 sm:border-4 border-[#F5EFE7] rounded-full flex items-center justify-center group-hover:border-[#B8956A] transition-all duration-300 shadow-lg">
                      <div className="scale-75 sm:scale-100">{item.icon}</div>
                    </div>
                    {/* Step Number */}
                    <span className="absolute top-0 right-1/2 translate-x-1/2 text-[10px] sm:text-xs font-bold text-[#B8956A] bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-md">
                      {item.step}
                    </span>
                    {/* Content */}
                    <h4 className="text-sm sm:text-base font-bold text-[#4A4039] mb-1 sm:mb-2">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-[#8B7D73]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Values - Card Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {(coreValues.length > 0 ? coreValues : [
              {
                title: '품질 최우선',
                subtitle: 'Quality First',
                description: '엄격한 품질관리 시스템으로 최고의 제품만을 선별합니다',
                imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop'
              },
              {
                title: '고객 중심',
                subtitle: 'Customer Focus',
                description: '고객의 니즈를 정확히 파악하여 맞춤형 솔루션을 제공합니다',
                imageUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=400&fit=crop'
              },
              {
                title: '전문성',
                subtitle: 'Expertise',
                description: '15년간 축적된 노하우와 전문 지식을 바탕으로 서비스합니다',
                imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop'
              },
              {
                title: '혁신 추구',
                subtitle: 'Innovation',
                description: '시장 트렌드를 선도하며 새로운 가치를 창출합니다',
                imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop'
              }
            ]).map((value, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer ${isVisible.mission ? `animate-fadeInScale animation-delay-${index * 100}` : 'opacity-0'}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img src={value.imageUrl || ''} alt={value.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative p-4 sm:p-8 h-48 sm:h-80 flex flex-col justify-end">
                  <span className="text-[#FFE5CC] text-[10px] sm:text-xs font-medium tracking-wider uppercase mb-1 sm:mb-2">{value.subtitle}</span>
                  <h3 className="text-white text-base sm:text-2xl font-bold mb-1 sm:mb-3">{value.title}</h3>
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">{value.description}</p>
                </div>

                {/* Hover Overlay - Hidden on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-[#B8956A]/50 opacity-0 group-hover:opacity-100 transition-all duration-500 hidden sm:flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-16 h-16 mx-auto mb-4 border-2 border-white rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">{value.description}</p>
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
        className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF6F1] to-white relative overflow-hidden"
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
          <div className={`text-center mb-12 sm:mb-20 ${isVisible.story ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">Our Story</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#4A4039] mb-4 sm:mb-6">
              15년 전통의 신뢰와 혁신
            </h2>
            <p className="text-sm sm:text-lg text-[#6B5D53] max-w-2xl mx-auto px-2">
              2010년 창립 이래, 카페·베이커리 원재료 유통의 새로운 기준을 만들어가고 있습니다
            </p>
          </div>

          {/* Timeline Section */}
          <div className={`mb-16 sm:mb-32 ${isVisible.story ? 'animate-fadeInUp animation-delay-200' : 'opacity-0'}`}>
            <div className="relative">
              {/* Vertical Line */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#B8956A] via-[#D4A574] to-[#B8956A]"></div>

              {/* Timeline Items */}
              <div className="space-y-8 sm:space-y-24">
                {(timeline.length > 0 ? timeline.slice(0, 5) : [
                  {
                    year: '2010',
                    title: '에이스유통㈜ 창립',
                    desc: '직원 5명으로 카페·베이커리 원재료 유통 사업 시작',
                    imageUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&h=600&fit=crop',
                  },
                  {
                    year: '2015',
                    title: '본사 사옥 신축 이전',
                    desc: '경기도 하남시 천현동에 자체 물류센터 보유 사옥 신축',
                    imageUrl: '/사업장.png',
                  },
                  {
                    year: '2019',
                    title: '우수기술기업 인증',
                    desc: '제과제빵 재료 유통물류 및 기술마케팅 부문 우수기술기업 인증 획득',
                    imageUrl: '/우수기술기업 인증서.png',
                  },
                  {
                    year: '2020',
                    title: '창립 10주년 & 특허 취득',
                    desc: '제과제빵류 운반 및 보관용 냉장/냉동장치 특허 취득',
                    imageUrl: '/특허증.png',
                  },
                  {
                    year: '2025',
                    title: '전략적 파트너십 체결',
                    desc: 'IP 굿즈 및 에듀 콘텐츠 기업 ㈜토이트론과 전략적 계약 체결',
                    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
                  }
                ]).map((item, index) => {
                  const position = index % 2 === 0 ? 'left' : 'right';
                  return (
                    <div key={index} className={`relative flex items-center ${position === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                      {/* Year Badge */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#B8956A] text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl z-10 hidden lg:block">
                        {item.year}
                      </div>

                      {/* Content Card */}
                      <div className={`w-full lg:w-5/12 ${position === 'right' ? 'lg:ml-auto lg:pl-12' : 'lg:mr-auto lg:pr-12'}`}>
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden group hover:shadow-3xl transition-shadow duration-500">
                          {/* Image */}
                          {item.imageUrl && (
                            <div className="h-40 sm:h-56 overflow-hidden bg-white flex items-center justify-center p-4">
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          )}
                          {/* Content */}
                          <div className="p-4 sm:p-8">
                            <span className="lg:hidden inline-block bg-[#B8956A] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-4">
                              {item.year}
                            </span>
                            <h3 className="text-lg sm:text-2xl font-bold text-[#4A4039] mb-2 sm:mb-3">{item.title}</h3>
                            <p className="text-sm sm:text-base text-[#6B5D53] leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Achievement Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
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
                className={`text-center p-4 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${isVisible.story ? `animate-fadeInScale animation-delay-${index * 100}` : 'opacity-0'}`}
              >
                <div className="mb-2 sm:mb-4 scale-75 sm:scale-100">{stat.icon}</div>
                <div className="text-xl sm:text-3xl font-bold text-[#B8956A] mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-xs sm:text-sm text-[#6B5D53] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">CEO MESSAGE</span>
            <h2
              className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-6 sm:mb-8 leading-tight"
              dangerouslySetInnerHTML={{
                __html: ceoContent?.data?.title || '좋은 상품을 정직하게 유통하는<br /><span class="text-[#B8956A]">신뢰받는 파트너</span>가 되겠습니다'
              }}
            />
          </div>

          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-[#6B5D53] leading-relaxed text-center max-w-3xl mx-auto">
            <p>
              에이스유통주식회사는 카페·베이커리 산업을 위한<br className="hidden sm:block" />
              프리미엄 원재료 공급, 전문 소싱, 콜드체인 물류,<br className="hidden sm:block" />
              품질관리(QC)를 기반으로 성장해온 F&B B2B 솔루션 기업입니다.
            </p>
            <p>
              2010년 설립 이후 자체 물류센터와<br className="hidden sm:block" />
              체계적인 유통 인프라를 구축하며 국내 프랜차이즈,<br className="hidden sm:block" />
              베이커리 카페, 전문 제과점 등 다양한 파트너에게<br className="hidden sm:block" />
              신뢰성 높은 제품을 안정적으로 공급해왔습니다.
            </p>
            <p>
              당사는 원재료의 선별력과 정교한 품질관리,<br className="hidden sm:block" />
              신속한 공급망 운영을 통해 고객이 필요로 하는 제품을<br className="hidden sm:block" />
              정확하고 안정적으로 전달하는 데 집중해 왔으며,<br className="hidden sm:block" />
              업계에서 견고한 파트너십을 확보해 왔습니다.
            </p>
            <p className="font-medium text-[#4A4039]">
              에이스유통은 앞으로도 고품질 원재료와<br className="hidden sm:block" />
              안정적인 공급 체계를 중심으로 고객의 비즈니스를<br className="hidden sm:block" />
              확실하게 지원하는 신뢰받는 유통 파트너로 자리매김하겠습니다.
            </p>
          </div>

          {/* CEO Signature */}
          <div className="mt-12 pt-8 border-t border-[#E8DCC8] text-center">
            <p className="text-[#B8956A] font-bold text-lg">
              {ceoContent?.data?.company || '에이스유통주식회사'}
            </p>
            <div className="flex items-center justify-center gap-3 mt-1">
              <p className="text-[#4A4039] font-bold text-xl">
                {ceoContent?.data?.ceo || '대표이사 안종일'}
              </p>
              <Image
                src={ceoContent?.data?.signatureUrl || '/sign.png'}
                alt="대표이사 서명"
                width={80}
                height={32}
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gradient-to-b from-[#4A4039] to-[#3A3029] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Top */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-8 md:gap-16 pb-12 border-b border-white/10">
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