import { NextRequest, NextResponse } from 'next/server';
import { uploadFileToCloudinary, deleteFileFromCloudinary } from '@/lib/cloudinary';

// 허용되는 파일 타입
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/zip',
  'application/x-rar-compressed',
  'application/x-7z-compressed',
  'text/plain',
  'text/csv',
];

// 허용되는 확장자
const ALLOWED_EXTENSIONS = [
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
  'zip', 'rar', '7z', 'txt', 'csv', 'hwp'
];

// 최대 파일 크기 (50MB)
const MAX_SIZE = 50 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'downloads';

    if (!file) {
      return NextResponse.json(
        { error: '파일이 없습니다.' },
        { status: 400 }
      );
    }

    // 파일 확장자 검증
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return NextResponse.json(
        { error: `지원하지 않는 파일 형식입니다. (${ALLOWED_EXTENSIONS.join(', ')})` },
        { status: 400 }
      );
    }

    // 파일 크기 검증
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: '파일 크기가 너무 큽니다. (최대 50MB)' },
        { status: 400 }
      );
    }

    // File을 Buffer로 변환
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cloudinary에 업로드
    const result = await uploadFileToCloudinary(buffer, file.name, folder);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      fileName: file.name,
      fileSize: result.bytes,
      fileType: extension.toUpperCase(),
      format: result.format,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: '파일 업로드에 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');

    if (!publicId) {
      return NextResponse.json(
        { error: 'publicId가 필요합니다.' },
        { status: 400 }
      );
    }

    await deleteFileFromCloudinary(publicId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('File delete error:', error);
    return NextResponse.json(
      { error: '파일 삭제에 실패했습니다.' },
      { status: 500 }
    );
  }
}
