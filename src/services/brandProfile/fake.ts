import FakeService from "services/base/fakeService";
import { BrandProfileData } from "./interface";

let fakeBrandProfile: BrandProfileData = {
  id: 1,
  domain: "fake.com",
  logo: "https://picsum.photos/id/1/200/300",
  name: "Fake Brand",
  slug: "fake_brand",
};

export class BrandProfileFakeService extends FakeService<BrandProfileData> {
  async getAll(query?: string) {
    return this.simulatePaginatedRequest(
      () => this.fakePagination(fakeBrandProfile, 100),
      () => {}
    );
  }

  async getByUser(query?: string) {
    return this.simulatePaginatedRequest(
      () => this.fakePagination(fakeBrandProfile, 2),
      () => {}
    );
  }

  async getById(brandId: number | string) {
    return this.simulateRequest(
      () => fakeBrandProfile,
      () => {}
    );
  }

  update(brandId: number | string, body: any) {
    console.log(body);
    fakeBrandProfile = { ...fakeBrandProfile, ...body };
    return this.simulateRequest(
      () => fakeBrandProfile,
      () => {}
    );
  }
}
