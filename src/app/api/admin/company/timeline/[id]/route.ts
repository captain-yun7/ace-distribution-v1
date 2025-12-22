import { NextRequest, NextResponse } from 'next/server';

import { auth } from '../../../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema
const timelineSchema = z.object({
  year: z.string().min(1, '연도를 입력해주세요'),
  title: z.string().min(1, '제목을 입력해주세요'),
  desc: z.string().min(1, '설명을 입력해주세요'),
  imageUrl: z.string().optional().nullable(),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

// GET - 단일 항목 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const timeline = await prisma.companyTimeline.findUnique({
      where: { id: params.id },
    });

    if (!timeline) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(timeline);
  } catch (error) {
    console.error('Timeline fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch timeline' },
      { status: 500 }
    );
  }
}

// PUT - 항목 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = timelineSchema.parse(body);

    const updatedTimeline = await prisma.companyTimeline.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(updatedTimeline);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Timeline update error:', error);
    return NextResponse.json(
      { error: 'Failed to update timeline' },
      { status: 500 }
    );
  }
}

// DELETE - 항목 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.companyTimeline.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Timeline deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete timeline' },
      { status: 500 }
    );
  }
}
