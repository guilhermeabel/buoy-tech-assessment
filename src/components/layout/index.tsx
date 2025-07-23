import React, { PropsWithChildren, useState } from "react";
import { Col, Layout, Row, theme } from "antd";
import { AppHeader } from "./header";
import { AppSidebar } from "./sidebar";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
const { Content } = Layout;

export enum AppPath {
  any = "*",
  home = "/dashboard",
  brandProfile = "/brandProfile",
  userProfile = "/profile",
  crud = "/",
}

export type AppLayoutContextType = {
  sidebarItems: MenuItemType[];
  addSidebarItem: (menuItem: MenuItemType) => void;
  contentMinWidth: string;
  contentMaxWidth: string;
};

export const AppLayoutContext = React.createContext<AppLayoutContextType>(
  {} as AppLayoutContextType
);

export function AppLayout({ children }: PropsWithChildren) {
  const {
    token: { controlHeight },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? 80 : 200;
  const nonSidebarWidth = `calc(100vw - ${sidebarWidth}px)`;
  const headerHeight = controlHeight * 2;
  const contentMinWidth = "65vw";
  const contentMaxWidth = "1100px";

  const [sidebarItems, setSidebarItems] = useState<MenuItemType[]>([]);

  const addSidebarItem = (menuItem: MenuItemType) => {
    setSidebarItems((prev) => {
      const repeatedKey = prev.find((item) => item?.key === menuItem?.key);
      if (repeatedKey) return prev;

      return [...prev, menuItem];
    });
  };

  return (
    <AppLayoutContext.Provider
      value={{
        sidebarItems,
        addSidebarItem,
        contentMinWidth,
        contentMaxWidth,
      }}
    >
      <Layout hasSider style={{ minHeight: "100vh" }}>
        <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout style={{ marginLeft: sidebarWidth }}>
          <AppHeader
            sidebarWidth={sidebarWidth}
            headerHeight={headerHeight}
            nonSidebarWidth={nonSidebarWidth}
          />
          <Content
            style={{
              marginTop: headerHeight,
              // maxWidth: nonSidebarMaxWidth,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </AppLayoutContext.Provider>
  );
}
