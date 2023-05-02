'use client';

import React, { HtmlHTMLAttributes } from 'react';
import Skeleton from 'react-loading-skeleton';
import { selectTheme } from '@/slice/theme.slice';
import { useAppSelector } from '@/store/hooks';

interface Props extends HtmlHTMLAttributes<typeof Skeleton> {}

const SkeletonComponent: React.FC<Props> = (props) => {
  const dark = useAppSelector(selectTheme);
  return dark ? (
    <Skeleton
      baseColor="rgba(150, 150, 150, 0.05)"
      highlightColor="rgba(255, 255, 255, 0.25)"
      {...props}
    />
  ) : (
    <Skeleton
      baseColor="rgba(230, 230, 230, 0.5)"
      highlightColor="#ffffff"
      {...props}
    />
  );
};

export default SkeletonComponent;
