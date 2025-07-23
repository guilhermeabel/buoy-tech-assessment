import { useQuery } from "@tanstack/react-query";
import BrandProfileService from "services/brandProfile";
import { PaginatedResult } from "services/base/interface";
import { BrandProfileData } from "services/brandProfile/interface";

export function useGetMyBrands() {
  const userProfileQuery = useQuery({
    queryFn: async (): Promise<PaginatedResult<BrandProfileData>> => {
      const brands = await BrandProfileService.getByUser();
      if (!brands) return { list: [] };
      return brands;
    },
    queryKey: ["my_brands"],
  });

  return userProfileQuery;
}
