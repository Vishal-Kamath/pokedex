import { cn } from '@/utils/lib';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import React from 'react';

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

const ItemImage: React.FC<Props> = ({ name, src, type }) => {
  return (
    <div className={cn(imageVariant({ type }))}>
      <Image
        alt={name}
        src={src}
        className="pixel-image aspect-square w-full object-contain object-center"
        loading="lazy"
        width="500"
        height="500"
      />
    </div>
  );
};

export default ItemImage;
