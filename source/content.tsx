import React from 'react';
import { createRoot } from 'react-dom/client';
import { TemplateButton } from './components/TemplateButton';
import { getSettings } from './options-storage';

// Wait for page to be fully loaded and ready
function waitForElement(selector: string, timeout = 5000): Promise<Element> {
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

const sleep = (ms: number) => new Promise(resolve => {
  setTimeout(resolve, ms);
});

// Initialize template button
async function initializeTemplateButton() {
  // Find the Sonnet button
  const sonnetButton = await waitForElement(
    'button[data-testid="model-selector-dropdown"]',
  );
  if (!sonnetButton) {
    console.error('Could not find Sonnet button');
    return;
  }

  // Find the target container
  const targetContainer = sonnetButton.parentElement;
  if (!targetContainer) {
    console.error('Could not find target container');
    return;
  }

  // Check for existing template button
  if (
    targetContainer.querySelector('[data-testid="template-selector-dropdown"]')
  ) {
    return;
  }

  // Create wrapper div for template button
  const templateWrapper = document.createElement('div');
  templateWrapper.className = 'flex items-center min-w-0 max-w-full';

  const innerWrapper = document.createElement('div');
  innerWrapper.className = 'min-w-24';
  innerWrapper.setAttribute('type', 'button');
  innerWrapper.dataset.state = 'closed';
  innerWrapper.style.opacity = '1';

  templateWrapper.appendChild(innerWrapper);
  targetContainer.appendChild(templateWrapper);

  // Create React root and render TemplateButton component
  const root = createRoot(innerWrapper);
  root.render(<TemplateButton />);

  console.log('Template button initialized and added to:', targetContainer);
}

// Initialize when page is ready
async function initialize() {
  try {
    // Wait for the style button to be present in DOM
    await waitForElement('[data-testid="style-selector-dropdown"]');

    // Wait a bit more to ensure all dynamic content is loaded
    await sleep(500);

    // Initialize the template button
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
}).observe(document, { subtree: true, childList: true });
