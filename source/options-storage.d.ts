interface Template {
  title: string;
  content: string;
}

interface Settings {
  templates: Template[];
}

export function getSettings(): Promise<Settings>;
export function saveSettings(settings: Settings): Promise<void>;
export function addTemplate(title: string, content: string): Promise<void>;
export function deleteTemplate(index: number): Promise<void>;
