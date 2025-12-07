import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const newsUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  content: z.string().optional().nullable(),
  excerpt: z.string().optional().nullable(),
  category: z.enum(['PRESS', 'EVENT', 'NOTICE', 'BLOG']).optional(),
  thumbnailUrl: z.string().optional().nullable(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  publishedAt: z.string().optional().nullable(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const news = await prisma.news.findUnique({ where: { id } });

    if (!news) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = newsUpdateSchema.parse(body);

    const updateData: Record<string, unknown> = { ...validatedData };
    if (validatedData.publishedAt) {
      updateData.publishedAt = new Date(validatedData.publishedAt);
    }

    const news = await prisma.news.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(news);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error updating news:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.news.delete({ where: { id } });

    return NextResponse.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
