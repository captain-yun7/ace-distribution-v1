import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const recipeSchema = z.object({
  categoryId: z.string().min(1, '카테고리는 필수입니다'),
  title: z.string().min(1, '제목은 필수입니다'),
  description: z.string().min(1, '설명은 필수입니다'),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  thumbnailUrl: z.string().optional().nullable(),
  difficulty: z.string().optional().nullable(),
  cookingTime: z.string().optional().nullable(),
  servings: z.string().optional().nullable(),
  ingredients: z.any().optional().nullable(),
  steps: z.any().optional().nullable(),
  tips: z.string().optional().nullable(),
  order: z.number().optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: Record<string, unknown> = {};
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const [recipes, total] = await Promise.all([
      prisma.recipe.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: { select: { id: true, name: true } },
        },
      }),
      prisma.recipe.count({ where }),
    ]);

    return NextResponse.json({
      recipes,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
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
    const validatedData = recipeSchema.parse(body);

    const recipe = await prisma.recipe.create({
      data: {
        categoryId: validatedData.categoryId,
        title: validatedData.title,
        description: validatedData.description,
        content: validatedData.content,
        imageUrl: validatedData.imageUrl,
        thumbnailUrl: validatedData.thumbnailUrl,
        difficulty: validatedData.difficulty,
        cookingTime: validatedData.cookingTime,
        servings: validatedData.servings,
        ingredients: validatedData.ingredients,
        steps: validatedData.steps,
        tips: validatedData.tips,
        order: validatedData.order ?? 0,
        isPublished: validatedData.isPublished ?? true,
        isFeatured: validatedData.isFeatured ?? false,
      },
      include: {
        category: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error creating recipe:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
