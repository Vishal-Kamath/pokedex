'use client';

import { cn } from '@/utils/lib';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import { FC, HTMLAttributes, useState } from 'react';
import { FiCameraOff } from 'react-icons/fi';

const cardVariants = cva('', {
  variants: {
    imageVariant: {
      pokemon:
        'aspect-square w-full rounded-md bg-opacity-20 p-7 group-hover:bg-sky-200 dark:group-hover:bg-sky-900',
      berries:
        'aspect-square w-full rounded-md bg-opacity-20 p-12 group-hover:bg-sky-200 dark:group-hover:bg-sky-900',
      items:
        'pixel-image aspect-square w-full rounded-md bg-opacity-20 p-7 group-hover:bg-sky-200 dark:group-hover:bg-sky-900',
    },
  },
  defaultVariants: {
    imageVariant: 'pokemon',
  },
});

interface Props
  extends VariantProps<typeof cardVariants>,
    HTMLAttributes<HTMLAnchorElement> {
  id: string;
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

const ListCard: FC<Props> = ({
  id,
  name,
  src,

  // variants
  imageVariant,

  // props
  className,
  ...props
}) => {
  const [notFound, setNotFound] = useState(false);
  return (
    <Link
      href={`/${imageVariant}/${name}`}
      key={name}
      className={cn(
        'group flex w-full flex-col gap-2 rounded-md border-2 border-slate-200 bg-slate-100 bg-opacity-40 p-2 hover:border-slate-300 hover:bg-opacity-75 dark:border-slate-800 dark:bg-slate-900 dark:bg-opacity-40 dark:hover:border-slate-600 dark:hover:bg-opacity-75',
        className
      )}
      {...props}
    >
      {notFound ? (
        <ImageNotFound />
      ) : (
        <Image
          alt={name}
          src={src}
          className={cn(cardVariants({ imageVariant }))}
          loading="lazy"
          width="250"
          height="250"
          onError={() => setNotFound(true)}
        />
      )}
      <div className="flex justify-center gap-1 rounded-md bg-slate-300 bg-opacity-40 py-2 font-semibold dark:bg-slate-700 dark:bg-opacity-40">
        <span className="text-gray-500">#{id}</span>
        <span className="capitalize">{name}</span>
      </div>
    </Link>
  );
};

export default ListCard;
