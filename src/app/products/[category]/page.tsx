'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
}

interface Product {
  id: string;
  name: string;
  code: string;
  brand: string | null;
  description: string;
  imageUrl: string | null;
  category: {
    id: string;
    name: string;
    displayName: string;
  };
}

const ITEMS_PER_PAGE = 12;

export default function CategoryPage() {
  const params = useParams();
  const categoryName = params.category as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [relatedCategories, setRelatedCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all categories to find current one and related ones
        const categoriesRes = await fetch('/api/categories');
        if (!categoriesRes.ok) throw new Error('Failed to fetch categories');

        const categories = await categoriesRes.json();
        const currentCategory = categories.find((c: Category) => c.name === categoryName);

        if (!currentCategory) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setCategory(currentCategory);

        // Get related categories (exclude current)
        const related = categories
          .filter((c: Category) => c.name !== categoryName)
          .slice(0, 3);
        setRelatedCategories(related);

        // Fetch products for this category
        const productsRes = await fetch(`/api/products?category=${categoryName}&limit=50`);
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData.products);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchData();
      setCurrentPage(1);
    }
  }, [categoryName]);

  // 페이지네이션
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (notFound) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#4A4039] mb-4">카테고리를 찾을 수 없습니다</h1>
            <p className="text-[#6B5D53] mb-8">요청하신 카테고리가 존재하지 않습니다.</p>
            <Link
              href="/products/all"
              className="inline-flex items-center gap-2 bg-[#B8956A] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#A07D58] transition-colors"
            >
              전체 제품 보기
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge={category?.name?.toUpperCase() || 'PRODUCTS'}
          title={category?.displayName || '제품'}
          subtitle={category?.description || '에이스유통의 프리미엄 제품'}
          breadcrumb={[
            { name: '판매 제품', href: '/products/all' },
            { name: category?.displayName || '제품' }
          ]}
        />

        {/* Category Info */}
        <section className="py-12 bg-white border-b border-[#E8DCC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-[#4A4039] mb-2">{category?.displayName}</h2>
                <p className="text-[#6B5D53]">{category?.description || `${category?.displayName} 제품을 공급합니다.`}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#6B5D53]">총 <strong className="text-[#B8956A]">{products.length}개</strong> 제품</span>
                <Link href="/products/all" className="text-sm text-[#B8956A] hover:underline flex items-center gap-1">
                  전체 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-[#E8DCC8] p-5 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginatedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.category.name}/${product.id}`}
                      className="bg-white rounded-xl border border-[#E8DCC8] p-5 hover:border-[#B8956A] hover:shadow-lg transition-all duration-300 group block"
                    >
                      <h3 className="text-base font-bold text-[#4A4039] group-hover:text-[#B8956A] transition-colors mb-1.5 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#6B5D53]">{product.brand || product.code}</p>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#E8DCC8] text-[#6B5D53] hover:border-[#B8956A] hover:text-[#B8956A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        if (totalPages <= 7) return true;
                        if (page === 1 || page === totalPages) return true;
                        if (Math.abs(page - currentPage) <= 1) return true;
                        return false;
                      })
                      .map((page, idx, arr) => (
                        <div key={page} className="flex items-center">
                          {idx > 0 && arr[idx - 1] !== page - 1 && (
                            <span className="px-2 text-[#6B5D53]">...</span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-[#B8956A] text-white'
                                : 'border border-[#E8DCC8] text-[#6B5D53] hover:border-[#B8956A] hover:text-[#B8956A]'
                            }`}
                          >
                            {page}
                          </button>
                        </div>
                      ))}

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#E8DCC8] text-[#6B5D53] hover:border-[#B8956A] hover:text-[#B8956A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Page Info */}
                <p className="text-center text-sm text-[#6B5D53] mt-4">
                  총 {products.length}개 제품 중 {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, products.length)}개 표시
                </p>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-[#B8956A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#4A4039] mb-2">등록된 제품이 없습니다</h3>
                <p className="text-[#6B5D53] mb-6">이 카테고리에 등록된 제품이 없습니다.</p>
                <Link
                  href="/support/contact"
                  className="inline-flex items-center gap-2 bg-[#B8956A] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#A07D58] transition-colors"
                >
                  제품 문의
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Related Categories */}
        {relatedCategories.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-xl font-bold text-[#4A4039] mb-6">관련 카테고리</h3>
              <div className="flex flex-wrap gap-3">
                {relatedCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products/${cat.name}`}
                    className="px-4 py-2 bg-[#FAF6F1] text-[#4A4039] rounded-lg hover:bg-[#B8956A] hover:text-white transition-colors text-sm font-medium"
                  >
                    {cat.displayName}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">제품 문의 및 견적 요청</h2>
            <p className="text-white/80 mb-6">원하시는 제품의 상세 정보나 대량 구매 견적이 필요하시면 문의해 주세요.</p>
            <Link
              href="/support/contact"
              className="inline-flex items-center gap-2 bg-white text-[#4A4039] px-6 py-3 rounded-xl font-bold hover:bg-[#FAF6F1] transition-colors"
            >
              문의
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
