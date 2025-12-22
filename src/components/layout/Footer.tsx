import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#4A4039] to-[#3A3029] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Top */}
        <div className="grid md:grid-cols-3 gap-8 sm:gap-12 pb-8 sm:pb-12 border-b border-white/10">
          {/* Logo & Company Info */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl font-black text-white">ACE</span>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">에이스유통</span>
                <span className="text-[10px] sm:text-xs font-medium text-white/60 leading-tight">주식회사</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              카페·베이커리 원재료 유통 전문기업<br />
              프리미엄 품질과 신속한 배송으로<br />
              고객의 성공을 지원합니다.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm sm:text-base text-white font-bold mb-3 sm:mb-4">Contact</h4>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/70">
              <p className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#B8956A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>경기도 하남시 샘재로 119번길 31<br className="sm:hidden" />(천현동 392-3)</span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#B8956A] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                02) 471-1644~6
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#B8956A] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="break-all">ace32865@hanmail.net</span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#B8956A] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Fax. 02) 476-1372
              </p>
            </div>
          </div>

          {/* Business Info */}
          <div>
            <h4 className="text-sm sm:text-base text-white font-bold mb-3 sm:mb-4">Business Info</h4>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/70">
              <p>대표이사 : 안종일</p>
              <p>사업자등록번호 : 126-86-32865</p>
              <p>설립년도 : 2010년</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-[10px] sm:text-xs text-white/50 text-center md:text-left">
            Copyright 2010. 에이스유통주식회사 All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-[10px] sm:text-xs text-white/50">
            <Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
            <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
