'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import { useEffect, useState } from 'react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string;
  thumbnailUrl: string | null;
  imageUrl: string | null;
  author: string | null;
  isPinned: boolean;
  publishedAt: string;
  createdAt: string;
}

const categoryLabels: Record<string, string> = {
  'PRESS_RELEASE': '보도자료',
  'EVENT': '이벤트',
  'NOTICE': '공지',
  'BLOG': '블로그',
};

const defaultImage = 'https://images.unsplash.com/photo-1486427944344-d2f90f9b0678?w=800&h=400&fit=crop';

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news?limit=20');
        if (res.ok) {
          const data = await res.json();
          setNews(data.news);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const featuredNews = news.filter(n => n.isPinned);
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\./g, '.').replace(/\s/g, '');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="MEDIA"
          title="언론보도"
          subtitle="에이스유통의 새로운 소식"
          breadcrumb={[
            { name: '콘텐츠 / 홍보', href: '/content/recipe' },
            { name: '언론보도' }
          ]}
        />

        {/* Featured News */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">FEATURED</span>
              <h2 className="text-3xl font-bold text-[#4A4039]">주요 소식</h2>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl overflow-hidden border border-[#E8DCC8] animate-pulse">
                    <div className="aspect-[2/1] bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-3 bg-gray-200 rounded w-1/4 mb-3"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : featuredNews.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {featuredNews.slice(0, 2).map((item) => (
                  <div key={item.id} className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                    <div className="aspect-[2/1] relative overflow-hidden">
                      <img
                        src={item.imageUrl || item.thumbnailUrl || defaultImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-[#B8956A] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {categoryLabels[item.category] || item.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-[#6B5D53] mb-2">{formatDate(item.publishedAt)}</div>
                      <h3 className="text-xl font-bold text-[#4A4039] mb-3 group-hover:text-[#B8956A] transition-colors">{item.title}</h3>
                      <p className="text-[#6B5D53]">{item.excerpt || item.content.substring(0, 100)}...</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-[#6B5D53]">
                주요 소식이 없습니다.
              </div>
            )}
          </div>
        </section>

        {/* All News */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#4A4039] mb-8">전체 소식</h2>

            {loading ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-[#E8DCC8] animate-pulse flex gap-4">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : news.length > 0 ? (
              <div className="space-y-4">
                {news.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-6 border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-lg transition-all duration-300 group flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs bg-[#B8956A]/10 text-[#B8956A] px-3 py-1 rounded-full font-medium">
                          {categoryLabels[item.category] || item.category}
                        </span>
                        <span className="text-xs text-[#6B5D53]">{formatDate(item.publishedAt)}</span>
                        {item.isPinned && (
                          <span className="text-xs bg-[#4A4039] text-white px-2 py-0.5 rounded-full">
                            주요
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[#4A4039] group-hover:text-[#B8956A] transition-colors">{item.title}</h3>
                      <p className="text-sm text-[#6B5D53] mt-1">{item.excerpt || item.content.substring(0, 80)}...</p>
                    </div>
                    <svg className="w-6 h-6 text-[#B8956A] flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#E8DCC8]">
                <div className="w-16 h-16 bg-[#B8956A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#4A4039] mb-2">등록된 소식이 없습니다</h3>
                <p className="text-[#6B5D53]">새로운 소식이 등록되면 이곳에 표시됩니다.</p>
              </div>
            )}
          </div>
        </section>

        {/* Media Contact */}
        <section className="py-16 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">미디어 문의</h2>
            <p className="text-white/80 mb-8">
              취재, 인터뷰 등 미디어 관련 문의는 아래 연락처로 연락 주시기 바랍니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="flex items-center gap-3 justify-center">
                <svg className="w-5 h-5 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>ace32865@hanmail.net</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <svg className="w-5 h-5 text-[#D4A574]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>02) 471-1644~6</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
