'use client';

import Link from 'next/link';

export default function LocationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-secondary-dark to-primary flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">찾아오시는 길</h1>
          <p className="text-xl opacity-90">에이스유통 본사 및 물류센터 위치 안내</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-beige-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-primary">홈</Link>
            <span>/</span>
            <Link href="/support/faq" className="hover:text-primary">고객지원</Link>
            <span>/</span>
            <span className="text-primary font-medium">찾아오시는 길</span>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <div className="aspect-square lg:aspect-auto lg:h-full min-h-[400px] bg-beige-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
              <div className="text-center relative z-10">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-text-secondary mb-4">지도 영역</p>
                <div className="flex gap-2 justify-center">
                  <a
                    href="https://map.naver.com/v5/search/경기도 하남시 샘재로 119번길 31"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    네이버 지도
                  </a>
                  <a
                    href="https://map.kakao.com/link/search/경기도 하남시 샘재로 119번길 31"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    카카오맵
                  </a>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-8">에이스유통 본사/물류센터</h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">주소</h3>
                    <p className="text-text-secondary">경기도 하남시 샘재로 119번길 31</p>
                    <p className="text-sm text-text-light">(우) 12997</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">전화</h3>
                    <p className="text-text-secondary">031-792-8195</p>
                  </div>
                </div>

                {/* Fax */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">팩스</h3>
                    <p className="text-text-secondary">031-792-8196</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">이메일</h3>
                    <p className="text-text-secondary">ace@acedist.co.kr</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">영업시간</h3>
                    <p className="text-text-secondary">평일 08:00 - 18:00</p>
                    <p className="text-sm text-text-light">토요일, 일요일, 공휴일 휴무</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">교통 안내</h2>
            <p className="text-text-secondary">다양한 교통수단으로 방문하실 수 있습니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* By Car */}
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">자가용</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  서하남IC에서 약 10분 소요
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  중부고속도로 하남IC에서 약 15분
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  주차장 완비 (대형 차량 가능)
                </li>
              </ul>
            </div>

            {/* By Bus */}
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">버스</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  하남시 마을버스 이용
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  감북동 정류장 하차 후 도보 5분
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  광역버스 하남시청역 하차
                </li>
              </ul>
            </div>

            {/* By Subway */}
            <div className="bg-white rounded-2xl p-8">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">지하철</h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  5호선 하남검단산역 하차
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  1번 출구에서 버스 환승
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  또는 택시로 약 10분 소요
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Parking Info */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-beige-100 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-4">주차 안내</h2>
              <p className="text-text-secondary">방문 고객을 위한 주차 공간을 제공합니다</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center p-6 bg-white rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">무료</div>
                <p className="text-text-secondary">방문 고객 주차료</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">50대</div>
                <p className="text-text-secondary">주차 가능 대수</p>
              </div>
            </div>

            <p className="text-center text-sm text-text-light mt-6">
              * 대형 차량(5톤 이상)은 사전 연락 부탁드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-secondary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">방문 전 문의하기</h2>
          <p className="opacity-80 mb-8">
            방문 상담을 원하시면 미리 연락 주시면 더욱 친절히 안내해 드리겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:031-792-8195"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full transition-colors font-medium"
            >
              전화하기: 031-792-8195
            </a>
            <Link
              href="/support/contact"
              className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full transition-colors font-medium"
            >
              온라인 문의하기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
