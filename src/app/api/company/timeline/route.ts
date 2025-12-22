import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600; // 1시간 캐시

export async function GET() {
  try {
    const timeline = await prisma.companyTimeline.findMany({
      where: {
        isPublished: true,
      },
      orderBy: [
        { year: 'desc' },
        { order: 'asc' },
      ],
    });

    return NextResponse.json(timeline);
  } catch (error) {
    console.error('Error fetching timeline:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
