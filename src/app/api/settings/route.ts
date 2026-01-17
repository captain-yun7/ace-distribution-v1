import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 공개 API - 사이트 설정 조회 (이미지 표시 여부 등)
export async function GET() {
  try {
    let settings = await prisma.siteSetting.findFirst();

    // 설정이 없으면 기본값 반환
    if (!settings) {
      return NextResponse.json({
        showProductImages: true,
        showRecipeImages: false,
      });
    }

    return NextResponse.json({
      showProductImages: settings.showProductImages,
      showRecipeImages: settings.showRecipeImages,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    // 에러 시에도 기본값 반환
    return NextResponse.json({
      showProductImages: true,
      showRecipeImages: false,
    });
  }
}
