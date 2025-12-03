import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';

const categories = [
  { id: 'legume', name: '두서류가공품', desc: '콩류 가공식품', count: 45 },
  { id: 'grain', name: '곡류가공품', desc: '밀가루, 전분류', count: 62 },
  { id: 'nut', name: '견과가공품', desc: '아몬드, 호두 등', count: 38 },
  { id: 'dairy', name: '유지 및 유가공품', desc: '버터, 크림류', count: 54 },
  { id: 'coffee', name: '커피오가공품', desc: '커피, 코코아', count: 29 },
  { id: 'sugar', name: '당류가공품', desc: '설탕, 시럽류', count: 33 },
  { id: 'frozen', name: '냉동생지류', desc: '냉동 베이커리', count: 48 },
  { id: 'flour', name: '잡가루', desc: '특수 가루류', count: 26 },
  { id: 'vegetable', name: '과채가공품', desc: '과일, 채소류', count: 41 },
  { id: 'meat', name: '축산가공품', desc: '육류 가공품', count: 22 },
];

const featuredProducts = [
  { name: '프리미엄 강력분', category: '곡류가공품', brand: '대한제분' },
  { name: '무염버터 450g', category: '유가공품', brand: '서울우유' },
  { name: '다크초콜릿 커버춰', category: '커피오가공품', brand: '발로나' },
  { name: '아몬드 슬라이스', category: '견과가공품', brand: '캘리포니아' },
  { name: '크루아상 냉동생지', category: '냉동생지류', brand: '에이스' },
  { name: '백설탕 15kg', category: '당류가공품', brand: 'CJ제일제당' },
];

export default function ProductsAllPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="PRODUCTS"
          title="전체 제품"
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
                { value: '400+', label: '취급 제품' },
                { value: '50+', label: '협력 브랜드' },
                { value: '10', label: '제품 카테고리' },
                { value: '15년', label: '유통 노하우' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-[#B8956A]">{stat.value}</div>
                  <div className="text-sm text-[#6B5D53] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">CATEGORIES</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">제품 카테고리</h2>
              <p className="text-[#6B5D53]">다양한 베이커리·카페 원재료를 카테고리별로 만나보세요</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products/${category.id}`}
                  className="bg-white rounded-2xl p-6 border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#B8956A]/10 to-[#D4A574]/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-[#B8956A] group-hover:to-[#D4A574] transition-all duration-300">
                    <svg className="w-7 h-7 text-[#B8956A] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#4A4039] mb-1 group-hover:text-[#B8956A] transition-colors">{category.name}</h3>
                  <p className="text-sm text-[#6B5D53] mb-3">{category.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#B8956A] font-medium">{category.count}개 제품</span>
                    <svg className="w-4 h-4 text-[#B8956A] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">FEATURED</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">인기 제품</h2>
              <p className="text-[#6B5D53]">고객분들이 가장 많이 찾는 베스트 제품</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <div key={index} className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl overflow-hidden border border-[#E8DCC8] hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#B8956A]/10 to-[#D4A574]/10 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-12 h-12 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-[#B8956A] font-medium">{product.category}</span>
                    <h3 className="text-lg font-bold text-[#4A4039] mt-1 mb-2 group-hover:text-[#B8956A] transition-colors">{product.name}</h3>
                    <p className="text-sm text-[#6B5D53]">{product.brand}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">원하시는 제품을 찾지 못하셨나요?</h2>
            <p className="text-white/80 mb-8 text-lg">
              에이스유통은 고객의 니즈에 맞는 다양한 제품을 소싱해 드립니다.<br />
              문의 주시면 최적의 제품을 찾아 제안해 드리겠습니다.
            </p>
            <Link
              href="/support/contact"
              className="inline-flex items-center gap-2 bg-white text-[#4A4039] px-8 py-4 rounded-xl font-bold hover:bg-[#FAF6F1] transition-colors"
            >
              제품 문의하기
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
