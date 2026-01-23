'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Story {
  id: string;
  title: string;
  category: 'PARTNERSHIP' | 'PRESS';
  description: string;
  content: string | null;
  imageUrl: string | null;
  thumbnailUrl: string | null;
  tags: string[] | null;
  isFeatured: boolean;
  publishedAt: string;
}

const categoryLabels: Record<string, string> = {
  'PARTNERSHIP': '협력 사례',
  'PRESS': '언론 보도',
};

const defaultImages: Record<string, string> = {
  'PARTNERSHIP': 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
  'PRESS': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
};


function StoryPageContent() {
  const searchParams = useSearchParams();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // URL 쿼리 파라미터에서 초기 카테고리 설정
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && (categoryParam === 'PARTNERSHIP' || categoryParam === 'PRESS')) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch('/api/stories?limit=50');
        if (res.ok) {
          const data = await res.json();
          setStories(data.stories || []);
        } else {
          setStories([]);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
        setStories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const filteredStories = activeCategory === 'all'
    ? stories
    : stories.filter(s => s.category === activeCategory);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="STORY"
          title="스토리"
          subtitle="에이스유통의 협력 사례와 언론 보도"
          breadcrumb={[
            { name: 'ACE 스토리', href: '/culture/internal' },
            { name: '스토리' }
          ]}
        />

        {/* Category Tabs */}
        <section className="py-8 sm:py-12 bg-white border-b border-[#E8DCC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-[#B8956A] text-white shadow-lg'
                    : 'bg-white text-[#6B5D53] border border-[#E8DCC8] hover:border-[#B8956A] hover:text-[#B8956A]'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setActiveCategory('PARTNERSHIP')}
                className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeCategory === 'PARTNERSHIP'
                    ? 'bg-[#B8956A] text-white shadow-lg'
                    : 'bg-white text-[#6B5D53] border border-[#E8DCC8] hover:border-[#B8956A] hover:text-[#B8956A]'
                }`}
              >
                협력 사례
              </button>
              <button
                onClick={() => setActiveCategory('PRESS')}
                className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeCategory === 'PRESS'
                    ? 'bg-[#B8956A] text-white shadow-lg'
                    : 'bg-white text-[#6B5D53] border border-[#E8DCC8] hover:border-[#B8956A] hover:text-[#B8956A]'
                }`}
              >
                언론 보도
              </button>
            </div>
          </div>
        </section>

        {/* All Stories */}
        <section className="py-10 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#4A4039] mb-6 sm:mb-8">
              {activeCategory === 'all' ? '전체 스토리' : categoryLabels[activeCategory]}
            </h2>

            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8DCC8] animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200"></div>
                    <div className="p-3 sm:p-5">
                      <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredStories.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {filteredStories.map((story) => (
                  <Link
                    key={story.id}
                    href={`/culture/story/${story.id}`}
                    className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group block"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#FAF6F1] to-white">
                      <img
                        src={story.imageUrl || story.thumbnailUrl || defaultImages[story.category]}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex gap-1 sm:gap-2">
                        <span className="bg-[#B8956A] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                          {categoryLabels[story.category]}
                        </span>
                        {story.isFeatured && (
                          <span className="bg-[#4A4039] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                            주요
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-3 sm:p-5">
                      <div className="text-[10px] sm:text-xs text-[#6B5D53] mb-1 sm:mb-2">{formatDate(story.publishedAt)}</div>
                      <h3 className="text-sm sm:text-lg font-bold text-[#4A4039] mb-1 sm:mb-2 group-hover:text-[#B8956A] transition-colors line-clamp-2">
                        {story.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B5D53] line-clamp-2 hidden sm:block">{story.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#E8DCC8]">
                <div className="w-16 h-16 bg-[#B8956A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#4A4039] mb-2">등록된 스토리가 없습니다</h3>
                <p className="text-[#6B5D53]">새로운 스토리가 등록되면 이곳에 표시됩니다.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 sm:py-16 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">파트너가 되어주세요</h2>
            <p className="text-sm sm:text-base text-white/80 mb-6 sm:mb-8">
              에이스유통과 함께 성장할 파트너를 기다립니다
            </p>
            <Link
              href="/support/contact"
              className="inline-flex items-center gap-2 bg-white text-[#4A4039] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-[#FAF6F1] transition-colors"
            >
              파트너십 문의
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default function StoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B8956A]"></div>
      </div>
    }>
      <StoryPageContent />
    </Suspense>
  );
}
