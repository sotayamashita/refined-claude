import {createElement} from 'react';
import {createRoot} from 'react-dom/client';
import {TemplateButton} from './components/template-button.js';
import {TemplateDropdown} from './components/template-dropdown.js';

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
	const container = document.createElement('div');
	container.id = 'refined-claude-container';
	document.body.append(container);

	// Create React root and render components
	const root = createRoot(container);
	root.render(
		<>
			<TemplateButton />
			<TemplateDropdown />
		</>,
	);

	console.log('Template components initialized and added to document body');
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
