import FakeService from "services/base/fakeService";
import { PaginatedResult } from "../base/interface";
import { CrudExampleData } from "./interface";

const fakeCrudExample: CrudExampleData = {
  id: 1,
  code: "fake.com",
  name: "Fake CrudExample",
};

export class CrudExampleFakeService extends FakeService<CrudExampleData> {
  async getAll(brandId: string, ...query: string[]) {
    return this.simulatePaginatedRequest(
      () => this.fakePagination({ ...fakeCrudExample }, 80),
      () => {}
    );
  }

  async getByUser(query?: string) {
    return this.simulatePaginatedRequest(
      () => this.fakePagination(fakeCrudExample),
      () => {}
    );
  }

  async getById(brandId: number | string, crudExampleId: number | string) {
    return this.simulateRequest(
      () => fakeCrudExample,
      () => {}
    );
  }

  update(crudExampleId: number | string, body: any) {
    return this.simulateRequest(
      () => fakeCrudExample,
      () => {}
    );
  }
}
