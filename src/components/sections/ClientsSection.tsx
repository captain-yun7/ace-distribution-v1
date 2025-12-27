'use client';

const partnerLogos = [
  { src: '/images/000. 협력사 로고/1. CJ.png', alt: 'CJ' },
  { src: '/images/000. 협력사 로고/2. 롯데푸드.png', alt: '롯데푸드' },
  { src: '/images/000. 협력사 로고/3. 동원.png', alt: '동원' },
  { src: '/images/000. 협력사 로고/4. 오뚜기.png', alt: '오뚜기' },
  { src: '/images/000. 협력사 로고/5. 삼양식품.png', alt: '삼양식품' },
  { src: '/images/000. 협력사 로고/6. 매일.png', alt: '매일' },
  { src: '/images/000. 협력사 로고/7. 빙그레.png', alt: '빙그레' },
  { src: '/images/000. 협력사 로고/8. 동서식품', alt: '동서식품' },
  { src: '/images/000. 협력사 로고/9. 사조동아원.png', alt: '사조동아원' },
  { src: '/images/000. 협력사 로고/10. 대한제분.png', alt: '대한제분' },
  { src: '/images/000. 협력사 로고/11. tjsdls.png', alt: '선일' },
  { src: '/images/000. 협력사 로고/12. 서울식품.png', alt: '서울식품' },
  { src: '/images/000. 협력사 로고/13. 제니코.png', alt: '제니코' },
  { src: '/images/000. 협력사 로고/14. 대두식품.png', alt: '대두식품' },
  { src: '/images/000. 협력사 로고/15. 주식회사 조흥.png', alt: '주식회사 조흥' },
  { src: '/images/000. 협력사 로고/16. 구르메.png', alt: '구르메' },
  { src: '/images/000. 협력사 로고/17. (주)지성비엔씨.png', alt: '(주)지성비엔씨' },
  { src: '/images/000. 협력사 로고/18. GALIM.png', alt: 'GALIM' },
  { src: '/images/000. 협력사 로고/19. 경일포장.png', alt: '경일포장' },
  { src: '/images/000. 협력사 로고/20. 굿모닝서울.png', alt: '굿모닝서울' },
  { src: '/images/000. 협력사 로고/21. 꼬미다.png', alt: '꼬미다' },
  { src: '/images/000. 협력사 로고/22. 네이처F&B.png', alt: '네이처F&B' },
  { src: '/images/000. 협력사 로고/23. 트라이이.png', alt: '트라이이' },
  { src: '/images/000. 협력사 로고/24. 정우유통.png', alt: '정우유통' },
  { src: '/images/000. 협력사 로고/25. 미스터푸드.png', alt: '미스터푸드' },
  { src: '/images/000. 협력사 로고/26. 에스푸드.png', alt: '에스푸드' },
  { src: '/images/000. 협력사 로고/27. teabreak.png', alt: 'Teabreak' },
  { src: '/images/000. 협력사 로고/28. 떡의친구.png', alt: '떡의친구' },
  { src: '/images/000. 협력사 로고/29. 오트리푸드.png', alt: '오트리푸드' },
  { src: '/images/000. 협력사 로고/30. 제원인터네셔널.png', alt: '제원인터네셔널' },
  { src: '/images/000. 협력사 로고/31. ek코퍼레이션.png', alt: 'EK코퍼레이션' },
  { src: '/images/000. 협력사 로고/32. 베이크플러스.png', alt: '베이크플러스' },
  { src: '/images/000. 협력사 로고/33. 웰넛.png', alt: '웰넛' },
  { src: '/images/000. 협력사 로고/34. 새로피엔엘.png', alt: '새로피엔엘' },
  { src: '/images/000. 협력사 로고/35. 석강.png', alt: '석강' },
  { src: '/images/000. 협력사 로고/36. 보라티알.png', alt: '보라티알' },
  { src: '/images/000. 협력사 로고/37. 솜인터네셔널.png', alt: '솜인터네셔널' },
  { src: '/images/000. 협력사 로고/38. egg solutions.png', alt: 'Egg Solutions' },
  { src: '/images/000. 협력사 로고/39. 엘홀딩스.png', alt: '엘홀딩스' },
  { src: '/images/000. 협력사 로고/40. LOLUX.png', alt: 'LOLUX' },
  { src: '/images/000. 협력사 로고/41. 오뗄.png', alt: '오뗄' },
  { src: '/images/000. 협력사 로고/42. 리치스.png', alt: '리치스' },
  { src: '/images/000. 협력사 로고/43. 디벨라.png', alt: '디벨라' },
  { src: '/images/000. 협력사 로고/44. 마루비시.png', alt: '마루비시' },
];

const clientInfo = [
  { text: '스타필드 빵고당 입점', detail: '하남, 고양 외 8개 지점' },
  { text: '롯데 백화점 하나식빵 입점', detail: '롯데백화점 외 20여개 지점' },
  { text: '지하철 역사 내 던베이크', detail: '17여개 지점' },
  { text: '콘트라쎄리에', detail: '30여개 지점' },
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
