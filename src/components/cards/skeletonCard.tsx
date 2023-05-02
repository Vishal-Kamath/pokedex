import React from 'react';
import SkeletonComponent from '../skeletonComponent';

const SkeletonCard: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border-2 border-slate-200 bg-slate-100 bg-opacity-40 p-2 pb-3 dark:border-slate-800 dark:bg-slate-900 dark:bg-opacity-40">
      <SkeletonComponent className="aspect-square" />
      <SkeletonComponent className="h-4" />
    </div>
  );
};

export default SkeletonCard;
