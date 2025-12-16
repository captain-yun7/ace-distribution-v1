import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public API - 트렌드 리포트 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: Record<string, unknown> = {
      isPublished: true,
    };

    if (category) {
      where.category = category;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    const trends = await prisma.trend.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });

    return NextResponse.json(trends);
  } catch (error) {
    console.error('Error fetching trends:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
