'use client';

import React, { useState } from 'react';
import { MdContentCopy } from 'react-icons/md';
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
    <div className="w-full overflow-hidden rounded-lg border-2 border-slate-300 dark:border-slate-700">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-sm text-white">
        <span>{title}</span>
        <button
          className={`flex items-center gap-1 rounded-md border-2 p-1 outline-none ${
            copied
              ? 'border-green-400 text-green-400'
              : 'border-gray-400 text-gray-400'
          }`}
          onClick={copyTextFunction}
        >
          {copied ? (
            <>
              <BsCheckLg />
              <span>Copied</span>
            </>
          ) : (
            <>
              <MdContentCopy />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col gap-0 bg-slate-800 bg-opacity-75 px-4 py-2 text-gray-300">
        {children}
      </div>
    </div>
  );
};

export default CodeSegmentCard;
