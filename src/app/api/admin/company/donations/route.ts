import { NextRequest, NextResponse } from 'next/server';

import { auth } from '../../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const donationSchema = z.object({
  year: z.string().min(1, '연도를 입력해주세요'),
  amount: z.string().min(1, '금액을 입력해주세요'),
  desc: z.string().min(1, '설명을 입력해주세요'),
  order: z.number().int().default(0),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const donations = await prisma.companyDonation.findMany({
      orderBy: [
        { year: 'desc' },
        { order: 'asc' }
      ],
    });

    return NextResponse.json(donations);
  } catch (error) {
    console.error('Donations fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = donationSchema.parse(body);

    const newDonation = await prisma.companyDonation.create({
      data: validatedData,
    });

    return NextResponse.json(newDonation, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Donation creation error:', error);
    return NextResponse.json({ error: 'Failed to create donation' }, { status: 500 });
  }
}
