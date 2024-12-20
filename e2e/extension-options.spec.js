import {test, expect} from './extention-fixtures';

test.describe('Chrome Extension Options Page', () => {
	test('should load options page', async ({page, extensionId, optionsPage}) => {
		await page.goto(`chrome-extension://${extensionId}/${optionsPage}`);
		await expect(page.locator('h1')).toHaveText('Refined Claude Settings');
	});
});
