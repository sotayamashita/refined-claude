import React, { useEffect, useState, FormEvent } from 'react';
import { getSettings, saveSettings } from '../options-storage';

interface Template {
  title: string;
  content: string;
}

interface Settings {
  templates: Template[];
}

export const OptionsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({ templates: [] });
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const loadedSettings = await getSettings();
      setSettings(loadedSettings);
    };
    loadSettings();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const updatedSettings = {
      ...settings,
      templates: [...settings.templates, { title: newTitle, content: newContent }],
    };

    await saveSettings(updatedSettings);
    setSettings(updatedSettings);
    setNewTitle('');
    setNewContent('');
  };

  const handleDelete = async (index: number) => {
    const updatedSettings = {
      ...settings,
      templates: settings.templates.filter((_, i) => i !== index),
    };

    await saveSettings(updatedSettings);
    setSettings(updatedSettings);
  };

  return (
    <form id="options-form" className="detail-view-container" onSubmit={handleSubmit}>
      <h1>Refined Claude Settings</h1>
      <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">
        Open Claude in a new tab
      </a>
      <section>
        <h2>New</h2>
        <div className="row">
          <label htmlFor="template-title">Title</label>
          <input
            type="text"
            id="template-title"
            name="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
        </div>
        <div className="row">
          <label htmlFor="template-content">Content</label>
          <textarea
            id="template-content"
            name="content"
            rows={16}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            required
          />
        </div>
        <div className="row">
          <button type="submit" className="browser-style">
            Add
          </button>
        </div>

        <h2 className="template-list-header">List</h2>
        <div id="templates-container">
          {settings.templates.map((template, index) => (
            <div key={index} className="template-item" data-index={index}>
              <div className="template-title">{template.title}</div>
              <div className="template-content">{template.content}</div>
              <div className="template-actions">
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </form>
  );
};
