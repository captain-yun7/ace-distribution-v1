import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | 에이스유통 - 베이커리 카페 원재료 유통 전문',
    default: '에이스유통 | 베이커리 카페 원재료 유통 · 납품업체 · 제과제빵 재료 도소매'
  },
  description: "에이스유통은 베이커리·카페 원재료 유통 전문기업입니다. 제과제빵 재료 도소매, 베이킹 생지, 프리미엄 원재료를 전국 당일/익일 배송합니다. 16년 경력의 신뢰할 수 있는 베이커리 카페 납품업체.",
  keywords: [
    "에이스유통",
    "베이커리 카페 원재료 유통",
    "베이커리 카페 납품업체",
    "제과제빵 재료 도소매",
    "베이킹 생지",
    "베이커리 재료",
    "카페 원재료",
    "제빵 재료 납품",
    "베이킹 재료 도매",
    "베이커리 납품",
    "카페 납품업체",
    "제과 재료",
    "빵 재료 유통",
    "디저트 재료",
    "프리미엄 베이킹 재료"
  ],
  authors: [{ name: "에이스유통주식회사" }],
  creator: "에이스유통주식회사",
  publisher: "에이스유통주식회사",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ace-distribution.co.kr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '에이스유통 | 베이커리 카페 원재료 유통 전문기업',
    description: '베이커리·카페 원재료 유통 전문. 제과제빵 재료 도소매, 베이킹 생지, 프리미엄 원재료 전국 배송. 16년 경력의 신뢰할 수 있는 납품업체.',
    url: '/',
    siteName: '에이스유통',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '에이스유통 - 베이커리 카페 원재료 유통 전문기업',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '에이스유통 | 베이커리 카페 원재료 유통 전문',
    description: '베이커리·카페 원재료 유통 전문. 제과제빵 재료 도소매, 베이킹 생지, 프리미엄 원재료 전국 배송.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Google Search Console 인증 코드
    // naver: 'YOUR_NAVER_VERIFICATION_CODE', // 네이버 웹마스터 도구 인증 코드
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// JSON-LD 구조화 데이터
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://ace-distribution.co.kr/#organization',
      name: '에이스유통주식회사',
      alternateName: ['에이스유통', 'ACE Distribution'],
      url: 'https://ace-distribution.co.kr',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ace-distribution.co.kr/logo.png',
        width: 200,
        height: 60,
      },
      description: '베이커리·카페 원재료 유통 전문기업. 제과제빵 재료 도소매, 베이킹 생지, 프리미엄 원재료 전국 배송.',
      foundingDate: '2010',
      founder: {
        '@type': 'Person',
        name: '안종일',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '샘재로 119번길 31 (천현동 392-3)',
        addressLocality: '하남시',
        addressRegion: '경기도',
        postalCode: '12918',
        addressCountry: 'KR',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+82-2-471-1644',
        contactType: 'customer service',
        availableLanguage: 'Korean',
      },
      sameAs: [],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://ace-distribution.co.kr/#localbusiness',
      name: '에이스유통',
      image: 'https://ace-distribution.co.kr/og-image.png',
      description: '베이커리 카페 원재료 유통, 제과제빵 재료 도소매, 베이킹 생지 전문 납품업체',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '샘재로 119번길 31',
        addressLocality: '하남시',
        addressRegion: '경기도',
        postalCode: '12918',
        addressCountry: 'KR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 37.5449,
        longitude: 127.2066,
      },
      telephone: '02-471-1644',
      faxNumber: '02-476-1372',
      email: 'ace32865@hanmail.net',
      url: 'https://ace-distribution.co.kr',
      priceRange: '$$',
      openingHours: 'Mo-Fr 09:00-18:00',
      areaServed: {
        '@type': 'Country',
        name: 'South Korea',
      },
      serviceType: ['베이커리 원재료 유통', '카페 납품', '제과제빵 재료 도소매', '베이킹 생지'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://ace-distribution.co.kr/#website',
      url: 'https://ace-distribution.co.kr',
      name: '에이스유통',
      description: '베이커리 카페 원재료 유통 전문기업',
      publisher: {
        '@id': 'https://ace-distribution.co.kr/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://ace-distribution.co.kr/products?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* 네이버 웹마스터 도구 인증 - 발급받은 후 아래 코드 활성화 */}
        {/* <meta name="naver-site-verification" content="YOUR_NAVER_CODE" /> */}
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
