'use client';

import Link from 'next/link';

export default function ResourcesPage() {
  const resources = [
    {
      category: '카탈로그',
      items: [
        { title: '2024 에이스유통 제품 카탈로그', size: '15.2 MB', type: 'PDF', date: '2024.01' },
        { title: '에이스베이커리 제품 안내서', size: '8.5 MB', type: 'PDF', date: '2024.03' },
        { title: '냉동 베이커리 라인업 소개', size: '5.3 MB', type: 'PDF', date: '2024.06' },
      ],
    },
    {
      category: '거래 양식',
      items: [
        { title: '신규 거래 신청서', size: '125 KB', type: 'HWP', date: '2024.01' },
        { title: '거래 계약서 양식', size: '98 KB', type: 'HWP', date: '2024.01' },
        { title: '주문서 양식', size: '85 KB', type: 'XLS', date: '2024.01' },
      ],
    },
    {
      category: '인증서',
      items: [
        { title: '사업자등록증 사본', size: '1.2 MB', type: 'PDF', date: '2024.01' },
        { title: 'HACCP 협력업체 인증서', size: '2.1 MB', type: 'PDF', date: '2023.09' },
        { title: '냉동/냉장 운송 인증서', size: '1.8 MB', type: 'PDF', date: '2023.06' },
      ],
    },
    {
      category: '가이드',
      items: [
        { title: '냉동 베이커리 취급 가이드', size: '3.5 MB', type: 'PDF', date: '2024.02' },
        { title: '제품 보관 온도 안내', size: '1.1 MB', type: 'PDF', date: '2024.01' },
        { title: '주문 및 배송 이용 가이드', size: '2.3 MB', type: 'PDF', date: '2024.01' },
      ],
    },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return (
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <span className="text-red-600 font-bold text-xs">PDF</span>
          </div>
        );
      case 'HWP':
        return (
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xs">HWP</span>
          </div>
        );
      case 'XLS':
        return (
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-green-600 font-bold text-xs">XLS</span>
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-600 font-bold text-xs">FILE</span>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-accent to-primary flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">자료실</h1>
          <p className="text-xl opacity-90">필요한 자료를 다운로드하세요</p>
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
            <span className="text-primary font-medium">자료실</span>
          </div>
        </div>
      </div>

      {/* Notice */}
      <section className="py-8 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 text-primary">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">
              자료는 거래처 및 예비 거래처를 위해 제공되며, 무단 배포 및 상업적 이용은 금지됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4">
          {resources.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12 last:mb-0">
              <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-primary rounded-full" />
                {section.category}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      {getFileIcon(item.type)}
                      <div className="flex-grow">
                        <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors mb-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-text-light">
                          <span>{item.size}</span>
                          <span>·</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <button className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-beige-100 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-4">추가 자료 요청</h2>
              <p className="text-text-secondary">
                필요한 자료가 없으신가요? 요청해주시면 준비해드리겠습니다.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    업체명 *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-beige-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="업체명을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    담당자명 *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-beige-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="담당자명을 입력하세요"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-beige-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-beige-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="연락처를 입력하세요"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  요청 자료 *
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-beige-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="필요한 자료를 상세히 기재해주세요"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full transition-colors font-medium"
                >
                  자료 요청하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
