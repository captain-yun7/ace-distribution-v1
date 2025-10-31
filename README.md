# 에이스유통 - 공식 웹사이트

에이스유통 주식회사의 공식 웹사이트입니다.

## 기술 스택

- **Framework**: Next.js 15.5 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5
- **Deployment**: Vercel

## 주요 기능

- 회사 소개
- 제품 카탈로그
- 뉴스 및 공지사항
- 문의하기
- 관리자 대시보드
- 사용자 인증 (이메일, Google, Kakao, Naver)

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사하고 필요한 값을 설정합니다:

```bash
cp .env.example .env
```

### 3. 데이터베이스 설정

Prisma 클라이언트를 생성하고 데이터베이스를 초기화합니다:

```bash
npm run db:generate
npm run db:push
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 스크립트

- `npm run dev` - 개발 서버 실행 (Turbopack)
- `npm run build` - 프로덕션 빌드
- `npm start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 실행
- `npm run db:generate` - Prisma 클라이언트 생성
- `npm run db:push` - 데이터베이스 스키마 푸시
- `npm run db:seed` - 데이터베이스 시드 데이터 생성

## 프로젝트 구조

```
ace-distribution-v1/
├── prisma/
│   └── schema.prisma      # 데이터베이스 스키마
├── public/                # 정적 파일
├── src/
│   ├── app/              # Next.js App Router 페이지
│   ├── auth/             # NextAuth 설정
│   ├── components/       # React 컴포넌트
│   ├── hooks/            # Custom React Hooks
│   ├── lib/              # 유틸리티 함수
│   └── types/            # TypeScript 타입 정의
├── .env.example          # 환경 변수 템플릿
├── next.config.ts        # Next.js 설정
├── tailwind.config.ts    # TailwindCSS 설정
└── tsconfig.json         # TypeScript 설정
```

## 데이터베이스 스키마

주요 모델:
- `User` - 사용자 정보
- `ProductCategory` - 제품 카테고리
- `Product` - 제품 정보
- `News` - 뉴스 및 공지사항
- `Inquiry` - 문의사항
- `Banner` - 배너 관리
- `CompanyInfo` - 회사 정보

## 배포

Vercel에 배포하는 것을 권장합니다:

1. GitHub 저장소에 코드를 푸시합니다
2. Vercel에서 프로젝트를 import합니다
3. 환경 변수를 설정합니다
4. 배포합니다

## 라이센스

Copyright © 2024 에이스유통. All rights reserved.
