import { useNavigate } from "react-router-dom";
import { brandIdparamName } from "hooks";

export function useUpdateBrandId(path?: string) {
  const navigate = useNavigate();

  return (brandId: string) => {
    navigate({
      pathname: path,
      search: `?${brandIdparamName}=${brandId}`,
    });
  };
}
