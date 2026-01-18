'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';
import { useEffect, useState, use } from 'react';

interface Product {
  id: string;
  name: string;
  code: string;
  brand: string | null;
  description: string;
  features: Record<string, string> | null;
  imageUrl: string | null;
  thumbnailUrl: string | null;
  category: {
    id: string;
    name: string;
    displayName: string;
  };
}

export default function ProductDetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const { id } = use(params);
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
            <div className="bg-white rounded-2xl border border-[#E8DCC8] p-6 sm:p-10">
              <span className="inline-block bg-[#B8956A]/10 text-[#B8956A] text-sm font-medium px-3 py-1 rounded-full mb-3">
                {product.category.displayName}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#4A4039] mb-8 pb-6 border-b border-[#E8DCC8]">
                {product.name}
              </h1>

              {/* Description - Rich HTML */}
              {product.description && (
                <div
                  className="rich-content max-w-none text-[#6B5D53] text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
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
