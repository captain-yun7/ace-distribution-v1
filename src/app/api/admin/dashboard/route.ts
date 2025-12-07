import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [
      productCount,
      categoryCount,
      newsCount,
      inquiryCount,
      pendingInquiryCount,
      bannerCount,
      recentInquiries,
      recentNews,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.productCategory.count(),
      prisma.news.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'PENDING' } }),
      prisma.banner.count({ where: { isActive: true } }),
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          company: true,
          type: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.news.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          category: true,
          isPinned: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        productCount,
        categoryCount,
        newsCount,
        inquiryCount,
        pendingInquiryCount,
        bannerCount,
      },
      recentInquiries,
      recentNews,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
