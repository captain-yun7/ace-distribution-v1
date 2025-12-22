import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600; // 1시간 캐시

export async function GET() {
  try {
    const certificates = await prisma.companyCertificate.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
