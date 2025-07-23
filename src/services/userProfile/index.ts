import { UserProfileFakeService } from "./fake";
import { UserProfileApiService } from "./api";
import { UserProfileService } from "./interface";

let service: UserProfileService = new UserProfileApiService();

if (process.env.REACT_APP_FAKE_API_MODE === "true") {
  service = new UserProfileFakeService(1000, 0);
}

export default service;
