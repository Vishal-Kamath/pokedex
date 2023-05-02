'use client';

import { selectTheme } from '@/slice/theme.slice';
import { useAppSelector } from '@/store/hooks';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard: React.FC = () => {
  const dark = useAppSelector(selectTheme);

  return dark ? (
    <div className="flex w-full flex-col gap-2 rounded-md border-2 border-slate-200 bg-slate-100 bg-opacity-40 p-2 pb-4 dark:border-slate-800 dark:bg-slate-900 dark:bg-opacity-40">
      <Skeleton
        baseColor="rgba(150, 150, 150, 0.05)"
        highlightColor="rgba(255, 255, 255, 0.25)"
        className="aspect-square"
      />
      <Skeleton
        baseColor="rgba(150, 150, 150, 0.05)"
        highlightColor="rgba(255, 255, 255, 0.25)"
      />
    </div>
  ) : (
    <div className="flex w-full flex-col gap-2 rounded-md border-2 border-slate-200 bg-slate-100 bg-opacity-40 p-2 pb-4 dark:border-slate-800 dark:bg-slate-900 dark:bg-opacity-40">
      <Skeleton
        baseColor="rgba(230, 230, 230, 0.5)"
        highlightColor="#ffffff"
        className="aspect-square"
      />
      <Skeleton baseColor="rgba(230, 230, 230, 0.5)" highlightColor="#ffffff" />
    </div>
  );
};

export default SkeletonCard;
