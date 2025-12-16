import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const newsSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  content: z.string().min(1, '내용은 필수입니다'),
  excerpt: z.string().optional().nullable(),
  category: z.enum(['PRESS_RELEASE', 'EVENT', 'NOTICE', 'BLOG']),
  thumbnailUrl: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  isPinned: z.boolean().optional(),
  publishedAt: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = category;
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.news.count({ where }),
    ]);

    return NextResponse.json({
      news,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
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
    const validatedData = newsSchema.parse(body);

    const news = await prisma.news.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        excerpt: validatedData.excerpt,
        category: validatedData.category,
        thumbnailUrl: validatedData.thumbnailUrl,
        imageUrl: validatedData.imageUrl,
        author: validatedData.author,
        isPinned: validatedData.isPinned ?? false,
        publishedAt: validatedData.publishedAt ? new Date(validatedData.publishedAt) : new Date(),
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error creating news:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
