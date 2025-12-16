import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public API - 레시피 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: Record<string, unknown> = {
      isPublished: true,
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    const [recipes, categories] = await Promise.all([
      prisma.recipe.findMany({
        where,
        orderBy: { order: 'asc' },
        take: limit,
        include: {
          category: {
            select: { id: true, name: true },
          },
        },
      }),
      prisma.recipeCategory.findMany({
        orderBy: { order: 'asc' },
      }),
    ]);

    return NextResponse.json({ recipes, categories });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
