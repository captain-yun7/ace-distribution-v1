import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '제품 소개 | 베이커리 카페 원재료',
  description: '에이스유통의 프리미엄 베이커리·카페 원재료를 만나보세요. 베이킹 생지, 제과제빵 재료, 카페 원재료를 전국 당일/익일 배송합니다.',
  keywords: ['베이커리 원재료', '카페 원재료', '베이킹 생지', '제과제빵 재료', '베이커리 납품', '카페 납품업체'],
  openGraph: {
    title: '제품 소개 | 에이스유통 - 베이커리 카페 원재료',
    description: '프리미엄 베이커리·카페 원재료. 베이킹 생지, 제과제빵 재료 전국 배송.',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
