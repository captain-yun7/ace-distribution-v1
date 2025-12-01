'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    type: '일반문의',
    company: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    agree: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">고객문의</h1>
          <p className="text-xl opacity-90">무엇이든 물어보세요. 친절하게 답변 드리겠습니다.</p>
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
            <span className="text-primary font-medium">고객문의</span>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-beige-50 rounded-2xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">전화 문의</h3>
              <p className="text-2xl font-bold text-primary mb-2">031-792-8195</p>
              <p className="text-sm text-text-light">평일 08:00 - 18:00</p>
            </div>

            <div className="text-center p-8 bg-beige-50 rounded-2xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">이메일 문의</h3>
              <p className="text-xl font-bold text-primary mb-2">ace@acedist.co.kr</p>
              <p className="text-sm text-text-light">24시간 접수 가능</p>
            </div>

            <div className="text-center p-8 bg-beige-50 rounded-2xl">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">카카오톡 문의</h3>
              <p className="text-xl font-bold text-primary mb-2">@에이스유통</p>
              <p className="text-sm text-text-light">평일 09:00 - 18:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">문의하기</h2>
            <p className="text-text-secondary">아래 양식을 작성해 주시면 담당자가 빠르게 연락드리겠습니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            {/* Inquiry Type */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-text-primary mb-4">
                문의 유형 *
              </label>
              <div className="flex flex-wrap gap-3">
                {['일반문의', '거래문의', '제품문의', '배송문의', '기타'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, type })}
                    className={`px-6 py-2 rounded-full transition-all ${
                      formData.type === type
                        ? 'bg-primary text-white'
                        : 'bg-beige-100 text-text-secondary hover:bg-beige-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  업체명
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-beige-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="업체명을 입력하세요 (개인은 생략 가능)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  성함 *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-beige-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="성함을 입력하세요"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-beige-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="이메일을 입력하세요"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  연락처 *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-beige-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="연락처를 입력하세요"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                문의 내용 *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-beige-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="문의 내용을 상세히 작성해주세요"
                required
              />
            </div>

            {/* Privacy Agreement */}
            <div className="mb-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agree}
                  onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded border-beige-300 text-primary focus:ring-primary"
                  required
                />
                <span className="text-sm text-text-secondary">
                  개인정보 수집 및 이용에 동의합니다. 수집된 정보는 문의 답변 목적으로만 사용되며, 답변 완료 후 파기됩니다.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-full transition-colors font-medium text-lg"
              >
                문의 접수하기
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">빠른 링크</h2>
            <p className="text-text-secondary">자주 찾는 정보를 바로 확인하세요</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'FAQ', desc: '자주 묻는 질문', href: '/support/faq', icon: '?' },
              { title: '공지사항', desc: '새로운 소식', href: '/support/notice', icon: '!' },
              { title: '자료실', desc: '다운로드 자료', href: '/support/resources', icon: '↓' },
              { title: '오시는 길', desc: '위치 안내', href: '/support/location', icon: '→' },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block p-6 bg-beige-50 rounded-xl hover:bg-beige-100 transition-colors text-center group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-xl font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                  {link.icon}
                </div>
                <h3 className="font-bold text-text-primary mb-1">{link.title}</h3>
                <p className="text-sm text-text-secondary">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
