'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';
import { useEffect, useState, use } from 'react';

interface Product {
  id: string;
  name: string;
  code: string;
  brand: string | null;
  manufacturer: string | null;
  origin: string | null;
  description: string;
  specs: Record<string, string> | null;
  features: string[] | null;
  imageUrl: string | null;
  thumbnailUrl: string | null;
  images: string[] | null;
  brochureUrl: string | null;
  category: {
    id: string;
    name: string;
    displayName: string;
  };
}

export default function ProductDetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const { category, id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#FAF6F1]">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="aspect-square bg-gray-200 rounded-2xl"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-[#B8956A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#4A4039] mb-4">제품을 찾을 수 없습니다</h1>
            <p className="text-[#6B5D53] mb-8">요청하신 제품이 존재하지 않거나 삭제되었습니다.</p>
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
          badge={product.category.name.toUpperCase()}
          title={product.name}
          subtitle={product.brand || product.code}
          breadcrumb={[
            { name: '판매 제품', href: '/products/all' },
            { name: product.category.displayName, href: `/products/${product.category.name}` },
            { name: product.name }
          ]}
        />

        {/* Product Detail */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Info Section */}
            <div>
                <div className="mb-6">
                  <span className="inline-block bg-[#B8956A]/10 text-[#B8956A] text-sm font-medium px-3 py-1 rounded-full mb-3">
                    {product.category.displayName}
                  </span>
                  <h1 className="text-3xl font-bold text-[#4A4039] mb-2">{product.name}</h1>
                  {product.brand && (
                    <p className="text-lg text-[#6B5D53]">{product.brand}</p>
                  )}
                </div>

                {/* Usage / Specs - 사용량 및 상세 정보 */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <div className="mb-6">
                    <h2 className="font-bold text-[#4A4039] mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      사용량 및 상세 정보
                    </h2>
                    <div className="bg-white rounded-xl border border-[#E8DCC8] overflow-hidden">
                      <table className="w-full">
                        <tbody className="divide-y divide-[#E8DCC8]">
                          {Object.entries(product.specs).map(([key, value]) => (
                            <tr key={key}>
                              <th className="px-4 py-3 bg-[#FAF6F1] text-left text-sm font-medium text-[#4A4039] w-32">{key}</th>
                              <td className="px-4 py-3 text-sm text-[#6B5D53]">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Features - 제품 특징 */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h2 className="font-bold text-[#4A4039] mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      제품 특징
                    </h2>
                    <div className="bg-white rounded-xl border border-[#E8DCC8] p-4">
                      <ul className="space-y-3">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-[#B8956A]/10 text-[#B8956A] rounded-full flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            <span className="text-[#6B5D53] text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Description - 제품 설명 */}
                {product.description && (
                  <div className="mb-6">
                    <h2 className="font-bold text-[#4A4039] mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      제품 설명
                    </h2>
                    <div className="bg-white rounded-xl border border-[#E8DCC8] p-4">
                      <p className="text-[#6B5D53] text-sm leading-relaxed whitespace-pre-line">{product.description}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {product.brochureUrl && (
                  <div className="flex gap-4">
                    <a
                      href={product.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#B8956A] text-[#B8956A] px-6 py-3 rounded-xl font-medium hover:bg-[#B8956A]/5 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      브로셔 다운로드
                    </a>
                  </div>
                )}
            </div>
          </div>
        </section>

        {/* Back to List */}
        <section className="py-8 border-t border-[#E8DCC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <Link
                href={`/products/${product.category.name}`}
                className="inline-flex items-center gap-2 text-[#6B5D53] hover:text-[#B8956A] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {product.category.displayName} 목록으로
              </Link>
              <Link
                href="/products/all"
                className="inline-flex items-center gap-2 text-[#6B5D53] hover:text-[#B8956A] transition-colors"
              >
                전체 제품 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
