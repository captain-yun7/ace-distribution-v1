import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public API - FAQ 목록 조회
export async function GET() {
  try {
    const categories = await prisma.faqCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        faqs: {
          where: { isPublished: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
