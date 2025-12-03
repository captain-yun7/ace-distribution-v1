import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';

const products = [
  { name: '강력분 20kg', brand: '대한제분', desc: '제빵용 고급 강력분' },
  { name: '박력분 20kg', brand: '대한제분', desc: '과자/케이크용 박력분' },
  { name: '중력분 20kg', brand: '대한제분', desc: '다용도 중력분' },
  { name: '통밀가루 1kg', brand: 'CJ제일제당', desc: '식이섬유 풍부한 통밀' },
  { name: '옥수수 전분 1kg', brand: '대상', desc: '요리/제과용 전분' },
  { name: '감자 전분 1kg', brand: '대상', desc: '부드러운 식감의 전분' },
  { name: '타피오카 전분', brand: '태국산', desc: '쫄깃한 식감용' },
  { name: '쌀가루 1kg', brand: '국내산', desc: '떡/빵용 쌀가루' },
  { name: '찹쌀가루 1kg', brand: '국내산', desc: '쫄깃한 찹쌀가루' },
  { name: '호밀가루 1kg', brand: '독일산', desc: '풍미 좋은 호밀' },
];

export default function GrainPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="GRAIN PRODUCTS"
          title="곡류가공품"
          subtitle="밀가루, 전분류 등 베이커리의 기본이 되는 곡류 제품"
          breadcrumb={[
            { name: '판매 제품', href: '/products/all' },
            { name: '곡류가공품' }
          ]}
        />

        {/* Category Info */}
        <section className="py-12 bg-white border-b border-[#E8DCC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-[#4A4039] mb-2">곡류가공품</h2>
                <p className="text-[#6B5D53]">강력분, 박력분, 전분류 등 베이커리 필수 재료를 공급합니다.</p>
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-square bg-gradient-to-br from-[#B8956A]/10 to-[#D4A574]/10 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-[#B8956A] font-medium">{product.brand}</span>
                    <h3 className="text-lg font-bold text-[#4A4039] mt-1 mb-2 group-hover:text-[#B8956A] transition-colors">{product.name}</h3>
                    <p className="text-sm text-[#6B5D53]">{product.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-bold text-[#4A4039] mb-6">관련 카테고리</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: '두서류가공품', href: '/products/legume' },
                { name: '냉동생지류', href: '/products/frozen' },
                { name: '잡가루', href: '/products/flour' },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="px-4 py-2 bg-[#FAF6F1] text-[#4A4039] rounded-lg hover:bg-[#B8956A] hover:text-white transition-colors text-sm font-medium"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">제품 문의 및 견적 요청</h2>
            <p className="text-white/80 mb-6">원하시는 제품의 상세 정보나 대량 구매 견적이 필요하시면 문의해 주세요.</p>
            <Link
              href="/support/contact"
              className="inline-flex items-center gap-2 bg-white text-[#4A4039] px-6 py-3 rounded-xl font-bold hover:bg-[#FAF6F1] transition-colors"
            >
              문의하기
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
