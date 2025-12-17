'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';
import { useEffect, useState, use } from 'react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string;
  thumbnailUrl: string | null;
  imageUrl: string | null;
  author: string | null;
  views: number;
  isPinned: boolean;
  publishedAt: string;
  createdAt: string;
}

const categoryLabels: Record<string, string> = {
  'PRESS_RELEASE': '보도자료',
  'EVENT': '이벤트',
  'NOTICE': '공지사항',
  'BLOG': '블로그',
};

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news/${id}`);
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#FAF6F1]">
          <div className="max-w-4xl mx-auto px-4 py-20">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-12"></div>
              <div className="aspect-video bg-gray-200 rounded-2xl mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !news) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-[#B8956A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#4A4039] mb-4">게시글을 찾을 수 없습니다</h1>
            <p className="text-[#6B5D53] mb-8">요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
            <Link
              href="/content/news"
              className="inline-flex items-center gap-2 bg-[#B8956A] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#A07D58] transition-colors"
            >
              목록으로 돌아가기
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
          badge={categoryLabels[news.category] || news.category}
          title={news.title}
          subtitle={formatDate(news.publishedAt)}
          breadcrumb={[
            { name: '콘텐츠 / 홍보', href: '/content/news' },
            { name: '언론보도', href: '/content/news' },
            { name: news.title }
          ]}
        />

        {/* Article Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Article Header */}
            <div className="bg-white rounded-2xl border border-[#E8DCC8] overflow-hidden">
              {/* Featured Image */}
              {(news.imageUrl || news.thumbnailUrl) && (
                <div className="aspect-video relative">
                  <img
                    src={news.imageUrl || news.thumbnailUrl || ''}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Article Info */}
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-[#E8DCC8]">
                  <span className="bg-[#B8956A] text-white text-sm font-medium px-3 py-1 rounded-full">
                    {categoryLabels[news.category] || news.category}
                  </span>
                  {news.isPinned && (
                    <span className="bg-[#4A4039] text-white text-sm px-3 py-1 rounded-full">
                      주요 소식
                    </span>
                  )}
                  <span className="text-[#6B5D53] text-sm">
                    {formatDate(news.publishedAt)}
                  </span>
                  {news.author && (
                    <span className="text-[#6B5D53] text-sm">
                      작성자: {news.author}
                    </span>
                  )}
                  <span className="text-[#6B5D53] text-sm ml-auto">
                    조회수 {news.views.toLocaleString()}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#4A4039] mb-6">
                  {news.title}
                </h1>

                {/* Excerpt */}
                {news.excerpt && (
                  <p className="text-lg text-[#6B5D53] mb-8 p-4 bg-[#FAF6F1] rounded-xl border-l-4 border-[#B8956A]">
                    {news.excerpt}
                  </p>
                )}

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none text-[#4A4039]
                    prose-headings:text-[#4A4039] prose-headings:font-bold
                    prose-p:text-[#6B5D53] prose-p:leading-relaxed
                    prose-a:text-[#B8956A] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-[#4A4039]
                    prose-ul:text-[#6B5D53] prose-ol:text-[#6B5D53]
                    prose-blockquote:border-l-[#B8956A] prose-blockquote:bg-[#FAF6F1] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                    prose-img:rounded-xl prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
              </div>
            </div>

            {/* Share & Actions */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-white rounded-xl border border-[#E8DCC8]">
              <div className="flex items-center gap-2 text-[#6B5D53]">
                <span className="text-sm">이 글을 공유하세요</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('링크가 복사되었습니다.');
                  }}
                  className="p-2 hover:bg-[#FAF6F1] rounded-lg transition-colors"
                  title="링크 복사"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <Link
                href="/content/news"
                className="inline-flex items-center gap-2 bg-[#B8956A] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#A07D58] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                목록으로
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
