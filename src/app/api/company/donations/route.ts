import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600; // 1시간 캐시

export async function GET() {
  try {
    const donations = await prisma.companyDonation.findMany({
      orderBy: [
        { year: 'desc' },
        { order: 'asc' },
      ],
    });

    return NextResponse.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
