import React, { useEffect, useState } from 'react';
import { getSettings } from '../options-storage';

interface Template {
  title: string;
  content: string;
}

interface TemplateDropdownProps {
  onClose: () => void;
}

export const TemplateDropdown: React.FC<TemplateDropdownProps> = ({ onClose }) => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const loadTemplates = async () => {
      const settings = await getSettings();
      setTemplates(settings.templates || []);
    };
    loadTemplates();
  }, []);

  const handleTemplateClick = (template: Template) => {
    const editor = document.querySelector('.ProseMirror') as HTMLDivElement;
    if (editor) {
      const isEmpty = editor.querySelector('.is-editor-empty');
      if (isEmpty) {
        editor.innerHTML = '';
      }

      const p = document.createElement('p');
      p.textContent = template.content;
      editor.append(p);
      (editor as HTMLElement).focus();

      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(p);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    onClose();
  };

  const handleSettingsClick = () => {
    chrome.runtime.sendMessage({ action: 'openOptions' });
    onClose();
  };

  return (
    <div
      data-side="top"
      data-align="center"
      role="menu"
      aria-orientation="vertical"
      data-state="open"
      tabIndex={-1}
      className="z-50 bg-bg-200 border-0.5 border-border-300 backdrop-blur-xl rounded-lg
        min-w-[8rem] overflow-hidden p-1 text-text-200 shadow-element
        !bg-bg-200 !rounded-xl w-64 sm:w-[28rem] !z-30"
    >
      <div className="sm:flex justify-between items-center flex-1 text-xs font-medium text-text-300 px-1.5 pt-1 pb-1.5 min-h-5">
        <div className="translate-y-[0.5px]">Choose a template</div>
      </div>
      <div className="grid sm:grid-cols-2 mt-0.5 pb-1 px-1">
        <div className="min-h-0">
          <div className="overflow-x-visible overflow-y-auto scroll-pb-6 min-h-[0px]
            [scrollbar-color:hsl(var(--text-500))]
            scroll-smooth overscroll-contain
            [&::-webkit-scrollbar]:w-[0.25rem]
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-[1em]
            [&::-webkit-scrollbar-thumb]:bg-text-500/80
            pr-1 sm:mr-1 pb-1 min-h-40 max-h-64"
          >
            {templates.length === 0 ? (
              <div className="py-1 px-2 text-text-300 text-sm">
                No templates found
              </div>
            ) : (
              templates.map((template, index) => (
                <div
                  key={index}
                  role="menuitem"
                  className="py-1 px-2 rounded-md cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis grid grid-cols-[minmax(0,_1fr)_auto] gap-2 items-center outline-none select-none pr-0 mb-0.5 line-clamp-2 leading-tight hover:bg-bg-300"
                  tabIndex={-1}
                  onClick={() => handleTemplateClick(template)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-wrap line-clamp-2">{template.title}</div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div
            role="menuitem"
            data-testid="template-selector-open-modal"
            className="py-1 px-2 rounded-md cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis grid grid-cols-[minmax(0,_1fr)_auto] gap-2 items-center outline-none select-none bg-transparent border border-border-300 hover:!bg-accent-main-100 hover:!text-oncolor-100 hover:!border-transparent transition mr-1 sm:mr-3 ml-1 mb-1 mt-1 !rounded-lg text-center text-sm font-medium"
            tabIndex={-1}
            onClick={handleSettingsClick}
          >
            Create & Edit Templates
          </div>
        </div>
      </div>
    </div>
  );
};
