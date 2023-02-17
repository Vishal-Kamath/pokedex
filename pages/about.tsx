import { NextPage } from 'next';
import Head from 'next/head';
import { BsExclamationCircleFill } from 'react-icons/bs';

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>PokéDex - About</title>
      </Head>
      <div className="isolate z-10 ml-auto flex w-full flex-col gap-5 md:w-1/2 lg:w-3/4">
        <h2 className="text-2xl font-bold">About</h2>
        <div className="rounded-md border-2 border-emerald-400 bg-emerald-400 bg-opacity-20 px-5 py-2 text-emerald-400">
          <h5 className="flex items-center gap-2 font-bold">
            <BsExclamationCircleFill className="text-lg" /> Note:
          </h5>
          <p>
            All assets and data resources are used from{' '}
            <a className="text-blue-500 underline" href="https://pokeapi.co/">
              PokéAPI
            </a>
            . This website is not produced, endorsed, supported, or affiliated
            with Nintendo or The Pokémon Company.
          </p>
        </div>
        <div>
          This is a fun project that use NextJS to create a PokéDex website. It
          uses{' '}
          <a className="text-blue-500 underline" href="https://pokeapi.co/">
            PokéAPI
          </a>{' '}
          for data resources.
        </div>
      </div>
    </>
  );
};

export default AboutPage;
