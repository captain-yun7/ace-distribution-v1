'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// HTML 태그를 제거하고 텍스트만 추출하는 함수
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
}

export default function RecipePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('/api/recipes');
        if (res.ok) {
          const data = await res.json();
          setRecipes(data.recipes);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

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

        {/* Recipe Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#E8DCC8] animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recipes.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe) => (
                  <Link href={`/content/recipe/${recipe.id}`} key={recipe.id} className="bg-white rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group block">
                    <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#B8956A]/10 to-[#D4A574]/10">
                      {recipe.imageUrl ? (
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-16 h-16 text-[#B8956A]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#4A4039] mb-2 group-hover:text-[#B8956A] transition-colors">{recipe.title}</h3>
                      <p className="text-[#6B5D53] text-sm line-clamp-2">{stripHtml(recipe.description)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#E8DCC8]">
                <div className="w-16 h-16 bg-[#B8956A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#4A4039] mb-2">등록된 레시피가 없습니다</h3>
                <p className="text-[#6B5D53]">레시피가 등록되면 이곳에 표시됩니다.</p>
              </div>
            )}
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
                구독
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
