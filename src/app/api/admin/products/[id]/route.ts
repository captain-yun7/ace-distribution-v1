import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const productUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  code: z.string().optional(),
  categoryId: z.string().optional(),
  description: z.string().optional(),
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

// GET - Get single product
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

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true, displayName: true },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update product
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
    const validatedData = productUpdateSchema.parse(body);

    // Filter out undefined values
    const updateData: Record<string, unknown> = {};
    Object.entries(validatedData).forEach(([key, value]) => {
      if (value !== undefined) {
        updateData[key] = value;
      }
    });

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: {
          select: { id: true, name: true, displayName: true },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete product
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

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
