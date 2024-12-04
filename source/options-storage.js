// Template type definition
const defaultTemplates = [
	{
		title: 'Sample Template',
		content:
      'You are an intelligent programmer, powered by Claude 3.5 Sonnet. You are happy to help answer any questions that the user has (usually they will be about coding). You will be given the context of the code in their file(s), your conversation history with them, and potentially relevant blocks of code.',
	},
];

const defaultSettings = {
	templates: defaultTemplates,
};

// Helper functions for storage operations
export async function getSettings() {
	const result = await chrome.storage.sync.get();
	return {...defaultSettings, ...result};
}

export async function saveSettings(settings) {
	await chrome.storage.sync.set(settings);
}

// Template management functions with improved error handling
export async function addTemplate(title, content) {
	if (!title || !content) {
		throw new Error('Template title and content are required');
	}

	try {
		const settings = await getSettings();
		settings.templates.push({title, content});
		await saveSettings(settings);
	} catch (error) {
		console.error('Failed to add template:', error);
		throw error;
	}
}

export async function deleteTemplate(index) {
	try {
		const settings = await getSettings();
		if (index < 0 || index >= settings.templates.length) {
			throw new Error('Invalid template index');
		}

		settings.templates.splice(index, 1);
		await saveSettings(settings);
	} catch (error) {
		console.error('Failed to delete template:', error);
		throw error;
	}
}
