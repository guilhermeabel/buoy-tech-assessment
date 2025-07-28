import { UsersApiService } from '../api';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('UsersApiService', () => {
	let service: UsersApiService;

	beforeEach(() => {
		service = new UsersApiService();
		mockFetch.mockReset();
	});

	describe('buildEndpoint', () => {
		it('should override endpoint to point to DummyJSON API', () => {
			const endpoint = (service as any).buildEndpoint('/users');
			expect(endpoint).toBe('https://dummyjson.com/users');
		});

		it('should handle different endpoints correctly', () => {
			const endpoint1 = (service as any).buildEndpoint('/users');
			const endpoint2 = (service as any).buildEndpoint('/users/1');

			expect(endpoint1).toBe('https://dummyjson.com/users');
			expect(endpoint2).toBe('https://dummyjson.com/users/1');
		});
	});

	describe('getUsers', () => {
		it('should fetch users successfully', async () => {
			const mockUsersResponse = {
				users: [
					{
						id: 1,
						firstName: 'John',
						lastName: 'Doe',
						email: 'john.doe@example.com',
						image: 'https://example.com/avatar1.jpg'
					},
					{
						id: 2,
						firstName: 'Jane',
						lastName: 'Smith',
						email: 'jane.smith@example.com',
						image: 'https://example.com/avatar2.jpg'
					}
				],
				total: 2,
				skip: 0,
				limit: 30
			};

			mockFetch.mockResolvedValue({
				ok: true,
				headers: {
					get: jest.fn().mockReturnValue('application/json')
				},
				json: jest.fn().mockResolvedValue(mockUsersResponse),
				blob: jest.fn()
			});

			const result = await service.getUsers();

			expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/users', {
				method: 'GET'
			});
			expect(result).toEqual(mockUsersResponse);
		});

		it('should handle fetch errors', async () => {
			mockFetch.mockRejectedValue(new Error('Network error'));

			await expect(service.getUsers()).rejects.toThrow('Network error');
			expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/users', {
				method: 'GET'
			});
		});

	});
}); 
