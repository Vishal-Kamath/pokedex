import Image from 'next/image';
import React from 'react';
import { AiOutlineGithub, AiOutlineTwitter } from 'react-icons/ai';
import { SiNextdotjs, SiTailwindcss } from 'react-icons/si';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t-2 border-gray-200 bg-slate-100 px-[5vw] py-5 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex justify-between gap-7 max-lg:flex-col">
        {/* More About Me */}
        <div className="flex w-full flex-col gap-1">
          <span className="font-montserrat text-xl font-medium">
            More about me
          </span>
          <p className="max-w-lg text-justify leading-5 text-gray-500">
            Hi, I'm Vishal Kamath, a web developer striving to create
            beautifully designed websites. This is a fun project that I created
            while tinkering around with Next 13. I hope you like it!
          </p>
        </div>

        <div className="flex w-full justify-between gap-7 max-sm:flex-col">
          {/* Acknowledgments */}
          <div className="flex max-w-sm flex-col gap-1">
            <span className="font-montserrat text-xl font-medium">
              Acknowledgments
            </span>
            <div className="flex flex-col gap-1 leading-5 text-gray-500">
              <p className="text-justify leading-5 text-gray-500">
                This project was made possible thanks to the following
                resources:
              </p>
              <div className="flex gap-3">
                <a
                  href="https://pokeapi.co/"
                  target="_blank"
                  className="grid w-fit place-content-center rounded-full p-2 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <Image
                    src="/PokéAPI.png"
                    alt="PokéAPI"
                    className="w-10"
                    width="100"
                    height="100"
                  />
                </a>
                <a
                  href="https://nextjs.org/"
                  target="_blank"
                  className="grid w-fit place-content-center rounded-full p-2 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <SiNextdotjs className="h-5 w-5 text-black dark:text-white" />
                </a>
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  className="grid w-fit place-content-center rounded-full p-2 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <SiTailwindcss className="h-5 w-5 text-sky-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Me */}
          <div className="flex flex-col gap-1">
            <span className="font-montserrat text-xl font-medium">
              Contact me
            </span>
            <div className="flex flex-col gap-1 leading-5 text-gray-500">
              <a
                href="https://github.com/Vishal-Kamath"
                target="_blank"
                className="flex items-center gap-2 rounded-full p-2 hover:bg-slate-200 hover:text-black dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <AiOutlineGithub className="h-5 w-5 text-black dark:text-white" />
                <span>GitHub</span>
              </a>
              <a
                href="https://twitter.com/VishalKamath853"
                target="_blank"
                className="flex items-center gap-2 rounded-full p-2 hover:bg-slate-200 hover:text-black dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <AiOutlineTwitter className="h-5 w-5 text-twitter" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
