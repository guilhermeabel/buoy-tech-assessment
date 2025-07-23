import { ApiService } from "services/base/apiService";

export interface LoginRequestData {
  email: string;
  password: string;
}

export interface LoginResponseData {
  access: string;
  refresh: string;
}

export abstract class LoginService extends ApiService {
  abstract login(payload: LoginRequestData): Promise<LoginResponseData>;
  abstract logout(): void;
  abstract getCurrentToken(): Promise<LoginResponseData | null>;
  abstract getValidToken(): Promise<LoginResponseData | null>;
}
