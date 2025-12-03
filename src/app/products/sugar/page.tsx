import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';

const products = [
  { name: '백설탕 15kg', brand: 'CJ제일제당', desc: '제과용 고급 백설탕' },
  { name: '황설탕 15kg', brand: 'CJ제일제당', desc: '풍미있는 황설탕' },
  { name: '흑설탕 1kg', brand: '삼양사', desc: '진한 당밀 함유' },
  { name: '슈가파우더 3kg', brand: '대상', desc: '곱게 간 분당' },
  { name: '물엿 5kg', brand: '오뚜기', desc: '제과용 물엿' },
  { name: '조청 2.5kg', brand: '청정원', desc: '전통 조청' },
  { name: '메이플시럽 1L', brand: '캐나다산', desc: '100% 퓨어 메이플' },
  { name: '꿀 2kg', brand: '국내산', desc: '아카시아 꿀' },
  { name: '올리고당 1.2kg', brand: '청정원', desc: '건강한 감미료' },
  { name: '트레할로스 1kg', brand: '하야시바라', desc: '수분 유지 기능' },
];

export default function SugarPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="SUGAR PRODUCTS"
          title="당류가공품"
          subtitle="설탕, 시럽류 등 감미료 제품"
          breadcrumb={[
            { name: '판매 제품', href: '/products/all' },
            { name: '당류가공품' }
          ]}
        />

        {/* Category Info */}
        <section className="py-12 bg-white border-b border-[#E8DCC8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-[#4A4039] mb-2">당류가공품</h2>
                <p className="text-[#6B5D53]">설탕, 시럽, 꿀 등 다양한 감미료를 공급합니다.</p>
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
                { name: '커피오가공품', href: '/products/coffee' },
                { name: '과채가공품', href: '/products/vegetable' },
                { name: '곡류가공품', href: '/products/grain' },
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
