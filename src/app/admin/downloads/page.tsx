'use client';

import { useState, useEffect } from 'react';
import FileUpload from '@/components/ui/FileUpload';

interface Download {
  id: string;
  title: string;
  description: string | null;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  categoryId: string;
  category: { id: string; name: string } | null;
  version: string | null;
  requireAuth: boolean;
  downloads: number;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  order: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminDownloadsPage() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileName: '',
    fileUrl: '',
    fileSize: 0,
    fileType: '',
    categoryId: '',
    version: '',
    requireAuth: false,
  });

  const fetchDownloads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(search && { search }),
      });
      const res = await fetch(`/api/admin/downloads?${params}`);
      const data = await res.json();
      setDownloads(data.downloads || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching downloads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/downloads/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchDownloads();
    fetchCategories();
  }, [page, search]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      fileName: '',
      fileUrl: '',
      fileSize: 0,
      fileType: '',
      categoryId: categories[0]?.id || '',
      version: '',
      requireAuth: false,
    });
    setEditingId(null);
  };

  const openModal = (download?: Download) => {
    if (download) {
      setEditingId(download.id);
      setFormData({
        title: download.title,
        description: download.description || '',
        fileName: download.fileName,
        fileUrl: download.fileUrl,
        fileSize: download.fileSize,
        fileType: download.fileType,
        categoryId: download.categoryId,
        version: download.version || '',
        requireAuth: download.requireAuth,
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleFileChange = (data: { url: string; fileName: string; fileSize: number; fileType: string; publicId: string } | null) => {
    if (data) {
      setFormData({
        ...formData,
        fileName: data.fileName,
        fileUrl: data.url,
        fileSize: data.fileSize,
        fileType: data.fileType,
      });
    } else {
      setFormData({
        ...formData,
        fileName: '',
        fileUrl: '',
        fileSize: 0,
        fileType: '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fileUrl) {
      alert('파일을 업로드해주세요.');
      return;
    }

    if (!formData.categoryId) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    try {
      const url = editingId
        ? `/api/admin/downloads/${editingId}`
        : '/api/admin/downloads';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        resetForm();
        fetchDownloads();
      } else {
        const data = await res.json();
        alert(data.error || '저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving download:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 자료를 삭제하시겠습니까?`)) return;

    try {
      const res = await fetch(`/api/admin/downloads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchDownloads();
      } else {
        const data = await res.json();
        alert(data.error || '삭제 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error deleting download:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (!bytes || bytes === 0) return '-';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string | null): string => {
    if (!fileType) return '📄';
    const type = fileType.toLowerCase();
    if (type === 'pdf') return '📕';
    if (type === 'doc' || type === 'docx') return '📘';
    if (type === 'xls' || type === 'xlsx') return '📗';
    if (type === 'ppt' || type === 'pptx') return '📙';
    if (type === 'zip' || type === 'rar' || type === '7z') return '📦';
    if (type === 'hwp') return '📄';
    return '📄';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">다운로드 자료 관리</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + 새 자료
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <input
          type="text"
          placeholder="자료명 검색..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Downloads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">로딩 중...</div>
        ) : downloads.length === 0 ? (
          <div className="p-8 text-center text-gray-500">등록된 자료가 없습니다.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">자료</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">카테고리</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">파일 크기</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">다운로드</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {downloads.map((download) => (
                <tr key={download.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getFileIcon(download.fileType)}</span>
                      <div>
                        <div className="font-medium text-gray-900">{download.title}</div>
                        <div className="text-sm text-gray-500">
                          {download.fileName}
                          {download.version && <span className="ml-2 text-blue-600">v{download.version}</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {download.category?.name || '-'}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-500">
                    {formatFileSize(download.fileSize)}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-500">
                    {download.downloads}회
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <a
                        href={download.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                      >
                        다운로드
                      </a>
                      <button
                        onClick={() => openModal(download)}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(download.id, download.title)}
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
            <div className="text-sm text-gray-500">총 {pagination.total}개</div>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingId ? '자료 수정' : '새 자료'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="자료 제목"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    설명
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="자료 설명"
                  />
                </div>

                {/* 파일 업로드 */}
                <FileUpload
                  label="파일"
                  value={formData.fileUrl}
                  fileName={formData.fileName}
                  fileSize={formData.fileSize}
                  fileType={formData.fileType}
                  onChange={handleFileChange}
                  folder="downloads"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      카테고리 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">선택하세요</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      버전
                    </label>
                    <input
                      type="text"
                      value={formData.version}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="예: 1.0"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.requireAuth}
                    onChange={(e) => setFormData({ ...formData, requireAuth: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">로그인 필요</span>
                </label>
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    저장
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
