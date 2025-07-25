import { AuthedService } from '../../base/authedService';

const mockFetch = jest.fn();
global.fetch = mockFetch;

const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
	writable: true,
});

describe('Integration: Concurrent API calls with expired JWT', () => {
	let authedService1: AuthedService;
	let authedService2: AuthedService;

	const expiredToken = {
		access: 'expired.jwt.token',
		refresh: 'valid.refresh.token',
	};

	const refreshedToken = {
		access: 'new.access.token',
		refresh: 'new.refresh.token',
	};

	beforeEach(() => {
		authedService1 = new AuthedService();
		authedService2 = new AuthedService();

		mockFetch.mockReset();
		localStorageMock.getItem.mockReset();
		localStorageMock.setItem.mockReset();
		localStorageMock.removeItem.mockReset();

		process.env.REACT_APP_API_URL = 'http://localhost:8000';
	});

	it('should only trigger one refresh when multiple API calls are made with expired token', async () => {
		const pastTimestamp = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
		const expiredJwtPayload = btoa(JSON.stringify({ exp: pastTimestamp }));
		const mockExpiredToken = {
			...expiredToken,
			access: `header.${expiredJwtPayload}.signature`
		};

		localStorageMock.getItem
			.mockReturnValueOnce(JSON.stringify(mockExpiredToken))
			.mockReturnValueOnce(JSON.stringify(mockExpiredToken))
			.mockReturnValue(JSON.stringify(refreshedToken));

		let refreshResolve: (value: any) => void;
		const refreshPromise = new Promise((resolve) => {
			refreshResolve = resolve;
		});

		mockFetch.mockImplementation((url: string) => {
			if (url.includes('/refresh')) {
				return refreshPromise;
			} else if (url.includes('/brands')) {
				return Promise.resolve({
					ok: true,
					headers: { get: () => 'application/json' },
					json: () => Promise.resolve({ brands: [] })
				});
			} else if (url.includes('/users/me')) {
				return Promise.resolve({
					ok: true,
					headers: { get: () => 'application/json' },
					json: () => Promise.resolve({ user: {} })
				});
			}
			return Promise.reject(new Error('Unexpected URL'));
		});

		const brandsCall = authedService1.get('/brands');
		const userCall = authedService2.get('/users/me');

		await new Promise(resolve => setTimeout(resolve, 10));

		refreshResolve!({
			ok: true,
			headers: { get: () => 'application/json' },
			json: () => Promise.resolve(refreshedToken)
		});
		const [brandsResult, userResult] = await Promise.all([brandsCall, userCall]);

		expect(brandsResult).toEqual({ brands: [] });
		expect(userResult).toEqual({ user: {} });

		const refreshCalls = mockFetch.mock.calls.filter(call =>
			call[0].includes('/refresh')
		);
		expect(refreshCalls).toHaveLength(1);

		expect(refreshCalls[0][1]).toEqual({
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh: 'valid.refresh.token' })
		});

		const apiCalls = mockFetch.mock.calls.filter(call =>
			call[0].includes('/brands') || call[0].includes('/users/me')
		);
		expect(apiCalls).toHaveLength(2);

		apiCalls.forEach(call => {
			expect(call[1].headers.Authorization).toBe('Bearer new.access.token');
		});
	});
}); 
