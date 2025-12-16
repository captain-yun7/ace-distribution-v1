import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const downloadSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  description: z.string().optional().nullable(),
  fileName: z.string().min(1, '파일명은 필수입니다'),
  fileUrl: z.string().min(1, '파일 URL은 필수입니다'),
  fileSize: z.number().min(0, '파일 크기는 0 이상이어야 합니다'),
  fileType: z.string().min(1, '파일 타입은 필수입니다'),
  categoryId: z.string().min(1, '카테고리는 필수입니다'),
  version: z.string().optional().nullable(),
  requireAuth: z.boolean().optional(),
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
    const categoryId = searchParams.get('categoryId') || '';

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const [downloads, total] = await Promise.all([
      prisma.download.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { category: true },
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

    const download = await prisma.download.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        fileName: validatedData.fileName,
        fileUrl: validatedData.fileUrl,
        fileSize: validatedData.fileSize,
        fileType: validatedData.fileType,
        categoryId: validatedData.categoryId,
        version: validatedData.version,
        requireAuth: validatedData.requireAuth ?? false,
      },
      include: { category: true },
    });

    return NextResponse.json(download, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error creating download:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
