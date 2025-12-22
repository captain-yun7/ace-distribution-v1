import { NextRequest, NextResponse } from 'next/server';

import { auth } from '../../../../../../../auth';
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const culture = await prisma.companyCulture.findUnique({
      where: { id: params.id },
    });

    if (!culture) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(culture);
  } catch (error) {
    console.error('Culture fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch culture' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = cultureSchema.parse(body);

    const updatedCulture = await prisma.companyCulture.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(updatedCulture);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Culture update error:', error);
    return NextResponse.json({ error: 'Failed to update culture' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.companyCulture.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Culture deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete culture' }, { status: 500 });
  }
}
