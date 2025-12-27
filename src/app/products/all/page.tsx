'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
  displayName: string;
  description: string | null;
  imageUrl: string | null;
  _count: {
    products: number;
  };
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

export default function ProductsAllPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products?limit=100'),
        ]);

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }

        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData.products);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalProducts = categories.reduce((sum, cat) => sum + cat._count.products, 0);

  // 카테고리별 필터링
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category?.name === activeCategory);

  // 페이지네이션
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 카테고리 변경 시 페이지 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="PRODUCTS"
          title="판매 제품"
          subtitle="에이스유통이 공급하는 프리미엄 베이커리 원재료"
          breadcrumb={[
            { name: '판매 제품', href: '/products/all' },
            { name: '전체' }
          ]}
        />

        {/* Stats */}
        <section className="py-12 bg-white border-b border-[#E8DCC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: totalProducts > 0 ? `${totalProducts}+` : '400+', label: '취급 제품' },
                { value: '50+', label: '협력 브랜드' },
                { value: categories.length || 10, label: '제품 카테고리' },
                { value: '16년', label: '유통 노하우' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-[#B8956A]">{stat.value}</div>
                  <div className="text-sm text-[#6B5D53] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Tabs + Products */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">CATEGORIES</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4A4039] mb-3 sm:mb-4">제품 카테고리</h2>
              <p className="text-sm sm:text-base text-[#6B5D53]">다양한 베이커리·카페 원재료를 카테고리별로 만나보세요</p>
            </div>

            {/* Category Tab Menu */}
            <div className="mb-8 sm:mb-12">
              <div className="flex overflow-x-auto pb-2 sm:flex-wrap sm:justify-start gap-2 sm:gap-3 scrollbar-hide">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    activeCategory === 'all'
                      ? 'bg-[#B8956A] text-white shadow-lg'
                      : 'bg-white text-[#6B5D53] border border-[#E8DCC8] hover:border-[#B8956A] hover:text-[#B8956A]'
                  }`}
                >
                  전체
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.name)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                      activeCategory === category.name
                        ? 'bg-[#B8956A] text-white shadow-lg'
                        : 'bg-white text-[#6B5D53] border border-[#E8DCC8] hover:border-[#B8956A] hover:text-[#B8956A]'
                    }`}
                  >
                    {category.displayName}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-[#E8DCC8] p-5 animate-pulse">
                    <div className="h-3 bg-gray-200 rounded w-16 mb-3"></div>
                    <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {paginatedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.category?.name}/${product.id}`}
                      className="bg-white rounded-xl border border-[#E8DCC8] p-5 hover:border-[#B8956A] hover:shadow-lg transition-all duration-300 group block"
                    >
                      <span className="inline-block px-2.5 py-1 bg-[#B8956A]/10 text-[#B8956A] text-[11px] font-medium rounded-full mb-3">
                        {product.category?.displayName}
                      </span>
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
                  총 {filteredProducts.length}개 제품 중 {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)}개 표시
                </p>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-[#E8DCC8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-[#6B5D53] text-lg">해당 카테고리에 등록된 제품이 없습니다.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">원하시는 제품을 찾지 못하셨나요?</h2>
            <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-lg">
              에이스유통은 고객의 니즈에 맞는 다양한 제품을 소싱해 드립니다.<br className="hidden sm:block" />
              문의 주시면 최적의 제품을 찾아 제안해 드리겠습니다.
            </p>
            <Link
              href="/support/contact"
              className="inline-flex items-center gap-2 bg-white text-[#4A4039] px-8 py-4 rounded-xl font-bold hover:bg-[#FAF6F1] transition-colors"
            >
              제품 문의
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
