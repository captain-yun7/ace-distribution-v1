'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('grain'); // grain, nut, sugar

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

      {/* Floating Consultation Button */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
        <Link
          href="/contact"
          className="bg-[#1e3a8a] text-white px-4 py-6 rounded-l-lg shadow-xl hover:bg-[#1e40af] transition-all duration-300 flex flex-col items-center gap-2 font-bold"
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
      <header className="bg-white border-b-2 border-gray-100 relative z-50 shadow-sm">
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
          <nav className="hidden lg:flex items-center flex-1 justify-center space-x-32">
            <div className="relative group">
              <button className="text-gray-900 font-bold text-lg py-8 hover:text-primary whitespace-nowrap cursor-pointer relative flex items-center gap-2 tracking-tight">
                회사소개
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-52 bg-white shadow-2xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 border border-gray-100 overflow-hidden">
                <Link href="/about/greeting" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">인사말</Link>
                <Link href="/about/location" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">찾아오시는길</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="text-gray-900 font-bold text-lg py-8 hover:text-primary whitespace-nowrap cursor-pointer relative flex items-center gap-2 tracking-tight">
                제품소개
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-52 bg-white shadow-2xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 border border-gray-100 overflow-hidden max-h-[500px] overflow-y-auto">
                <Link href="/products/all" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">전체</Link>
                <Link href="/products/legume" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">두서류가공품</Link>
                <Link href="/products/grain" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">곡류가공품</Link>
                <Link href="/products/nut" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">견과가공품</Link>
                <Link href="/products/dairy" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">유지 및 유가공품</Link>
                <Link href="/products/coffee" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">커피오가공품</Link>
                <Link href="/products/sugar" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">당류가공품</Link>
                <Link href="/products/frozen" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">냉동생지류</Link>
                <Link href="/products/flour" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">잡가루</Link>
                <Link href="/products/vegetable" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">과채가공품</Link>
                <Link href="/products/meat" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">축산가공품</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="text-gray-900 font-bold text-lg py-8 hover:text-primary whitespace-nowrap cursor-pointer relative flex items-center gap-2 tracking-tight">
                커뮤니티
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-52 bg-white shadow-2xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 border border-gray-100 overflow-hidden">
                <Link href="/community/notice" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">공지사항</Link>
                <Link href="/community/news" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">보도자료</Link>
                <Link href="/community/recipe" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">레시피</Link>
                <Link href="/community/qna" className="block px-6 py-4 hover:bg-gray-50 hover:text-primary transition-all font-semibold border-b border-gray-50 last:border-0 hover:pl-8 hover:border-l-4 hover:border-l-primary">Q&A</Link>
              </div>
            </div>

            <Link href="/contact" className="text-gray-900 font-bold text-lg py-8 hover:text-primary whitespace-nowrap cursor-pointer relative group tracking-tight">
              온라인 문의
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </Link>
          </nav>

          {/* Right Side - Login/Language */}
          <div className="hidden lg:flex items-center gap-3 pr-8">
            <Link href="/login" className="text-gray-700 text-sm font-semibold hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">로그인</Link>
            <span className="text-gray-300">|</span>
            <Link href="/register" className="text-gray-700 text-sm font-semibold hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">회원가입</Link>
          </div>
        </div>
      </header>

      {/* Main Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {mainSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.bgImage}')` }}
              />
              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="max-w-3xl">
                <h2 className="text-7xl font-bold text-white mb-6 leading-tight">
                  Right Food<br />Right Person
                </h2>
                <p className="text-xl text-white mb-10 font-medium">
                  생명 존중 정신을 바탕으로<br />
                  인류 건강문화에 기여하겠습니다.
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-white text-gray-900 px-10 py-4 font-semibold hover:bg-gray-100 transition shadow-lg"
                >
                  View More
                </Link>
              </div>
            </div>

          </div>
        ))}

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 right-8 z-20 text-white text-center hidden lg:block">
          <div className="text-sm font-medium mb-2">Scroll</div>
          <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center mx-auto animate-bounce">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {mainSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-white relative overflow-hidden">
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
              <h2 className="text-5xl font-bold text-gray-900 mb-3">추천제품</h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            <p className="text-gray-600 mt-4 text-lg">고객님을 위한 엄선된 프리미엄 식자재</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex gap-4 mb-8 border-b border-gray-200 justify-center">
              <button
                  onClick={() => setActiveTab('grain')}
                  className={`px-6 py-3 font-semibold transition-colors relative cursor-pointer ${
                    activeTab === 'grain'
                      ? 'text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  곡류가공품
                  {activeTab === 'grain' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('nut')}
                  className={`px-6 py-3 font-semibold transition-colors relative cursor-pointer ${
                    activeTab === 'nut'
                      ? 'text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  견과가공품
                  {activeTab === 'nut' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('sugar')}
                  className={`px-6 py-3 font-semibold transition-colors relative cursor-pointer ${
                    activeTab === 'sugar'
                      ? 'text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  당류가공품
                  {activeTab === 'sugar' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
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
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e3a8a] text-white font-bold text-lg rounded-lg hover:bg-[#1e40af] transition-all duration-300 shadow-md hover:shadow-xl"
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
            <svg viewBox="0 0 200 200" className="text-[#1e3a8a]">
              <rect x="50" y="50" width="100" height="100" fill="currentColor" opacity="0.3" rx="10"/>
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="4"/>
              <path d="M70,100 L90,120 L130,80" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="absolute top-8 right-[12%] w-72 h-72">
            <svg viewBox="0 0 200 200" className="text-primary">
              <polygon points="100,20 180,180 20,180" fill="currentColor" opacity="0.2"/>
            </svg>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-5xl font-bold text-gray-900 mb-3">왜 에이스유통인가?</h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-[#1e3a8a] to-transparent"></div>
            </div>
            <p className="text-gray-600 mt-4 text-lg">30년 전통의 신뢰와 품질로 함께합니다</p>
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
      <section className="py-20 bg-gray-50 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-visible">
          <div className="absolute top-0 left-[15%] w-64 h-64">
            <svg viewBox="0 0 200 200" className="text-primary">
              <rect x="40" y="60" width="120" height="80" fill="currentColor" opacity="0.3" rx="5"/>
              <line x1="60" y1="80" x2="140" y2="80" stroke="currentColor" strokeWidth="3"/>
              <line x1="60" y1="100" x2="140" y2="100" stroke="currentColor" strokeWidth="3"/>
              <line x1="60" y1="120" x2="120" y2="120" stroke="currentColor" strokeWidth="3"/>
            </svg>
          </div>
          <div className="absolute top-4 right-[15%] w-64 h-64">
            <svg viewBox="0 0 200 200" className="text-secondary">
              <path d="M50,100 L100,50 L150,100 L100,150 Z" fill="currentColor" opacity="0.2"/>
              <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-5xl font-bold text-gray-900 mb-3">최신소식</h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            <p className="text-gray-600 mt-4 text-lg">에이스유통의 새로운 소식을 전합니다</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 공지사항 */}
            <div className="bg-white border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">공지사항</h3>
                <Link href="/community/notice" className="text-sm text-gray-600 hover:text-primary">
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
                  <Link key={index} href="#" className="block hover:bg-gray-50 group">
                    <div className="flex gap-4 p-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-900 group-hover:text-primary font-medium mb-1 truncate">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500">{item.date}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 보도자료 */}
            <div className="bg-white border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">보도자료</h3>
                <Link href="/community/news" className="text-sm text-gray-600 hover:text-primary">
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
                  <Link key={index} href="#" className="block hover:bg-gray-50 group">
                    <div className="flex gap-4 p-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-900 group-hover:text-primary font-medium mb-1 truncate">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500">{item.date}</div>
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
      <section className="py-20 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            최고의 식자재 파트너가 필요하신가요?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            30년 전통의 에이스유통이 귀사의 성공적인 비즈니스를 도와드립니다
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#1e3a8a] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
          >
            상담 신청하기
          </Link>
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
