import { test, expect } from '@grafana/plugin-e2e';

test('Smoke test: plugin loads config page', async ({ createDataSourceConfigPage, page }) => {
  await createDataSourceConfigPage({ type: 'marcusolsson-json-datasource' });

  await expect(await page.getByText('Type: JSON API', { exact: true })).toBeVisible();
  await expect(await page.getByText('Query string', { exact: true })).toBeVisible();
});

test('Smoke test: plugin query editor works', async ({ createDataSource, page, panelEditPage }) => {
  const datasource = await createDataSource({ type: 'marcusolsson-json-datasource' });

  await panelEditPage.datasource.set(datasource.name);

  await expect(await page.getByText('Cache Time')).toBeVisible();
});
