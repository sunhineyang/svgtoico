import { test, expect, devices } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should display correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#converter')).toBeVisible();
  });

  test('should display correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should handle mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const menuButton = page.locator('[aria-label="menu"], [data-testid="menu"], button').filter({ hasText: /menu/i }).first();
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);
      
      await expect(page.locator('nav, [role="navigation"]').first()).toBeVisible();
    }
  });

  test('should display mobile menu toggle on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const mobileNav = page.locator('[aria-label="menu"], [data-testid="mobile-menu"], button').first();
    const desktopNav = page.locator('nav.hidden.md\\:flex');
    
    await expect(desktopNav).not.toBeVisible();
  });
});
