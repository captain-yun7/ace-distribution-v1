'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/ui/ImageUpload';

type CultureType = 'CULTURE' | 'BENEFIT' | 'CSR';

interface Culture {
  id: string;
  type: CultureType;
  title: string;
  desc: string;
  year: string | null;
  imageUrl: string | null;
  order: number;
  isPublished: boolean;
}

interface FormData {
  type: CultureType;
  title: string;
  desc: string;
  year: string;
  imageUrl: string;
  order: number;
  isPublished: boolean;
}

export default function CultureTab() {
  const [cultures, setCultures] = useState<Culture[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<CultureType>('CULTURE');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    type: 'CULTURE',
    title: '',
    desc: '',
    year: '',
    imageUrl: '',
    order: 0,
    isPublished: true,
  });

  useEffect(() => {
    fetchCultures();
  }, []);

  const fetchCultures = async () => {
    try {
      const res = await fetch('/api/admin/company/culture');
      if (res.ok) {
        const data = await res.json();
        setCultures(data);
      }
    } catch (error) {
      console.error('Error fetching cultures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `/api/admin/company/culture/${editingId}`
        : '/api/admin/company/culture';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(editingId ? '수정되었습니다.' : '추가되었습니다.');
        setIsModalOpen(false);
        resetForm();
        fetchCultures();
      } else {
        const data = await res.json();
        alert(data.error || '저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving culture:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = (item: Culture) => {
    setEditingId(item.id);
    setFormData({
      type: item.type,
      title: item.title,
      desc: item.desc,
      year: item.year || '',
      imageUrl: item.imageUrl || '',
      order: item.order,
      isPublished: item.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/admin/company/culture/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('삭제되었습니다.');
        fetchCultures();
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting culture:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      type: activeType,
      title: '',
      desc: '',
      year: '',
      imageUrl: '',
      order: 0,
      isPublished: true,
    });
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const filteredCultures = cultures.filter((c) => c.type === activeType);

  const typeLabels = {
    CULTURE: '사내문화',
    BENEFIT: '복리후생',
    CSR: '사회공헌',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">사내문화 관리</h2>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + 추가
        </button>
      </div>

      {/* Type Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {(['CULTURE', 'BENEFIT', 'CSR'] as CultureType[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeType === type
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {typeLabels[type]}
              <span className="ml-2 text-xs">
                ({cultures.filter((c) => c.type === type).length})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Culture List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                제목
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                설명
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                연도
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                순서
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                공개
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCultures.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                  {item.desc}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.year || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.isPublished
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {item.isPublished ? '공개' : '비공개'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCultures.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            등록된 {typeLabels[activeType]} 항목이 없습니다.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6">
              {editingId ? '항목 수정' : '항목 추가'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  분류 *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as CultureType })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="CULTURE">사내문화</option>
                  <option value="BENEFIT">복리후생</option>
                  <option value="CSR">사회공헌</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  설명 *
                </label>
                <textarea
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연도
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="2025년, 진행중 등"
                />
              </div>

              <ImageUpload
                label="이미지"
                value={formData.imageUrl || null}
                onChange={(url) => setFormData({ ...formData, imageUrl: url || '' })}
                folder="ace-distribution/culture"
                aspectRatio="video"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  순서
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublished: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">공개</label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingId ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
