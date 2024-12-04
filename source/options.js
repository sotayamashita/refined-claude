// eslint-disable-next-line import/no-unassigned-import
import 'webext-base-css';
import './options.css';
import {getSettings, saveSettings} from './options-storage.js';

// Generate HTML for template item
function createTemplateHTML(template, index) {
	return `
		<div class="template-item" data-index="${index}">
			<div class="template-title">${template.title}</div>
			<div class="template-content">${template.content}</div>
			<div class="template-actions">
				<button type="button" class="delete-button">Delete</button>
			</div>
		</div>
	`;
}

// Display list of templates
async function renderTemplates() {
	const container = document.querySelector('#templates-container');
	const settings = await getSettings();
	container.innerHTML = settings.templates
		.map((template, index) => createTemplateHTML(template, index))
		.join('');
}

// Generalize settings update
async function updateSettings(updateFunction) {
	const settings = await getSettings();
	updateFunction(settings);
	await saveSettings(settings);
	await renderTemplates();
}

function handleAddTemplate(event) {
	event.preventDefault();
	const title = document.querySelector('#template-title').value;
	const content = document.querySelector('#template-content').value;

	if (!title || !content) {
		return;
	}

	updateSettings(settings => {
		settings.templates.push({title, content});
	});
	event.target.reset();
}

function handleDeleteTemplate(event) {
	if (!event.target.classList.contains('delete-button')) {
		return;
	}

	const templateItem = event.target.closest('.template-item');
	const index = Array.from(templateItem.parentNode.children).indexOf(templateItem);

	updateSettings(settings => {
		settings.templates.splice(index, 1);
	});
}

async function initializeOptions() {
	await renderTemplates();
	document.querySelector('#options-form').addEventListener('submit', handleAddTemplate);
	document.querySelector('#templates-container').addEventListener('click', handleDeleteTemplate);
}

document.addEventListener('DOMContentLoaded', () => {
	initializeOptions().catch(error => {
		console.error('Failed to initialize options:', error);
	});
});
