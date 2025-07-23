import FakeService from "services/base/fakeService";
import { UserProfileData } from "./interface";
import { ElementIdType } from "services/base/interface";

let fakeUserData: UserProfileData = {
  id: 1,
  avatar:
    "https://external-preview.redd.it/fBai3DKZrSGf3YRd89f9pUHJua_lyGNS3LF0I-joA8Y.jpg?auto=webp&s=a2792118a8b080350240abc745d3ca6e53f18ca1",
  email: "fake@email.com",
  first_name: "Fake",
  last_name: "User",
  slug: "fake_user",
};

export class UserProfileFakeService extends FakeService<UserProfileData> {
  constructor(latencyDuration = 0, errorProbability = 0) {
    super(latencyDuration, errorProbability);
  }

  async getMyUser() {
    return this.simulateRequest(
      () => fakeUserData,
      () => {}
    );
  }

  updateMyUser(elementId: ElementIdType, body: any) {
    fakeUserData = { ...fakeUserData, ...body };
    return this.simulateRequest(
      () => fakeUserData,
      () => {}
    );
  }
}
