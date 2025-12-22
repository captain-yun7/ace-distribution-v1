import { NextRequest, NextResponse } from 'next/server';

import { auth } from '../../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const coreValueSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  subtitle: z.string().min(1, '서브타이틀을 입력해주세요'),
  description: z.string().min(1, '설명을 입력해주세요'),
  imageUrl: z.string().optional().nullable(),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const coreValues = await prisma.companyCoreValue.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(coreValues);
  } catch (error) {
    console.error('Core values fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch core values' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = coreValueSchema.parse(body);

    const newCoreValue = await prisma.companyCoreValue.create({
      data: validatedData,
    });

    return NextResponse.json(newCoreValue, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Core value creation error:', error);
    return NextResponse.json({ error: 'Failed to create core value' }, { status: 500 });
  }
}
