import { BrandProfileFakeService } from "./fake";
import { BrandProfileApiService } from "./api";
import { BrandProfileService } from "./interface";

let service: BrandProfileService = new BrandProfileApiService();

if (process.env.REACT_APP_FAKE_API_MODE === "true") {
  service = new BrandProfileFakeService(1000, 0);
}

export default service;
