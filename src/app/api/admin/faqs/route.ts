import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const faqSchema = z.object({
  categoryId: z.string().min(1, '카테고리는 필수입니다'),
  question: z.string().min(1, '질문은 필수입니다'),
  answer: z.string().min(1, '답변은 필수입니다'),
  order: z.number().optional(),
  isPublished: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    const where: Record<string, unknown> = {};
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const faqs = await prisma.faq.findMany({
      where,
      orderBy: { order: 'asc' },
      include: {
        category: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = faqSchema.parse(body);

    const faq = await prisma.faq.create({
      data: {
        categoryId: validatedData.categoryId,
        question: validatedData.question,
        answer: validatedData.answer,
        order: validatedData.order ?? 0,
        isPublished: validatedData.isPublished ?? true,
      },
      include: {
        category: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
