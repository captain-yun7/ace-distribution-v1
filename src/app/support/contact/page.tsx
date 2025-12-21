'use client';

import { Header, Footer, PageHero } from '@/components/layout';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formData.type,
          company: formData.company,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitResult({
          success: true,
          message: '문의가 정상적으로 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.',
        });
        // Reset form
        setFormData({
          type: '일반문의',
          company: '',
          name: '',
          email: '',
          phone: '',
          message: '',
          agree: false,
        });
      } else {
        setSubmitResult({
          success: false,
          message: data.error || '문의 접수 중 오류가 발생했습니다.',
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="CONTACT"
          title="고객문의"
          subtitle="무엇이든 물어보세요. 친절하게 답변 드리겠습니다."
          breadcrumb={[
            { name: '고객 지원', href: '/support/faq' },
            { name: '고객문의' }
          ]}
        />

        {/* Contact Info */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#4A4039] mb-2">전화 문의</h3>
                <p className="text-2xl font-bold text-[#B8956A] mb-2">02-471-1644~6</p>
                <p className="text-sm text-[#6B5D53]">평일 09:00 - 18:00</p>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#4A4039] mb-2">이메일 문의</h3>
                <p className="text-xl font-bold text-[#B8956A] mb-2">ace32865@hanmail.net</p>
                <p className="text-sm text-[#6B5D53]">24시간 접수 가능</p>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#B8956A] to-[#D4A574] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#4A4039] mb-2">팩스</h3>
                <p className="text-xl font-bold text-[#B8956A] mb-2">02-476-1372</p>
                <p className="text-sm text-[#6B5D53]">평일 09:00 - 18:00</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">INQUIRY</span>
              <h2 className="text-3xl font-bold text-[#4A4039] mb-4">문의 양식</h2>
              <p className="text-[#6B5D53]">아래 양식을 작성해 주시면 담당자가 빠르게 연락드리겠습니다.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 border border-[#E8DCC8]">
              {/* Inquiry Type */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-[#4A4039] mb-4">
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
                          ? 'bg-gradient-to-r from-[#B8956A] to-[#D4A574] text-white'
                          : 'bg-[#FAF6F1] text-[#6B5D53] hover:bg-[#E8DCC8]'
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
                  <label className="block text-sm font-medium text-[#4A4039] mb-2">
                    업체명
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] focus:outline-none focus:ring-2 focus:ring-[#B8956A]"
                    placeholder="업체명을 입력하세요 (개인은 생략 가능)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4039] mb-2">
                    성함 *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] focus:outline-none focus:ring-2 focus:ring-[#B8956A]"
                    placeholder="성함을 입력하세요"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#4A4039] mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] focus:outline-none focus:ring-2 focus:ring-[#B8956A]"
                    placeholder="이메일을 입력하세요"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A4039] mb-2">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] focus:outline-none focus:ring-2 focus:ring-[#B8956A]"
                    placeholder="연락처를 입력하세요"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#4A4039] mb-2">
                  문의 내용 *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] focus:outline-none focus:ring-2 focus:ring-[#B8956A] resize-none"
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
                    className="mt-1 w-5 h-5 rounded border-[#E8DCC8] text-[#B8956A] focus:ring-[#B8956A]"
                    required
                  />
                  <span className="text-sm text-[#6B5D53]">
                    개인정보 수집 및 이용에 동의합니다. 수집된 정보는 문의 답변 목적으로만 사용되며, 답변 완료 후 파기됩니다.
                  </span>
                </label>
              </div>

              {/* Submit Result */}
              {submitResult && (
                <div
                  className={`mb-6 p-4 rounded-xl ${
                    submitResult.success
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {submitResult.success ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    {submitResult.message}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B8956A] to-[#D4A574] text-white px-12 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      접수 중...
                    </>
                  ) : (
                    <>
                      문의 접수
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
