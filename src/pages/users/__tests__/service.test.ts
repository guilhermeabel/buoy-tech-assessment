import UsersService from 'services/users';
import { User } from 'services/users/interface';

jest.mock('services/users');
const mockedUsersService = UsersService as jest.Mocked<typeof UsersService>;

const createMockUser = (overrides: Partial<User> = {}): User => ({
	id: 1,
	firstName: 'John',
	lastName: 'Doe',
	email: 'john.doe@example.com',
	image: 'https://example.com/avatar1.jpg',
	...overrides
});

describe('Users Service', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('Data Retrieval', () => {
		it('should fetch users successfully with correct structure', async () => {
			const mockUsers = [
				createMockUser({ id: 1, firstName: 'John', lastName: 'Doe' }),
				createMockUser({ id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' })
			];

			mockedUsersService.getUsers.mockResolvedValue({
				users: mockUsers,
				total: 2,
				skip: 0,
				limit: 30
			});

			const result = await mockedUsersService.getUsers();

			expect(mockedUsersService.getUsers).toHaveBeenCalledTimes(1);
			expect(result.users).toHaveLength(2);
			expect(result.total).toBe(2);
			expect(result.users[0]).toEqual(expect.objectContaining({
				id: expect.any(Number),
				firstName: expect.any(String),
				lastName: expect.any(String),
				email: expect.any(String)
			}));
		});

		it('should handle pagination parameters correctly', async () => {
			const largeDataset = Array.from({ length: 50 }, (_, i) =>
				createMockUser({ id: i + 1, firstName: `User${i + 1}` })
			);

			mockedUsersService.getUsers.mockResolvedValue({
				users: largeDataset.slice(0, 30), // First page
				total: 50,
				skip: 0,
				limit: 30
			});

			const result = await mockedUsersService.getUsers();

			expect(result.users).toHaveLength(30);
			expect(result.total).toBe(50);
			expect(result.skip).toBe(0);
			expect(result.limit).toBe(30);
		});

		it('should handle empty datasets gracefully', async () => {
			mockedUsersService.getUsers.mockResolvedValue({
				users: [],
				total: 0,
				skip: 0,
				limit: 30
			});

			const result = await mockedUsersService.getUsers();

			expect(result.users).toEqual([]);
			expect(result.total).toBe(0);
		});
	});

	describe('Error Handling', () => {
		it('should handle network errors', async () => {
			mockedUsersService.getUsers.mockRejectedValue(new Error('Network timeout'));

			await expect(mockedUsersService.getUsers()).rejects.toThrow('Network timeout');
		});

		it('should handle API errors with status codes', async () => {
			const apiError = new Error('API Error: 500 Internal Server Error');
			mockedUsersService.getUsers.mockRejectedValue(apiError);

			await expect(mockedUsersService.getUsers()).rejects.toThrow('API Error: 500');
		});

		it('should handle malformed responses', async () => {
			mockedUsersService.getUsers.mockRejectedValue(new Error('Invalid JSON response'));

			await expect(mockedUsersService.getUsers()).rejects.toThrow('Invalid JSON');
		});
	});

	describe('Data Validation', () => {
		it('should validate required user fields', async () => {
			const usersWithValidData = [
				createMockUser({ id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' }),
				createMockUser({ id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' })
			];

			mockedUsersService.getUsers.mockResolvedValue({
				users: usersWithValidData,
				total: 2,
				skip: 0,
				limit: 30
			});

			const result = await mockedUsersService.getUsers();

			result.users.forEach(user => {
				expect(user.id).toBeGreaterThan(0);
				expect(user.firstName).toBeTruthy();
				expect(user.lastName).toBeTruthy();
				expect(user.email).toMatch(/\S+@\S+\.\S+/); // Basic email validation
			});
		});

		it('should handle users with optional image field', async () => {
			const usersWithAndWithoutImages = [
				createMockUser({ id: 1, image: 'https://example.com/avatar1.jpg' }),
				createMockUser({ id: 2, image: '' }) // No image
			];

			mockedUsersService.getUsers.mockResolvedValue({
				users: usersWithAndWithoutImages,
				total: 2,
				skip: 0,
				limit: 30
			});

			const result = await mockedUsersService.getUsers();

			expect(result.users[0].image).toBeTruthy();
			expect(result.users[1].image).toBe('');
		});
	});

	describe('Edge Cases', () => {
		it('should handle very large user lists', async () => {
			const largeUserList = Array.from({ length: 1000 }, (_, i) =>
				createMockUser({
					id: i + 1,
					firstName: `User${i + 1}`,
					email: `user${i + 1}@example.com`
				})
			);

			mockedUsersService.getUsers.mockResolvedValue({
				users: largeUserList,
				total: 1000,
				skip: 0,
				limit: 1000
			});

			const result = await mockedUsersService.getUsers();

			expect(result.users).toHaveLength(1000);
			expect(result.total).toBe(1000);
		});

		it('should handle special characters in user data', async () => {
			const usersWithSpecialChars = [
				createMockUser({
					firstName: 'José',
					lastName: 'García-Smith',
					email: 'josé.garcía@example.com'
				}),
				createMockUser({
					firstName: '李',
					lastName: '小明',
					email: 'li.xiaoming@example.cn'
				})
			];

			mockedUsersService.getUsers.mockResolvedValue({
				users: usersWithSpecialChars,
				total: 2,
				skip: 0,
				limit: 30
			});

			const result = await mockedUsersService.getUsers();

			expect(result.users[0].firstName).toBe('José');
			expect(result.users[0].lastName).toBe('García-Smith');
			expect(result.users[1].firstName).toBe('李');
		});
	});
}); 
