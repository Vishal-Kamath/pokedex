import React from 'react';
import SkeletonComponent from '../skeletonComponent';

const SkeletonCard: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-1 rounded-md border-2 border-slate-200 bg-slate-100 bg-opacity-40 p-2 py-[5px] dark:border-slate-800 dark:bg-slate-900 dark:bg-opacity-40">
      <SkeletonComponent className="aspect-square rounded-md leading-none" />
      <SkeletonComponent className="h-10" />
    </div>
  );
};

export default SkeletonCard;
