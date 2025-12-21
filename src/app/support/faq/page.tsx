'use client';

import { Header, Footer, PageHero } from '@/components/layout';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
  category: {
    id: string;
    name: string;
  };
}

interface FaqCategory {
  id: string;
  name: string;
  order: number;
  faqs: Faq[];
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [categories, setCategories] = useState<FaqCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch('/api/faqs');
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const categoryNames = ['전체', ...categories.map(c => c.name)];

  const allFaqs = categories.flatMap(cat =>
    cat.faqs.map(faq => ({ ...faq, categoryName: cat.name }))
  );

  const filteredFaqs = allFaqs.filter(faq => {
    // Category filter
    if (selectedCategory !== '전체' && faq.categoryName !== selectedCategory) {
      return false;
    }
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!faq.question.toLowerCase().includes(query) && !faq.answer.toLowerCase().includes(query)) {
        return false;
      }
    }
    return true;
  });

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              {categoryNames.map((category) => (
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
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-[#E8DCC8] animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={faq.id}
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
                            {faq.categoryName}
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
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#E8DCC8]">
                <div className="w-16 h-16 bg-[#B8956A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#4A4039] mb-2">
                  {searchQuery ? '검색 결과가 없습니다' : '등록된 FAQ가 없습니다'}
                </h3>
                <p className="text-[#6B5D53]">
                  {searchQuery ? '다른 검색어로 시도해보세요.' : 'FAQ가 등록되면 이곳에 표시됩니다.'}
                </p>
              </div>
            )}
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
                1:1 문의
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
