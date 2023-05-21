'use client';

import { cn } from '@/utils/lib';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import { FC, useState } from 'react';
import { FiCameraOff } from 'react-icons/fi';

const imageVariant = cva(
  'aspect-square w-full rounded-lg border-2 bg-opacity-75 p-7 lg:h-[20rem] lg:w-[20rem]',
  {
    variants: {
      type: {
        item: 'border-violet-500 bg-violet-200  dark:bg-violet-800',
        berry: 'border-sky-500 bg-sky-200 dark:bg-sky-800',
      },
    },
    defaultVariants: {
      type: 'item',
    },
  }
);

interface Props extends VariantProps<typeof imageVariant> {
  name: string;
  src: string;
}

const ImageNotFound: FC = () => {
  return (
    <div className="flex aspect-square h-full w-full flex-col items-center justify-center gap-4 opacity-50">
      <FiCameraOff className="aspect-square h-1/2 w-1/2 text-gray-700" />
      <div className="text-lg font-semibold">NOT FOUND</div>
    </div>
  );
};

const ItemImage: FC<Props> = ({ name, src, type }) => {
  const [notFound, setNotFound] = useState(false);
  return (
    <div className={cn(imageVariant({ type }))}>
      {notFound ? (
        <ImageNotFound />
      ) : (
        <Image
          alt={name}
          src={src}
          className="pixel-image aspect-square w-full object-contain object-center"
          loading="lazy"
          width="500"
          height="500"
          onError={() => setNotFound(true)}
        />
      )}
    </div>
  );
};

export default ItemImage;
