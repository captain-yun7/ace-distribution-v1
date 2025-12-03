'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';
import { useState } from 'react';

const categories = ['전체', '주문/배송', '제품', '결제', '기타'];

const faqs = [
  {
    category: '주문/배송',
    question: '주문은 어떻게 하나요?',
    answer: '에이스유통은 B2B 전문 유통업체로, 전화(02-471-1644~6) 또는 이메일(ace32865@hanmail.net)을 통해 주문하실 수 있습니다. 신규 거래를 원하시면 담당자와 상담 후 거래 계약을 진행합니다.',
  },
  {
    category: '주문/배송',
    question: '배송 가능 지역은 어디인가요?',
    answer: '현재 수도권(서울, 경기, 인천) 전역에 당일 배송 서비스를 제공하고 있습니다. 그 외 지역은 택배를 통해 익일 배송됩니다. 배송 지역에 따라 배송비가 상이할 수 있으니 자세한 내용은 문의 바랍니다.',
  },
  {
    category: '주문/배송',
    question: '최소 주문 금액이 있나요?',
    answer: '네, 원활한 배송 서비스를 위해 최소 주문 금액이 설정되어 있습니다. 지역 및 제품군에 따라 다르므로, 자세한 내용은 담당자에게 문의해 주세요.',
  },
  {
    category: '주문/배송',
    question: '배송 시간은 언제인가요?',
    answer: '수도권 기준 새벽 배송(오전 6시~9시)과 일반 배송(오전 9시~오후 6시) 중 선택 가능합니다. 고객사 운영 시간에 맞춰 배송 시간을 조정해 드립니다.',
  },
  {
    category: '제품',
    question: '취급하는 제품군은 무엇인가요?',
    answer: '냉동/냉장 베이커리, 식자재, 음료, 유가공품 등 다양한 식품을 취급하고 있습니다. 주요 거래 제조사로는 삼립, CJ제일제당, 오뚜기, 풀무원 등이 있습니다.',
  },
  {
    category: '제품',
    question: '에이스베이커리는 무엇인가요?',
    answer: '에이스베이커리는 에이스유통의 자체 브랜드로, 카페와 베이커리를 위한 프리미엄 냉동 베이커리 제품 라인입니다. 크로아상, 식빵, 케이크 등 다양한 제품을 합리적인 가격에 제공합니다.',
  },
  {
    category: '제품',
    question: '제품의 신선도는 어떻게 관리되나요?',
    answer: '전 제품 콜드체인 시스템을 통해 유통됩니다. 입고부터 배송까지 냉장/냉동 온도가 철저히 유지되며, 매일 품질 점검을 실시합니다.',
  },
  {
    category: '결제',
    question: '결제 방법은 어떻게 되나요?',
    answer: '세금계산서 발행 후 월 단위 정산이 기본입니다. 신규 거래처의 경우 초기에는 선결제 또는 배송 시 현금/카드 결제가 필요할 수 있습니다. 거래 기간에 따라 결제 조건 협의가 가능합니다.',
  },
  {
    category: '결제',
    question: '세금계산서 발행이 가능한가요?',
    answer: '네, 모든 거래에 대해 전자세금계산서가 발행됩니다. 결제 완료 후 익월 10일 이내에 이메일로 발송해 드립니다.',
  },
  {
    category: '기타',
    question: '신규 거래 절차는 어떻게 되나요?',
    answer: '1) 전화 또는 이메일로 상담 신청 → 2) 담당자 방문 상담 → 3) 거래 계약 체결 → 4) 주문 시작의 절차로 진행됩니다. 상담부터 거래 시작까지 보통 1주일 내외 소요됩니다.',
  },
  {
    category: '기타',
    question: '제품 반품/교환은 어떻게 하나요?',
    answer: '제품 하자 시 배송 당일 또는 익일 오전까지 연락 주시면 즉시 교환해 드립니다. 단순 변심에 의한 반품은 냉동/냉장 제품 특성상 어려울 수 있으니 주문 전 충분히 확인해 주세요.',
  },
  {
    category: '기타',
    question: '메뉴 컨설팅도 받을 수 있나요?',
    answer: '네, 거래처 대상으로 무료 메뉴 컨설팅 서비스를 제공합니다. 베이커리 카페 창업, 메뉴 개발 등에 대한 조언을 받으실 수 있습니다. 담당자에게 문의해 주세요.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredFaqs = selectedCategory === '전체'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="FAQ"
          title="자주 묻는 질문"
          subtitle="궁금하신 점을 빠르게 확인하세요"
          breadcrumb={[
            { name: '고객 지원', href: '/support/faq' },
            { name: '자주 묻는 질문' }
          ]}
        />

        {/* Search */}
        <section className="py-8 bg-white border-b border-[#E8DCC8]">
          <div className="max-w-3xl mx-auto px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="궁금한 내용을 검색해보세요"
                className="w-full px-6 py-4 pr-12 rounded-full border border-[#E8DCC8] focus:outline-none focus:ring-2 focus:ring-[#B8956A] bg-[#FAF6F1]"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B5D53] hover:text-[#B8956A]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#B8956A] to-[#D4A574] text-white'
                      : 'bg-[#FAF6F1] text-[#6B5D53] hover:bg-[#E8DCC8]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A] transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#FAF6F1] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#B8956A] to-[#D4A574] text-white rounded-full flex items-center justify-center font-bold">
                        Q
                      </span>
                      <div>
                        <span className="text-xs text-[#B8956A] bg-[#B8956A]/10 px-2 py-0.5 rounded mr-2">
                          {faq.category}
                        </span>
                        <span className="font-medium text-[#4A4039]">{faq.question}</span>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-[#6B5D53] transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-5">
                      <div className="flex gap-4 pt-4 border-t border-[#E8DCC8]">
                        <span className="flex-shrink-0 w-10 h-10 bg-[#4A4039] text-white rounded-full flex items-center justify-center font-bold">
                          A
                        </span>
                        <p className="text-[#6B5D53] leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">찾으시는 답변이 없으신가요?</h2>
            <p className="text-xl text-white/80 mb-8">
              궁금한 점이 있으시면 언제든지 문의해 주세요.<br />
              친절하게 답변해 드리겠습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/support/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#4A4039] px-8 py-4 rounded-xl font-bold hover:bg-[#FAF6F1] transition-colors"
              >
                1:1 문의하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:02-471-1644"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors"
              >
                전화 문의: 02-471-1644~6
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
