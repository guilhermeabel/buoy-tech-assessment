import { BrandProfileData } from "services/brandProfile/interface";
import { useCRUDBuilder } from "../useCRUDBuilder";
import BrandService from "services/brandProfile";
import { ElementIdType } from "services/base/interface";

export const useBrandCRUD = () =>
  useCRUDBuilder<BrandProfileData>({
    cacheQueryName: "brand",
    readListPromise: (brandId: string) => BrandService.getAll(),
    readDetailPromise: (brandId: string) => BrandService.getById(brandId),
    updatePromise: (
      brandId: ElementIdType,
      elementId: ElementIdType,
      body: Partial<BrandProfileData>
    ) => BrandService.update(elementId, body),
  });
