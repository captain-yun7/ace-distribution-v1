'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardData {
  stats: {
    productCount: number;
    categoryCount: number;
    newsCount: number;
    inquiryCount: number;
    pendingInquiryCount: number;
    bannerCount: number;
  };
  recentInquiries: Array<{
    id: string;
    name: string;
    company: string | null;
    type: string;
    status: string;
    createdAt: string;
  }>;
  recentNews: Array<{
    id: string;
    title: string;
    category: string;
    isPublished: boolean;
    createdAt: string;
  }>;
}

const inquiryTypeLabels: Record<string, string> = {
  PRODUCT: '제품문의',
  PURCHASE: '구매문의',
  PARTNERSHIP: '파트너십',
  TECHNICAL: '기술지원',
  OTHER: '기타',
};

const inquiryStatusLabels: Record<string, { label: string; color: string }> = {
  PENDING: { label: '대기중', color: 'bg-yellow-100 text-yellow-800' },
  IN_PROGRESS: { label: '처리중', color: 'bg-blue-100 text-blue-800' },
  COMPLETED: { label: '완료', color: 'bg-green-100 text-green-800' },
  CLOSED: { label: '종료', color: 'bg-gray-100 text-gray-800' },
};

const newsCategoryLabels: Record<string, string> = {
  PRESS: '보도자료',
  EVENT: '이벤트',
  NOTICE: '공지사항',
  BLOG: '블로그',
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/dashboard');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">데이터를 불러올 수 없습니다.</div>
      </div>
    );
  }

  const statCards = [
    { label: '전체 제품', value: data.stats.productCount, href: '/admin/products', color: 'bg-blue-500' },
    { label: '카테고리', value: data.stats.categoryCount, href: '/admin/categories', color: 'bg-green-500' },
    { label: '뉴스/공지', value: data.stats.newsCount, href: '/admin/news', color: 'bg-purple-500' },
    { label: '전체 문의', value: data.stats.inquiryCount, href: '/admin/inquiries', color: 'bg-yellow-500' },
    { label: '대기중 문의', value: data.stats.pendingInquiryCount, href: '/admin/inquiries?status=PENDING', color: 'bg-red-500' },
    { label: '활성 배너', value: data.stats.bannerCount, href: '/admin/banners', color: 'bg-indigo-500' },
  ];

  const getStatusStyle = (status: string) => {
    return inquiryStatusLabels[status]?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    return inquiryStatusLabels[status]?.label || status;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <span className="text-white text-xl font-bold">{stat.value}</span>
            </div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">최근 문의</h2>
            <Link href="/admin/inquiries" className="text-sm text-[#B8956A] hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="divide-y">
            {data.recentInquiries.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">문의가 없습니다.</p>
            ) : (
              data.recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{inquiry.name}</p>
                    <p className="text-sm text-gray-500">
                      {inquiry.company || '-'} · {inquiryTypeLabels[inquiry.type] || inquiry.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(inquiry.status)}`}>
                      {getStatusLabel(inquiry.status)}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(inquiry.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">최근 뉴스/공지</h2>
            <Link href="/admin/news" className="text-sm text-[#B8956A] hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="divide-y">
            {data.recentNews.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">뉴스가 없습니다.</p>
            ) : (
              data.recentNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/admin/news/${news.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900 line-clamp-1">{news.title}</p>
                    <p className="text-sm text-gray-500">{newsCategoryLabels[news.category]}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${news.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      {news.isPublished ? '게시됨' : '비공개'}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(news.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8956A] text-white rounded-lg hover:bg-[#A07850] transition-colors"
          >
            + 새 제품 등록
          </Link>
          <Link
            href="/admin/news/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A4039] text-white rounded-lg hover:bg-[#3A332C] transition-colors"
          >
            + 새 뉴스 작성
          </Link>
          <Link
            href="/admin/banners"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            배너 관리
          </Link>
        </div>
      </div>
    </div>
  );
}
