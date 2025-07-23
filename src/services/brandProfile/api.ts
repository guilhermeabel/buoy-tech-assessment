import { PaginatedResult } from "../base/interface";
import { BrandProfileData, BrandProfileService } from "./interface";

export class BrandProfileApiService extends BrandProfileService {
  async getAll(query?: string) {
    const uri = "/brands/";
    const response = await this.get(uri);
    return response as PaginatedResult<BrandProfileData>;
  }

  async getByUser(query?: string) {
    const uri = query ? `/brands/?query=${query}` : "/brands/";
    const response = await this.get(uri);
    return response as PaginatedResult<BrandProfileData>;
  }

  async getById(brandId: number | string) {
    const uri = `/brands/${brandId}/`;
    const response = await this.get(uri);
    return response as BrandProfileData;
  }

  update(brandId: number | string, body: any) {
    const uri = `/brands/${brandId}/`;
    return this.patch(uri, body);
  }
}
