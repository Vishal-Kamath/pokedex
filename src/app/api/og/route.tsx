import { ImageResponse } from '@vercel/og';

export async function GET() {
  const endpoint = process.env.VERCEL_URL
    ? 'https://' + process.env.VERCEL_URL
    : 'http://localhost:3000';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          color: 'white',
        }}
      >
        <img
          src="https://pokedex-gxlppzcgx-vishal-kamath.vercel.app/og_background.png"
          className="absolute left-0 top-0"
          alt="bg"
          width={1200}
          height={600}
        />
        <div
          style={{
            position: 'absolute',
            isolation: 'isolate',
            zIndex: '50',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '1200px',
            height: '600px',
            gap: '50px',
          }}
        >
          <img
            src="https://pokedex-gxlppzcgx-vishal-kamath.vercel.app/pokeball.png"
            alt="pokeball"
            width={150}
            height={150}
          />
          <span style={{ fontSize: '120px' }}>pokédex</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
