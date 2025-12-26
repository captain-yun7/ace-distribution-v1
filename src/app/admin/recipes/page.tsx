'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  difficulty: string | null;
  cookingTime: string | null;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  _count?: { recipes: number };
}

export default function AdminRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [savingCategory, setSavingCategory] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [recipesRes, categoriesRes] = await Promise.all([
        fetch(`/api/admin/recipes${selectedCategory ? `?categoryId=${selectedCategory}` : ''}`),
        fetch('/api/admin/recipe-categories'),
      ]);

      const recipesData = await recipesRes.json();
      const categoriesData = await categoriesRes.json();

      setRecipes(recipesData.recipes || []);
      setCategories(categoriesData.categories || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

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

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    setSavingCategory(true);

    try {
      const res = await fetch('/api/admin/recipe-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });

      if (res.ok) {
        setNewCategoryName('');
        setShowCategoryModal(false);
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || '카테고리 추가 실패');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('카테고리 추가 중 오류가 발생했습니다.');
    } finally {
      setSavingCategory(false);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`"${name}" 카테고리를 삭제하시겠습니까?\n해당 카테고리의 모든 레시피도 함께 삭제됩니다.`)) return;

    try {
      const res = await fetch(`/api/admin/recipe-categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (selectedCategory === id) setSelectedCategory('');
        fetchData();
      } else {
        alert('삭제 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">레시피 관리</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            카테고리 관리
          </button>
          <Link
            href="/admin/recipes/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + 새 레시피
          </Link>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === ''
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체 ({recipes.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name} ({cat._count?.recipes || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">로딩 중...</div>
        ) : recipes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            등록된 레시피가 없습니다.
            <br />
            <Link href="/admin/recipes/new" className="text-blue-600 hover:underline mt-2 inline-block">
              첫 번째 레시피를 등록해보세요
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className={`border rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
                  !recipe.isPublished ? 'opacity-60' : ''
                }`}
              >
                <div className="aspect-video bg-gray-100 relative">
                  {recipe.imageUrl ? (
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {!recipe.isPublished && (
                    <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                      비공개
                    </div>
                  )}
                  {recipe.isFeatured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                      추천
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 line-clamp-1">{recipe.title}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded whitespace-nowrap">
                      {recipe.category.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{recipe.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    {recipe.cookingTime && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {recipe.cookingTime}
                      </span>
                    )}
                    {recipe.difficulty && (
                      <span className="flex items-center gap-1">
                        난이도: {recipe.difficulty}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t">
                    <button
                      onClick={() => togglePublished(recipe)}
                      className={`text-xs px-2 py-1 rounded ${
                        recipe.isPublished
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {recipe.isPublished ? '공개중' : '비공개'}
                    </button>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/recipes/${recipe.id}`}
                        className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(recipe.id, recipe.title)}
                        className="text-sm px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold">카테고리 관리</h2>
              <button onClick={() => setShowCategoryModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="새 카테고리 이름"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                />
                <button
                  onClick={handleAddCategory}
                  disabled={savingCategory || !newCategoryName.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  추가
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {categories.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">등록된 카테고리가 없습니다.</p>
                ) : (
                  categories.map((cat) => (
                    <div key={cat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{cat.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{cat._count?.recipes || 0}개</span>
                        <button
                          onClick={() => handleDeleteCategory(cat.id, cat.name)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
