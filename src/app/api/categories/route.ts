import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Public categories list
export async function GET() {
  try {
    const categories = await prisma.productCategory.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        displayName: true,
        description: true,
        imageUrl: true,
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
