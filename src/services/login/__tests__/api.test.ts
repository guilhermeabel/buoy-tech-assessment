import { LoginApiService } from '../api';
import { LoginResponseData } from '../interface';

const mockFetchPost = jest.fn();
const mockConsoleLog = jest.fn();

const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
	writable: true,
});

Object.defineProperty(console, 'log', {
	value: mockConsoleLog,
	writable: true,
});

class TestableLoginApiService extends LoginApiService {
	public mockParseJwt = jest.fn();

	protected parseJwt(token: string) {
		return this.mockParseJwt(token);
	}

	protected async fetchPost(endpoint: string, options: any, body: any): Promise<any> {
		return mockFetchPost(endpoint, options, body);
	}

	public testStoreInLocalStorage(payload: LoginResponseData) {
		localStorage.setItem('loginData', JSON.stringify(payload));
	}

	public testRetrieveFromLocalStorage(): LoginResponseData | null {
		try {
			const serializedLoginData = localStorage.getItem('loginData');
			if (!serializedLoginData) {
				throw new Error('Not logged in');
			}
			return JSON.parse(serializedLoginData);
		} catch {
			return null;
		}
	}
}

describe('LoginApiService', () => {
	let service: TestableLoginApiService;
	const mockToken: LoginResponseData = {
		access: 'mock.access.token',
		refresh: 'mock.refresh.token',
	};

	const mockRefreshedToken: LoginResponseData = {
		access: 'new.access.token',
		refresh: 'new.refresh.token',
	};

	beforeEach(() => {
		service = new TestableLoginApiService();

		mockFetchPost.mockReset();
		mockConsoleLog.mockReset();
		localStorageMock.getItem.mockReset();
		localStorageMock.setItem.mockReset();
		localStorageMock.removeItem.mockReset();
		service.mockParseJwt.mockReset();
	});

	describe('getValidToken', () => {
		it('should return null when no token exists in localStorage', async () => {
			localStorageMock.getItem.mockReturnValue(null);

			const result = await service.getValidToken();

			expect(result).toBeNull();
			expect(localStorageMock.removeItem).toHaveBeenCalledWith('loginData');
		});

		it('should return null when token exists but has no access property', async () => {
			const invalidToken = { refresh: 'mock.refresh.token' };
			localStorageMock.getItem.mockReturnValue(JSON.stringify(invalidToken));

			const result = await service.getValidToken();

			expect(result).toBeNull();
			expect(localStorageMock.removeItem).toHaveBeenCalledWith('loginData');
		});

		it('should return current token when it is still valid', async () => {
			const futureTimestamp = Math.floor(Date.now() / 1000) + 3600; // 1 hour in the future

			localStorageMock.getItem.mockReturnValue(JSON.stringify(mockToken));
			service.mockParseJwt.mockReturnValue({ exp: futureTimestamp });

			const result = await service.getValidToken();

			expect(result).toEqual(mockToken);
			expect(mockFetchPost).not.toHaveBeenCalled();
		});

		it('should refresh token when it is expired', async () => {
			const pastTimestamp = Math.floor(Date.now() / 1000) - 3600; // 1 hour in the past

			localStorageMock.getItem
				.mockReturnValueOnce(JSON.stringify(mockToken))
				.mockReturnValueOnce(JSON.stringify(mockRefreshedToken));

			service.mockParseJwt.mockReturnValue({ exp: pastTimestamp });
			mockFetchPost.mockResolvedValue(mockRefreshedToken);

			const result = await service.getValidToken();

			expect(result).toEqual(mockRefreshedToken);
			expect(mockFetchPost).toHaveBeenCalledWith(
				'/refresh/',
				{ method: 'POST' },
				{ refresh: mockToken.refresh }
			);
			expect(localStorageMock.setItem).toHaveBeenCalledWith(
				'loginData',
				JSON.stringify(mockRefreshedToken)
			);
		});

		it('should handle refresh errors gracefully', async () => {
			const pastTimestamp = Math.floor(Date.now() / 1000) - 3600;

			localStorageMock.getItem.mockReturnValue(JSON.stringify(mockToken));
			service.mockParseJwt.mockReturnValue({ exp: pastTimestamp });
			mockFetchPost.mockRejectedValue(new Error('Refresh failed'));

			const result = await service.getValidToken();

			expect(result).toBeNull();
			expect(mockConsoleLog).toHaveBeenCalled();
			expect(localStorageMock.removeItem).toHaveBeenCalledWith('loginData');
		});

		it('should handle concurrent refresh requests - only one refresh should be triggered', async () => {
			const pastTimestamp = Math.floor(Date.now() / 1000) - 3600;

			localStorageMock.getItem
				.mockReturnValueOnce(JSON.stringify(mockToken))
				.mockReturnValueOnce(JSON.stringify(mockToken))
				.mockReturnValueOnce(JSON.stringify(mockToken))
				.mockReturnValue(JSON.stringify(mockRefreshedToken));

			service.mockParseJwt.mockReturnValue({ exp: pastTimestamp });

			let resolveRefresh: (value: LoginResponseData) => void;
			const refreshPromise = new Promise<LoginResponseData>((resolve) => {
				resolveRefresh = resolve;
			});
			mockFetchPost.mockReturnValue(refreshPromise);

			// Make 3 concurrent calls
			const promise1 = service.getValidToken();
			const promise2 = service.getValidToken();
			const promise3 = service.getValidToken();

			await new Promise(resolve => setTimeout(resolve, 10));
			expect(mockFetchPost).toHaveBeenCalledTimes(1);

			resolveRefresh!(mockRefreshedToken);

			const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3]);

			expect(result1).toEqual(mockRefreshedToken);
			expect(result2).toEqual(mockRefreshedToken);
			expect(result3).toEqual(mockRefreshedToken);

			expect(mockFetchPost).toHaveBeenCalledTimes(1);
			expect(mockFetchPost).toHaveBeenCalledWith(
				'/refresh/',
				{ method: 'POST' },
				{ refresh: mockToken.refresh }
			);
		});

		it('should handle concurrent refresh requests with error - all should return null', async () => {
			const pastTimestamp = Math.floor(Date.now() / 1000) - 3600;

			localStorageMock.getItem
				.mockReturnValueOnce(JSON.stringify(mockToken))
				.mockReturnValueOnce(JSON.stringify(mockToken))
				.mockReturnValueOnce(JSON.stringify(mockToken))
				.mockReturnValue(null);

			service.mockParseJwt.mockReturnValue({ exp: pastTimestamp });

			let rejectRefresh: (error: Error) => void;
			const refreshPromise = new Promise<LoginResponseData>((_, reject) => {
				rejectRefresh = reject;
			});
			mockFetchPost.mockReturnValue(refreshPromise);

			const promise1 = service.getValidToken();
			const promise2 = service.getValidToken();
			const promise3 = service.getValidToken();

			await new Promise(resolve => setTimeout(resolve, 10));

			expect(mockFetchPost).toHaveBeenCalledTimes(1);

			rejectRefresh!(new Error('Refresh failed'));

			const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3]);

			expect(result1).toBeNull();
			expect(result2).toBeNull();
			expect(result3).toBeNull();

			expect(mockFetchPost).toHaveBeenCalledTimes(1);
			expect(mockConsoleLog).toHaveBeenCalledTimes(3);
		});

		it('should reset refresh promise after completion', async () => {
			const pastTimestamp = Math.floor(Date.now() / 1000) - 3600;

			localStorageMock.getItem
				.mockReturnValueOnce(JSON.stringify(mockToken))
				.mockReturnValueOnce(JSON.stringify(mockRefreshedToken))
				.mockReturnValueOnce(JSON.stringify(mockRefreshedToken))
				.mockReturnValueOnce(JSON.stringify(mockRefreshedToken));

			service.mockParseJwt.mockReturnValue({ exp: pastTimestamp });
			mockFetchPost.mockResolvedValue(mockRefreshedToken);

			const result1 = await service.getValidToken();
			expect(result1).toEqual(mockRefreshedToken);
			expect(mockFetchPost).toHaveBeenCalledTimes(1);

			service.mockParseJwt.mockReturnValue({ exp: pastTimestamp });

			const result2 = await service.getValidToken();
			expect(result2).toEqual(mockRefreshedToken);
			expect(mockFetchPost).toHaveBeenCalledTimes(2);
		});
	});

	describe('login', () => {
		it('should store token in localStorage after successful login', async () => {
			const loginData = { email: 'test@example.com', password: 'password' };
			mockFetchPost.mockResolvedValue(mockToken);

			const result = await service.login(loginData);

			expect(result).toEqual(mockToken);
			expect(localStorageMock.setItem).toHaveBeenCalledWith(
				'loginData',
				JSON.stringify(mockToken)
			);
		});
	});

	describe('logout', () => {
		it('should remove token from localStorage', () => {
			service.logout();

			expect(localStorageMock.removeItem).toHaveBeenCalledWith('loginData');
		});
	});

	describe('getCurrentToken', () => {
		it('should return token from localStorage', async () => {
			localStorageMock.getItem.mockReturnValue(JSON.stringify(mockToken));

			const result = await service.getCurrentToken();

			expect(result).toEqual(mockToken);
		});

		it('should return null if no token in localStorage', async () => {
			localStorageMock.getItem.mockReturnValue(null);

			const result = await service.getCurrentToken();

			expect(result).toBeNull();
		});
	});
}); 
