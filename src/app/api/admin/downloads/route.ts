import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const downloadSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  description: z.string().optional(),
  fileUrl: z.string().min(1, '파일 URL은 필수입니다'),
  fileSize: z.string().optional(),
  fileType: z.string().optional(),
  category: z.string().optional(),
  sortOrder: z.number().optional(),
  isPublished: z.boolean().optional(),
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
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = category;
    }

    const [downloads, total] = await Promise.all([
      prisma.download.findMany({
        where,
        orderBy: { sortOrder: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.download.count({ where }),
    ]);

    return NextResponse.json({
      downloads,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Error fetching downloads:', error);
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
    const validatedData = downloadSchema.parse(body);

    // Get next sortOrder if not provided
    let sortOrder = validatedData.sortOrder;
    if (sortOrder === undefined) {
      const lastDownload = await prisma.download.findFirst({
        orderBy: { sortOrder: 'desc' },
      });
      sortOrder = (lastDownload?.sortOrder ?? 0) + 1;
    }

    const download = await prisma.download.create({
      data: {
        ...validatedData,
        sortOrder,
      },
    });

    return NextResponse.json(download, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating download:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
