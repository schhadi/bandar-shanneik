import { ImageResponse } from 'next/og'

// Apple touch icon (home-screen / bookmark). Same navy "BS" monogram, sized to
// Apple's 180×180. Apple applies its own rounded mask, so we keep it square.
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
          fontSize: 96,
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
