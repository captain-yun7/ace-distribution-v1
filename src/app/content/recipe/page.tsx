'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RecipePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '빵/베이커리', '케이크', '간편식', '음료'];

  const recipes = [
    {
      id: 1,
      title: '클래식 크로아상',
      category: '빵/베이커리',
      difficulty: '중급',
      time: '3시간',
      image: '/images/recipe-croissant.jpg',
      description: '겉은 바삭하고 속은 부드러운 정통 프랑스 크로아상 레시피',
    },
    {
      id: 2,
      title: '당근 케이크',
      category: '케이크',
      difficulty: '초급',
      time: '1시간 30분',
      image: '/images/recipe-carrot.jpg',
      description: '촉촉하고 달콤한 당근 케이크와 크림치즈 프로스팅',
    },
    {
      id: 3,
      title: '식빵 샌드위치',
      category: '간편식',
      difficulty: '초급',
      time: '20분',
      image: '/images/recipe-sandwich.jpg',
      description: '든든한 아침을 위한 영양 가득 샌드위치',
    },
    {
      id: 4,
      title: '바게트',
      category: '빵/베이커리',
      difficulty: '고급',
      time: '5시간',
      image: '/images/recipe-baguette.jpg',
      description: '겉은 바삭, 속은 쫀득한 프랑스 정통 바게트',
    },
    {
      id: 5,
      title: '티라미수',
      category: '케이크',
      difficulty: '중급',
      time: '4시간',
      image: '/images/recipe-tiramisu.jpg',
      description: '진한 에스프레소 향이 가득한 이탈리안 티라미수',
    },
    {
      id: 6,
      title: '아이스 아메리카노',
      category: '음료',
      difficulty: '초급',
      time: '5분',
      image: '/images/recipe-americano.jpg',
      description: '시원하고 깔끔한 에스프레소 기반 음료',
    },
  ];

  const filteredRecipes = selectedCategory === '전체'
    ? recipes
    : recipes.filter(r => r.category === selectedCategory);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-primary to-accent flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">레시피</h1>
          <p className="text-xl opacity-90">에이스유통이 제안하는 맛있는 레시피</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-beige-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-primary">홈</Link>
            <span>/</span>
            <span className="text-primary font-medium">레시피</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-beige-100 text-text-secondary hover:bg-beige-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <article
                key={recipe.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                      {recipe.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-text-secondary mb-4">{recipe.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {recipe.time}
                      </span>
                      <span className="flex items-center gap-1 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        {recipe.difficulty}
                      </span>
                    </div>
                    <button className="text-primary font-medium hover:underline">
                      자세히 보기
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full transition-colors">
              더 보기
            </button>
          </div>
        </div>
      </section>

      {/* Featured Recipe */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">이달의 추천 레시피</h2>
            <p className="text-text-secondary">에이스유통이 선정한 특별 레시피</p>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="aspect-square bg-white/50 rounded-2xl flex items-center justify-center">
                <svg className="w-32 h-32 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
              </div>
              <div>
                <span className="inline-block bg-primary text-white text-sm px-4 py-1 rounded-full mb-4">
                  12월 추천
                </span>
                <h3 className="text-3xl font-bold text-text-primary mb-4">크리스마스 슈톨렌</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  독일 전통 크리스마스 빵 슈톨렌을 집에서 만들어보세요.
                  건포도와 오렌지 필, 견과류가 어우러진 풍성한 맛을 느낄 수 있습니다.
                  에이스유통의 프리미엄 제빵 재료로 더욱 특별하게!
                </p>
                <div className="flex gap-6 mb-6">
                  <div>
                    <p className="text-sm text-text-light">조리 시간</p>
                    <p className="font-bold text-text-primary">4시간</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-light">난이도</p>
                    <p className="font-bold text-text-primary">중급</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-light">인분</p>
                    <p className="font-bold text-text-primary">8인분</p>
                  </div>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full transition-colors">
                  레시피 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
