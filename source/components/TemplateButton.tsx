import React, { useState } from 'react';
import { TemplateDropdown } from './TemplateDropdown';

export const TemplateButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="inline-flex items-center justify-center relative shrink-0 ring-offset-2
          ring-offset-bg-300 ring-accent-main-100 focus-visible:outline-none focus-visible:ring-1
          disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none
          max-w-full min-w-0 pl-1.5 pr-1 h-7 ml-0.5 mr-1 hover:bg-bg-200 hover:border-border-400
          border-0.5 text-sm rounded-md border-transparent transition text-text-500 hover:text-text-200"
        data-testid="template-selector-dropdown"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className="inline-flex items-center min-w-0"
          data-state={isOpen ? "open" : "closed"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="mr-1 -translate-y-px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="flex-1 truncate -translate-y-px font-tiempos mr-px">
            Choose templates
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="text-text-500/80 ml-1 shrink-0"
          >
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
          </svg>
        </div>
      </button>
      {isOpen && <TemplateDropdown onClose={() => setIsOpen(false)} />}
    </>
  );
};
