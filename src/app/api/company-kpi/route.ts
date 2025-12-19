import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: KPI 목록 조회
export async function GET() {
  try {
    // CompanyKPI 테이블이 있는지 확인하고, 없으면 기본값 반환
    const kpiData = await prisma.companyKPI.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(kpiData);
  } catch (error) {
    // 테이블이 없는 경우 빈 배열 반환
    console.error('KPI fetch error:', error);
    return NextResponse.json([]);
  }
}

// POST: KPI 추가/수정
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, value, label, order } = body;

    const kpi = await prisma.companyKPI.upsert({
      where: { key },
      update: { value, label, order },
      create: { key, value, label, order: order || 0 },
    });

    return NextResponse.json(kpi);
  } catch (error) {
    console.error('KPI save error:', error);
    return NextResponse.json({ error: 'Failed to save KPI' }, { status: 500 });
  }
}
