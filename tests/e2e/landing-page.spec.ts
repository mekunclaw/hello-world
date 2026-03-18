import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('LP-001: Page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Hello World/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('LP-002: Hero section displays', async ({ page }) => {
    const hero = page.locator('[data-testid="hero"]');
    await expect(hero).toBeVisible();
    await expect(hero.locator('h1')).toContainText('Hello World');
  });

  test('LP-003: Navigation links work', async ({ page }) => {
    const navLinks = page.locator('nav a');
    await expect(navLinks).toBeVisible();
    
    const firstLink = navLinks.first();
    const href = await firstLink.getAttribute('href');
    await firstLink.click();
    await expect(page).toHaveURL(new RegExp(href || ''));
  });

  test('LP-004: CTA button works', async ({ page }) => {
    const cta = page.locator('[data-testid="cta-button"]');
    await expect(cta).toBeVisible();
    await expect(cta).toBeEnabled();
    await cta.click();
    await expect(page).toHaveURL('/get-started');
  });

  test('LP-005: Responsive design', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();
    
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
  });

  test('LP-006: Footer content', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('[data-testid="copyright"]')).toBeVisible();
  });

  test('LP-007: Accessibility audit', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toHaveLength(0);
  });

  test('LP-008: Performance check', async ({ page }) => {
    const response = await page.goto('http://localhost:3000');
    expect(response?.status()).toBe(200);
    
    const loadTime = await page.evaluate(() => {
      return performance.timing.loadEventEnd - performance.timing.navigationStart;
    });
    expect(loadTime).toBeLessThan(2000);
  });

  test('LP-009: Cross-browser compatibility', async ({ browserName }) => {
    // This test runs on all configured browsers
    expect(page.locator('h1')).toBeTruthy();
    console.log(`Testing on ${browserName}`);
  });

  test('LP-010: SEO metadata', async ({ page }) => {
    const title = await page.title();
    expect(title.length).toBeGreaterThanOrEqual(50);
    expect(title.length).toBeLessThanOrEqual(60);
    
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription.length).toBeGreaterThanOrEqual(150);
  });
});
