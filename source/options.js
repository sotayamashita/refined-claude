import { getSettings, saveSettings } from "./options-storage.js";

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
    const container = document.getElementById("templates-container");
    const settings = await getSettings();
    container.innerHTML = settings.templates.map(createTemplateHTML).join("");
  } catch (error) {
    console.error("Failed to render templates:", error);
  }
}

// Generalize settings update
async function updateSettings(updateFn) {
  try {
    const settings = await getSettings();
    updateFn(settings);
    await saveSettings(settings);
    await renderTemplates();
  } catch (error) {
    console.error("Failed to update settings:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const settings = await getSettings();

    // Initialize and set checkbox
    const checkbox = document.querySelector(
      'input[name="preventEnterPropagation"]',
    );
    checkbox.checked = settings.preventEnterPropagation;

    checkbox.addEventListener("change", (e) => {
      updateSettings((settings) => {
        settings.preventEnterPropagation = e.target.checked;
      });
    });

    await renderTemplates();

    // Handler for adding templates
    document
      .getElementById("options-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = document.getElementById("template-title").value;
        const content = document.getElementById("template-content").value;

        await updateSettings((settings) => {
          settings.templates.push({ title, content });
        });
        e.target.reset();
      });

    // Handler for delete button
    document
      .getElementById("templates-container")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-button")) {
          const index = parseInt(e.target.dataset.index, 10);
          updateSettings((settings) => {
            settings.templates.splice(index, 1);
          });
        }
      });
  } catch (error) {
    console.error("Failed to initialize options:", error);
  }
});
