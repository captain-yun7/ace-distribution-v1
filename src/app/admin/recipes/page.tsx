'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export default function AdminRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const recipesRes = await fetch('/api/admin/recipes');
      const recipesData = await recipesRes.json();
      setRecipes(recipesData.recipes || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" 레시피를 삭제하시겠습니까?`)) return;

    try {
      const res = await fetch(`/api/admin/recipes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      } else {
        alert('삭제 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const togglePublished = async (recipe: Recipe) => {
    try {
      const res = await fetch(`/api/admin/recipes/${recipe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !recipe.isPublished }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error toggling published:', error);
    }
  };

  const toggleFeatured = async (recipe: Recipe) => {
    try {
      const res = await fetch(`/api/admin/recipes/${recipe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !recipe.isFeatured }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  // 검색 필터링
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">레시피 관리</h1>
        <Link
          href="/admin/recipes/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + 새 레시피 등록
        </Link>
      </div>

      {/* Search Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="레시피명 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Recipes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">로딩 중...</div>
        ) : filteredRecipes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {search ? '검색 결과가 없습니다.' : '등록된 레시피가 없습니다.'}
            {!search && (
              <>
                <br />
                <Link href="/admin/recipes/new" className="text-blue-600 hover:underline mt-2 inline-block">
                  첫 번째 레시피를 등록해보세요
                </Link>
              </>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">이미지</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">레시피명</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">공개</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">추천</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRecipes.map((recipe) => (
                <tr key={recipe.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 relative rounded overflow-hidden bg-gray-100">
                      {recipe.imageUrl ? (
                        <Image
                          src={recipe.imageUrl}
                          alt={recipe.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{recipe.title}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => togglePublished(recipe)}
                      className={`w-8 h-8 rounded-full ${
                        recipe.isPublished
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {recipe.isPublished ? '✓' : '○'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleFeatured(recipe)}
                      className={`w-8 h-8 rounded-full ${
                        recipe.isFeatured
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {recipe.isFeatured ? '★' : '☆'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/recipes/${recipe.id}`}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(recipe.id, recipe.title)}
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
      </div>
    </div>
  );
}
