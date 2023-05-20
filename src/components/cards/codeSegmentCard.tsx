'use client';

import React, { useState } from 'react';
import { RxCopy } from 'react-icons/rx';
import { BsCheckLg } from 'react-icons/bs';

const CodeSegmentCard: React.FC<{
  title: string;
  copyText: string;
  children: React.ReactNode;
}> = ({ title, copyText, children }) => {
  const [copied, setCopied] = useState(false);

  const copyTextFunction = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-slate-300 bg-opacity-50 p-3 dark:bg-slate-700 dark:bg-opacity-50">
      {/* copy button */}
      <button
        className={`absolute right-5 top-5 aspect-square rounded-[4px] p-1 text-xl ${
          copied
            ? 'bg-green-100 text-green-400 dark:bg-green-900'
            : 'bg-slate-100 text-gray-400 dark:bg-slate-700'
        }`}
        onClick={copyTextFunction}
      >
        {copied ? <BsCheckLg /> : <RxCopy />}
      </button>

      <div className="rounded-md bg-gradient-to-tr from-slate-400 from-45% via-slate-700 to-slate-200 p-[1px] dark:from-slate-600 dark:from-45% dark:via-slate-300 dark:to-slate-800">
        <div className="flex flex-col gap-0 rounded-md bg-slate-200 px-4 py-4 text-gray-700 dark:bg-slate-800 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CodeSegmentCard;
