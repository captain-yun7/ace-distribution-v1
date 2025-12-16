import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, '제품명은 필수입니다'),
  code: z.string().min(1, '제품코드는 필수입니다'),
  categoryId: z.string().min(1, '카테고리는 필수입니다'),
  description: z.string().min(1, '설명은 필수입니다'),
  brand: z.string().optional().nullable(),
  manufacturer: z.string().optional().nullable(),
  origin: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  specs: z.any().optional().nullable(),
  features: z.any().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  thumbnailUrl: z.string().optional().nullable(),
  images: z.any().optional().nullable(),
  brochureUrl: z.string().optional().nullable(),
  order: z.number().optional(),
  stock: z.number().optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

// GET - List products
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
    const isPublished = searchParams.get('isPublished');

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (isPublished !== null && isPublished !== '') {
      where.isPublished = isPublished === 'true';
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: {
            select: { id: true, name: true, displayName: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create product
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = productSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        name: validatedData.name,
        code: validatedData.code,
        categoryId: validatedData.categoryId,
        description: validatedData.description,
        brand: validatedData.brand,
        manufacturer: validatedData.manufacturer,
        origin: validatedData.origin,
        price: validatedData.price,
        specs: validatedData.specs,
        features: validatedData.features,
        imageUrl: validatedData.imageUrl,
        thumbnailUrl: validatedData.thumbnailUrl,
        images: validatedData.images,
        brochureUrl: validatedData.brochureUrl,
        order: validatedData.order ?? 0,
        stock: validatedData.stock ?? 0,
        isPublished: validatedData.isPublished ?? true,
        isFeatured: validatedData.isFeatured ?? false,
      },
      include: {
        category: {
          select: { id: true, name: true, displayName: true },
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
