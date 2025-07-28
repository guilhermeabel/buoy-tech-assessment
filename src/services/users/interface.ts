import { ApiService } from "services/base/apiService";

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	image: string;
}

export interface UsersResponse {
	users: User[];
	total: number;
	skip: number;
	limit: number;
}

export abstract class UsersService extends ApiService {
	abstract getUsers(): Promise<UsersResponse>;
} 
