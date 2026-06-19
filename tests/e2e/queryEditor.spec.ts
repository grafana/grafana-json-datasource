import { expect, test } from '@grafana/plugin-e2e';

test.describe('Query Editor', () => {
  test('should render query editor with default Fields tab', async ({ createDataSource, page, panelEditPage }) => {
    const datasource = await createDataSource({ type: 'marcusolsson-json-datasource' });
    await panelEditPage.datasource.set(datasource.name);

    await expect(page.getByText('Cache Time')).toBeVisible();
    // Fields tab should be selected by default — verify JSONPath field input is present
    await expect(page.getByText('JSONPath', { exact: true })).toBeVisible();
  });

  test('should navigate to Path tab', async ({ createDataSource, page, panelEditPage }) => {
    const datasource = await createDataSource({ type: 'marcusolsson-json-datasource' });
    await panelEditPage.datasource.set(datasource.name);

    await page.getByRole('radio', { name: 'Path' }).click();
    await expect(page.getByPlaceholder('/orders/${orderId}')).toBeVisible();
  });

  test('should navigate to Params tab', async ({ createDataSource, page, panelEditPage }) => {
    const datasource = await createDataSource({ type: 'marcusolsson-json-datasource' });
    await panelEditPage.datasource.set(datasource.name);

    await page.getByRole('radio', { name: 'Params' }).click();
    await expect(page.getByRole('button', { name: 'Add param' })).toBeVisible();
  });

  test('should navigate to Headers tab', async ({ createDataSource, page, panelEditPage }) => {
    const datasource = await createDataSource({ type: 'marcusolsson-json-datasource' });
    await panelEditPage.datasource.set(datasource.name);

    await page.getByRole('radio', { name: 'Headers' }).click();
    await expect(page.getByRole('button', { name: 'Add header' })).toBeVisible();
  });

  test('should navigate to Body tab', async ({ createDataSource, page, panelEditPage }) => {
    const datasource = await createDataSource({ type: 'marcusolsson-json-datasource' });
    await panelEditPage.datasource.set(datasource.name);

    await page.getByRole('radio', { name: 'Body' }).click();
    await expect(page.getByText('Syntax highlighting')).toBeVisible();
  });

  test('should navigate to Experimental tab', async ({ createDataSource, page, panelEditPage }) => {
    const datasource = await createDataSource({ type: 'marcusolsson-json-datasource' });
    await panelEditPage.datasource.set(datasource.name);

    await page.getByRole('radio', { name: 'Experimental' }).click();
    await expect(page.getByText('The features listed here are experimental')).toBeVisible();
  });

  test('should switch between tabs without errors', async ({ createDataSource, page, panelEditPage }) => {
    const datasource = await createDataSource({ type: 'marcusolsson-json-datasource' });
    await panelEditPage.datasource.set(datasource.name);

    // Navigate to Path tab
    await page.getByRole('radio', { name: 'Path' }).click();
    await expect(page.getByPlaceholder('/orders/${orderId}')).toBeVisible();

    // Navigate to Params tab
    await page.getByRole('radio', { name: 'Params' }).click();
    await expect(page.getByRole('button', { name: 'Add param' })).toBeVisible();

    // Navigate to Headers tab
    await page.getByRole('radio', { name: 'Headers' }).click();
    await expect(page.getByRole('button', { name: 'Add header' })).toBeVisible();

    // Navigate to Body tab
    await page.getByRole('radio', { name: 'Body' }).click();
    await expect(page.getByText('Syntax highlighting')).toBeVisible();

    // Navigate back to Fields tab to verify round-trip works
    await page.getByRole('radio', { name: 'Fields' }).click();
    await expect(page.getByText('JSONPath', { exact: true })).toBeVisible();
  });
});

