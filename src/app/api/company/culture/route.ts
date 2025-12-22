import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600; // 1시간 캐시

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const where: any = {
      isPublished: true,
    };

    // 타입 필터 (CULTURE, BENEFIT, CSR)
    if (type && ['CULTURE', 'BENEFIT', 'CSR'].includes(type)) {
      where.type = type;
    }

    const culture = await prisma.companyCulture.findMany({
      where,
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(culture);
  } catch (error) {
    console.error('Error fetching company culture:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
