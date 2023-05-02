import Image from 'next/image';
import React from 'react';

const BerryImage: React.FC<{ name: string; src: string }> = ({ name, src }) => {
  return (
    <div className="aspect-square w-full rounded-lg border-2 border-sky-500 bg-sky-200 bg-opacity-75 p-7 dark:bg-sky-800 lg:w-[20rem]">
      <Image
        alt={name}
        src={src}
        className="pixel-image aspect-square w-full"
        loading="lazy"
        width="500"
        height="500"
      />
    </div>
  );
};

export default BerryImage;
