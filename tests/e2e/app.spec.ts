import { test, expect } from '@playwright/test';

test.describe('Enamel Care App E2E Tests', () => {
  test('homepage should load correctly', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Check if the page title is correct or a basic element exists
    // We assume the app is "Enamel Care"
    await expect(page).toHaveTitle(/My Google AI Studio App/i);

    // Wait for the main container to be visible (a typical React root id)
    await expect(page.locator('#root')).toBeVisible();
    
    // Optional: Take a screenshot to verify layout
    await page.screenshot({ path: 'test-results/homepage.png', fullPage: true });
  });

  test('navigation should work', async ({ page }) => {
    await page.goto('/');
    
    // Check if there are any links, try to click the first one if it exists
    const firstLink = page.locator('a').first();
    if (await firstLink.isVisible()) {
        await firstLink.click();
        // Wait for network idle or domcontentloaded after navigation
        await page.waitForLoadState('domcontentloaded');
        await expect(page.locator('#root')).toBeVisible();
    }
  });
});
