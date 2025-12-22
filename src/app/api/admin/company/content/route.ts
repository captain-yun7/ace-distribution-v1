import { NextRequest, NextResponse } from 'next/server';

import { auth } from '../../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const contentSchema = z.object({
  key: z.string().min(1, 'Key를 입력해주세요'),
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().optional(),
  data: z.any().optional(), // JSON 데이터
});

// GET - key로 조회
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json({ error: 'Key parameter is required' }, { status: 400 });
    }

    const content = await prisma.companyInfo.findUnique({
      where: { key },
    });

    if (!content) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Content fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

// PUT - 컨텐츠 업데이트 (key로 upsert)
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = contentSchema.parse(body);

    const updatedContent = await prisma.companyInfo.upsert({
      where: { key: validatedData.key },
      update: {
        title: validatedData.title,
        content: validatedData.content || '',
        data: validatedData.data || {},
      },
      create: {
        key: validatedData.key,
        title: validatedData.title,
        content: validatedData.content || '',
        data: validatedData.data || {},
      },
    });

    return NextResponse.json(updatedContent);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Content update error:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
