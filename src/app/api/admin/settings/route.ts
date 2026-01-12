import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';

// 사이트 설정 조회
export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // SiteSetting 테이블에서 설정 조회
    let settings = await prisma.siteSetting.findFirst();

    // 설정이 없으면 기본값 생성
    if (!settings) {
      settings = await prisma.siteSetting.create({
        data: {
          showProductImages: true,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// 사이트 설정 업데이트
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { showProductImages } = body;

    // 기존 설정 찾기
    let settings = await prisma.siteSetting.findFirst();

    if (settings) {
      // 업데이트
      settings = await prisma.siteSetting.update({
        where: { id: settings.id },
        data: {
          showProductImages: showProductImages ?? settings.showProductImages,
        },
      });
    } else {
      // 새로 생성
      settings = await prisma.siteSetting.create({
        data: {
          showProductImages: showProductImages ?? true,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
