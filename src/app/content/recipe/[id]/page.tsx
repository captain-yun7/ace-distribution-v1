'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';
import { useEffect, useState, use } from 'react';

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
}

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        if (res.ok) {
          const data = await res.json();
          setRecipe(data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#FAF6F1]">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="aspect-square bg-gray-200 rounded-2xl"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !recipe) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-[#B8956A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#4A4039] mb-4">레시피를 찾을 수 없습니다</h1>
            <p className="text-[#6B5D53] mb-8">요청하신 레시피가 존재하지 않거나 삭제되었습니다.</p>
            <Link
              href="/content/recipe"
              className="inline-flex items-center gap-2 bg-[#B8956A] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#A07D58] transition-colors"
            >
              레시피 목록으로
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="RECIPE"
          title={recipe.title}
          subtitle="프리미엄 레시피"
          breadcrumb={[
            { name: '판매 제품', href: '/products/all' },
            { name: '레시피', href: '/content/recipe' },
            { name: recipe.title }
          ]}
        />

        {/* Recipe Detail */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Recipe Content */}
            <div className="bg-white rounded-2xl border border-[#E8DCC8] p-6 sm:p-10">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-[#4A4039] mb-8 pb-6 border-b border-[#E8DCC8]">
                {recipe.title}
              </h1>

              {/* Description - Rich HTML */}
              {recipe.description && (
                <div
                  className="recipe-content max-w-none text-[#6B5D53] text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: recipe.description }}
                />
              )}
            </div>
          </div>
        </section>

        {/* Back to List */}
        <section className="py-8 border-t border-[#E8DCC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <Link
                href="/content/recipe"
                className="inline-flex items-center gap-2 text-[#6B5D53] hover:text-[#B8956A] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                레시피 목록으로 돌아가기
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
