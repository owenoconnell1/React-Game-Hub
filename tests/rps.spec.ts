import {  test, expect } from "@playwright/test";
test.describe("Rock Paper Scissors", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/lobby');
        await page.getByLabel(/player name/i).fill("Test Player");
        await page.locator('label').filter({ hasText: 'Wizard' }).getByRole('img').click();
        await page.getByRole("button", { name: /save settings/i }).click();
        await page.getByRole("navigation").getByRole("link", { name: /rock paper scissors/i }).click();
    });
    test("load the initial state of the game", async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Rock Paper Scissors' })).toBeVisible();
        await expect(page.getByRole('list', { name: 'Game history' }).getByRole('listitem')).toHaveCount(0);
        await expect(page.getByLabel('Player score')).toHaveText('0');
        await expect(page.getByLabel('CPU score')).toHaveText('0');
        await expect(page.getByLabel('Ties score')).toHaveText('0');
    });
    test("ability to interact with the game components", async ({ page }) => {
        await page.getByRole('button', { name: 'Rock' }).click();
        await expect(page.getByText('Player(rock)')).toBeVisible();
        await page.getByRole('button', { name: 'Paper' }).click();
        await expect(page.getByText('Player(paper)')).toBeVisible();
        await page.getByRole('button', { name: 'Scissors' }).click();
        await expect(page.getByText('Player(scissors)')).toBeVisible();
    });
    test("ability to reset a game to return to initial state", async ({ page }) => {
        await page.getByRole('button', { name: 'Rock' }).click();
        await expect(page.getByText('Player(rock)')).toBeVisible();
        await page.getByRole('button', { name: 'Reset Game' }).click();
        await expect(page.getByRole('list', { name: 'Game history' }).getByRole('listitem')).toHaveCount(0);
        await expect(page.getByLabel('Player score')).toHaveText('0');
        await expect(page.getByLabel('CPU score')).toHaveText('0');
        await expect(page.getByLabel('Ties score')).toHaveText('0');
    });
});