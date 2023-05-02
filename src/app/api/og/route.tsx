import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          position: 'relative',
          color: 'white',
        }}
      >
        {/* Background */}
        <svg
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

        <div
          style={{
            position: 'absolute',
            isolation: 'isolate',
            zIndex: '50',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '1200px',
            height: '630px',
            gap: '50px',
          }}
        >
          {/* Pokeball */}
          <svg
            width="150"
            height="150"
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="75" cy="75" r="24" fill="white" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M100.273 56.1944L131.553 38.1348C119.505 19.6894 98.6758 7.5 75 7.5C37.7208 7.5 7.5 37.7208 7.5 75C7.5 85.9944 10.1285 96.3748 14.7914 105.547L46.0721 87.4873C44.4171 83.6586 43.5 79.4364 43.5 75C43.5 57.603 57.603 43.5 75 43.5C85.348 43.5 94.5305 48.4897 100.273 56.1944Z"
              fill="#ED1B24"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M75 150C116.421 150 150 116.421 150 75C150 33.5786 116.421 0 75 0C33.5786 0 0 33.5786 0 75C0 116.421 33.5786 150 75 150ZM75 99C88.2548 99 99 88.2548 99 75C99 61.7452 88.2548 51 75 51C61.7452 51 51 61.7452 51 75C51 88.2548 61.7452 99 75 99ZM100.273 56.1944L131.553 38.1348C119.505 19.6894 98.6758 7.5 75 7.5C37.7208 7.5 7.5 37.7208 7.5 75C7.5 85.9944 10.1285 96.3748 14.7914 105.547L46.0721 87.4873C44.4171 83.6586 43.5 79.4364 43.5 75C43.5 57.603 57.603 43.5 75 43.5C85.348 43.5 94.5305 48.4897 100.273 56.1944ZM106.5 75C106.5 92.397 92.397 106.5 75 106.5C64.7536 106.5 55.6499 101.608 49.8972 94.0318L18.6 112.101C30.6651 130.453 51.4392 142.568 75.0429 142.568C112.322 142.568 142.543 112.347 142.543 75.0678C142.543 64.1451 139.949 53.8282 135.342 44.7L104.039 62.773C105.624 66.5324 106.5 70.6639 106.5 75Z"
              fill="#333333"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M75 106.5C92.3969 106.5 106.5 92.3969 106.5 75C106.5 70.6639 105.624 66.5324 104.039 62.7729L135.342 44.7C139.949 53.8282 142.543 64.145 142.543 75.0678C142.543 112.347 112.322 142.568 75.0429 142.568C51.4392 142.568 30.6651 130.452 18.6 112.101L49.8972 94.0317C55.6499 101.608 64.7536 106.5 75 106.5Z"
              fill="white"
            />
          </svg>

          <span style={{ fontSize: '120px' }}>pokédex</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
