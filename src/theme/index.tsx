import { useState } from "react";
import { ConfigProvider } from "antd";
import * as theme from "antdTheme.json";
import type { ThemeConfig } from "antd";

interface ThemeProviderProps {
  children: JSX.Element | JSX.Element[];
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeToken] = useState<ThemeConfig>(theme);

  return <ConfigProvider theme={themeToken}>{children}</ConfigProvider>;
}
