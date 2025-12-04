'use client';

import { useState, useEffect } from 'react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  type: string;
  subject: string;
  message: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED';
  adminNote: string | null;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING: { label: '대기중', color: 'bg-yellow-100 text-yellow-700' },
  IN_PROGRESS: { label: '처리중', color: 'bg-blue-100 text-blue-700' },
  COMPLETED: { label: '완료', color: 'bg-green-100 text-green-700' },
  CLOSED: { label: '종료', color: 'bg-gray-100 text-gray-700' },
};

const typeLabels: Record<string, string> = {
  PARTNERSHIP: '파트너십 문의',
  PRODUCT: '제품 문의',
  QUOTE: '견적 문의',
  OTHER: '기타',
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(search && { search }),
        ...(status && { status }),
      });
      const res = await fetch(`/api/admin/inquiries?${params}`);
      const data = await res.json();
      setInquiries(data.inquiries || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [page, search, status]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchInquiries();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSaveNote = async () => {
    if (!selectedInquiry) return;

    try {
      const res = await fetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNote }),
      });
      if (res.ok) {
        setSelectedInquiry(null);
        fetchInquiries();
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('이 문의를 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchInquiries();
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const openDetail = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setAdminNote(inquiry.adminNote || '');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">문의 관리</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="이름, 이메일, 회사명 검색..."
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
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">모든 상태</option>
              {Object.entries(statusLabels).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">로딩 중...</div>
        ) : inquiries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">문의가 없습니다.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">문의자</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">유형</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">제목</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">상태</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">접수일</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{inquiry.name}</div>
                    <div className="text-sm text-gray-500">{inquiry.email}</div>
                    {inquiry.company && (
                      <div className="text-sm text-gray-400">{inquiry.company}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {typeLabels[inquiry.type] || inquiry.type}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openDetail(inquiry)}
                      className="text-left hover:text-blue-600"
                    >
                      <div className="font-medium text-gray-900">{inquiry.subject}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {inquiry.message}
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <select
                      value={inquiry.status}
                      onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full border-0 ${statusLabels[inquiry.status].color}`}
                    >
                      {Object.entries(statusLabels).map(([key, { label }]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(inquiry.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openDetail(inquiry)}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        상세
                      </button>
                      <button
                        onClick={() => handleDelete(inquiry.id)}
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
              총 {pagination.total}개
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

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-900">문의 상세</h2>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500">문의자</label>
                    <div className="font-medium">{selectedInquiry.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">이메일</label>
                    <div className="font-medium">{selectedInquiry.email}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">전화번호</label>
                    <div className="font-medium">{selectedInquiry.phone || '-'}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">회사명</label>
                    <div className="font-medium">{selectedInquiry.company || '-'}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-500">유형</label>
                  <div className="font-medium">{typeLabels[selectedInquiry.type] || selectedInquiry.type}</div>
                </div>

                <div>
                  <label className="block text-sm text-gray-500">제목</label>
                  <div className="font-medium">{selectedInquiry.subject}</div>
                </div>

                <div>
                  <label className="block text-sm text-gray-500">내용</label>
                  <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">관리자 메모</label>
                  <textarea
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="내부 메모를 작성하세요..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  닫기
                </button>
                <button
                  onClick={handleSaveNote}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  메모 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
