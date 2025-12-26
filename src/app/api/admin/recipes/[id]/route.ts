import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../../auth';
import { prisma } from '@/lib/prisma';

// 개별 레시피 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!recipe) {
      return NextResponse.json({ error: '레시피를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// 레시피 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        categoryId: body.categoryId,
        title: body.title,
        description: body.description,
        content: body.content || null,
        imageUrl: body.imageUrl || null,
        thumbnailUrl: body.thumbnailUrl || null,
        difficulty: body.difficulty || null,
        cookingTime: body.cookingTime || null,
        servings: body.servings || null,
        ingredients: body.ingredients || null,
        steps: body.steps || null,
        tips: body.tips || null,
        isPublished: body.isPublished,
        isFeatured: body.isFeatured,
      },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// 레시피 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await prisma.recipe.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
