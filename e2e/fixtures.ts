import { test as base, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';
import fs from 'fs';

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
  optionsPage: string;
}>({
  context: async ({ }, use) => {
    const pathToExtension = path.join(__dirname, '../distribution');
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background)
      background = await context.waitForEvent('serviceworker');

    const extensionId = background.url().split('/')[2];
    await use(extensionId);
  },
  optionsPage: async ({}, use) => {
    const distDir = path.join(__dirname, '../distribution');
    const files = fs.readdirSync(distDir);
    const optionsFile = files.find(file => file.startsWith('options.') && file.endsWith('.html'));
    if (!optionsFile) {
      throw new Error('Options page not found in dist directory');
    }
    await use(optionsFile);
  },
});
export const expect = test.expect;