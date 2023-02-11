import { useRouter } from 'next/router';
import React from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

const Pagination: React.FC = () => {
  const router = useRouter();
  const pageNo = Number(router.query.pageNo || 0);

  const _prev = () => {
    router.push({ pathname: '/', query: { pageNo: String(pageNo - 1) } });
  };
  const _next = () => {
    router.push({ pathname: '/', query: { pageNo: String(pageNo + 1) } });
  };
  return (
    <div className="my-4 flex justify-between">
      {pageNo !== 0 && (
        <button
          className="flex items-center gap-2 rounded-md px-4 py-2 dark:bg-slate-700"
          onClick={_prev}
        >
          <FaLongArrowAltLeft /> prev
        </button>
      )}
      <button
        className="flex items-center gap-2 rounded-md px-4 py-2 dark:bg-slate-700"
        onClick={_next}
      >
        next <FaLongArrowAltRight />
      </button>
    </div>
  );
};

export default Pagination;
