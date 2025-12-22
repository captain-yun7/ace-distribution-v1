import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

// Lazy initialization to avoid build-time errors
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

const INQUIRY_TYPE_MAP: Record<string, 'PRODUCT' | 'PURCHASE' | 'PARTNERSHIP' | 'SUPPORT' | 'OTHER'> = {
  '일반문의': 'OTHER',
  '거래문의': 'PURCHASE',
  '제품문의': 'PRODUCT',
  '배송문의': 'SUPPORT',
  '기타': 'OTHER',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, company, name, email, phone, message } = body;

    // Validation
    if (!name || !email || !message || !type) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // Save to database
    const inquiry = await prisma.inquiry.create({
      data: {
        type: INQUIRY_TYPE_MAP[type] || 'OTHER',
        name,
        email,
        phone: phone || null,
        company: company || null,
        subject: `[${type}] ${name}님의 문의`,
        message,
        status: 'PENDING',
      },
    });

    // Send email notification
    const resend = getResendClient();
    const adminEmail = process.env.ADMIN_EMAIL || 'ace32865@hanmail.net';
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    try {
      if (!resend) {
        console.log('Resend API key not configured, skipping email notification');
        throw new Error('Resend not configured');
      }

      // Send to admin
      await resend.emails.send({
        from: `에이스유통 문의접수 <${fromEmail}>`,
        to: adminEmail,
        subject: `[에이스유통] 새로운 ${type} 접수 - ${name}님`,
        html: `
          <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #B8956A; border-bottom: 2px solid #B8956A; padding-bottom: 10px;">
              새로운 고객 문의가 접수되었습니다
            </h2>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px; background: #FAF6F1; font-weight: bold; width: 120px;">문의 유형</td>
                <td style="padding: 10px; border: 1px solid #E8DCC8;">${type}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #FAF6F1; font-weight: bold;">성함</td>
                <td style="padding: 10px; border: 1px solid #E8DCC8;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #FAF6F1; font-weight: bold;">이메일</td>
                <td style="padding: 10px; border: 1px solid #E8DCC8;">
                  <a href="mailto:${email}">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px; background: #FAF6F1; font-weight: bold;">연락처</td>
                <td style="padding: 10px; border: 1px solid #E8DCC8;">${phone}</td>
              </tr>
              ` : ''}
              ${company ? `
              <tr>
                <td style="padding: 10px; background: #FAF6F1; font-weight: bold;">업체명</td>
                <td style="padding: 10px; border: 1px solid #E8DCC8;">${company}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px; background: #FAF6F1; font-weight: bold; vertical-align: top;">문의 내용</td>
                <td style="padding: 10px; border: 1px solid #E8DCC8; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>

            <p style="margin-top: 20px; color: #6B5D53; font-size: 12px;">
              접수 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
            </p>

            <p style="margin-top: 10px; color: #6B5D53; font-size: 12px;">
              관리자 페이지에서 상세 내용을 확인하고 답변해주세요.
            </p>
          </div>
        `,
      });

      // Send confirmation email to customer
      await resend.emails.send({
        from: `에이스유통 <${fromEmail}>`,
        to: email,
        subject: `[에이스유통] 문의가 접수되었습니다`,
        html: `
          <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #B8956A; border-bottom: 2px solid #B8956A; padding-bottom: 10px;">
              문의가 정상적으로 접수되었습니다
            </h2>

            <p style="color: #4A4039; line-height: 1.8;">
              안녕하세요, ${name}님.<br><br>
              에이스유통에 문의해 주셔서 감사합니다.<br>
              접수하신 내용은 담당자가 확인 후 빠른 시일 내에 답변 드리겠습니다.
            </p>

            <div style="background: #FAF6F1; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #6B5D53;"><strong>문의 유형:</strong> ${type}</p>
              <p style="margin: 10px 0 0; color: #6B5D53; white-space: pre-wrap;"><strong>문의 내용:</strong><br>${message}</p>
            </div>

            <p style="color: #6B5D53; font-size: 14px;">
              추가 문의사항이 있으시면 아래 연락처로 연락해주세요.
            </p>

            <hr style="border: none; border-top: 1px solid #E8DCC8; margin: 20px 0;">

            <p style="color: #6B5D53; font-size: 12px;">
              <strong>에이스유통 주식회사</strong><br>
              전화: 02-471-1644~6<br>
              팩스: 02-476-1372<br>
              이메일: ace32865@hanmail.net
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails - inquiry is saved to database
    }

    return NextResponse.json({
      success: true,
      message: '문의가 정상적으로 접수되었습니다.',
      inquiryId: inquiry.id,
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { error: '문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
