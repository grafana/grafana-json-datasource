import { expect, test } from '@grafana/plugin-e2e';

test.describe('Query Editor', () => {
  test('should render query editor with default Fields tab', async ({ createDataSource, page, panelEditPage }) => {
    const datasource = await createDataSource({ type: 'marcusolsson-json-datasource' });
    await panelEditPage.datasource.set(datasource.name);

    await expect(page.getByText('Cache Time')).toBeVisible();
    // Fields tab should be selected by default
    await expect(page.getByLabel('Field')).toBeVisible();
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
    await expect(page.getByText('Experimental Features')).toBeVisible();
  });

  test('should switch between all tabs without errors', async ({ createDataSource, page, panelEditPage }) => {
    const datasource = await createDataSource({ type: 'marcusolsson-json-datasource' });
    await panelEditPage.datasource.set(datasource.name);

    const tabs = ['Fields', 'Path', 'Params', 'Headers', 'Body', 'Experimental'];

    for (const tab of tabs) {
      await page.getByRole('radio', { name: tab }).click();
    }

    // Navigate back to Fields to verify round-trip works
    await page.getByRole('radio', { name: 'Fields' }).click();
    await expect(page.getByLabel('Field')).toBeVisible();
  });
});
