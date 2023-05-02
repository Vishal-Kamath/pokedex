'use client';

import { NextPage } from 'next';
import { RxCrossCircled } from 'react-icons/rx';
import { useEffect } from 'react';
import Link from 'next/link';

const ErrorPage: NextPage<{
  error: Error;
}> = ({ error }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <div className="flex w-full flex-col items-center pt-20">
      <div className="flex items-center gap-3 text-2xl font-semibold">
        <RxCrossCircled className="text-4xl text-red-600" />
        <span>Something went wrong</span>
      </div>
      <Link
        href="/"
        className="border-none bg-transparent text-sky-400 underline outline-none dark:text-sky-600"
      >
        go back home
      </Link>
    </div>
  );
};

export default ErrorPage;
