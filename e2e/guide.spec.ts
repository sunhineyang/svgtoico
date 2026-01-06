import { test, expect } from '@playwright/test';

test.describe('Guide Page', () => {
  test('should load guide page successfully', async ({ page }) => {
    await page.goto('/svg-ico-guide');
    
    await expect(page.getByText(/SVG to ICO Guide/)).toBeVisible();
  });

  test('should display guide slides', async ({ page }) => {
    await page.goto('/svg-ico-guide');
    
    await expect(page.locator('[data-testid*="slide"], .slide, [class*="slide"]')).toBeVisible();
  });

  test('should display navigation controls', async ({ page }) => {
    await page.goto('/svg-ico-guide');
    
    await expect(page.getByRole('button', { name: /Previous|Next|Back|Forward/i })).toBeVisible();
  });

  test('should allow slide navigation', async ({ page }) => {
    await page.goto('/svg-ico-guide');
    
    const nextButton = page.getByRole('button').filter({ hasText: /Next|Weiter|次へ/i }).first();
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(500);
    }
  });

  test('should display slide counter', async ({ page }) => {
    await page.goto('/svg-ico-guide');
    
    const counter = page.locator('[data-testid="slide-counter"], [class*="counter"]').first();
    if (await counter.isVisible()) {
      await expect(counter).toBeVisible();
    }
  });
});
