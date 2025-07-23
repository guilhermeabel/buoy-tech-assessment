import { useEffect, useState } from "react";
import { useGetBrandId, useUpdateBrandId } from "hooks";
import { FullPageSpin } from "components";

interface AppConfigProviderProps {
  children: JSX.Element | JSX.Element[];
}

export function AppConfigProvider({ children }: AppConfigProviderProps) {
  const brandId = useGetBrandId();
  const updateBrandId = useUpdateBrandId();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleValidation = async () => {
      setLoading(true);
      // fetch the brand
      if (brandId) {
        updateBrandId(brandId);
      } else {
        updateBrandId("87");
      }
      setTimeout(() => setLoading(false), 500);
    };

    handleValidation();
  }, [brandId]);

  // if (loading) return <FullPageSpin />;

  return <>{children}</>;
}
