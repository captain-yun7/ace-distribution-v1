import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const downloadUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  fileUrl: z.string().optional(),
  fileSize: z.string().optional().nullable(),
  fileType: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  sortOrder: z.number().optional(),
  isPublished: z.boolean().optional(),
});

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
    const download = await prisma.download.findUnique({ where: { id } });

    if (!download) {
      return NextResponse.json({ error: 'Download not found' }, { status: 404 });
    }

    return NextResponse.json(download);
  } catch (error) {
    console.error('Error fetching download:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
    const validatedData = downloadUpdateSchema.parse(body);

    const download = await prisma.download.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(download);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error updating download:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
    await prisma.download.delete({ where: { id } });

    return NextResponse.json({ message: 'Download deleted successfully' });
  } catch (error) {
    console.error('Error deleting download:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
