import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public API - 개별 뉴스 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const news = await prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }

    // 조회수 증가
    await prisma.news.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
