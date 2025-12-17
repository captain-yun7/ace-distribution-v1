import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1, '카테고리명은 필수입니다'),
  displayName: z.string().min(1, '표시명은 필수입니다'),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  order: z.number().optional(),
  isPublished: z.boolean().optional(),
});

// GET - List categories
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const categories = await prisma.productCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    // 프론트엔드가 기대하는 형식으로 변환 (sortOrder 필드 추가)
    const formattedCategories = categories.map(cat => ({
      ...cat,
      sortOrder: cat.order,
    }));

    return NextResponse.json({ categories: formattedCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create category
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = categorySchema.parse(body);

    // Get max order
    const maxOrder = await prisma.productCategory.aggregate({
      _max: { order: true },
    });

    const category = await prisma.productCategory.create({
      data: {
        ...validatedData,
        order: validatedData.order ?? (maxOrder._max.order ?? 0) + 1,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update sort order (bulk)
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { categories } = body as { categories: { id: string; order: number }[] };

    await prisma.$transaction(
      categories.map((cat) =>
        prisma.productCategory.update({
          where: { id: cat.id },
          data: { order: cat.order },
        })
      )
    );

    return NextResponse.json({ message: 'Sort order updated successfully' });
  } catch (error) {
    console.error('Error updating sort order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
