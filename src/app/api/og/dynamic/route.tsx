import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get('name');
  const img = searchParams.get('img');

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
        {/* Background */}
        <svg
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '-10',
          }}
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1200" height="630" fill="url(#paint0_linear_107_2)" />
          <defs>
            <linearGradient
              id="paint0_linear_107_2"
              x1="1200"
              y1="0.000136239"
              x2="600"
              y2="630"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#020617" />
              <stop offset="0.494491" stop-color="#082F49" />
              <stop offset="1" stop-color="#020617" />
            </linearGradient>
          </defs>
        </svg>

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
            {/* Pokeball */}
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="40" cy="40" r="12.8" fill="white" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M53.4789 29.9703L70.1617 20.3385C63.7358 10.501 52.6271 4 40 4C20.1177 4 4 20.1177 4 40C4 45.8637 5.40188 51.3999 7.88876 56.2918L24.5718 46.6599C23.6891 44.6179 23.2 42.3661 23.2 40C23.2 30.7216 30.7216 23.2 40 23.2C45.5189 23.2 50.4163 25.8612 53.4789 29.9703Z"
                fill="#ED1B24"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80ZM40 52.8C47.0692 52.8 52.8 47.0692 52.8 40C52.8 32.9308 47.0692 27.2 40 27.2C32.9308 27.2 27.2 32.9308 27.2 40C27.2 47.0692 32.9308 52.8 40 52.8ZM53.4789 29.9703L70.1617 20.3385C63.7358 10.501 52.6271 4 40 4C20.1177 4 4 20.1177 4 40C4 45.8637 5.40188 51.3999 7.88876 56.2918L24.5718 46.6599C23.6891 44.6179 23.2 42.3661 23.2 40C23.2 30.7216 30.7216 23.2 40 23.2C45.5189 23.2 50.4163 25.8612 53.4789 29.9703ZM56.8 40C56.8 49.2784 49.2784 56.8 40 56.8C34.5353 56.8 29.6799 54.1908 26.6118 50.1503L9.92 59.7873C16.3547 69.5747 27.4342 76.0362 40.0229 76.0362C59.9052 76.0362 76.0229 59.9184 76.0229 40.0362C76.0229 34.2107 74.6392 28.7084 72.1826 23.84L55.4875 33.4789C56.3327 35.484 56.8 37.6874 56.8 40Z"
                fill="#333333"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M40 56.8001C49.2784 56.8001 56.8 49.2785 56.8 40.0001C56.8 37.6875 56.3327 35.4841 55.4875 33.479L72.1826 23.8401C74.6392 28.7085 76.0229 34.2108 76.0229 40.0363C76.0229 59.9185 59.9051 76.0363 40.0229 76.0363C27.4342 76.0363 16.3547 69.5748 9.91998 59.7874L26.6118 50.1504C29.6799 54.1909 34.5353 56.8001 40 56.8001Z"
                fill="white"
              />
            </svg>

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
