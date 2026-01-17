'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ui/ImageUpload';
import RichTextEditor from '@/components/ui/RichTextEditor';

interface Category {
  id: string;
  name: string;
}

export default function NewRecipePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    description: '',
    imageUrl: '',
    isPublished: true,
    isFeatured: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/admin/recipe-categories');
        const data = await res.json();
        setCategories(data.categories || []);
        if (data.categories?.length > 0) {
          setFormData((prev) => ({ ...prev, categoryId: data.categories[0].id }));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryId) {
      alert('카테고리를 선택해주세요. 카테고리가 없다면 먼저 추가해주세요.');
      return;
    }

    setSaving(true);

    try {
      const res = await fetch('/api/admin/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/recipes');
      } else {
        const data = await res.json();
        alert(data.error || '레시피 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('레시피 등록 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/recipes" className="text-gray-500 hover:text-gray-700">
          ← 목록으로
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">새 레시피 등록</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              레시피명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="레시피명을 입력하세요"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리
            </label>
            {categories.length === 0 ? (
              <div className="text-sm text-gray-500 py-2">
                카테고리가 없습니다.{' '}
                <Link href="/admin/recipes" className="text-blue-600 hover:underline">
                  카테고리를 먼저 추가해주세요
                </Link>
              </div>
            ) : (
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">카테고리 선택</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* 레시피 이미지 */}
        <div>
          <ImageUpload
            label="레시피 이미지"
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url || '' })}
            folder="recipes"
            aspectRatio="square"
          />
        </div>

        {/* 레시피 설명 (Rich Text Editor) */}
        <div>
          <RichTextEditor
            label="레시피 설명"
            value={formData.description}
            onChange={(value) => setFormData({ ...formData, description: value })}
            placeholder="레시피에 대한 상세 설명을 입력하세요."
          />
        </div>

        {/* 공개/추천 설정 */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-700">공개</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-700">추천 레시피</span>
          </label>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <Link
            href="/admin/recipes"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={saving || categories.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? '등록 중...' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
