'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import { useState, useEffect } from 'react';

interface Notice {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string;
  isPinned: boolean;
  publishedAt: string;
  createdAt: string;
}

const categories = ['전체', '공지', '보도자료', '이벤트', '블로그'];

const categoryMap: Record<string, string> = {
  '공지': 'NOTICE',
  '보도자료': 'PRESS_RELEASE',
  '이벤트': 'EVENT',
  '블로그': 'BLOG',
};

const categoryLabels: Record<string, string> = {
  'NOTICE': '공지',
  'PRESS_RELEASE': '보도자료',
  'EVENT': '이벤트',
  'BLOG': '블로그',
};

export default function NoticePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch('/api/news?limit=50');
        if (res.ok) {
          const data = await res.json();
          setNotices(data.news);
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const filteredNotices = notices.filter(n => {
    // Category filter
    if (selectedCategory !== '전체') {
      const categoryCode = categoryMap[selectedCategory];
      if (n.category !== categoryCode) return false;
    }
    // Search filter
    if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const importantNotices = filteredNotices.filter(n => n.isPinned);
  const regularNotices = filteredNotices.filter(n => !n.isPinned);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace('.', '');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="NOTICE"
          title="공지사항"
          subtitle="에이스유통의 새로운 소식을 전해드립니다"
          breadcrumb={[
            { name: '고객 지원', href: '/support/faq' },
            { name: '공지사항' }
          ]}
        />

        {/* Search & Filter */}
        <section className="py-6 bg-white border-b border-[#E8DCC8]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-[#B8956A] to-[#D4A574] text-white'
                        : 'bg-[#FAF6F1] text-[#6B5D53] hover:bg-[#E8DCC8]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 rounded-full border border-[#E8DCC8] focus:outline-none focus:ring-2 focus:ring-[#B8956A] text-sm"
                />
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B5D53]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Notice List */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-[#E8DCC8] animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                      <div className="h-5 w-64 bg-gray-200 rounded"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded ml-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Important Notices */}
                {importantNotices.length > 0 && (
                  <div className="mb-8">
                    {importantNotices.map((notice) => (
                      <div
                        key={notice.id}
                        className="bg-gradient-to-r from-[#B8956A]/10 to-[#D4A574]/10 border-l-4 border-[#B8956A] rounded-r-xl p-6 mb-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <span className="bg-gradient-to-r from-[#B8956A] to-[#D4A574] text-white text-xs px-3 py-1 rounded-full font-medium">
                              중요
                            </span>
                            <span className="bg-[#E8DCC8] text-[#6B5D53] text-xs px-2 py-1 rounded">
                              {categoryLabels[notice.category] || notice.category}
                            </span>
                          </div>
                          <h3 className="flex-grow font-bold text-[#4A4039] hover:text-[#B8956A] transition-colors">
                            {notice.title}
                          </h3>
                          <span className="text-sm text-[#6B5D53]">{formatDate(notice.publishedAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Regular Notices */}
                {regularNotices.length > 0 ? (
                  <div className="bg-white rounded-2xl overflow-hidden border border-[#E8DCC8]">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-[#FAF6F1] to-white text-[#6B5D53] text-sm">
                          <th className="py-4 px-6 text-left w-20">번호</th>
                          <th className="py-4 px-6 text-left w-24">분류</th>
                          <th className="py-4 px-6 text-left">제목</th>
                          <th className="py-4 px-6 text-right w-32">작성일</th>
                        </tr>
                      </thead>
                      <tbody>
                        {regularNotices.map((notice, index) => (
                          <tr
                            key={notice.id}
                            className="border-b border-[#E8DCC8] hover:bg-[#FAF6F1] transition-colors cursor-pointer group"
                          >
                            <td className="py-4 px-6 text-[#6B5D53]">{regularNotices.length - index}</td>
                            <td className="py-4 px-6">
                              <span className="bg-[#FAF6F1] text-[#6B5D53] text-xs px-2 py-1 rounded">
                                {categoryLabels[notice.category] || notice.category}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-[#4A4039] group-hover:text-[#B8956A] transition-colors">
                                {notice.title}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right text-[#6B5D53] text-sm">{formatDate(notice.publishedAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl border border-[#E8DCC8]">
                    <div className="w-16 h-16 bg-[#B8956A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#4A4039] mb-2">등록된 공지사항이 없습니다</h3>
                    <p className="text-[#6B5D53]">새로운 공지사항이 등록되면 이곳에 표시됩니다.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
