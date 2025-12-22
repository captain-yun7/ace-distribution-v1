import { NextRequest, NextResponse } from 'next/server';

import { auth } from '../../../../../../auth';
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

// GET - 전체 목록 조회
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const timeline = await prisma.companyTimeline.findMany({
      orderBy: [
        { year: 'desc' },
        { order: 'asc' }
      ],
    });

    return NextResponse.json(timeline);
  } catch (error) {
    console.error('Timeline fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch timeline' },
      { status: 500 }
    );
  }
}

// POST - 새 항목 생성
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = timelineSchema.parse(body);

    const newTimeline = await prisma.companyTimeline.create({
      data: validatedData,
    });

    return NextResponse.json(newTimeline, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Timeline creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create timeline' },
      { status: 500 }
    );
  }
}
