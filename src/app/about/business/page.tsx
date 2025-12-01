'use client';

import Link from 'next/link';

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#4A4039] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl font-black text-white">ACE</span>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-tight">에이스유통</span>
              <span className="text-xs font-medium text-white/60 leading-tight">주식회사</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Page Hero */}
      <section className="relative h-[300px] bg-gradient-to-r from-[#4A4039] to-[#6B5D53] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
          <span className="text-sm font-medium text-[#D4A574] tracking-[0.3em] uppercase mb-4">BUSINESS</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">사업장 소개</h1>
          <p className="text-white/80 text-lg">물류 혁신을 통한 안정적인 공급망</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-[#FAF6F1] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-[#6B5D53]">
            <Link href="/" className="hover:text-[#B8956A]">홈</Link>
            <span>/</span>
            <span>회사 소개</span>
            <span>/</span>
            <span className="text-[#B8956A] font-medium">사업장 소개</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logistics Center */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">LOGISTICS CENTER</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">
                자체 물류센터 보유
              </h2>
              <p className="text-[#6B5D53] max-w-2xl mx-auto">
                520평 면적의 자체 물류센터와 SCM 효율화를 통해 최적의 공급망을 운영합니다
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-[#FAF6F1] to-[#F5EFE7] rounded-3xl p-8 lg:p-12">
                <h3 className="text-xl font-bold text-[#4A4039] mb-6">물류 혁신 성과</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#B8956A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#4A4039]">배송 준비시간 75% 단축</p>
                      <p className="text-sm text-[#6B5D53]">주문발주 및 피킹 상차 프로세스 병목현상 해결로 4일 → 1일로 단축</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#B8956A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#4A4039]">ERP/IT 기반 물류 시스템</p>
                      <p className="text-sm text-[#6B5D53]">고객 만족도 증가 및 물류 경쟁력 강화</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#B8956A] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-[#4A4039]">터미닉스 해충방제 시스템</p>
                      <p className="text-sm text-[#6B5D53]">청결하고 쾌적한 창고 유지</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="bg-white border-2 border-[#E8DCC8] rounded-2xl p-6">
                  <h4 className="font-bold text-[#4A4039] mb-2">저온창고 운영</h4>
                  <p className="text-sm text-[#6B5D53]">저온창고와 해충방제 시스템을 통한 양질의 제품 공급 최우선</p>
                </div>
                <div className="bg-white border-2 border-[#E8DCC8] rounded-2xl p-6">
                  <h4 className="font-bold text-[#4A4039] mb-2">해외직수입 & 대량구매</h4>
                  <p className="text-sm text-[#6B5D53]">구매원가 절감 → 거래처 출고단가 추가 인하효과</p>
                </div>
                <div className="bg-white border-2 border-[#E8DCC8] rounded-2xl p-6">
                  <h4 className="font-bold text-[#4A4039] mb-2">전 상품 공급 시스템</h4>
                  <p className="text-sm text-[#6B5D53]">국내 제조 모든 상품과 수입 베이커리 부자재 공급 가능</p>
                </div>
                <div className="bg-white border-2 border-[#E8DCC8] rounded-2xl p-6">
                  <h4 className="font-bold text-[#4A4039] mb-2">유연한 배송 시스템</h4>
                  <p className="text-sm text-[#6B5D53]">정해진 배송날짜 외 필요 시 어느때라도 배송 가능</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ace Bakery Brand */}
          <div className="bg-gradient-to-r from-[#B8956A] to-[#D4A574] rounded-3xl p-8 lg:p-12 text-white mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">에이스제빵소</h3>
                <p className="text-white/90 leading-relaxed mb-6">
                  '에이스제빵소'는 에이스유통의 베이커리 전문성을 대표하는 공식 브랜드로,
                  2019년 상표 등록을 통해 품질 보증과 브랜드 신뢰성을 확보했습니다.
                </p>
                <p className="text-white/90 leading-relaxed">
                  해당 마크는 에이스유통의 기준을 충족한 제품에만 사용되며,
                  고객에게 안정적인 품질과 차별화된 가치를 제공합니다.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl font-black text-[#B8956A]">ACE</span>
                    <p className="text-[#4A4039] font-semibold text-sm mt-1">제빵소</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Network */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">DELIVERY NETWORK</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">
                전국 유통망
              </h2>
              <p className="text-[#6B5D53] max-w-3xl mx-auto">
                배송차량 20대 규모의 전문 배송차량과 자체 물류센터를 기반으로
                카페·베이커리 원재료를 전국 어디든 안정적으로 공급할 수 있는 국내 소수의 전문 기업입니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-8 bg-[#FAF6F1] rounded-2xl">
                <div className="text-4xl font-bold text-[#B8956A] mb-2">20대</div>
                <p className="text-[#4A4039] font-semibold">배송차량 보유</p>
              </div>
              <div className="text-center p-8 bg-[#FAF6F1] rounded-2xl">
                <div className="text-4xl font-bold text-[#B8956A] mb-2">1~2%</div>
                <p className="text-[#4A4039] font-semibold">전국 배송망 직접 구축 기업 비율</p>
              </div>
              <div className="text-center p-8 bg-[#FAF6F1] rounded-2xl">
                <div className="text-4xl font-bold text-[#B8956A] mb-2">520평</div>
                <p className="text-[#4A4039] font-semibold">물류센터 면적</p>
              </div>
            </div>

            {/* Coverage Map */}
            <div className="bg-white border-2 border-[#E8DCC8] rounded-3xl p-8">
              <h4 className="text-xl font-bold text-[#4A4039] mb-6 text-center">주요 배송 권역</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {['서울/수도권', '춘천', '원주', '전주', '부산', '거제', '천안'].map((city, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-br from-[#FAF6F1] to-white rounded-xl">
                    <div className="w-10 h-10 mx-auto mb-2 bg-[#B8956A] rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="font-semibold text-[#4A4039] text-sm">{city}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Competitive Advantages */}
          <div className="bg-[#4A4039] rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl font-bold mb-8 text-center">에이스유통의 경쟁력</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">정교한 콜드체인 운영</h4>
                <p className="text-white/70 text-sm">신선도 유지를 위한 철저한 온도관리</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">직영 배송 체계</h4>
                <p className="text-white/70 text-sm">자체 배송 차량으로 신속하고 안정적인 배송</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">전국 단위 커버리지</h4>
                <p className="text-white/70 text-sm">지역에 관계없이 신선한 원재료 공급</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#4A4039] to-[#3A3029] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/50 text-sm">
            Copyright 2010. 에이스유통주식회사 All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
