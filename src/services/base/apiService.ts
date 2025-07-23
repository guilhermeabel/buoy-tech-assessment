export class ApiService {
  static apiUrl: string = `${process.env.REACT_APP_API_URL}`;
  private apiVersion: string = "v1";

  protected buildEndpoint = (endpoint: string) => {
    // Django needs endpoints with no query params to end with a trailing backslash
    const host = `${ApiService.apiUrl}/`;
    const path = `${this.apiVersion}/${endpoint}`.replaceAll("//", "/");
    return `${host}${path}`;
  };

  protected async fetchGet(
    uri: string,
    options: RequestInit,
    isBlob?: boolean
  ): Promise<any> {
    const endpoint = this.buildEndpoint(uri);
    return fetch(endpoint, options).then((response) =>
      this.handleResponse(response, isBlob)
    );
  }

  protected async fetchPost(
    endpoint: string,
    options: RequestInit,
    body: any
  ): Promise<any> {
    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    const requestBody =
      requestHeaders["Content-Type"] === "application/json"
        ? JSON.stringify(body)
        : body;

    if (requestHeaders["Content-Type"] === "multipart/form-data")
      delete requestHeaders["Content-Type"];

    const requestOptions: RequestInit = {
      ...options,
      method: "POST",
      headers: requestHeaders,
      body: requestBody,
    };
    const uri = this.buildEndpoint(endpoint);

    return fetch(uri, requestOptions).then(this.handleResponse);
  }

  protected async fetch(
    uri: string,
    headers: Record<string, string>,
    body: any,
    options?: Omit<RequestInit, "headers">
  ): Promise<any> {
    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    const requestBody =
      requestHeaders["Content-Type"] === "application/json"
        ? JSON.stringify(body)
        : body;

    const requestOptions: RequestInit = {
      ...options,
      headers: requestHeaders as Record<string, string>,
      body: requestBody,
    };
    const endpoint = this.buildEndpoint(uri);
    return fetch(endpoint, requestOptions).then(this.handleResponse);
  }

  private async handleResponse(
    response: Response,
    isBlob?: boolean
  ): Promise<any> {
    if (isBlob) return response.blob();

    if (!response.ok) {
      return Promise.reject();
    }
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      return response.json();
    }
    return response;
  }
}
