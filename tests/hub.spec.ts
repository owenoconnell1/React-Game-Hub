import { test, expect } from "@playwright/test";
test.describe("Game Hub", () => {
    test("loads the landing page", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveTitle(/react-game-lobby-and-rps/);
    });
    test("lists available games", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByRole("list").getByRole("link", { name: /rock paper scissors/i })).toBeVisible();
        await expect(page.getByRole("list").getByRole("link", { name: /tic tac toe/i })).toBeVisible();
        await expect(page.getByRole("list").getByRole("link", { name: /wordle/i })).toBeVisible();
        await expect(page.getByRole("list").getByRole("link", { name: /simon says/i })).toBeVisible();
    });
    test("captures a player name ", async ({ page }) => {
        await page.goto('/lobby');
        await page.getByLabel(/player name/i).fill("Test Player");
        await page.locator('label').filter({ hasText: 'Wizard' }).getByRole('img').click();
        await page.getByRole("button", { name: /save settings/i }).click();
    });
    test("navigates from hub into all game page and back", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("list").getByRole("link", { name: /rock paper scissors/i }).click();

        await page.getByLabel(/player name/i).fill("Test Player");
        await page.locator('label').filter({ hasText: 'Wizard' }).getByRole('img').click();
        await page.getByRole("button", { name: /save settings/i }).click();

        await page.pause();
        await page.getByRole('heading', { name: 'Rock Paper Scissors' }).isVisible();
        await page.getByRole("link", { name: /home/i }).click();
        await expect(page).toHaveURL("/");
    });
    test("player name is displayed on all game pages", async ({ page }) => {
        await page.goto('/lobby');
        await page.getByLabel(/player name/i).fill("Test Player");
        await page.locator('label').filter({ hasText: 'Wizard' }).getByRole('img').click();
        await page.getByRole("button", { name: /save settings/i }).click();

        await page.getByRole("link", { name: /home/i }).click();
        await expect(page.getByText('Test Player')).toBeVisible();

        await page.getByRole('navigation').getByRole('link', { name: 'Rock Paper Scissors' }).click();
        await expect(page.getByRole('navigation').getByText('Test Player')).toBeVisible();

        await page.getByRole('navigation').getByRole('link', { name: 'Tic Tac Toe' }).click();
        await expect(page.getByRole('navigation').getByText('Test Player')).toBeVisible();

        await page.getByRole('navigation').getByRole('link', { name: 'Wordle' }).click();
        await expect(page.getByRole('navigation').getByText('Test Player')).toBeVisible();

        await page.getByRole('navigation').getByRole('link', { name: 'Simon Says' }).click();
        await expect(page.getByRole('navigation').getByText('Test Player')).toBeVisible();

    });

});