import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600; // 1시간 캐시

export async function GET() {
  try {
    const coreValues = await prisma.companyCoreValue.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(coreValues);
  } catch (error) {
    console.error('Error fetching core values:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
