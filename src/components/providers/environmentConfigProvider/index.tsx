import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { EnvironmentConfigService } from "services";
import {
  getEnvironmentConfig,
  updateEnvironmentConfig,
} from "store/environmentConfig";

interface EnvironmentConfigProviderProps {
  children: JSX.Element | JSX.Element[];
}

export function EnvironmentConfigProvider({
  children,
}: EnvironmentConfigProviderProps) {
  const dispatch = useAppDispatch();
  const config = useAppSelector(getEnvironmentConfig);
  useEffect(() => {
    const environmentConfigService = new EnvironmentConfigService();
    const handleFetch = async () => {
      const environmentConfig = await environmentConfigService.getConfig();
      dispatch(updateEnvironmentConfig(environmentConfig));
    };
    handleFetch();
  }, []);

  return <>{config.loading ? <></> : children}</>;
}
