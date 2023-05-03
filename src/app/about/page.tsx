import CodeSegmentCard from '@/components/cards/codeSegmentCard';
import { NextPage } from 'next';
import { BsExclamationCircleFill } from 'react-icons/bs';

const PokemonPage: NextPage = () => {
  return (
    <main className="flex w-full flex-col gap-7 px-[5vw] pb-10 pt-20 sm:pl-5">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">About</h2>

        {/* Note */}
        <div className="flex flex-col gap-2 rounded-md border-2 border-emerald-500 bg-emerald-500 bg-opacity-20 px-5 py-2 text-emerald-500">
          <h5 className="flex items-center gap-2 font-bold">
            <BsExclamationCircleFill className="text-lg" /> Note:
          </h5>
          <p className="text-justify">
            All assets and data resources are used from{' '}
            <a
              className="text-blue-500 underline"
              href="https://pokeapi.co/"
              target="_blank"
            >
              PokéAPI
            </a>{' '}
            and{' '}
            <a
              className="text-blue-500 underline"
              href="https://github.com/Gabb-c/pokenode-ts"
              target="_blank"
            >
              pokenode-ts
            </a>
            . This website is not produced, endorsed, supported, or affiliated
            with Nintendo or The Pokémon Company.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold">Introduction</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to the PokéDex Website! This is a web application built using
          Next 13, Tailwind CSS, PokéAPI and pokenode-ts, that provides a
          comprehensive collection of information about all your favorite
          Pokemon species.
        </p>
      </div>

      {/* Getting Started */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">Getting Started</h3>
        <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-400">
          <p>
            To get started with the project, you can simply clone the
            repository:
          </p>

          <CodeSegmentCard
            title="Terminal"
            copyText="git clone https://github.com/Vishal-Kamath/pokedex.git"
          >
            <span>
              <span className="text-yellow-300">git clone </span>
              https://github.com/Vishal-Kamath/pokedex.git
            </span>
          </CodeSegmentCard>

          <p>
            After that, navigate to the project directory and install the
            dependencies:
          </p>

          <CodeSegmentCard
            title="Terminal"
            copyText={`cd pokedex\nnpm install`}
          >
            <div>cd pokedex</div>
            <div>npm install</div>
          </CodeSegmentCard>

          <p>
            Once the dependencies are installed, you can run the development
            server:
          </p>

          <CodeSegmentCard title="Terminal" copyText="npm run dev">
            <span>
              <span className="text-yellow-300">npm </span>
              run dev
            </span>
          </CodeSegmentCard>

          <p>
            This will start the development server at{' '}
            <span className="text-yellow-500">http://localhost:3000</span>. You
            can then open your browser and navigate to that URL to view the
            Pokedex website.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PokemonPage;
