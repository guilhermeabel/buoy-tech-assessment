import { Col, Layout, Row, Space, Spin, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import LocationBreadcrumbs from "components/locationBreadcrumbs";
import React, { useContext } from "react";
import { AppLayoutContext } from "..";

interface ContentLayoutProps {
  showHeader?: boolean;
  headerAction?: React.ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbEnd?: string;
  removePadding?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  contentStyle?: React.CSSProperties | undefined;
  children: React.ReactNode;
}

export function ContentLayout({
  breadcrumbEnd,
  children,
  headerAction,
  showHeader = true,
  showBreadcrumbs = true,
  removePadding = false,
  contentStyle = {},
  isLoading = false,
}: ContentLayoutProps) {
  const {
    token: { controlHeight },
  } = theme.useToken();

  const { contentMinWidth, contentMaxWidth } = useContext(AppLayoutContext);

  const paddingValue = removePadding ? 0 : controlHeight;

  return (
    <Layout
      style={{
        minHeight: "100%",
        minWidth: contentMinWidth,
        maxWidth: contentMaxWidth,
      }}
    >
      <Spin spinning={isLoading}>
        {showHeader && (
          <Header
            style={{
              background: "transparent",
              ...contentStyle,
            }}
          >
            <Row
              align="middle"
              justify="space-between"
              style={{
                height: controlHeight * 2,
              }}
            >
              {!!showBreadcrumbs && (
                <Col>
                  <LocationBreadcrumbs breadcrumbEnd={breadcrumbEnd} />
                </Col>
              )}
              {!!headerAction && <Col>{headerAction}</Col>}
            </Row>
          </Header>
        )}
        <Content
          style={{
            ...contentStyle,
            margin: "0 auto",
            paddingLeft: paddingValue,
            paddingRight: paddingValue,
            paddingBottom: controlHeight,
          }}
        >
          {children}
        </Content>
      </Spin>
    </Layout>
  );
}

export default ContentLayout;
