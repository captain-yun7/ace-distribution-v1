import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// CompanyInfo 스키마는 key-value 구조 (key, title, content, data)
// data JSON에 회사 정보를 저장
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

const COMPANY_INFO_KEY = 'company_basic_info';

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let companyInfo = await prisma.companyInfo.findUnique({
      where: { key: COMPANY_INFO_KEY },
    });

    if (!companyInfo) {
      // Create default company info if not exists
      const defaultData = {
        companyName: '에이스유통',
        ceoName: '안종일',
        businessNumber: '126-86-32865',
        address: '경기도 하남시 샘재로 119번길 31(천현동 392-3)',
        phone: '02-471-1644',
        fax: '02-476-1372',
        email: 'ace32865@hanmail.net',
      };

      companyInfo = await prisma.companyInfo.create({
        data: {
          key: COMPANY_INFO_KEY,
          title: '회사 기본 정보',
          content: '',
          data: defaultData,
        },
      });

      return NextResponse.json(defaultData);
    }

    // data JSON에서 회사 정보 반환
    return NextResponse.json(companyInfo.data || {});
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

    const companyInfo = await prisma.companyInfo.upsert({
      where: { key: COMPANY_INFO_KEY },
      update: {
        data: validatedData,
      },
      create: {
        key: COMPANY_INFO_KEY,
        title: '회사 기본 정보',
        content: '',
        data: validatedData,
      },
    });

    return NextResponse.json(companyInfo.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error updating company info:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
