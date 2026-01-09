import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회사 소개',
  description: '에이스유통주식회사는 2010년 설립된 베이커리·카페 원재료 유통 전문기업입니다. 16년의 경력과 우수기술기업 인증으로 신뢰할 수 있는 납품업체입니다.',
  keywords: ['에이스유통', '회사소개', '베이커리 납품업체', '카페 원재료 유통', '우수기술기업'],
  openGraph: {
    title: '회사 소개 | 에이스유통 - 베이커리 카페 원재료 유통 전문',
    description: '2010년 설립, 16년 경력의 베이커리·카페 원재료 유통 전문기업.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
