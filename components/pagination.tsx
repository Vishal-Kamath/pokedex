import { useRouter } from 'next/router';
import React from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

export const PaginationButton: React.FC = () => {
  const router = useRouter();
  const pageNo = Number(router.query.pageNo || 0);

  const _prev = () => {
    if (pageNo - 1 === 0) return router.push(router.pathname);
    router.push({
      pathname: router.pathname,
      query: { pageNo: String(pageNo - 1) },
    });
  };
  const _next = () => {
    router.push({
      pathname: router.pathname,
      query: { pageNo: String(pageNo + 1) },
    });
  };
  return (
    <div className="my-4 flex justify-between">
      {pageNo !== 0 && (
        <button
          className="flex items-center gap-2 rounded-md bg-sky-200 px-4 py-2 hover:bg-sky-300 dark:bg-slate-800 dark:hover:bg-sky-700"
          onClick={_prev}
        >
          <FaLongArrowAltLeft /> prev
        </button>
      )}
      <button
        className="flex items-center gap-2 rounded-md bg-sky-200 px-4 py-2 hover:bg-sky-300 dark:bg-slate-800 dark:hover:bg-sky-700"
        onClick={_next}
      >
        next <FaLongArrowAltRight />
      </button>
    </div>
  );
};

export default PaginationButton;
