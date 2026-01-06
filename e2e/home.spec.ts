import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle(/SVG to ICO Converter/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display navigation links in correct order', async ({ page }) => {
    await page.goto('/');
    
    const nav = page.locator('nav');
    
    await expect(nav.getByText('SVG to ICO')).toBeVisible();
    await expect(nav.getByText('FAQ')).toBeVisible();
    await expect(nav.getByText('Guide')).toBeVisible();
    
    const links = await nav.locator('a').all();
    expect(links.length).toBeGreaterThanOrEqual(3);
  });

  test('should navigate to converter section from any page', async ({ page }) => {
    await page.goto('/svg-ico-guide');
    
    await page.click('text=SVG to ICO');
    
    await expect(page).toHaveURL(/.*\/#converter/);
    await expect(page.locator('#converter')).toBeVisible();
  });

  test('should display converter section', async ({ page }) => {
    await page.goto('/#converter');
    
    await expect(page.locator('#converter')).toBeVisible();
    await expect(page.getByText(/Convert/)).toBeVisible();
  });

  test('should navigate to FAQ section', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=FAQ');
    
    await expect(page).toHaveURL(/.*\/#faq/);
    await expect(page.locator('#faq')).toBeVisible();
  });

  test('should navigate to Guide page', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=Guide');
    
    await expect(page).toHaveURL('/svg-ico-guide');
    await expect(page.getByText(/SVG to ICO Guide/)).toBeVisible();
  });
});
