import { NextPage } from 'next';
import Link from 'next/link';

const NotFoundPage: NextPage = () => {
  return (
    <div className="flex w-full flex-col items-center pt-20">
      <div className="text-2xl font-semibold">404 not found</div>
      <Link
        href="/"
        className="border-none bg-transparent text-sky-400 underline outline-none dark:text-sky-600"
      >
        go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
