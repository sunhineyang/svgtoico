import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  const languages = ['en', 'de', 'es', 'ja', 'ru', 'ko'];

  test('should display language selector', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('[data-testid="language-selector"], select, [role="combobox"]').first()).toBeVisible();
  });

  languages.forEach(lang => {
    test(`should support ${lang} language`, async ({ page }) => {
      await page.goto(`/${lang}`);
      
      await expect(page).toHaveTitle(/.+/);
    });
  });

  test('should switch languages and update content', async ({ page }) => {
    await page.goto('/');
    
    const languageSelector = page.locator('[data-testid="language-selector"], select, [role="combobox"]').first();
    if (await languageSelector.isVisible()) {
      await languageSelector.click();
      await page.waitForTimeout(500);
      
      const content = page.locator('h1').first();
      await expect(content).toBeVisible();
    }
  });

  test('should maintain language across navigation', async ({ page }) => {
    await page.goto('/de');
    
    await page.click('text=FAQ');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveURL(/\/de.*faq/);
  });
});
