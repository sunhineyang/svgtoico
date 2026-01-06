import { test, expect } from '@playwright/test';

test.describe('SVG to ICO Converter', () => {
  test('should display file upload area', async ({ page }) => {
    await page.goto('/#converter');
    
    await expect(page.locator('[type="file"]')).toBeVisible();
    await expect(page.getByText(/Drop your SVG/)).toBeVisible();
  });

  test('should allow file selection', async ({ page }) => {
    await page.goto('/#converter');
    
    const fileInput = page.locator('[type="file"]');
    const filePromise = page.waitForEvent('filechooser');
    await page.click('[type="file"]');
    const fileChooser = await filePromise;
    
    expect(fileChooser).toBeTruthy();
  });

  test('should display size options', async ({ page }) => {
    await page.goto('/#converter');
    
    await expect(page.getByText(/Size/)).toBeVisible();
  });

  test('should display convert button', async ({ page }) => {
    await page.goto('/#converter');
    
    await expect(page.getByRole('button', { name: /Convert/i })).toBeVisible();
  });

  test('should handle file upload interaction', async ({ page }) => {
    await page.goto('/#converter');
    
    const dropZone = page.locator('.dropzone, [data-testid="dropzone"], [type="file"]').first();
    await expect(dropZone).toBeVisible();
  });
});
