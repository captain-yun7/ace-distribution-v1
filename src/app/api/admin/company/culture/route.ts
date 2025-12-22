import { NextRequest, NextResponse } from 'next/server';

import { auth } from '../../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const cultureSchema = z.object({
  type: z.enum(['CULTURE', 'BENEFIT', 'CSR']),
  title: z.string().min(1, '제목을 입력해주세요'),
  desc: z.string().min(1, '설명을 입력해주세요'),
  year: z.string().optional().nullable(),
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

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const where: any = {};
    if (type && ['CULTURE', 'BENEFIT', 'CSR'].includes(type)) {
      where.type = type;
    }

    const culture = await prisma.companyCulture.findMany({
      where,
      orderBy: [
        { type: 'asc' },
        { order: 'asc' }
      ],
    });

    return NextResponse.json(culture);
  } catch (error) {
    console.error('Culture fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch culture' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = cultureSchema.parse(body);

    const newCulture = await prisma.companyCulture.create({
      data: validatedData,
    });

    return NextResponse.json(newCulture, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Culture creation error:', error);
    return NextResponse.json({ error: 'Failed to create culture' }, { status: 500 });
  }
}
