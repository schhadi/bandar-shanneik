import { ImageResponse } from 'next/og'

// Generates the browser-tab / SERP favicon: a navy "BS" monogram on the
// site's off-white. File-based metadata — Next emits <link rel="icon"> for it.
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1D3557',
          color: '#FAFAF7',
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: '-0.04em',
          fontFamily: 'sans-serif',
        }}
      >
        BS
      </div>
    ),
    { ...size },
  )
}
