'use client';

import { useState, useRef, useCallback } from 'react';

interface FileUploadProps {
  label?: string;
  value?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  onChange: (data: { url: string; fileName: string; fileSize: number; fileType: string; publicId: string } | null) => void;
  folder?: string;
  accept?: string;
  maxSize?: number; // MB
  disabled?: boolean;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (fileType: string): string => {
  const type = fileType.toLowerCase();
  if (type === 'pdf') return '📕';
  if (type === 'doc' || type === 'docx') return '📘';
  if (type === 'xls' || type === 'xlsx') return '📗';
  if (type === 'ppt' || type === 'pptx') return '📙';
  if (type === 'zip' || type === 'rar' || type === '7z') return '📦';
  if (type === 'hwp') return '📄';
  return '📄';
};

export default function FileUpload({
  label,
  value,
  fileName,
  fileSize,
  fileType,
  onChange,
  folder = 'downloads',
  accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.7z,.txt,.csv,.hwp',
  maxSize = 50,
  disabled = false,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [publicId, setPublicId] = useState<string | null>(null);

  const handleUpload = useCallback(async (file: File) => {
    setError(null);

    // 파일 크기 검증
    if (file.size > maxSize * 1024 * 1024) {
      setError(`파일 크기가 너무 큽니다. (최대 ${maxSize}MB)`);
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      // 진행률 시뮬레이션
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const res = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || '업로드에 실패했습니다.');
      }

      const data = await res.json();
      setProgress(100);
      setPublicId(data.publicId);

      onChange({
        url: data.url,
        fileName: data.fileName,
        fileSize: data.fileSize,
        fileType: data.fileType,
        publicId: data.publicId,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '업로드에 실패했습니다.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [folder, maxSize, onChange]);

  const handleDelete = useCallback(async () => {
    if (publicId) {
      try {
        await fetch(`/api/upload-file?publicId=${encodeURIComponent(publicId)}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
    setPublicId(null);
    onChange(null);
  }, [publicId, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (disabled || uploading) return;

    const file = e.dataTransfer.files[0];
    if (file) {
      handleUpload(file);
    }
  }, [disabled, uploading, handleUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
    // Reset input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [handleUpload]);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {value ? (
        // 업로드된 파일 표시
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{getFileIcon(fileType || '')}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {fileName || '파일'}
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                {fileType && <span>{fileType}</span>}
                {fileSize && <span>{formatFileSize(fileSize)}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                다운로드
              </a>
              <button
                type="button"
                onClick={handleDelete}
                disabled={disabled}
                className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ) : (
        // 업로드 영역
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !disabled && !uploading && inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-200
            ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${disabled || uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            disabled={disabled || uploading}
            className="hidden"
          />

          {uploading ? (
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto">
                <svg className="animate-spin w-12 h-12 text-blue-500" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">업로드 중... {progress}%</p>
              <div className="w-48 h-2 mx-auto bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">
                클릭하거나 파일을 드래그하세요
              </p>
              <p className="text-xs text-gray-400">
                PDF, DOC, XLS, PPT, ZIP, HWP 등 (최대 {maxSize}MB)
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
