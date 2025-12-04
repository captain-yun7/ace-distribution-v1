'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import { useState } from 'react';

const recipes = [
  { title: '클래식 크루아상', category: '빵', difficulty: '상', time: '6시간', desc: '버터의 풍미가 살아있는 정통 프랑스 크루아상', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop' },
  { title: '티라미수', category: '디저트', difficulty: '중', time: '4시간', desc: '마스카포네 치즈와 에스프레소의 완벽한 조화', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop' },
  { title: '바스크 치즈케이크', category: '케이크', difficulty: '하', time: '1시간', desc: '겉은 바삭, 속은 크리미한 바스크식 치즈케이크', image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800&h=600&fit=crop' },
  { title: '마카롱', category: '쿠키', difficulty: '상', time: '3시간', desc: '컬러풀한 프렌치 마카롱 만들기', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&h=600&fit=crop' },
  { title: '식빵', category: '빵', difficulty: '중', time: '4시간', desc: '부드럽고 촉촉한 기본 식빵', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&h=600&fit=crop' },
  { title: '초코 브라우니', category: '디저트', difficulty: '하', time: '1시간', desc: '진한 초콜릿의 풍미가 가득한 브라우니', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop' },
];

export default function RecipePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '빵', '케이크', '디저트', '쿠키'];

  const filteredRecipes = selectedCategory === '전체'
    ? recipes
    : recipes.filter(r => r.category === selectedCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="RECIPE"
          title="레시피"
          subtitle="셰프의 노하우가 담긴 프리미엄 레시피"
          breadcrumb={[
            { name: '콘텐츠 / 홍보', href: '/content/recipe' },
            { name: '레시피' }
          ]}
        />

        {/* Category Filter */}
        <section className="py-8 bg-white border-b border-[#E8DCC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    cat === selectedCategory
                      ? 'bg-[#B8956A] text-white'
                      : 'bg-[#FAF6F1] text-[#4A4039] hover:bg-[#B8956A] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Recipe Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map((recipe, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-[#B8956A] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {recipe.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#4A4039] mb-2 group-hover:text-[#B8956A] transition-colors">{recipe.title}</h3>
                    <p className="text-[#6B5D53] text-sm mb-4">{recipe.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-[#6B5D53]">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {recipe.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        난이도: {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">새로운 레시피를 가장 먼저 받아보세요</h2>
            <p className="text-white/80 mb-8">에이스유통의 뉴스레터를 구독하시면 최신 레시피와 트렌드 소식을 받아보실 수 있습니다.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-4 py-3 rounded-xl text-[#4A4039] placeholder:text-[#6B5D53] focus:outline-none focus:ring-2 focus:ring-[#B8956A]"
              />
              <button className="bg-[#B8956A] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#D4A574] transition-colors">
                구독하기
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
