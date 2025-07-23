import { useEffect } from "react";
import { QueryKey, UseQueryResult, useQuery } from "@tanstack/react-query";
import { useGetBrandId } from "hooks";

export function useBrandIdSubscribedQuery<T>(
  handler: (brandId: string) => Promise<T | undefined>,
  queryKeyBuilder: (brandId: string) => QueryKey
): UseQueryResult<T | undefined> {
  const brandId = useGetBrandId();

  const query = useQuery({
    queryFn: async (): Promise<T | undefined> => {
      if (!brandId) return undefined;
      const response = await handler(brandId);
      return response;
    },
    queryKey: queryKeyBuilder(brandId),
  });

  useEffect(() => {
    if (brandId) {
      query.refetch();
    }
  }, [brandId]);

  return query;
}
