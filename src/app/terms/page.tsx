import { Header, Footer, PageHero } from '@/components/layout';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="TERMS OF SERVICE"
          title="이용약관"
          subtitle="에이스유통 웹사이트 이용약관"
          breadcrumb={[
            { name: '이용약관' }
          ]}
        />

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl p-8 border border-[#E8DCC8] mb-8">
                <p className="text-[#6B5D53] leading-relaxed">
                  본 이용약관은 에이스유통주식회사(이하 &apos;회사&apos;)가 운영하는 웹사이트(이하 &apos;사이트&apos;)에서
                  제공하는 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제1조 (목적)</h2>
                  <p className="text-[#6B5D53] leading-relaxed">
                    이 약관은 회사가 운영하는 사이트에서 제공하는 인터넷 관련 서비스(이하 &apos;서비스&apos;)를 이용함에 있어
                    회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제2조 (정의)</h2>
                  <ul className="list-disc list-inside text-[#6B5D53] space-y-2">
                    <li>&apos;사이트&apos;란 회사가 서비스를 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여
                        설정한 가상의 영업장을 말합니다.</li>
                    <li>&apos;이용자&apos;란 사이트에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 받는 자를 말합니다.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제3조 (약관의 게시와 개정)</h2>
                  <ul className="list-decimal list-inside text-[#6B5D53] space-y-2">
                    <li>회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 사이트의 초기 화면에 게시합니다.</li>
                    <li>회사는 약관의 규제에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망 이용촉진 등에 관한 법률 등
                        관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
                    <li>회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께
                        사이트의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제4조 (서비스의 제공 및 변경)</h2>
                  <p className="text-[#6B5D53] leading-relaxed mb-4">
                    회사는 다음과 같은 서비스를 제공합니다.
                  </p>
                  <ul className="list-disc list-inside text-[#6B5D53] space-y-2">
                    <li>회사 및 제품 정보 제공</li>
                    <li>고객 문의 접수 및 상담</li>
                    <li>기타 회사가 정하는 서비스</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제5조 (서비스의 중단)</h2>
                  <p className="text-[#6B5D53] leading-relaxed">
                    회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는
                    서비스의 제공을 일시적으로 중단할 수 있습니다.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제6조 (이용자의 의무)</h2>
                  <p className="text-[#6B5D53] leading-relaxed mb-4">
                    이용자는 다음 행위를 하여서는 안 됩니다.
                  </p>
                  <ul className="list-disc list-inside text-[#6B5D53] space-y-2">
                    <li>신청 또는 변경 시 허위 내용의 등록</li>
                    <li>타인의 정보 도용</li>
                    <li>회사에 게시된 정보의 변경</li>
                    <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                    <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                    <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제7조 (저작권의 귀속 및 이용제한)</h2>
                  <ul className="list-decimal list-inside text-[#6B5D53] space-y-2">
                    <li>회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</li>
                    <li>이용자는 사이트를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송
                        기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제8조 (분쟁해결)</h2>
                  <p className="text-[#6B5D53] leading-relaxed">
                    회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여
                    피해보상처리기구를 설치·운영합니다. 회사와 이용자 간에 발생한 분쟁은 전자거래기본법 제28조 및
                    동 시행령 제15조에 의하여 설치된 전자거래분쟁조정위원회의 조정에 따를 수 있습니다.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">부칙</h2>
                  <p className="text-[#6B5D53] leading-relaxed">
                    이 약관은 2024년 1월 1일부터 시행합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
