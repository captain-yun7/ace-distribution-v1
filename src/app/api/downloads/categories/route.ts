import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public API - 다운로드 카테고리 목록
export async function GET() {
  try {
    const categories = await prisma.downloadCategory.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching download categories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
