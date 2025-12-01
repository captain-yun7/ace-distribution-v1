'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function CertificationPage() {
  const certifications = [
    {
      title: '사업자등록증',
      description: '정식 등록된 식품 유통 전문 기업',
      date: '2010년 발급',
      image: '/images/cert-business.jpg',
    },
    {
      title: '식품위생교육 이수증',
      description: '식품 위생 관련 법정 교육 이수 완료',
      date: '매년 갱신',
      image: '/images/cert-hygiene.jpg',
    },
    {
      title: '냉동/냉장 운송 인증',
      description: '콜드체인 운송 품질 인증',
      date: '2015년 취득',
      image: '/images/cert-coldchain.jpg',
    },
    {
      title: 'HACCP 협력업체 인증',
      description: '식품 안전관리 기준 충족 인증',
      date: '2018년 취득',
      image: '/images/cert-haccp.jpg',
    },
  ];

  const organizationData = {
    ceo: {
      title: '대표이사',
      name: '안종일',
    },
    departments: [
      {
        name: '영업부',
        description: '고객 상담 및 영업 관리',
        members: '5명',
        responsibilities: ['고객 상담', '신규 거래처 개발', '주문 관리', '고객 관계 관리'],
      },
      {
        name: '물류부',
        description: '물류 및 배송 관리',
        members: '8명',
        responsibilities: ['재고 관리', '입출고 관리', '배송 스케줄링', '차량 관리'],
      },
      {
        name: '관리부',
        description: '경영 지원 및 재무 관리',
        members: '3명',
        responsibilities: ['인사 관리', '재무/회계', '총무', '경영 기획'],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-primary to-secondary-dark flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">조직 및 인증서</h1>
          <p className="text-xl opacity-90">에이스유통의 조직 구성과 보유 인증 현황</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-beige-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-primary">홈</Link>
            <span>/</span>
            <Link href="/about/intro" className="hover:text-primary">회사소개</Link>
            <span>/</span>
            <span className="text-primary font-medium">조직 및 인증서</span>
          </div>
        </div>
      </div>

      {/* Organization Chart */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">조직도</h2>
            <p className="text-lg text-text-secondary">효율적인 업무 수행을 위한 조직 체계</p>
          </div>

          {/* CEO */}
          <div className="flex flex-col items-center">
            <div className="bg-primary text-white px-12 py-6 rounded-xl shadow-lg mb-8">
              <p className="text-sm opacity-80">{organizationData.ceo.title}</p>
              <p className="text-2xl font-bold">{organizationData.ceo.name}</p>
            </div>

            {/* Connecting Line */}
            <div className="w-0.5 h-8 bg-primary/30" />
            <div className="w-2/3 h-0.5 bg-primary/30" />

            {/* Departments */}
            <div className="grid md:grid-cols-3 gap-8 mt-8 w-full max-w-4xl">
              {organizationData.departments.map((dept, index) => (
                <div key={index} className="text-center">
                  <div className="w-0.5 h-8 bg-primary/30 mx-auto" />
                  <div className="bg-beige-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-primary mb-2">{dept.name}</h3>
                    <p className="text-sm text-text-secondary mb-3">{dept.description}</p>
                    <div className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full mb-4">
                      {dept.members}
                    </div>
                    <ul className="text-sm text-text-secondary space-y-1">
                      {dept.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-center justify-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Employees */}
          <div className="text-center mt-12">
            <div className="inline-block bg-secondary text-white px-8 py-4 rounded-xl">
              <p className="text-sm opacity-80">총 직원 수</p>
              <p className="text-3xl font-bold">16명</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-beige-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">보유 인증서</h2>
            <p className="text-lg text-text-secondary">신뢰할 수 있는 기업 인증 현황</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2">{cert.title}</h3>
                  <p className="text-text-secondary mb-3">{cert.description}</p>
                  <span className="text-sm text-primary font-medium">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">주요 협력사</h2>
            <p className="text-lg text-text-secondary">에이스유통과 함께하는 믿음직한 파트너</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['삼립', 'CJ제일제당', '오뚜기', '풀무원', '동원', '롯데푸드'].map((partner, index) => (
              <div key={index} className="bg-beige-50 rounded-xl p-6 flex items-center justify-center h-24 hover:bg-beige-100 transition-colors">
                <span className="text-lg font-semibold text-text-secondary">{partner}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-text-secondary">
              외 다수의 우량 식품 제조사와 협력 중
            </p>
          </div>
        </div>
      </section>

      {/* Quality Policy */}
      <section className="py-20 bg-secondary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">품질 방침</h2>
          <div className="space-y-6 text-lg opacity-90">
            <p>
              에이스유통은 &quot;고객에게 최상의 품질 제품을&quot;이라는 신념 아래,
              철저한 품질 관리 시스템을 운영하고 있습니다.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="border border-white/20 rounded-xl p-6">
                <div className="text-4xl font-bold text-primary-light mb-2">100%</div>
                <p>콜드체인 유지율</p>
              </div>
              <div className="border border-white/20 rounded-xl p-6">
                <div className="text-4xl font-bold text-primary-light mb-2">매일</div>
                <p>품질 점검 실시</p>
              </div>
              <div className="border border-white/20 rounded-xl p-6">
                <div className="text-4xl font-bold text-primary-light mb-2">0건</div>
                <p>식품 사고 이력</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
