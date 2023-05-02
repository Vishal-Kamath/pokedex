import Image from 'next/image';
import React from 'react';

const ItemImage: React.FC<{ name: string; src: string }> = ({ name, src }) => {
  return (
    <div className="lg:h-[20rem] aspect-square w-full rounded-lg border-2 border-gray-500 bg-gray-200 bg-opacity-75 p-7 dark:bg-gray-800 lg:w-[20rem]">
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

export default ItemImage;
