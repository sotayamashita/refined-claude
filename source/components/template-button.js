import React, {createElement} from 'react';

export const TemplateButton = ({onToggleDropdown}) => (
	<div className='flex items-center min-w-0 max-w-full'>
		<div className='min-w-24' data-state='closed' style={{opacity: 1}}>
			<button
				className='inline-flex items-center justify-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium text-content-default hover:bg-bg-300 active:bg-bg-400'
				data-testid='template-selector-dropdown'
				onClick={onToggleDropdown}
			>
				<span className='inline-flex items-center'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
						className='mr-1'
					>
						<rect width='8' height='4' x='8' y='2' rx='1' ry='1' />
						<path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' />
						<path d='M12 11h4' />
						<path d='M12 16h4' />
						<path d='M8 11h.01' />
						<path d='M8 16h.01' />
					</svg>
					Templates
				</span>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path d='m6 9 6 6 6-6' />
				</svg>
			</button>
		</div>
	</div>
);
