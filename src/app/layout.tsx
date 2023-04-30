import { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header/header';
import { Montserrat } from 'next/font/google';
import Footer from '@/components/footer/footer';
import SideBar from '@/components/sidebar/sidebar';
import ProviderComponent from '@/components/providerComponent';
import Glare from '@/components/glare';

const montserrat = Montserrat({
  variable: '--montserrat-font',
  weight: ['300', '400', '500'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PokéDex',
  applicationName: 'PokéDex',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png' }],
    other: [
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  description:
    'Welcome to the PokéDex Website! This is a web application built using Next 13, Tailwind CSS, and the PokéAPI, that provides a comprehensive collection of information about all your favorite Pokemon species.',
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
        <body
          className={`${montserrat.variable} relative flex min-h-screen flex-col bg-white text-black dark:bg-slate-950 dark:text-white`}
        >
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