import { test, expect } from '@playwright/test';
import testUsers from './test-data/users.json';

test.describe('Users Page - Problem #2 Acceptance Criteria', () => {

	test.beforeEach(async ({ page }) => {
		// Mock the users API endpoint with consistent test data to match README requirements 
		await page.route('**/users', async (route) => {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify(testUsers),
			});
		});

		await page.goto('/');
		await page.waitForURL(/\/dashboard/);
		await expect(page).toHaveURL(/\/dashboard/);
	});

	test('should have Users section in sidebar and navigate to Users page', async ({ page }) => {
		const usersMenuItem = page.locator('[role="menu"] >> text=Users').first();
		await expect(usersMenuItem).toBeVisible();
		await usersMenuItem.click();

		await expect(page).toHaveURL(/\/users/);
		await expect(page.locator('h2:has-text("Users")')).toBeVisible();
	});

	test('should load table with 13 elements and pagination', async ({ page }) => {
		await page.click('[role="menu"] >> text=Users');
		await page.waitForURL(/\/users/);
		await page.waitForSelector('table tbody tr:not([aria-hidden="true"])', { state: 'visible' });

		const tableRows = page.locator('table tbody tr:not([aria-hidden="true"])');
		await expect(tableRows).toHaveCount(13);

		const pagination = page.locator('.ant-pagination');
		await expect(pagination).toBeVisible();

		await expect(page.locator('text=/\\d+-\\d+ of \\d+ users/')).toBeVisible();
	});

	test('should navigate to page 2 and display different rows', async ({ page }) => {
		await page.click('[role="menu"] >> text=Users');
		await page.waitForURL(/\/users/);

		await page.waitForSelector('table tbody tr:not([aria-hidden="true"])');

		const firstRowPage1 = page.locator('table tbody tr:not([aria-hidden="true"])').first();
		const firstRowIdPage1 = await firstRowPage1.locator('td').first().textContent();

		await page.click('.ant-pagination-item-2');

		await page.waitForTimeout(500);

		const tableRows = page.locator('table tbody tr:not([aria-hidden="true"])');
		await expect(tableRows).toHaveCount(13); // check that we have 13 rows on page 2

		const firstRowPage2 = page.locator('table tbody tr:not([aria-hidden="true"])').first();
		const firstRowIdPage2 = await firstRowPage2.locator('td').first().textContent();

		expect(firstRowIdPage1).not.toBe(firstRowIdPage2); // verify the rows are different (different IDs)
	});

	test('should sort by Email column (ASC/DESC)', async ({ page }) => {
		await page.click('[role="menu"] >> text=Users');
		await page.waitForURL(/\/users/);

		await page.waitForSelector('table tbody tr:not([aria-hidden="true"])');

		await page.click('th:has-text("Email")');

		await page.waitForTimeout(500);

		const firstEmailAsc = await page.locator('table tbody tr:not([aria-hidden="true"])').first().locator('td').nth(4).textContent();

		await page.click('th:has-text("Email")');
		await page.waitForTimeout(500);

		const firstEmailDesc = await page.locator('table tbody tr:not([aria-hidden="true"])').first().locator('td').nth(4).textContent();

		// Verify emails are different (sorted differently)
		expect(firstEmailAsc).not.toBe(firstEmailDesc);

		await expect(page.locator('th:has-text("Email") .ant-table-column-sorter')).toBeVisible();
	});

	test('should filter by First Name - "Miles" shows ID=4 (README requirement)', async ({ page }) => {
		await page.click('[role="menu"] >> text=Users');
		await page.waitForURL(/\/users/);
		await page.waitForSelector('table tbody tr:not([aria-hidden="true"])');

		await page.fill('[data-testid="first-name-filter"]', 'Miles');
		await page.waitForTimeout(500);

		const tableRows = page.locator('table tbody tr:not([aria-hidden="true"])');
		await expect(tableRows).toHaveCount(1);

		// Check that the visible row has ID=4 and first name Miles
		const firstCell = tableRows.first().locator('td').first();
		await expect(firstCell).toHaveText('4');

		const firstNameCell = tableRows.first().locator('td').nth(1);
		await expect(firstNameCell).toHaveText('Miles');
	});

	test('should clear First Name filter and return to original state', async ({ page }) => {
		await page.click('[role="menu"] >> text=Users');
		await page.waitForURL(/\/users/);
		await page.waitForSelector('table tbody tr:not([aria-hidden="true"])');

		await page.fill('[data-testid="first-name-filter"]', 'Miles');
		await page.waitForTimeout(500);

		await expect(page.locator('table tbody tr:not([aria-hidden="true"])')).toHaveCount(1);

		await page.click('[data-testid="first-name-filter"] + .ant-input-suffix .anticon');
		await page.waitForTimeout(500);

		await expect(page.locator('table tbody tr:not([aria-hidden="true"])')).toHaveCount(13);
	});

	test('should filter by Last Name - "Cummerata" shows ID=4 (README requirement)', async ({ page }) => {
		await page.click('[role="menu"] >> text=Users');
		await page.waitForURL(/\/users/);
		await page.waitForSelector('table tbody tr:not([aria-hidden="true"])');

		await page.fill('[data-testid="last-name-filter"]', 'Cummerata');

		await page.waitForTimeout(500);

		const tableRows = page.locator('table tbody tr:not([aria-hidden="true"])');
		await expect(tableRows).toHaveCount(1);

		// Check that the visible row has ID=4 and last name Cummerata
		const firstCell = tableRows.first().locator('td').first();
		await expect(firstCell).toHaveText('4');

		const lastNameCell = tableRows.first().locator('td').nth(2);
		await expect(lastNameCell).toHaveText('Cummerata');
	});

	test('should clear Last Name filter and return to original state', async ({ page }) => {
		await page.click('[role="menu"] >> text=Users');
		await page.waitForURL(/\/users/);
		await page.waitForSelector('table tbody tr:not([aria-hidden="true"])');

		await page.fill('[data-testid="last-name-filter"]', 'Cummerata');
		await page.waitForTimeout(500);

		await expect(page.locator('table tbody tr:not([aria-hidden="true"])')).toHaveCount(1);

		await page.click('[data-testid="last-name-filter"] + .ant-input-suffix .anticon');
		await page.waitForTimeout(500);

		await expect(page.locator('table tbody tr:not([aria-hidden="true"])')).toHaveCount(13);
	});

	test('should have all required columns with correct data', async ({ page }) => {
		await page.click('[role="menu"] >> text=Users');
		await page.waitForURL(/\/users/);

		await page.waitForSelector('table tbody tr:not([aria-hidden="true"])');

		await expect(page.locator('th:has-text("ID")')).toBeVisible();
		await expect(page.locator('th:has-text("First Name")')).toBeVisible();
		await expect(page.locator('th:has-text("Last Name")')).toBeVisible();
		await expect(page.locator('th').filter({ hasText: /^Name$/ })).toBeVisible(); // Exact match for "Name" column
		await expect(page.locator('th:has-text("Email")')).toBeVisible();
		await expect(page.locator('th:has-text("Image")')).toBeVisible();

		const firstRow = page.locator('table tbody tr:not([aria-hidden="true"])').first();
		const cells = firstRow.locator('td');

		await expect(cells.nth(0)).toContainText(/^\d+$/);

		await expect(cells.nth(1)).not.toBeEmpty();

		await expect(cells.nth(2)).not.toBeEmpty();

		// Name column
		const firstName = await cells.nth(1).textContent();
		const lastName = await cells.nth(2).textContent();
		const fullName = await cells.nth(3).textContent();
		expect(fullName).toBe(`${firstName} ${lastName}`);

		// Email column
		await expect(cells.nth(4)).toContainText(/@/);

		// Image column has Avatar component
		await expect(cells.nth(5).locator('.ant-avatar')).toBeVisible();
	});

	test('should show loading state while fetching data', async ({ page }) => {
		// Override the mock to add delay to test loading state
		await page.route('**/users', async (route) => {
			await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify(testUsers),
			});
		});

		await page.click('[role="menu"] >> text=Users');
		await page.waitForURL(/\/users/);

		// loading is visible
		await expect(page.locator('.ant-spin')).toBeVisible();
		await page.waitForSelector('table tbody tr:not([aria-hidden="true"])', { state: 'visible' });
		// loading spinner is gone after loading is complete
		await expect(page.locator('.ant-spin')).not.toBeVisible();
	});
});


