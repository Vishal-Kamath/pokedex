import React from 'react';

import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonComponent from '../skeletonComponent';

const SkeletonCard: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border-2 border-slate-200 bg-slate-100 bg-opacity-40 p-2 pb-4 dark:border-slate-800 dark:bg-slate-900 dark:bg-opacity-40">
      <SkeletonComponent className="aspect-square" />
      <SkeletonComponent />
    </div>
  );
};

export default SkeletonCard;
