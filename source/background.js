import {getSettings} from './options-storage.js';

// Constants
const MESSAGE_ACTIONS = {
	OPEN_OPTIONS: 'openOptions',
};

// Initialize on first installation
chrome.runtime.onInstalled.addListener(async ({reason}) => {
	try {
		if (reason === 'install') {
			await getSettings(); // Initialize default settings
		}
	} catch (error) {
		console.error('Installation error:', error);
	}
});

// Handle messages
const handleMessage = async message => {
	try {
		if (message.action === MESSAGE_ACTIONS.OPEN_OPTIONS) {
			await chrome.runtime.openOptionsPage();
		}

		return true; // Keep message channel open for async response
	} catch (error) {
		console.error('Message handling error:', error);
		return false;
	}
};

chrome.runtime.onMessage.addListener(handleMessage);
