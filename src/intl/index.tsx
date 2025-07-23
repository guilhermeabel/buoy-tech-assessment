import { IntlProvider } from "react-intl";
import { useAppSelector } from "hooks";
import { getIntlConfig } from "store/intlConfig";
import AppLocaleMessage from "./messages";

interface IntlProviderProps {
  children: JSX.Element | JSX.Element[];
}

export function IntlAppProvider({ children }: IntlProviderProps) {
  const intlConfig = useAppSelector(getIntlConfig);
  return (
    <IntlProvider
      messages={AppLocaleMessage[intlConfig.locale]}
      locale={intlConfig.locale}
    >
      {children}
    </IntlProvider>
  );
}
