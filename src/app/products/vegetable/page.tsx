import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';

const products = [
  { name: '냉동 블루베리 1kg', brand: '미국산', desc: '항산화 풍부한 블루베리' },
  { name: '냉동 라즈베리 1kg', brand: '칠레산', desc: '새콤달콤 라즈베리' },
  { name: '냉동 딸기 1kg', brand: '국내산', desc: '당도 높은 딸기' },
  { name: '냉동 망고 1kg', brand: '필리핀산', desc: '달콤한 망고' },
  { name: '건조 크랜베리 1kg', brand: '미국산', desc: '무가당 크랜베리' },
  { name: '건포도 1kg', brand: '미국산', desc: '캘리포니아 건포도' },
  { name: '오렌지필 500g', brand: '스페인산', desc: '상큼한 오렌지 껍질' },
  { name: '레몬필 500g', brand: '스페인산', desc: '향긋한 레몬 껍질' },
  { name: '체리 통조림 2.5kg', brand: '미국산', desc: '다크 체리' },
  { name: '사과 프리저브 2kg', brand: '유럽산', desc: '사과 잼 필링' },
];

export default function VegetablePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="FRUIT & VEGETABLE"
          title="과채가공품"
          subtitle="과일, 채소류 가공 제품"
          breadcrumb={[
            { name: '판매 제품', href: '/products/all' },
            { name: '과채가공품' }
          ]}
        />

        {/* Category Info */}
        <section className="py-12 bg-white border-b border-[#E8DCC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-[#4A4039] mb-2">과채가공품</h2>
                <p className="text-[#6B5D53]">냉동과일, 건과일, 필링류 등 과채 가공품을 공급합니다.</p>
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
                { name: '당류가공품', href: '/products/sugar' },
                { name: '견과가공품', href: '/products/nut' },
                { name: '냉동생지류', href: '/products/frozen' },
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
