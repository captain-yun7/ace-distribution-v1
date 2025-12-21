'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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

// 초기 더미 데이터 (DB에 데이터가 없을 때 표시)
const dummyStories: Story[] = [
  {
    id: '1',
    title: '프랜차이즈 카페 A사와 함께한 베이커리 메뉴 혁신',
    category: 'PARTNERSHIP',
    description: '고품질 냉동 베이커리 공급 및 메뉴 컨설팅을 통해 베이커리 매출 40% 증가를 달성한 성공 사례입니다.',
    content: null,
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop',
    thumbnailUrl: null,
    tags: ['카페', '베이커리', '매출증가'],
    isFeatured: true,
    publishedAt: '2024-12-15T00:00:00Z',
  },
  {
    id: '2',
    title: '호텔 B사 조식 뷔페 품질 향상 프로젝트',
    category: 'PARTNERSHIP',
    description: '호텔 전용 프리미엄 빵 라인업 개발로 고객 만족도 향상, 재구매율 95% 달성',
    content: null,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    thumbnailUrl: null,
    tags: ['호텔', '프리미엄', '품질'],
    isFeatured: true,
    publishedAt: '2024-11-20T00:00:00Z',
  },
  {
    id: '3',
    title: '에이스유통, 식품 유통업계 혁신 기업 선정',
    category: 'PRESS',
    description: '한국경제신문 주최 2024 식품유통대상에서 혁신 기업으로 선정되었습니다.',
    content: null,
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
    thumbnailUrl: null,
    tags: ['수상', '혁신', '식품유통'],
    isFeatured: true,
    publishedAt: '2024-12-01T00:00:00Z',
  },
  {
    id: '4',
    title: '지역 베이커리 상생 프로그램 성과 발표',
    category: 'PRESS',
    description: '지역 소상공인과의 상생 협력 프로그램을 통해 50개 이상의 지역 베이커리를 지원했습니다.',
    content: null,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    thumbnailUrl: null,
    tags: ['상생', '소상공인', '지역경제'],
    isFeatured: false,
    publishedAt: '2024-10-15T00:00:00Z',
  },
  {
    id: '5',
    title: '편의점 C사 전국 물류망 효율화',
    category: 'PARTNERSHIP',
    description: '콜드체인 기반 전국 배송 시스템 구축으로 배송 시간 30% 단축 달성',
    content: null,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    thumbnailUrl: null,
    tags: ['편의점', '물류', '콜드체인'],
    isFeatured: false,
    publishedAt: '2024-09-10T00:00:00Z',
  },
  {
    id: '6',
    title: '에이스유통 ESG 경영 우수기업 인증',
    category: 'PRESS',
    description: '환경·사회·지배구조 분야에서 우수한 성과를 인정받아 ESG 우수기업 인증을 획득했습니다.',
    content: null,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    thumbnailUrl: null,
    tags: ['ESG', '지속가능', '인증'],
    isFeatured: false,
    publishedAt: '2024-08-20T00:00:00Z',
  },
];

export default function StoryPage() {
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
          if (data.stories && data.stories.length > 0) {
            setStories(data.stories);
          } else {
            // DB에 데이터가 없으면 더미 데이터 사용
            setStories(dummyStories);
          }
        } else {
          setStories(dummyStories);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
        setStories(dummyStories);
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
        <section className="py-12 bg-white border-b border-[#E8DCC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-[#B8956A] text-white shadow-lg'
                    : 'bg-white text-[#6B5D53] border border-[#E8DCC8] hover:border-[#B8956A] hover:text-[#B8956A]'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setActiveCategory('PARTNERSHIP')}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === 'PARTNERSHIP'
                    ? 'bg-[#B8956A] text-white shadow-lg'
                    : 'bg-white text-[#6B5D53] border border-[#E8DCC8] hover:border-[#B8956A] hover:text-[#B8956A]'
                }`}
              >
                협력 사례
              </button>
              <button
                onClick={() => setActiveCategory('PRESS')}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
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
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#4A4039] mb-8">
              {activeCategory === 'all' ? '전체 스토리' : categoryLabels[activeCategory]}
            </h2>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#E8DCC8] animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200"></div>
                    <div className="p-5">
                      <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredStories.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredStories.map((story) => (
                  <Link
                    key={story.id}
                    href={`/culture/story/${story.id}`}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group block"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#FAF6F1] to-white">
                      <img
                        src={story.imageUrl || story.thumbnailUrl || defaultImages[story.category]}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-[#B8956A] text-white text-xs font-bold px-3 py-1 rounded-full">
                          {categoryLabels[story.category]}
                        </span>
                        {story.isFeatured && (
                          <span className="bg-[#4A4039] text-white text-xs font-bold px-3 py-1 rounded-full">
                            주요
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-[#6B5D53] mb-2">{formatDate(story.publishedAt)}</div>
                      <h3 className="text-lg font-bold text-[#4A4039] mb-2 group-hover:text-[#B8956A] transition-colors line-clamp-2">
                        {story.title}
                      </h3>
                      <p className="text-sm text-[#6B5D53] line-clamp-2">{story.description}</p>
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
        <section className="py-16 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">파트너가 되어주세요</h2>
            <p className="text-white/80 mb-8">
              에이스유통과 함께 성장할 파트너를 기다립니다
            </p>
            <Link
              href="/support/contact"
              className="inline-flex items-center gap-2 bg-white text-[#4A4039] px-8 py-4 rounded-xl font-bold hover:bg-[#FAF6F1] transition-colors"
            >
              파트너십 문의
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
