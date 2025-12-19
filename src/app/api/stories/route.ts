import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: 스토리 목록 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const where = {
      isPublished: true,
      ...(category && category !== 'all' ? { category: category as 'PARTNERSHIP' | 'PRESS' } : {}),
    };

    const [stories, total] = await Promise.all([
      prisma.story.findMany({
        where,
        orderBy: [
          { isFeatured: 'desc' },
          { publishedAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.story.count({ where }),
    ]);

    return NextResponse.json({
      stories,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Stories fetch error:', error);
    return NextResponse.json({ stories: [], pagination: { total: 0, page: 1, limit: 20, totalPages: 0 } });
  }
}

// POST: 스토리 추가
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, description, content, imageUrl, thumbnailUrl, tags, isPublished, isFeatured } = body;

    const story = await prisma.story.create({
      data: {
        title,
        category,
        description,
        content,
        imageUrl,
        thumbnailUrl,
        tags,
        isPublished: isPublished ?? true,
        isFeatured: isFeatured ?? false,
      },
    });

    return NextResponse.json(story);
  } catch (error) {
    console.error('Story create error:', error);
    return NextResponse.json({ error: 'Failed to create story' }, { status: 500 });
  }
}
