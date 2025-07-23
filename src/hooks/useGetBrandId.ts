import { useSearchParams } from "react-router-dom";

export const brandIdparamName = "brandId";

export function useGetBrandId() {
  const [searchParams] = useSearchParams();
  const brandId = searchParams.get(brandIdparamName);
  return brandId || "";
}
