'use client';

import { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
  const [showProductImages, setShowProductImages] = useState(true);
  const [showRecipeImages, setShowRecipeImages] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const data = await res.json();
          setShowProductImages(data.showProductImages ?? true);
          setShowRecipeImages(data.showRecipeImages ?? false);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleToggle = async (field: 'showProductImages' | 'showRecipeImages') => {
    setSaving(field);
    const currentValue = field === 'showProductImages' ? showProductImages : showRecipeImages;
    const newValue = !currentValue;

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: newValue }),
      });

      if (res.ok) {
        if (field === 'showProductImages') {
          setShowProductImages(newValue);
        } else {
          setShowRecipeImages(newValue);
        }
      } else {
        alert('설정 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('설정 저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">사이트 설정</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">목록 이미지 설정</h2>

        {/* 제품 이미지 설정 */}
        <div className="flex items-center justify-between py-4 border-b">
          <div>
            <p className="font-medium text-gray-900">제품 이미지 표시</p>
            <p className="text-sm text-gray-500">
              제품 목록 페이지에서 제품 이미지를 표시할지 여부를 설정합니다.
            </p>
          </div>
          <button
            onClick={() => handleToggle('showProductImages')}
            disabled={saving === 'showProductImages'}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showProductImages ? 'bg-blue-600' : 'bg-gray-300'
            } ${saving === 'showProductImages' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showProductImages ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* 레시피 이미지 설정 */}
        <div className="flex items-center justify-between py-4 border-b">
          <div>
            <p className="font-medium text-gray-900">레시피 이미지 표시</p>
            <p className="text-sm text-gray-500">
              레시피 목록 페이지에서 레시피 이미지를 표시할지 여부를 설정합니다.
            </p>
          </div>
          <button
            onClick={() => handleToggle('showRecipeImages')}
            disabled={saving === 'showRecipeImages'}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showRecipeImages ? 'bg-blue-600' : 'bg-gray-300'
            } ${saving === 'showRecipeImages' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showRecipeImages ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
          <p className="text-sm text-gray-600">
            제품 이미지: <span className={`font-medium ${showProductImages ? 'text-green-600' : 'text-red-600'}`}>
              {showProductImages ? '표시됨' : '숨김'}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            레시피 이미지: <span className={`font-medium ${showRecipeImages ? 'text-green-600' : 'text-red-600'}`}>
              {showRecipeImages ? '표시됨' : '숨김'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
