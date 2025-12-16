'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import { useState, useEffect } from 'react';

interface Download {
  id: string;
  title: string;
  description: string | null;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  version: string | null;
  downloads: number;
  createdAt: string;
}

interface DownloadCategory {
  id: string;
  name: string;
  order: number;
  downloads: Download[];
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const getFileIcon = (type: string) => {
  const typeLower = type.toLowerCase();
  switch (typeLower) {
    case 'pdf':
      return (
        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
          <span className="text-red-600 font-bold text-xs">PDF</span>
        </div>
      );
    case 'hwp':
    case 'hwpx':
      return (
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <span className="text-blue-600 font-bold text-xs">HWP</span>
        </div>
      );
    case 'xls':
    case 'xlsx':
      return (
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
          <span className="text-green-600 font-bold text-xs">XLS</span>
        </div>
      );
    case 'doc':
    case 'docx':
      return (
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <span className="text-blue-600 font-bold text-xs">DOC</span>
        </div>
      );
    case 'zip':
    case 'rar':
      return (
        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
          <span className="text-yellow-700 font-bold text-xs">ZIP</span>
        </div>
      );
    default:
      return (
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
          <span className="text-gray-600 font-bold text-xs uppercase">{typeLower.substring(0, 3)}</span>
        </div>
      );
  }
};

export default function ResourcesPage() {
  const [categories, setCategories] = useState<DownloadCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const res = await fetch('/api/downloads');
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching downloads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' }).replace('. ', '.').replace('.', '');
  };

  const hasDownloads = categories.some(cat => cat.downloads.length > 0);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="RESOURCES"
          title="자료실"
          subtitle="필요한 자료를 다운로드하세요"
          breadcrumb={[
            { name: '고객 지원', href: '/support/faq' },
            { name: '자료실' }
          ]}
        />

        {/* Notice */}
        <section className="py-6 bg-gradient-to-r from-[#B8956A]/10 to-[#D4A574]/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 text-[#B8956A]">
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
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            {loading ? (
              <div className="space-y-12">
                {[...Array(3)].map((_, i) => (
                  <div key={i}>
                    <div className="h-8 w-32 bg-gray-200 rounded mb-6 animate-pulse"></div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="bg-white rounded-2xl p-6 border border-[#E8DCC8] animate-pulse">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                            <div className="flex-grow">
                              <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
                              <div className="h-3 w-24 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : hasDownloads ? (
              categories.filter(cat => cat.downloads.length > 0).map((section) => (
                <div key={section.id} className="mb-12 last:mb-0">
                  <h2 className="text-2xl font-bold text-[#4A4039] mb-6 flex items-center gap-3">
                    <span className="w-1 h-6 bg-gradient-to-b from-[#B8956A] to-[#D4A574] rounded-full" />
                    {section.name}
                  </h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.downloads.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl p-6 border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-4">
                          {getFileIcon(item.fileType)}
                          <div className="flex-grow min-w-0">
                            <h3 className="font-medium text-[#4A4039] group-hover:text-[#B8956A] transition-colors mb-1 truncate">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-[#6B5D53]">
                              <span>{formatFileSize(item.fileSize)}</span>
                              <span>·</span>
                              <span>{formatDate(item.createdAt)}</span>
                            </div>
                          </div>
                          <a
                            href={item.fileUrl}
                            download
                            className="flex-shrink-0 w-10 h-10 bg-[#B8956A]/10 rounded-full flex items-center justify-center text-[#B8956A] hover:bg-gradient-to-r hover:from-[#B8956A] hover:to-[#D4A574] hover:text-white transition-all duration-300"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#E8DCC8]">
                <div className="w-16 h-16 bg-[#B8956A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#4A4039] mb-2">등록된 자료가 없습니다</h3>
                <p className="text-[#6B5D53]">자료가 등록되면 이곳에 표시됩니다.</p>
              </div>
            )}
          </div>
        </section>

        {/* Request Form */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-3xl p-8 md:p-12 border border-[#E8DCC8]">
              <div className="text-center mb-8">
                <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">REQUEST</span>
                <h2 className="text-3xl font-bold text-[#4A4039] mb-4">추가 자료 요청</h2>
                <p className="text-[#6B5D53]">
                  필요한 자료가 없으신가요? 요청해주시면 준비해드리겠습니다.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4039] mb-2">
                      업체명 *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] focus:outline-none focus:ring-2 focus:ring-[#B8956A] bg-white"
                      placeholder="업체명을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4039] mb-2">
                      담당자명 *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] focus:outline-none focus:ring-2 focus:ring-[#B8956A] bg-white"
                      placeholder="담당자명을 입력하세요"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4039] mb-2">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] focus:outline-none focus:ring-2 focus:ring-[#B8956A] bg-white"
                      placeholder="이메일을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4039] mb-2">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] focus:outline-none focus:ring-2 focus:ring-[#B8956A] bg-white"
                      placeholder="연락처를 입력하세요"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A4039] mb-2">
                    요청 자료 *
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] focus:outline-none focus:ring-2 focus:ring-[#B8956A] bg-white resize-none"
                    placeholder="필요한 자료를 상세히 기재해주세요"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B8956A] to-[#D4A574] text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300"
                  >
                    자료 요청하기
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
