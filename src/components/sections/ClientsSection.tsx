'use client';

const partnerLogos = [
  { src: '/images/partners/cj.png', alt: 'CJ' },
  { src: '/images/partners/롯데푸드.png', alt: '롯데푸드' },
  { src: '/images/partners/동원.png', alt: '동원' },
  { src: '/images/partners/오뚜기.png', alt: '오뚜기' },
  { src: '/images/partners/삼양식품.png', alt: '삼양식품' },
  { src: '/images/partners/매일.png', alt: '매일' },
  { src: '/images/partners/빙그레.png', alt: '빙그레' },
  { src: '/images/partners/동서식품', alt: '동서식품' },
  { src: '/images/partners/사조동아원.png', alt: '사조동아원' },
  { src: '/images/partners/대한제분.png', alt: '대한제분' },
  { src: '/images/partners/tjsdls.png', alt: '선일' },
  { src: '/images/partners/서울식품.png', alt: '서울식품' },
  { src: '/images/partners/제니코.png', alt: '제니코' },
  { src: '/images/partners/대두식품.png', alt: '대두식품' },
  { src: '/images/partners/주식회사-조흥.png', alt: '주식회사 조흥' },
  { src: '/images/partners/구르메.png', alt: '구르메' },
  { src: '/images/partners/(주)지성비엔씨.png', alt: '(주)지성비엔씨' },
  { src: '/images/partners/galim.png', alt: 'GALIM' },
  { src: '/images/partners/경일포장.png', alt: '경일포장' },
  { src: '/images/partners/굿모닝서울.png', alt: '굿모닝서울' },
  { src: '/images/partners/꼬미다.png', alt: '꼬미다' },
  { src: '/images/partners/네이처f&b.png', alt: '네이처F&B' },
  { src: '/images/partners/트라이이.png', alt: '트라이이' },
  { src: '/images/partners/정우유통.png', alt: '정우유통' },
  { src: '/images/partners/미스터푸드.png', alt: '미스터푸드' },
  { src: '/images/partners/에스푸드.png', alt: '에스푸드' },
  { src: '/images/partners/teabreak.png', alt: 'Teabreak' },
  { src: '/images/partners/떡의친구.png', alt: '떡의친구' },
  { src: '/images/partners/오트리푸드.png', alt: '오트리푸드' },
  { src: '/images/partners/제원인터네셔널.png', alt: '제원인터네셔널' },
  { src: '/images/partners/ek코퍼레이션.png', alt: 'EK코퍼레이션' },
  { src: '/images/partners/베이크플러스.png', alt: '베이크플러스' },
  { src: '/images/partners/웰넛.png', alt: '웰넛' },
  { src: '/images/partners/새로피엔엘.png', alt: '새로피엔엘' },
  { src: '/images/partners/석강.png', alt: '석강' },
  { src: '/images/partners/보라티알.png', alt: '보라티알' },
  { src: '/images/partners/솜인터네셔널.png', alt: '솜인터네셔널' },
  { src: '/images/partners/egg-solutions.png', alt: 'Egg Solutions' },
  { src: '/images/partners/엘홀딩스.png', alt: '엘홀딩스' },
  { src: '/images/partners/lolux.png', alt: 'LOLUX' },
  { src: '/images/partners/오뗄.png', alt: '오뗄' },
  { src: '/images/partners/리치스.png', alt: '리치스' },
  { src: '/images/partners/디벨라.png', alt: '디벨라' },
  { src: '/images/partners/마루비시.png', alt: '마루비시' },
];

const clientInfo = [
  { text: '스타필드 팥고당 입점', detail: '하남, 고양 외 8개 지점' },
  { text: '롯데 백화점 한나식빵 입점', detail: '롯데백화점 외 20여개 지점' },
  { text: '지하철 역사 내 더베이크', detail: '17여개 지점' },
  { text: '곤트란쉐리에', detail: '30여개 지점' },
  { text: '그 외 기타 개인제과', detail: '전국 420여개 이상 거래처 보유/관리' },
];

export default function ClientsSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 주요 협력사 */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm font-medium text-[#B8956A] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">PARTNERS</span>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#4A4039] mb-3 sm:mb-4">주요 협력사</h3>
          <p className="text-[#6B5D53] mb-6 sm:mb-8">에이스유통과 함께하는 믿음직한 파트너</p>

          {/* 주요 협력사 세부 정보 */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-4xl mx-auto mb-8 sm:mb-12">
            {clientInfo.map((item, index) => (
              <div key={index} className="bg-[#FAF6F1] px-3 sm:px-4 py-2 rounded-lg border border-[#E8DCC8]">
                <span className="text-xs sm:text-sm text-[#4A4039] font-medium">{item.text}</span>
                <span className="text-xs sm:text-sm text-[#B8956A] ml-1">({item.detail})</span>
              </div>
            ))}
          </div>
        </div>

        {/* 협력사 로고 그리드 - 1행당 5~6개, 크게 */}
        <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl p-6 sm:p-10 border border-[#E8DCC8]">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="bg-white rounded-xl p-3 sm:p-4 border border-[#E8DCC8] hover:border-[#B8956A] hover:shadow-lg transition-all duration-300 flex items-center justify-center aspect-square">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
