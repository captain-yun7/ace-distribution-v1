import { NextRequest, NextResponse } from 'next/server';

import { auth } from '../../../../../../../auth';
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const coreValue = await prisma.companyCoreValue.findUnique({
      where: { id: params.id },
    });

    if (!coreValue) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(coreValue);
  } catch (error) {
    console.error('Core value fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch core value' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = coreValueSchema.parse(body);

    const updatedCoreValue = await prisma.companyCoreValue.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(updatedCoreValue);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Core value update error:', error);
    return NextResponse.json({ error: 'Failed to update core value' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.companyCoreValue.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Core value deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete core value' }, { status: 500 });
  }
}
