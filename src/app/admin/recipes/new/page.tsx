'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ui/ImageUpload';

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
    content: '',
    imageUrl: '',
    difficulty: '',
    cookingTime: '',
    servings: '',
    tips: '',
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
        {/* 기본 정보 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="예: 초코 브라우니"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 <span className="text-red-500">*</span>
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
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            간단 설명 <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            placeholder="레시피에 대한 간단한 소개를 작성해주세요"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 이미지 */}
        <div>
          <ImageUpload
            label="대표 이미지"
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url || '' })}
            folder="recipes"
            aspectRatio="video"
          />
        </div>

        {/* 부가 정보 (선택) */}
        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">부가 정보 (선택사항)</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">난이도</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">선택 안함</option>
                <option value="하">하 (쉬움)</option>
                <option value="중">중 (보통)</option>
                <option value="상">상 (어려움)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">소요 시간</label>
              <input
                type="text"
                value={formData.cookingTime}
                onChange={(e) => setFormData({ ...formData, cookingTime: e.target.value })}
                placeholder="예: 30분"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">분량</label>
              <input
                type="text"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                placeholder="예: 4인분"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* 상세 내용 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상세 내용
          </label>
          <p className="text-xs text-gray-500 mb-2">
            재료, 조리법 등 자유롭게 작성해주세요. HTML 태그도 사용 가능합니다.
          </p>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={12}
            placeholder={`예시:

[재료]
- 밀가루 200g
- 설탕 100g
- 계란 2개

[만드는 법]
1. 밀가루와 설탕을 섞어줍니다.
2. 계란을 넣고 반죽합니다.
...`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>

        {/* 팁 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">요리 팁</label>
          <textarea
            value={formData.tips}
            onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
            rows={2}
            placeholder="요리할 때 알아두면 좋은 팁을 적어주세요"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 공개 설정 */}
        <div className="flex gap-6 pt-4 border-t">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-700">바로 공개</span>
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
