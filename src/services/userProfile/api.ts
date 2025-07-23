import { AuthedService } from "../base/authedService";
import { UserProfileData, UserProfileService } from "./interface";

export class UserProfileApiService extends UserProfileService {
  async getMyUser() {
    const uri = "/users/me/";
    const data = await this.get(uri);
    return data as UserProfileData;
  }

  updateMyUser(body: any) {
    const uri = "/users/me/";
    return this.patch(uri, body);
  }
}
