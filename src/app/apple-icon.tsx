import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#B8956A',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="120"
          height="120"
        >
          <g fill="#FAF6F1">
            <ellipse cx="16" cy="18" rx="10" ry="7"/>
            <path d="M8 14 Q10 8 16 8 Q22 8 24 14 Q22 12 16 12 Q10 12 8 14Z"/>
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
