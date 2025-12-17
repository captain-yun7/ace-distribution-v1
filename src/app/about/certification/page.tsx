import { Header, Footer, PageHero } from '@/components/layout';

export default function CertificationPage() {
  const certifications = [
    {
      title: '특허증 (냉장/냉동 장치)',
      description: '제과제빵류 운반 및 보관용 냉장/냉동장치 특허 (제 10-2445173호)',
      date: '2020년 취득',
    },
    {
      title: '상표등록증 (에이스제빵소)',
      description: '에이스제빵소 브랜드 상표권 등록',
      date: '2021년 등록',
    },
    {
      title: '우수기술기업 인증서',
      description: '제과제빵 재료 유통물류 및 기술마케팅 부문 기술력 인증',
      date: '2019년 취득',
    },
    {
      title: '메인비즈 인증',
      description: '중소벤처기업부 경영혁신형 중소기업 인증',
      date: '2016년 취득',
    },
    {
      title: '일터혁신 사업장',
      description: '노사발전재단 일터혁신 사업장 선정, 직무 분석 및 평가체계 개선 추진',
      date: '2023년 선정',
    },
    {
      title: '청년 디지털 일자리사업',
      description: '미래청년육성사업 참여기업, 청년 인재 채용 및 고용 유지',
      date: '2021년 선정',
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
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="ORGANIZATION"
          title="조직 및 인증서"
          subtitle="에이스유통의 조직 구성과 보유 인증 현황"
          breadcrumb={[
            { name: '회사 소개', href: '/about/intro' },
            { name: '조직 및 인증서' }
          ]}
        />

        {/* Organization Chart */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">ORGANIZATION</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">조직도</h2>
              <p className="text-[#6B5D53]">효율적인 업무 수행을 위한 조직 체계</p>
            </div>

            {/* CEO */}
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-[#B8956A] to-[#D4A574] text-white px-12 py-6 rounded-2xl shadow-lg mb-8">
                <p className="text-sm text-white/80">{organizationData.ceo.title}</p>
                <p className="text-2xl font-bold">{organizationData.ceo.name}</p>
              </div>

              {/* Connecting Line */}
              <div className="w-0.5 h-8 bg-gradient-to-b from-[#B8956A] to-[#E8DCC8]"></div>
              <div className="w-2/3 h-0.5 bg-[#E8DCC8]"></div>

              {/* Departments */}
              <div className="grid md:grid-cols-3 gap-8 mt-8 w-full max-w-5xl">
                {organizationData.departments.map((dept, index) => (
                  <div key={index} className="text-center">
                    <div className="w-0.5 h-8 bg-[#E8DCC8] mx-auto"></div>
                    <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl p-6 border border-[#E8DCC8] hover:border-[#B8956A]/50 hover:shadow-xl transition-all duration-300 group">
                      <h3 className="text-xl font-bold text-[#B8956A] mb-2">{dept.name}</h3>
                      <p className="text-sm text-[#6B5D53] mb-3">{dept.description}</p>
                      <div className="inline-block bg-[#B8956A]/10 text-[#B8956A] text-sm px-4 py-1 rounded-full mb-4 font-medium">
                        {dept.members}
                      </div>
                      <ul className="text-sm text-[#6B5D53] space-y-2">
                        {dept.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-center justify-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#B8956A] rounded-full"></span>
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
              <div className="inline-block bg-gradient-to-br from-[#4A4039] to-[#6B5D53] text-white px-10 py-6 rounded-2xl shadow-lg">
                <p className="text-sm text-white/80">총 직원 수</p>
                <p className="text-4xl font-bold">35명</p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-[#FAF6F1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">CERTIFICATIONS</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">보유 인증서</h2>
              <p className="text-[#6B5D53]">신뢰할 수 있는 기업 인증 현황</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden border border-[#E8DCC8] hover:border-[#B8956A]/50 hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[#B8956A]/10 to-[#D4A574]/10 flex items-center justify-center p-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-[#B8956A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#4A4039] mb-2 group-hover:text-[#B8956A] transition-colors">{cert.title}</h3>
                    <p className="text-[#6B5D53] text-sm mb-3">{cert.description}</p>
                    <span className="text-sm text-[#B8956A] font-medium">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnerships */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#B8956A] tracking-[0.3em] uppercase mb-4 block">PARTNERS</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#4A4039] mb-4">주요 협력사</h2>
              <p className="text-[#6B5D53]">에이스유통과 함께하는 믿음직한 파트너</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {['삼립', 'CJ제일제당', '오뚜기', '풀무원', '동원', '롯데푸드'].map((partner, index) => (
                <div key={index} className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-xl p-6 flex items-center justify-center h-24 border border-[#E8DCC8] hover:border-[#B8956A]/50 hover:shadow-lg transition-all duration-300">
                  <span className="text-lg font-semibold text-[#4A4039]">{partner}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-[#6B5D53]">외 다수의 우량 식품 제조사와 협력 중</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
