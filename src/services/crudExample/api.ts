import { PaginatedResult } from "../base/interface";
import { CrudExampleData, CrudExampleService } from "./interface";

export class CrudExampleApiService extends CrudExampleService {
  async getAll(query?: string): Promise<PaginatedResult<CrudExampleData>> {
    const uri = "/crudExample/";
    const response = await this.get(uri);
    return response as PaginatedResult<CrudExampleData>;
  }

  async getByUser(query?: string): Promise<PaginatedResult<CrudExampleData>> {
    const uri = query ? `/crudExample/?query=${query}` : "/crudExample/";
    const response = await this.get(uri);
    return response as PaginatedResult<CrudExampleData>;
  }

  async getById(
    brandId: number | string,
    crudExampleId: number | string | undefined
  ): Promise<CrudExampleData> {
    const uri = `/crudExample/${crudExampleId}/`;
    const response = await this.get(uri);
    return response as CrudExampleData;
  }

  update(crudExampleId: number | string | undefined, body: any) {
    const uri = `/crudExample/${crudExampleId}/`;
    return this.patch(uri, body);
  }
}
