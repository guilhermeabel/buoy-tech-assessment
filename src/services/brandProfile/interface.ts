import { ElementIdType, PaginatedResult } from "../base/interface";
import { AuthedService } from "services/base/authedService";

export interface BrandProfileData {
  id: number;
  name?: string;
  slug?: string;
  logo?: string;
  avatar?: string;
  domain?: string;
}

export abstract class BrandProfileService extends AuthedService {
  abstract getAll(
    query?: string
  ): Promise<PaginatedResult<BrandProfileData> | undefined>;
  abstract getByUser(
    query?: string
  ): Promise<PaginatedResult<BrandProfileData> | undefined>;
  abstract getById(
    brandId: ElementIdType
  ): Promise<BrandProfileData | undefined>;
  abstract update(
    brandId: ElementIdType,
    body: Partial<BrandProfileData>
  ): Promise<BrandProfileData | undefined>;
}
