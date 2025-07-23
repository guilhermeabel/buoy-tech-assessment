import { Layout, Row, Col, theme } from "antd";
import { UserProfile } from "./userProfile";
import { BrandSelect } from "./brandSelect";
const { Header } = Layout;

type AppHeaderProps = {
  sidebarWidth: string | number;
  headerHeight: string | number;
  nonSidebarWidth: string | number;
};

export function AppHeader({ nonSidebarWidth }: AppHeaderProps) {
  const {
    token: { colorBgContainer, paddingContentVertical },
  } = theme.useToken();

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        zIndex: 1,
        width: nonSidebarWidth,
        display: "flex",
        alignItems: "center",
        background: colorBgContainer,
        padding: paddingContentVertical,
      }}
    >
      <Row align="middle" justify="space-between" style={{ width: "100%" }}>
        <Col>
          <BrandSelect />
        </Col>
        <Col>
          <UserProfile />
        </Col>
      </Row>
    </Header>
  );
}
