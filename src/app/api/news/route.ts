import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public API - 뉴스 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');

    const where: Record<string, unknown> = {};

    if (category) {
      where.category = category;
    }

    if (featured === 'true') {
      where.isPinned = true;
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        orderBy: [
          { isPinned: 'desc' },
          { publishedAt: 'desc' },
        ],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.news.count({ where }),
    ]);

    return NextResponse.json({
      news,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
