import { useState } from "react";
import { Card, Avatar, Row, Col, Space, Button, theme } from "antd";
import { BrandProfileData } from "services/brandProfile/interface";

interface BrandItemProps extends BrandProfileData {
  onClick: () => void;
}

export const BrandItem = ({ name, avatar, logo, onClick }: BrandItemProps) => {
  const {
    token: { colorPrimaryBgHover },
  } = theme.useToken();
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <Button
      style={{
        padding: 0,
        width: "100%",
        height: "fit-content",
      }}
      onClick={onClick}
    >
      <Card
        bordered={false}
        style={{
          boxShadow: "none",
          backgroundColor: isHover ? colorPrimaryBgHover : "unset",
          transition: "background-color 1s ease 0s",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Row gutter={10} align="middle">
          <Col>
            <Avatar src={logo || avatar} size="large" />
          </Col>
          <Col>
            <Space direction="vertical">{name}</Space>
          </Col>
        </Row>
      </Card>
    </Button>
  );
};
