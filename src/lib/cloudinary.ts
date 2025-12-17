import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// 기본 폴더 접두어
const BASE_FOLDER = 'ace-distribution';

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export const uploadToCloudinary = async (
  file: Buffer,
  subfolder: string = ''
): Promise<CloudinaryUploadResult> => {
  // ace-distribution/subfolder 형태로 폴더 구성
  const folder = subfolder ? `${BASE_FOLDER}/${subfolder}` : BASE_FOLDER;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        }
      }
    );
    uploadStream.end(file);
  });
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId);
};

// 파일 업로드 결과 인터페이스
export interface CloudinaryFileUploadResult {
  public_id: string;
  secure_url: string;
  bytes: number;
  format: string;
  resource_type: string;
  original_filename: string;
}

// 파일 업로드 (PDF, DOC, ZIP 등)
export const uploadFileToCloudinary = async (
  file: Buffer,
  originalFilename: string,
  subfolder: string = ''
): Promise<CloudinaryFileUploadResult> => {
  const folder = subfolder ? `${BASE_FOLDER}/${subfolder}` : BASE_FOLDER;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'raw',
        public_id: originalFilename.replace(/\.[^/.]+$/, ''), // 확장자 제외
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            bytes: result.bytes,
            format: result.format || originalFilename.split('.').pop() || '',
            resource_type: result.resource_type,
            original_filename: originalFilename,
          });
        }
      }
    );
    uploadStream.end(file);
  });
};

// 파일 삭제 (raw 타입)
export const deleteFileFromCloudinary = async (publicId: string): Promise<void> => {
  await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
};
