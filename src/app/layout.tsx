import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | 에이스유통',
    default: '에이스유통 - 믿을 수 있는 유통 파트너'
  },
  description: "에이스유통은 고객과 함께 성장하는 신뢰할 수 있는 유통 전문 기업입니다.",
  keywords: ["에이스유통", "유통", "도매", "물류", "상품공급", "B2B"],
  authors: [{ name: "에이스유통" }],
  creator: "에이스유통",
  publisher: "에이스유통",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: '에이스유통 - 믿을 수 있는 유통 파트너',
    description: '에이스유통은 고객과 함께 성장하는 신뢰할 수 있는 유통 전문 기업입니다.',
    url: '/',
    siteName: '에이스유통',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: '에이스유통 로고',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '에이스유통 - 믿을 수 있는 유통 파트너',
    description: '에이스유통은 고객과 함께 성장하는 신뢰할 수 있는 유통 전문 기업입니다.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
