import { NextRequest, NextResponse } from 'next/server';

import { auth } from '../../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const clientSchema = z.object({
  name: z.string().min(1, '고객사명을 입력해주세요'),
  description: z.string().optional().nullable(),
  logoUrl: z.string().optional().nullable(),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const clients = await prisma.companyClient.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(clients);
  } catch (error) {
    console.error('Clients fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = clientSchema.parse(body);

    const newClient = await prisma.companyClient.create({
      data: validatedData,
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Client creation error:', error);
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}
