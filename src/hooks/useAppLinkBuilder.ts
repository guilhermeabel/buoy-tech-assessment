import { useGetBrandId, brandIdparamName } from "hooks";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";

export function useAppLinkBuilder(): (pathname: string) => string {
  const brandId = useGetBrandId();
  const location = useLocation();

  return useCallback(
    (pathname: string) =>
      `${pathname}${brandId ? `?${brandIdparamName}=${brandId}` : ""}`,
    [brandId, location]
  );
}
