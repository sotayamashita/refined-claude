import React from 'react';
import {createRoot} from 'react-dom/client';
import {TemplateButton} from './components/template-button';
import {TemplateDropdown} from './components/template-dropdown';

// Helper functions
function waitForElement(selector, timeout = 5000) {
	return new Promise((resolve, reject) => {
		const startTime = Date.now();

		function checkElement() {
			const element = document.querySelector(selector);
			if (element) {
				resolve(element);
				return;
			}

			if (Date.now() - startTime >= timeout) {
				reject(new Error(`Element ${selector} not found within ${timeout}ms`));
				return;
			}

			requestAnimationFrame(checkElement);
		}

		checkElement();
	});
}

const sleep = ms => new Promise(resolve => {
	setTimeout(resolve, ms);
});

// Initialize template button
async function initializeTemplateButton() {
	const sonnetButton = await waitForElement(
		'button[data-testid="model-selector-dropdown"]',
	);
	if (!sonnetButton) {
		console.error('Could not find Sonnet button');
		return;
	}

	const targetContainer = sonnetButton.parentElement;
	if (!targetContainer) {
		console.error('Could not find target container');
		return;
	}

	if (targetContainer.querySelector('[data-testid="template-selector-dropdown"]')) {
		return;
	}

	// Create container for React root
	const templateContainer = document.createElement('div');
	templateContainer.id = 'template-button-root';
	targetContainer.appendChild(templateContainer);

	// Create React root and render TemplateButton
	const root = createRoot(templateContainer);

	const [showDropdown, setShowDropdown] = React.useState(false);
	const [dropdownPosition, setDropdownPosition] = React.useState({});

	const handleToggleDropdown = event => {
		event.stopPropagation();

		if (!showDropdown) {
			const buttonRect = event.currentTarget.getBoundingClientRect();
			setDropdownPosition({
				transform: `translate(${buttonRect.left}px, ${buttonRect.top - 265 - 4}px)`,
			});
		}

		setShowDropdown(!showDropdown);
	};

	root.render(
		<>
			<TemplateButton onToggleDropdown={handleToggleDropdown} />
			{showDropdown && (
				<TemplateDropdown
					position={dropdownPosition}
					onClose={() => setShowDropdown(false)}
				/>
			)}
		</>,
	);

	console.log('Template button initialized and added to:', targetContainer);
}

// Initialize when page is ready
async function initialize() {
	try {
		await waitForElement('[data-testid="style-selector-dropdown"]');
		await sleep(500);
		await initializeTemplateButton();
	} catch (error) {
		console.error('Failed to initialize:', error);
	}
}

// Start initialization when page loads
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initialize);
} else {
	initialize();
}

// Watch for navigation changes (for SPA)
let lastUrl = location.href;
new MutationObserver(() => {
	const url = location.href;
	if (url !== lastUrl) {
		lastUrl = url;
		initialize();
	}
}).observe(document, {subtree: true, childList: true});
