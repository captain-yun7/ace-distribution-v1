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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setSelectedImage(data.imageUrl || data.thumbnailUrl);
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

  const allImages = [
    product.imageUrl,
    product.thumbnailUrl,
    ...(product.images || []),
  ].filter((img): img is string => !!img);

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image Section */}
              <div>
                <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-[#E8DCC8] mb-4">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#B8956A]/10 to-[#D4A574]/10">
                      <svg className="w-24 h-24 text-[#B8956A]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === img ? 'border-[#B8956A]' : 'border-[#E8DCC8] hover:border-[#B8956A]/50'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

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

                {/* Basic Info */}
                <div className="bg-white rounded-xl border border-[#E8DCC8] p-6 mb-6">
                  <h2 className="font-bold text-[#4A4039] mb-4">제품 정보</h2>
                  <dl className="space-y-3">
                    <div className="flex">
                      <dt className="w-24 text-[#6B5D53] flex-shrink-0">제품코드</dt>
                      <dd className="text-[#4A4039] font-medium">{product.code}</dd>
                    </div>
                    {product.manufacturer && (
                      <div className="flex">
                        <dt className="w-24 text-[#6B5D53] flex-shrink-0">제조사</dt>
                        <dd className="text-[#4A4039]">{product.manufacturer}</dd>
                      </div>
                    )}
                    {product.origin && (
                      <div className="flex">
                        <dt className="w-24 text-[#6B5D53] flex-shrink-0">원산지</dt>
                        <dd className="text-[#4A4039]">{product.origin}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h2 className="font-bold text-[#4A4039] mb-3">제품 설명</h2>
                  <p className="text-[#6B5D53] whitespace-pre-line">{product.description}</p>
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h2 className="font-bold text-[#4A4039] mb-3">주요 특징</h2>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-[#B8956A] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[#6B5D53]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Specs */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <div className="mb-6">
                    <h2 className="font-bold text-[#4A4039] mb-3">상세 스펙</h2>
                    <div className="bg-[#FAF6F1] rounded-xl p-4">
                      <dl className="grid grid-cols-2 gap-3">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key}>
                            <dt className="text-xs text-[#6B5D53]">{key}</dt>
                            <dd className="text-sm text-[#4A4039] font-medium">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                  {product.brochureUrl && (
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
                  )}
                  <Link
                    href="/support/contact"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#B8956A] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#A07D58] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    제품 문의하기
                  </Link>
                </div>
              </div>
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
