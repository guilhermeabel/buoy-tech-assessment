import { LoginApiService } from "services/login/api";
import { ApiService } from "./apiService";

const loginService = new LoginApiService();

export class AuthedService extends ApiService {
  static apiUrl: string = `${process.env.REACT_APP_API_URL}`;

  public async injectJWTIntoHeader(header: Record<string, string> = {}) {
    try {
      const token = await loginService.getValidToken();
      return {
        ...header,
        Authorization: `Bearer ${token?.access}`,
      };
    } catch (err) {
      throw err;
    }
  }

  public async get(endpoint: string, isBlob?: boolean): Promise<any> {
    const requestOptions: RequestInit = {
      method: "GET",
      headers: await this.injectJWTIntoHeader(),
    };
    return super.fetchGet(endpoint, requestOptions, isBlob);
  }

  public async post(endpoint: string, body: any): Promise<any> {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: await this.injectJWTIntoHeader(),
    };
    return super.fetchPost(endpoint, requestOptions, body);
  }

  public async put(endpoint: string, body: any): Promise<any> {
    const headers = await this.injectJWTIntoHeader();
    const requestOptions: RequestInit = {
      method: "PUT",
    };
    return this.fetch(endpoint, headers, body, requestOptions);
  }

  public async patch(endpoint: string, body: any): Promise<any> {
    const headers = await this.injectJWTIntoHeader();
    const requestOptions: RequestInit = {
      method: "PATCH",
    };
    return this.fetch(endpoint, headers, body, requestOptions);
  }

  public async delete(endpoint: string): Promise<any> {
    const headers = await this.injectJWTIntoHeader();
    const requestOptions: RequestInit = {
      method: "DELETE",
    };
    return this.fetch(endpoint, headers, {}, requestOptions);
  }
}
