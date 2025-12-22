import { NextRequest, NextResponse } from 'next/server';

import { auth } from '../../../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const donationSchema = z.object({
  year: z.string().min(1, '연도를 입력해주세요'),
  amount: z.string().min(1, '금액을 입력해주세요'),
  desc: z.string().min(1, '설명을 입력해주세요'),
  order: z.number().int().default(0),
});

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const donation = await prisma.companyDonation.findUnique({
      where: { id: params.id },
    });

    if (!donation) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(donation);
  } catch (error) {
    console.error('Donation fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch donation' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = donationSchema.parse(body);

    const updatedDonation = await prisma.companyDonation.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(updatedDonation);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Donation update error:', error);
    return NextResponse.json({ error: 'Failed to update donation' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.companyDonation.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Donation deletion error:', error);
    return NextResponse.json({ error: 'Failed to delete donation' }, { status: 500 });
  }
}
