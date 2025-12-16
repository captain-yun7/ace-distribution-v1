import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1, '카테고리명은 필수입니다'),
  order: z.number().optional(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const categories = await prisma.faqCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: { select: { faqs: true } },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching FAQ categories:', error);
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
    const validatedData = categorySchema.parse(body);

    const category = await prisma.faqCategory.create({
      data: {
        name: validatedData.name,
        order: validatedData.order ?? 0,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error creating FAQ category:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
