import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const bannerSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  description: z.string().optional().nullable(),
  imageUrl: z.string().min(1, '이미지 URL은 필수입니다'),
  mobileImageUrl: z.string().optional().nullable(),
  linkUrl: z.string().optional().nullable(),
  linkText: z.string().optional().nullable(),
  position: z.enum(['HOME_MAIN', 'HOME_SECONDARY', 'PRODUCTS', 'COMPANY']).optional(),
  order: z.number().optional(),
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
      orderBy: { order: 'asc' },
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

    // Get next order if not provided
    let order = validatedData.order;
    if (order === undefined) {
      const lastBanner = await prisma.banner.findFirst({
        orderBy: { order: 'desc' },
      });
      order = (lastBanner?.order ?? 0) + 1;
    }

    const banner = await prisma.banner.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        imageUrl: validatedData.imageUrl,
        mobileImageUrl: validatedData.mobileImageUrl,
        linkUrl: validatedData.linkUrl,
        linkText: validatedData.linkText,
        position: validatedData.position || 'HOME_MAIN',
        order,
        isActive: validatedData.isActive ?? true,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      },
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
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
    const { banners } = body as { banners: { id: string; order: number }[] };

    await prisma.$transaction(
      banners.map((banner) =>
        prisma.banner.update({
          where: { id: banner.id },
          data: { order: banner.order },
        })
      )
    );

    return NextResponse.json({ message: 'Sort order updated successfully' });
  } catch (error) {
    console.error('Error updating banner sort order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
