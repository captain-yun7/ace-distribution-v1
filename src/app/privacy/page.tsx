import { Header, Footer, PageHero } from '@/components/layout';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF6F1]">
        <PageHero
          badge="PRIVACY POLICY"
          title="개인정보처리방침"
          subtitle="에이스유통의 개인정보 보호정책"
          breadcrumb={[
            { name: '개인정보처리방침' }
          ]}
        />

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <div className="bg-gradient-to-br from-[#FAF6F1] to-white rounded-2xl p-8 border border-[#E8DCC8] mb-8">
                <p className="text-[#6B5D53] leading-relaxed">
                  에이스유통주식회사(이하 &apos;회사&apos;)는 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고
                  개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제1조 (개인정보의 처리 목적)</h2>
                  <p className="text-[#6B5D53] leading-relaxed">
                    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                    이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                  </p>
                  <ul className="list-disc list-inside text-[#6B5D53] mt-4 space-y-2">
                    <li>고객 문의 접수 및 처리</li>
                    <li>거래 관련 상담 및 계약 체결</li>
                    <li>서비스 제공에 관한 계약 이행</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제2조 (개인정보의 처리 및 보유기간)</h2>
                  <p className="text-[#6B5D53] leading-relaxed">
                    회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은
                    개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                  </p>
                  <ul className="list-disc list-inside text-[#6B5D53] mt-4 space-y-2">
                    <li>고객 문의 기록: 문의 처리 완료 후 3년</li>
                    <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제3조 (개인정보의 제3자 제공)</h2>
                  <p className="text-[#6B5D53] leading-relaxed">
                    회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며,
                    정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조에 해당하는 경우에만
                    개인정보를 제3자에게 제공합니다.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제4조 (정보주체의 권리·의무 및 행사방법)</h2>
                  <p className="text-[#6B5D53] leading-relaxed">
                    정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
                  </p>
                  <ul className="list-disc list-inside text-[#6B5D53] mt-4 space-y-2">
                    <li>개인정보 열람 요구</li>
                    <li>오류 등이 있을 경우 정정 요구</li>
                    <li>삭제 요구</li>
                    <li>처리정지 요구</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제5조 (개인정보의 안전성 확보조치)</h2>
                  <p className="text-[#6B5D53] leading-relaxed">
                    회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
                  </p>
                  <ul className="list-disc list-inside text-[#6B5D53] mt-4 space-y-2">
                    <li>관리적 조치: 내부관리계획 수립·시행, 직원 정기적 교육</li>
                    <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 보안프로그램 설치</li>
                    <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제6조 (개인정보 보호책임자)</h2>
                  <div className="bg-[#FAF6F1] rounded-xl p-6 mt-4">
                    <p className="text-[#6B5D53]"><strong>개인정보 보호책임자</strong></p>
                    <ul className="text-[#6B5D53] mt-2 space-y-1">
                      <li>담당부서: 관리부</li>
                      <li>연락처: 02-471-1644~6</li>
                      <li>이메일: ace32865@hanmail.net</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#4A4039] mb-4">제7조 (개인정보처리방침의 변경)</h2>
                  <p className="text-[#6B5D53] leading-relaxed">
                    이 개인정보처리방침은 2024년 1월 1일부터 적용됩니다.
                    이전의 개인정보처리방침은 아래에서 확인하실 수 있습니다.
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
