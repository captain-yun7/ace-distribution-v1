import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600; // 1시간 캐시

export async function GET() {
  try {
    const clients = await prisma.companyClient.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
