import {  test, expect } from "@playwright/test";
test.describe("Simon Says", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/lobby');
        await page.getByLabel(/player name/i).fill("Test Player");
        await page.locator('label').filter({ hasText: 'Wizard' }).getByRole('img').click();
        await page.getByRole("button", { name: /save settings/i }).click();
        await page.getByRole("navigation").getByRole("link", { name: /simon says/i }).click();
    });
    test("load the initial state of the game", async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Simon Says' })).toBeVisible();
        await expect(page.getByText('Level: 0')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Red' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Green' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Blue' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Yellow' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Start Game' })).toBeVisible();
    });
    test("ability to interact with the game components", async ({ page }) => {
        await page.getByRole('button', { name: 'Start Game' }).click();
        await expect(page.getByRole('button', { name: 'Red' })).toBeEnabled({timeout: 2000});
        await expect(page.getByText('Your turn!')).toBeVisible();
    });
    test("ability to reset a game to return to initial state", async ({ page }) => {
        await page.getByRole('button', { name: 'Start Game' }).click();
        await expect(page.getByRole('button', { name: 'Red' })).toBeEnabled({timeout: 2000});
        while(!(await page.getByText('Game Over!').isVisible())){
            for(const color of ['Red', 'Green', 'Blue', 'Yellow']){
                const button = page.getByRole('button', {name: color})
                if(await button.isEnabled()){
                    await button.click();
                }
            }
        }
        await expect(page.getByText('Game Over!')).toBeVisible();
        await page.getByRole('button', { name: 'Start Game' }).click();
        await expect(page.getByText('Level: 0')).toBeVisible();
    });
});