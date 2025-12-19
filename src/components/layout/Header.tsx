'use client';

import Link from 'next/link';
import { useState } from 'react';

const menuData = [
  { title: '회사 소개', items: [
    { name: '기업소개', href: '/about/intro' },
    { name: '기업 연혁', href: '/about/history' },
    { name: '경영철학', href: '/about/philosophy' },
    { name: '사업장 소개', href: '/about/business' },
    { name: '조직 및 인증서', href: '/about/certification' }
  ]},
  { title: '판매 제품', items: [
    { name: '판매 제품', href: '/products/all' },
    { name: '레시피', href: '/content/recipe' }
  ]},
  { title: 'ACE 스토리', items: [
    { name: '사내 문화', href: '/culture/internal' },
    { name: '사회 공헌', href: '/culture/social' },
    { name: '협력 사례', href: '/culture/partnership' },
    { name: '언론보도', href: '/content/news' }
  ]},
  { title: '고객 지원', items: [
    { name: '고객문의', href: '/support/contact' },
    { name: '찾아오시는 길', href: '/support/location' }
  ]}
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <>
      {/* Premium Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.08)]">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between h-20 lg:h-24 px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-all duration-500 group/logo relative">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="text-4xl font-black tracking-tight text-[#8B6F47] transition-all duration-500 drop-shadow-sm">
                  ACE
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#B8956A] to-[#D4A574] group-hover/logo:w-full transition-all duration-500"></span>
              </div>
              <div className="hidden sm:flex flex-col border-l-2 border-[#B8956A]/30 pl-4 transition-all duration-500">
                <span className="text-sm font-bold text-[#4A4039] transition-all duration-500 tracking-wide">에이스유통</span>
                <span className="text-xs font-medium text-[#6B5D53] transition-all duration-500">주식회사</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-2">
              {menuData.map((menu) => (
                <li key={menu.title} className="relative group">
                  <Link href={menu.items[0].href} className="relative px-5 py-3 text-[15px] font-semibold text-[#4A4039] transition-all duration-500 tracking-wide block">
                    <span className="relative z-10">{menu.title}</span>
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#B8956A] to-[#D4A574] group-hover:w-[calc(100%-20px)] transition-all duration-500 rounded-full"></span>
                    <span className="absolute inset-0 rounded-xl bg-[#B8956A]/0 group-hover:bg-[#B8956A]/5 transition-all duration-500"></span>
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="fixed left-0 right-0 top-20 lg:top-24 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="absolute inset-0 bg-white/98 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border-t border-[#B8956A]/10"></div>
                    <div className="relative max-w-6xl mx-auto px-8 py-10">
                      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                        <div className="w-1 h-8 bg-gradient-to-b from-[#B8956A] to-[#D4A574] rounded-full"></div>
                        <h3 className="text-2xl font-bold text-[#4A4039]">{menu.title}</h3>
                      </div>
                      <div className={`grid gap-3 ${menu.items.length > 6 ? 'grid-cols-4' : menu.items.length > 3 ? 'grid-cols-3' : 'grid-cols-3'}`}>
                        {menu.items.map((item, idx) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="group/item flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-br hover:from-[#FAF6F1] hover:to-white transition-all duration-300 border border-transparent hover:border-[#B8956A]/10"
                          >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B8956A]/10 to-[#D4A574]/10 flex items-center justify-center flex-shrink-0 group-hover/item:from-[#B8956A] group-hover/item:to-[#D4A574] transition-all duration-300">
                              <svg className="w-5 h-5 text-[#B8956A] group-hover/item:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                            <span className="text-[15px] font-semibold text-[#4A4039] group-hover/item:text-[#B8956A] transition-colors duration-300">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4A4039] transition-colors duration-500"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed top-20 left-0 right-0 bottom-0 bg-white overflow-y-auto">
            <div className="p-6">
              {menuData.map((menu) => (
                <div key={menu.title} className="mb-6">
                  <button
                    onClick={() => setActiveMenu(activeMenu === menu.title ? null : menu.title)}
                    className="w-full flex items-center justify-between py-3 text-lg font-bold text-[#4A4039] border-b border-gray-100"
                  >
                    {menu.title}
                    <svg className={`w-5 h-5 transition-transform ${activeMenu === menu.title ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeMenu === menu.title && (
                    <div className="py-2">
                      {menu.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-3 px-4 text-[#6B5D53] hover:text-[#B8956A] hover:bg-[#FAF6F1] rounded-lg transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
}
