import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const bannerSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  subtitle: z.string().optional(),
  imageUrl: z.string().min(1, '이미지 URL은 필수입니다'),
  linkUrl: z.string().optional(),
  sortOrder: z.number().optional(),
  isActive: z.boolean().optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');

    const where: Record<string, unknown> = {};

    if (isActive !== null && isActive !== '') {
      where.isActive = isActive === 'true';
    }

    const banners = await prisma.banner.findMany({
      where,
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({ banners });
  } catch (error) {
    console.error('Error fetching banners:', error);
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
    const validatedData = bannerSchema.parse(body);

    // Get next sortOrder if not provided
    let sortOrder = validatedData.sortOrder;
    if (sortOrder === undefined) {
      const lastBanner = await prisma.banner.findFirst({
        orderBy: { sortOrder: 'desc' },
      });
      sortOrder = (lastBanner?.sortOrder ?? 0) + 1;
    }

    const banner = await prisma.banner.create({
      data: {
        ...validatedData,
        sortOrder,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      },
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating banner:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT for bulk sort order update
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { banners } = body as { banners: { id: string; sortOrder: number }[] };

    await prisma.$transaction(
      banners.map((banner) =>
        prisma.banner.update({
          where: { id: banner.id },
          data: { sortOrder: banner.sortOrder },
        })
      )
    );

    return NextResponse.json({ message: 'Sort order updated successfully' });
  } catch (error) {
    console.error('Error updating banner sort order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
