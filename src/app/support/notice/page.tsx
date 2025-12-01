'use client';

import Link from 'next/link';

export default function NoticePage() {
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
      category: '모집',
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

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-secondary to-text-primary flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">공지사항</h1>
          <p className="text-xl opacity-90">에이스유통의 새로운 소식을 전해드립니다</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-beige-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-primary">홈</Link>
            <span>/</span>
            <Link href="/support/faq" className="hover:text-primary">고객지원</Link>
            <span>/</span>
            <span className="text-primary font-medium">공지사항</span>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {['전체', '배송', '제품', '운영', '가격', '이벤트'].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    category === '전체'
                      ? 'bg-primary text-white'
                      : 'bg-beige-100 text-text-secondary hover:bg-beige-200'
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
                className="w-full px-4 py-2 pr-10 rounded-full border border-beige-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light"
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
      <section className="py-12 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Important Notices */}
          <div className="mb-8">
            {notices.filter(n => n.isImportant).map((notice) => (
              <div
                key={notice.id}
                className="bg-primary/5 border-l-4 border-primary rounded-r-xl p-6 mb-4 hover:bg-primary/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded font-medium">
                      중요
                    </span>
                    <span className="bg-beige-200 text-text-secondary text-xs px-2 py-1 rounded">
                      {notice.category}
                    </span>
                  </div>
                  <h3 className="flex-grow font-bold text-text-primary hover:text-primary cursor-pointer">
                    {notice.title}
                  </h3>
                  <span className="text-sm text-text-light">{notice.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Regular Notices */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-beige-100 text-text-secondary text-sm">
                  <th className="py-4 px-6 text-left w-20">번호</th>
                  <th className="py-4 px-6 text-left w-24">분류</th>
                  <th className="py-4 px-6 text-left">제목</th>
                  <th className="py-4 px-6 text-right w-32">작성일</th>
                </tr>
              </thead>
              <tbody>
                {notices.filter(n => !n.isImportant).map((notice, index) => (
                  <tr
                    key={notice.id}
                    className="border-b border-beige-100 hover:bg-beige-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-text-light">{notices.length - index - notices.filter(n => n.isImportant).length}</td>
                    <td className="py-4 px-6">
                      <span className="bg-beige-100 text-text-secondary text-xs px-2 py-1 rounded">
                        {notice.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-text-primary hover:text-primary cursor-pointer">
                        {notice.title}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-text-light text-sm">{notice.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            <button className="w-10 h-10 rounded-full bg-beige-200 text-text-secondary hover:bg-beige-300 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-primary text-white">1</button>
            <button className="w-10 h-10 rounded-full bg-beige-200 text-text-secondary hover:bg-beige-300">2</button>
            <button className="w-10 h-10 rounded-full bg-beige-200 text-text-secondary hover:bg-beige-300">3</button>
            <button className="w-10 h-10 rounded-full bg-beige-200 text-text-secondary hover:bg-beige-300 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
