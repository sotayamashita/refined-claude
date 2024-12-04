
import {getSettings} from './options-storage.js';

// Initialize on first installation
chrome.runtime.onInstalled.addListener(async ({reason}) => {
	if (reason === 'install') {
		await getSettings(); // Initialize default settings
	}
});

// Handle messages
chrome.runtime.onMessage.addListener(message => {
	if (message.action === 'openOptions') {
		chrome.runtime.openOptionsPage();
	}
});
