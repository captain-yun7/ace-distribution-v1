import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const trendSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  category: z.string().min(1, '카테고리는 필수입니다'),
  description: z.string().min(1, '설명은 필수입니다'),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  thumbnailUrl: z.string().optional().nullable(),
  tags: z.any().optional().nullable(),
  order: z.number().optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  publishedAt: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: Record<string, unknown> = {};
    if (category) {
      where.category = category;
    }

    const [trends, total] = await Promise.all([
      prisma.trend.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.trend.count({ where }),
    ]);

    return NextResponse.json({
      trends,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Error fetching trends:', error);
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
    const validatedData = trendSchema.parse(body);

    const trend = await prisma.trend.create({
      data: {
        title: validatedData.title,
        category: validatedData.category,
        description: validatedData.description,
        content: validatedData.content,
        imageUrl: validatedData.imageUrl,
        thumbnailUrl: validatedData.thumbnailUrl,
        tags: validatedData.tags,
        order: validatedData.order ?? 0,
        isPublished: validatedData.isPublished ?? true,
        isFeatured: validatedData.isFeatured ?? false,
        publishedAt: validatedData.publishedAt ? new Date(validatedData.publishedAt) : new Date(),
      },
    });

    return NextResponse.json(trend, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error creating trend:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
