import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Public products list
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    const where: Record<string, unknown> = { isPublished: true };

    if (category) {
      where.category = { name: category };
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { order: 'asc' },
      take: limit ? parseInt(limit) : undefined,
      select: {
        id: true,
        name: true,
        code: true,
        description: true,
        brand: true,
        manufacturer: true,
        origin: true,
        specs: true,
        features: true,
        imageUrl: true,
        thumbnailUrl: true,
        isFeatured: true,
        category: {
          select: {
            id: true,
            name: true,
            displayName: true,
          },
        },
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
