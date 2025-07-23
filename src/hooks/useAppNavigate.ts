import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBrandId, brandIdparamName } from "hooks";

export function useAppNavigate() {
  const navigate = useNavigate();
  const brandId = useGetBrandId();

  return useCallback(
    (pathname: string) => {
      navigate({
        pathname,
        search: `?${brandIdparamName}=${brandId}`,
      });
    },
    [brandId]
  );
}
