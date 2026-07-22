import { expect, test } from '@grafana/plugin-e2e';

test.describe('Config Editor', () => {
  test('should render connection settings', async ({ createDataSourceConfigPage, page }) => {
    await createDataSourceConfigPage({ type: 'marcusolsson-json-datasource' });

    await expect(page.getByRole('textbox', { name: /URL/i })).toBeVisible();
  });

  test('should render additional settings section and expand it', async ({ createDataSourceConfigPage, page }) => {
    await createDataSourceConfigPage({ type: 'marcusolsson-json-datasource' });

    const additionalSettings = page.getByText('Additional settings');
    await expect(additionalSettings).toBeVisible();

    // Click to expand the collapsible section
    await additionalSettings.click();

    await expect(page.getByText('Query string', { exact: true })).toBeVisible();
  });

  test('should allow entering a URL', async ({ createDataSourceConfigPage, page }) => {
    await createDataSourceConfigPage({ type: 'marcusolsson-json-datasource' });

    const urlInput = page.getByRole('textbox', { name: /URL/i });
    await urlInput.fill('http://example.com/api');
    await expect(urlInput).toHaveValue('http://example.com/api');
  });
});
