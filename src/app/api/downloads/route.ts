import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public API - 자료실 목록 조회
export async function GET() {
  try {
    const categories = await prisma.downloadCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        downloads: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching downloads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
