import React, {useState, useEffect} from 'react';
import {getSettings} from '../options-storage.js';

export const TemplateDropdown = ({onClose, position}) => {
	const [templates, setTemplates] = useState([]);

	useEffect(() => {
		const loadTemplates = async () => {
			const settings = await getSettings();
			setTemplates(settings.templates || []);
		};
		loadTemplates();
	}, []);

	const handleTemplateClick = async template => {
		// Get the active element (textarea)
		const textarea = document.querySelector('[data-testid="prompt-textarea"]');
		if (textarea) {
			textarea.value = template.content;
			textarea.dispatchEvent(new Event('input', {bubbles: true}));
		}
		onClose();
	};

	const handleSettingsClick = () => {
		chrome.runtime.sendMessage({action: 'OPEN_OPTIONS'});
		onClose();
	};

	return (
		<div
			data-radix-popper-content-wrapper=''
			data-template-dropdown-wrapper=''
			dir='ltr'
			style={{
				position: 'fixed',
				left: '0px',
				top: '0px',
				minWidth: 'max-content',
				willChange: 'transform',
				zIndex: 30,
				'--radix-popper-transform-origin': '50% 265px',
				...position,
			}}
		>
			<div className='z-50 overflow-hidden rounded-lg border border-border-default bg-bg-200 p-1 shadow-lg'>
				<div className='max-h-[var(--radix-select-content-available-height)] overflow-y-auto py-1'>
					{templates.length === 0 ? (
						<div className='select-none px-2 py-4 text-sm text-content-default/50'>
							No templates found
						</div>
					) : (
						templates.map((template, index) => (
							<button
								key={index}
								className='flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-content-default outline-none hover:bg-bg-300 active:bg-bg-400'
								onClick={() => handleTemplateClick(template)}
							>
								{template.title}
							</button>
						))
					)}
				</div>
				<div className='border-t border-border-default/50 pt-1'>
					<button
						className='flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-content-default outline-none hover:bg-bg-300 active:bg-bg-400'
						onClick={handleSettingsClick}
					>
						Settings
					</button>
				</div>
			</div>
		</div>
	);
};
