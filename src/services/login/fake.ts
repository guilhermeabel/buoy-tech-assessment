import FakeService from "services/base/fakeService";
import { LoginRequestData, LoginResponseData } from "./interface";

const accessTokenResult = {
  access: "FAKE ACCESS TOKEN",
  refresh: "FAKE REFRESH TOKEN",
};

export class LoginFakeService extends FakeService<LoginResponseData> {
  constructor(latencyDuration = 0, errorProbability = 0) {
    super(latencyDuration, errorProbability);
  }

  public async login(payload: LoginRequestData): Promise<LoginResponseData> {
    return this.simulateRequest(
      () => accessTokenResult,
      () => {}
    );
  }

  public logout() {
    //do nothing
  }

  public async getCurrentToken(): Promise<LoginResponseData> {
    return accessTokenResult;
  }

  public async getValidToken(): Promise<LoginResponseData> {
    return accessTokenResult;
  }
}
