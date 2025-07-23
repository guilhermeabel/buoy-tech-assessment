import { ElementIdType, PaginatedResult } from "../base/interface";
import { AuthedService } from "services/base/authedService";

export interface CrudExampleData {
  id: number;
  name?: string;
  code?: string;
}

export abstract class CrudExampleService extends AuthedService {
  abstract getAll(query?: string): Promise<PaginatedResult<CrudExampleData>>;
  abstract getByUser(query?: string): Promise<PaginatedResult<CrudExampleData>>;
  abstract getById(
    brandId: ElementIdType,
    crudExampleId: ElementIdType
  ): Promise<CrudExampleData>;
  abstract update(
    crudExampleId: ElementIdType,
    body: Partial<CrudExampleData>
  ): Promise<CrudExampleData>;
}
