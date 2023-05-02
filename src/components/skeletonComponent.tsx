'use client';

import React, { HtmlHTMLAttributes } from 'react';
import Skeleton from 'react-loading-skeleton';
import { selectTheme } from '@/slice/theme.slice';
import { useAppSelector } from '@/store/hooks';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props extends HtmlHTMLAttributes<typeof Skeleton> {}

const SkeletonComponent: React.FC<Props> = (props) => {
  const dark = useAppSelector(selectTheme);
  return dark ? (
    <Skeleton
      {...props}
      baseColor="rgba(150, 150, 150, 0.05)"
      highlightColor="rgba(255, 255, 255, 0.25)"
    />
  ) : (
    <Skeleton
      {...props}
      baseColor="rgba(230, 230, 230, 0.5)"
      highlightColor="#ffffff"
    />
  );
};

export default SkeletonComponent;
