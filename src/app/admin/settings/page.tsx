'use client';

import { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
  const [showProductImages, setShowProductImages] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const data = await res.json();
          setShowProductImages(data.showProductImages ?? true);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleToggle = async () => {
    setSaving(true);
    const newValue = !showProductImages;

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showProductImages: newValue }),
      });

      if (res.ok) {
        setShowProductImages(newValue);
      } else {
        alert('설정 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('설정 저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
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
        <h2 className="text-lg font-semibold text-gray-800 mb-4">제품 목록 설정</h2>

        <div className="flex items-center justify-between py-4 border-b">
          <div>
            <p className="font-medium text-gray-900">제품 이미지 표시</p>
            <p className="text-sm text-gray-500">
              제품 목록 페이지에서 제품 이미지를 표시할지 여부를 설정합니다.
            </p>
          </div>
          <button
            onClick={handleToggle}
            disabled={saving}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showProductImages ? 'bg-blue-600' : 'bg-gray-300'
            } ${saving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showProductImages ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            현재 상태: <span className={`font-medium ${showProductImages ? 'text-green-600' : 'text-red-600'}`}>
              {showProductImages ? '이미지 표시됨' : '이미지 숨김'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
