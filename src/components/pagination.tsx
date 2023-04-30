'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

export const Pagination: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || 1);

  const _prev = () => {
    if (page - 1 === 1) return router.push(pathname);
    router.push(`${pathname}?page=${page - 1}`);
  };
  const _next = () => {
    router.push(`${pathname}?page=${page + 1}`);
  };
  return (
    <div className="my-4 flex justify-between">
      {page !== 1 && (
        <button
          className="flex items-center gap-2 rounded-md border-2 border-slate-300 bg-slate-200 px-4 py-2 hover:border-sky-300 hover:bg-sky-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-700 dark:hover:bg-sky-800"
          onClick={_prev}
        >
          <FaLongArrowAltLeft /> prev
        </button>
      )}
      <button
        className="ml-auto flex items-center gap-2 rounded-md border-2 border-slate-300 bg-slate-200 px-4 py-2 hover:border-sky-300 hover:bg-sky-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-700 dark:hover:bg-sky-800"
        onClick={_next}
      >
        next <FaLongArrowAltRight />
      </button>
    </div>
  );
};

export default Pagination;
