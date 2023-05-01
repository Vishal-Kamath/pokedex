import { ImageResponse } from '@vercel/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get('name');
  const img = searchParams.get('img');

  const endpoint = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          gap: '50px',
          padding: '50px',
          justifyContent: 'space-between',
          color: 'white',
        }}
      >
        <img
          src={`${endpoint}/og_background.png`}
          alt="bg"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '-10',
          }}
          width={1200}
          height={630}
        />
        <img
          src={`${img}`}
          alt={`${name}`}
          width={500}
          height={500}
          style={{
            backgroundColor: '#0f172a',
            border: '2px solid #f1f5f9',
            borderRadius: '20px',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            <img
              src={`${endpoint}/pokeball.png`}
              alt="pokeball"
              width={80}
              height={80}
            />
            <span style={{ fontSize: '70px' }}>pokédex</span>
          </div>
          <span
            style={{
              fontSize: '90px',
              fontWeight: 'bolder',
              textTransform: 'capitalize',
            }}
          >
            {name}
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
