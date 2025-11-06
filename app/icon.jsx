import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px',
          position: 'relative',
        }}
      >
        {/* Baby bottle icon simplified */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield with checkmark representing safety */}
          <path
            d="M12 2L4 6V11C4 16 8 20.5 12 22C16 20.5 20 16 20 11V6L12 2Z"
            fill="white"
          />
          <path
            d="M10 14L7 11L8.5 9.5L10 11L15.5 5.5L17 7L10 14Z"
            fill="#10b981"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
