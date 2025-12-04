import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const companyInfoSchema = z.object({
  companyName: z.string().optional(),
  ceoName: z.string().optional(),
  businessNumber: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().optional(),
  workingHours: z.string().optional(),
  establishedYear: z.string().optional(),
  employeeCount: z.string().optional(),
  description: z.string().optional(),
  vision: z.string().optional(),
  mission: z.string().optional(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let companyInfo = await prisma.companyInfo.findFirst();

    if (!companyInfo) {
      // Create default company info if not exists
      companyInfo = await prisma.companyInfo.create({
        data: {
          companyName: '에이스유통',
          ceoName: '',
          businessNumber: '',
          address: '',
          phone: '',
          email: '',
        },
      });
    }

    return NextResponse.json(companyInfo);
  } catch (error) {
    console.error('Error fetching company info:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = companyInfoSchema.parse(body);

    let companyInfo = await prisma.companyInfo.findFirst();

    if (companyInfo) {
      companyInfo = await prisma.companyInfo.update({
        where: { id: companyInfo.id },
        data: validatedData,
      });
    } else {
      companyInfo = await prisma.companyInfo.create({
        data: {
          companyName: validatedData.companyName || '에이스유통',
          ...validatedData,
        },
      });
    }

    return NextResponse.json(companyInfo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error updating company info:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
