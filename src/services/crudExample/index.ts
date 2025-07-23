import { CrudExampleFakeService } from "./fake";
import { CrudExampleApiService } from "./api";
import { CrudExampleService } from "./interface";

let service: CrudExampleService = new CrudExampleApiService();

if (process.env.REACT_APP_FAKE_API_MODE === "true") {
  service = new CrudExampleFakeService(1000, 0);
}

export default service;
