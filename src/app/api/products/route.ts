import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public API - 제품 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const categoryName = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');

    const where: Record<string, unknown> = {
      isPublished: true,
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (categoryName) {
      where.category = {
        name: categoryName,
      };
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { order: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              displayName: true,
            },
          },
        },
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
