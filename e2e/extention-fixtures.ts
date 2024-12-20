import path from 'node:path';
import fs from 'node:fs';
import {test as base, chromium, type BrowserContext} from '@playwright/test';

export const test = base.extend<{
	context: BrowserContext;
	extensionId: string;
	optionsPage: string;
}>({
	async context({ }, use) {
		const pathToExtension = path.join(__dirname, '../distribution');
		const context = await chromium.launchPersistentContext('', {
			headless: false,
			args: [
					// Enable headless mode when running in CI environment, otherwise run with browser UI
					process.env.CI ? `--headless=new` : '',
					`--disable-extensions-except=${pathToExtension}`,
					`--load-extension=${pathToExtension}`,
			],
		});
		await use(context);
		await context.close();
	},
	async extensionId({context}, use) {
		let [background] = context.serviceWorkers();
		background ||= await context.waitForEvent('serviceworker');

		const extensionId = background.url().split('/')[2];
		await use(extensionId);
	},
	async optionsPage({}, use) {
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
