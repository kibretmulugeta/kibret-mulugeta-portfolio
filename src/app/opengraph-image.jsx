import { ImageResponse } from 'next/og';
import { profileData } from '@/data/profile';

export const runtime = 'edge';
export const alt = 'Kibret Mulugeta | AI Engineer & Computer Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#090A0F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '60px',
          border: '12px solid #12141D',
          boxSizing: 'border-box',
        }}
      >
        {/* Header Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: '#12141D',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38BDF8',
              fontSize: '22px',
              fontWeight: 'bold',
            }}
          >
            AI
          </div>
          <span style={{ color: '#F3F4F6', fontSize: '26px', fontWeight: 'bold', letterSpacing: '2px', fontFamily: 'monospace' }}>
            KIBRET MULUGETA
          </span>
        </div>

        {/* Hero Content Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              padding: '8px 20px',
              borderRadius: '9999px',
              color: '#38BDF8',
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: 'monospace',
              width: 'fit-content',
            }}
          >
            AI Engineer • Computer Engineer • AI/ML Researcher
          </div>

          <h1
            style={{
              color: '#F3F4F6',
              fontSize: '54px',
              fontWeight: '800',
              lineHeight: '1.15',
              margin: 0,
              letterSpacing: '-1px',
            }}
          >
            Engineering Intelligent Systems from Research to Production
          </h1>

          <p style={{ color: '#9CA3AF', fontSize: '24px', margin: 0, lineHeight: '1.4' }}>
            Deep Learning • Medical Image Segmentation • Brain MRI • U-Net • Python Backend
          </p>
        </div>

        {/* Footer Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '24px' }}>
          <span style={{ color: '#6B7280', fontSize: '18px', fontFamily: 'monospace' }}>
            MSc Computer Engineering — Bahir Dar University
          </span>
          <span style={{ color: '#38BDF8', fontSize: '18px', fontWeight: 'bold', fontFamily: 'monospace' }}>
            kibretmulugeta.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
