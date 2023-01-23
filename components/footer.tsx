import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto flex w-full flex-col bg-black py-2 text-white">
      <section className="m-auto w-11/12 max-w-5xl items-center">
        <h1 className="mb-2 text-center text-2xl font-bold">
          ✨ Thank you for viewing ✨
        </h1>
        <div className="contacts">
          <h2 className="mb-1 text-xl">Contacts</h2>
          <a
            href="https://github.com/Vishal-Kamath/PokeDex"
            target="_blank"
            className="flex items-center gap-1 text-base text-gray-400 hover:text-white"
          >
            <FaGithub /> Github
          </a>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            className="flex items-center gap-1 text-base text-gray-400 hover:text-white"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            className="flex items-center gap-1 text-base text-gray-400 hover:text-white"
          >
            <FaFacebook /> FaceBook
          </a>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            className="flex items-center gap-1 text-base text-gray-400 hover:text-white"
          >
            <FaInstagram /> Instagram
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
