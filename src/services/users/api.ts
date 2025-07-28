import { UsersService, UsersResponse } from "./interface";

export class UsersApiService extends UsersService {
	protected buildEndpoint = (endpoint: string) => {
		return `https://dummyjson.com${endpoint}`;
	};

	public async getUsers(): Promise<UsersResponse> {
		const response = await this.fetchGet("/users", { method: "GET" });
		return response as UsersResponse;
	}
} 
