import {getSettings, saveSettings} from './options-storage.js';

// Generate HTML for template item
function createTemplateHTML(template, index) {
	return `
		<div class="template-item">
			<div class="template-title">${template.title}</div>
			<div class="template-content">${template.content}</div>
			<div class="template-actions">
				<button type="button" class="delete-button" data-index="${index}">Delete</button>
			</div>
		</div>
	`;
}

// Display list of templates
async function renderTemplates() {
	try {
		const container = document.querySelector('#templates-container');
		const settings = await getSettings();
		container.innerHTML = settings.templates.map((template, index) => createTemplateHTML(template, index)).join('');
	} catch (error) {
		console.error('Failed to render templates:', error);
	}
}

// Generalize settings update
async function updateSettings(updateFunction) {
	try {
		const settings = await getSettings();
		updateFunction(settings);
		await saveSettings(settings);
		await renderTemplates();
	} catch (error) {
		console.error('Failed to update settings:', error);
	}
}

document.addEventListener('DOMContentLoaded', async () => {
	try {
		const settings = await getSettings();

		// Initialize and set checkbox
		const checkbox = document.querySelector(
			'input[name="preventEnterPropagation"]',
		);
		checkbox.checked = settings.preventEnterPropagation;

		checkbox.addEventListener('change', event => {
			updateSettings(settings => {
				settings.preventEnterPropagation = event.target.checked;
			});
		});

		await renderTemplates();

		// Handler for adding templates
		document
			.querySelector('#options-form')
			.addEventListener('submit', async event => {
				event.preventDefault();
				const title = document.querySelector('#template-title').value;
				const content = document.querySelector('#template-content').value;

				await updateSettings(settings => {
					settings.templates.push({title, content});
				});
				event.target.reset();
			});

		// Handler for delete button
		document
			.querySelector('#templates-container')
			.addEventListener('click', event => {
				if (event.target.classList.contains('delete-button')) {
					const index = Number.parseInt(event.target.dataset.index, 10);
					updateSettings(settings => {
						settings.templates.splice(index, 1);
					});
				}
			});
	} catch (error) {
		console.error('Failed to initialize options:', error);
	}
});
