import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Avatar, theme, Row, Col, Image } from "antd";
import { AppPath } from "components";
import { useAppNavigate } from "hooks";
import { header_logo, header_logo_collapsed } from "assets";
import { AppLayoutContext } from "..";
import { useContext } from "react";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

const { Sider } = Layout;

type AppSidebarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AppSidebar({ collapsed, setCollapsed }: AppSidebarProps) {
  const navigate = useAppNavigate();
  const {
    token: { controlHeight, colorBgContainer, margin },
  } = theme.useToken();

  const { sidebarItems } = useContext(AppLayoutContext);

  const topDefaultItems: MenuItemType[] = [
    {
      key: AppPath.home,
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  ];

  const bottomDefaultItems: MenuItemType[] = [
    {
      key: AppPath.brandProfile,
      label: "Brand",
      icon: <UserOutlined />,
    },
  ];

  const allMenuItems = [
    ...topDefaultItems,
    ...sidebarItems,
    ...bottomDefaultItems,
  ];

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: colorBgContainer,
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Row
        align="middle"
        style={{ width: "100%", marginLeft: margin, height: controlHeight * 2 }}
      >
      </Row>
      <Row justify="space-between">
        <Col span={24}>
          <Menu
            mode="inline"
            items={allMenuItems}
            onClick={(event) => navigate(event.key)}
            //warning: [antd: Menu] `inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.
          />
        </Col>
      </Row>
    </Sider>
  );
}
