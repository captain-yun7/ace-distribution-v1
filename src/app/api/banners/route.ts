import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 공개 API - 활성화된 배너만 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position') || 'HOME_MAIN';

    const now = new Date();

    const banners = await prisma.banner.findMany({
      where: {
        isActive: true,
        position: position as 'HOME_MAIN' | 'HOME_SECONDARY' | 'PRODUCTS' | 'COMPANY',
        OR: [
          // 시작일/종료일이 없는 경우
          {
            startDate: null,
            endDate: null,
          },
          // 시작일만 있는 경우
          {
            startDate: { lte: now },
            endDate: null,
          },
          // 종료일만 있는 경우
          {
            startDate: null,
            endDate: { gte: now },
          },
          // 둘 다 있는 경우
          {
            startDate: { lte: now },
            endDate: { gte: now },
          },
        ],
      },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        mobileImageUrl: true,
        linkUrl: true,
        linkText: true,
        order: true,
      },
    });

    return NextResponse.json({ banners });
  } catch (error) {
    console.error('Error fetching banners:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
