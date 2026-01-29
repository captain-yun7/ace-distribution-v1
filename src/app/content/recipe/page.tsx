'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  isFeatured: boolean;
}

const ITEMS_PER_PAGE = 12;

export default function RecipePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesRes, settingsRes] = await Promise.all([
          fetch('/api/recipes'),
          fetch('/api/settings'),
        ]);

        if (recipesRes.ok) {
          const data = await recipesRes.json();
          setRecipes(data.recipes);
        }

        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          setShowImages(settingsData.showRecipeImages ?? false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 페이지네이션
  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecipes = recipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="RECIPE"
          title="레시피"
          subtitle="셰프의 노하우가 담긴 프리미엄 레시피"
          breadcrumb={[
            { name: '판매 제품', href: '/products/all' },
            { name: '레시피' }
          ]}
        />

        {/* Recipe Grid */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-[#E8DCC8] overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recipes.length > 0 ? (
              <>
                <div className={`grid gap-4 ${showImages ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                  {paginatedRecipes.map((recipe) => (
                    <Link
                      key={recipe.id}
                      href={`/content/recipe/${recipe.id}`}
                      className={`bg-white rounded-xl border border-[#E8DCC8] overflow-hidden hover:border-[#B8956A] hover:shadow-lg transition-all duration-300 group block ${!showImages ? 'flex items-center' : ''}`}
                    >
                      {/* Recipe Image */}
                      {showImages && (
                        <div className="relative aspect-square bg-gray-50">
                          {recipe.imageUrl ? (
                            <Image
                              src={recipe.imageUrl}
                              alt={recipe.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#B8956A]/10 to-[#D4A574]/10">
                              <svg className="w-16 h-16 text-[#B8956A]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Recipe Info */}
                      <div className={`p-4 ${!showImages ? 'flex-1' : ''}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block px-2.5 py-1 bg-[#B8956A]/10 text-[#B8956A] text-[11px] font-medium rounded-full">
                            RECIPE
                          </span>
                          {recipe.isFeatured && (
                            <span className="inline-block px-2.5 py-1 bg-yellow-100 text-yellow-700 text-[11px] font-medium rounded-full">
                              추천
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-[#4A4039] group-hover:text-[#B8956A] transition-colors line-clamp-2">
                          {recipe.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#E8DCC8] text-[#6B5D53] hover:border-[#B8956A] hover:text-[#B8956A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        if (totalPages <= 7) return true;
                        if (page === 1 || page === totalPages) return true;
                        if (Math.abs(page - currentPage) <= 1) return true;
                        return false;
                      })
                      .map((page, idx, arr) => (
                        <div key={page} className="flex items-center">
                          {idx > 0 && arr[idx - 1] !== page - 1 && (
                            <span className="px-2 text-[#6B5D53]">...</span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-[#B8956A] text-white'
                                : 'border border-[#E8DCC8] text-[#6B5D53] hover:border-[#B8956A] hover:text-[#B8956A]'
                            }`}
                          >
                            {page}
                          </button>
                        </div>
                      ))}

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#E8DCC8] text-[#6B5D53] hover:border-[#B8956A] hover:text-[#B8956A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Page Info */}
                <p className="text-center text-sm text-[#6B5D53] mt-4">
                  총 {recipes.length}개 레시피 중 {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, recipes.length)}개 표시
                </p>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-[#E8DCC8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-[#6B5D53] text-lg">등록된 레시피가 없습니다.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">원하시는 레시피를 찾지 못하셨나요?</h2>
            <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-lg">
              에이스유통은 고객의 니즈에 맞는 다양한 레시피를 개발해 드립니다.<br className="hidden sm:block" />
              문의 주시면 맞춤 레시피를 제안해 드리겠습니다.
            </p>
            <Link
              href="/support/contact"
              className="inline-flex items-center gap-2 bg-white text-[#4A4039] px-8 py-4 rounded-xl font-bold hover:bg-[#FAF6F1] transition-colors"
            >
              레시피 문의
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
