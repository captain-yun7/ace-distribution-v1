import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '고객지원',
  description: '에이스유통 고객지원 센터입니다. 베이커리·카페 무료 창업컨설팅, 제품 문의, 거래 문의를 받습니다. 02-471-1644',
  keywords: ['에이스유통 문의', '베이커리 창업컨설팅', '카페 창업 상담', '베이커리 납품 문의'],
  openGraph: {
    title: '고객지원 | 에이스유통',
    description: '베이커리·카페 무료 창업컨설팅 및 제품 문의. 02-471-1644',
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
