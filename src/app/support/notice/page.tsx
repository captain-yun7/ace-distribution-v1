'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import { useState } from 'react';

const categories = ['전체', '배송', '제품', '운영', '가격', '이벤트'];

const notices = [
  {
    id: 1,
    title: '2024년 연말 배송 일정 안내',
    date: '2024.12.02',
    category: '배송',
    isImportant: true,
    content: '연말 물량 증가로 인한 배송 일정 변경 안내드립니다.',
  },
  {
    id: 2,
    title: '신규 제품 라인업 출시 안내',
    date: '2024.11.28',
    category: '제품',
    isImportant: true,
    content: '에이스베이커리 겨울 시즌 한정 제품이 출시되었습니다.',
  },
  {
    id: 3,
    title: '12월 휴무일 안내',
    date: '2024.11.25',
    category: '운영',
    isImportant: false,
    content: '12월 25일(수) 크리스마스는 휴무입니다.',
  },
  {
    id: 4,
    title: '가격 인상 안내 (2025년 1월 적용)',
    date: '2024.11.20',
    category: '가격',
    isImportant: true,
    content: '원자재 가격 상승으로 인한 일부 제품 가격 인상 안내',
  },
  {
    id: 5,
    title: '콜센터 운영시간 변경 안내',
    date: '2024.11.15',
    category: '운영',
    isImportant: false,
    content: '고객센터 운영 시간이 오전 8시~오후 6시로 변경됩니다.',
  },
  {
    id: 6,
    title: '추천인 이벤트 당첨자 발표',
    date: '2024.11.10',
    category: '이벤트',
    isImportant: false,
    content: '10월 추천인 이벤트 당첨자를 발표합니다.',
  },
  {
    id: 7,
    title: '하반기 신규 거래처 모집',
    date: '2024.11.01',
    category: '이벤트',
    isImportant: false,
    content: '2024년 하반기 신규 거래처를 모집합니다.',
  },
  {
    id: 8,
    title: '물류센터 확장 이전 완료',
    date: '2024.10.20',
    category: '운영',
    isImportant: false,
    content: '하남시 물류센터 확장 이전이 완료되었습니다.',
  },
];

export default function NoticePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredNotices = selectedCategory === '전체'
    ? notices
    : notices.filter(n => n.category === selectedCategory);

  const importantNotices = filteredNotices.filter(n => n.isImportant);
  const regularNotices = filteredNotices.filter(n => !n.isImportant);

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
                          {notice.category}
                        </span>
                      </div>
                      <h3 className="flex-grow font-bold text-[#4A4039] hover:text-[#B8956A] transition-colors">
                        {notice.title}
                      </h3>
                      <span className="text-sm text-[#6B5D53]">{notice.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Regular Notices */}
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
                          {notice.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[#4A4039] group-hover:text-[#B8956A] transition-colors">
                          {notice.title}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-[#6B5D53] text-sm">{notice.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              <button className="w-10 h-10 rounded-full bg-white border border-[#E8DCC8] text-[#6B5D53] hover:border-[#B8956A] flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B8956A] to-[#D4A574] text-white">1</button>
              <button className="w-10 h-10 rounded-full bg-white border border-[#E8DCC8] text-[#6B5D53] hover:border-[#B8956A] transition-colors">2</button>
              <button className="w-10 h-10 rounded-full bg-white border border-[#E8DCC8] text-[#6B5D53] hover:border-[#B8956A] transition-colors">3</button>
              <button className="w-10 h-10 rounded-full bg-white border border-[#E8DCC8] text-[#6B5D53] hover:border-[#B8956A] flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
