'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: 'PRESS' | 'EVENT' | 'NOTICE' | 'BLOG';
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt: string | null;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const categoryLabels: Record<string, string> = {
  PRESS: '보도자료',
  EVENT: '이벤트',
  NOTICE: '공지사항',
  BLOG: '블로그',
};

export default function AdminNewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(search && { search }),
        ...(category && { category }),
      });
      const res = await fetch(`/api/admin/news?${params}`);
      const data = await res.json();
      setNews(data.news || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, search, category]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 게시글을 삭제하시겠습니까?`)) return;

    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchNews();
      } else {
        const data = await res.json();
        alert(data.error || '삭제 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const togglePublished = async (item: News) => {
    try {
      const res = await fetch(`/api/admin/news/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      if (res.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error('Error toggling published:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">뉴스/공지사항 관리</h1>
        <Link
          href="/admin/news/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + 새 게시글
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="제목 검색..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:w-48">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">모든 카테고리</option>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">로딩 중...</div>
        ) : news.length === 0 ? (
          <div className="p-8 text-center text-gray-500">등록된 게시글이 없습니다.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">제목</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">카테고리</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">공개</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">추천</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">발행일</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{item.excerpt}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      item.category === 'NOTICE' ? 'bg-red-100 text-red-700' :
                      item.category === 'PRESS' ? 'bg-blue-100 text-blue-700' :
                      item.category === 'EVENT' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {categoryLabels[item.category]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => togglePublished(item)}
                      className={`w-8 h-8 rounded-full ${
                        item.isPublished
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {item.isPublished ? '✓' : '○'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block w-8 h-8 rounded-full leading-8 ${
                        item.isFeatured
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {item.isFeatured ? '★' : '☆'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {item.publishedAt
                      ? new Date(item.publishedAt).toLocaleDateString('ko-KR')
                      : '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/news/${item.id}`}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              총 {pagination.total}개 중 {(pagination.page - 1) * pagination.limit + 1}-
              {Math.min(pagination.page * pagination.limit, pagination.total)}개
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
              >
                이전
              </button>
              <span className="px-3 py-1">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.totalPages}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
