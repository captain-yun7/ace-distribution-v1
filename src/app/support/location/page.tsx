'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';

export default function LocationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="LOCATION"
          title="찾아오시는 길"
          subtitle="에이스유통 본사 및 물류센터 위치 안내"
          breadcrumb={[
            { name: '고객 지원', href: '/support/faq' },
            { name: '찾아오시는 길' }
          ]}
        />

        {/* Map Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Naver Map Embed */}
              <div className="aspect-square lg:aspect-auto lg:h-full min-h-[400px] rounded-2xl border border-[#E8DCC8] overflow-hidden">
                <iframe
                  src="https://map.naver.com/p/entry/place/13304508?c=15.00,0,0,0,dh"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="에이스유통 위치"
                ></iframe>
              </div>

              {/* Location Info */}
              <div>
                <h2 className="text-3xl font-bold text-[#4A4039] mb-8">에이스유통 본사</h2>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#4A4039] mb-1">주소</h3>
                      <p className="text-[#6B5D53]">경기도 하남시 샘재로 119번길 31</p>
                      <p className="text-sm text-[#6B5D53]/70">(천현동 392-3)</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#4A4039] mb-1">전화</h3>
                      <p className="text-[#6B5D53]">02-471-1644~6</p>
                    </div>
                  </div>

                  {/* Fax */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#4A4039] mb-1">팩스</h3>
                      <p className="text-[#6B5D53]">02-476-1372</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#4A4039] mb-1">이메일</h3>
                      <p className="text-[#6B5D53]">ace32865@hanmail.net</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#4A4039] mb-1">영업시간</h3>
                      <p className="text-[#6B5D53]">평일 08:00 - 18:00</p>
                      <p className="text-sm text-[#6B5D53]/70">토요일, 일요일, 공휴일 휴무</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">방문 전 문의</h2>
            <p className="text-xl text-white/80 mb-8">
              방문 상담을 원하시면 미리 연락 주시면 더욱 친절히 안내해 드리겠습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:02-471-1644"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#4A4039] px-8 py-4 rounded-xl font-bold hover:bg-[#FAF6F1] transition-colors"
              >
                전화하기: 02-471-1644~6
              </a>
              <Link
                href="/support/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors"
              >
                온라인 문의
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
