import { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import SideBar from '@/components/sidebar/sidebar';
import ProviderComponent from '@/components/providerComponent';
import Glare from '@/components/glare';
import { getEndpoint } from '@/utils/lib';

const endpoint = getEndpoint();

export const metadata: Metadata = {
  title: 'pokédex',
  applicationName: 'pokédex',

  metadataBase: new URL(endpoint),

  // Open Graph
  openGraph: {
    title: 'pokédex',
    description:
      'Welcome to the PokéDex Website! This is a web application built using Next 13, Tailwind CSS, and the PokéAPI, that provides a comprehensive collection of information about all your favorite Pokemon species.',
    url: `${endpoint}`,
    siteName: 'pokédex',
    images: [
      {
        url: `${endpoint}/api/og`,
        width: 1200,
        height: 600,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },

  // Favicons
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', type: 'image/png' }],
    other: [
      {
        url: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },

  // Pwa manifest
  manifest: '/manifest.webmanifest',
  themeColor: '#f0f9ff',
  appleWebApp: {
    capable: true,
    title: 'pokédex',
    statusBarStyle: 'black-translucent',
  },

  // Details
  description:
    'Welcome to the PokéDex Website! This is a web application built using Next 13, Tailwind CSS, PokéAPI, and pokenode-ts that provides a comprehensive collection of information about all your favorite Pokemon species.',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'PokéDex',
    'Pokémon',
    'PokéAPI',
    'PokeDex',
    'Pokemon',
  ],
  authors: [{ name: 'Vishal Kamath', url: 'https://github.com/Vishal-Kamath' }],
  creator: 'Vishal Kamath',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ProviderComponent>
        <body className="relative flex min-h-screen flex-col bg-white text-black dark:bg-slate-950 dark:text-white">
          <Glare />
          <Header />
          <div className="flex">
            <SideBar />
            {children}
          </div>
          <Footer />
        </body>
      </ProviderComponent>
    </html>
  );
}
