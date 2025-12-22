import { NextRequest, NextResponse } from 'next/server';

import { auth } from '../../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const certificateSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  description: z.string().min(1, '설명을 입력해주세요'),
  date: z.string().min(1, '취득일을 입력해주세요'),
  imageUrl: z.string().min(1, '이미지를 업로드해주세요'),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const certificates = await prisma.companyCertificate.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(certificates);
  } catch (error) {
    console.error('Certificates fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = certificateSchema.parse(body);

    const newCertificate = await prisma.companyCertificate.create({
      data: validatedData,
    });

    return NextResponse.json(newCertificate, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Certificate creation error:', error);
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
  }
}
