import { theme, Row, Col, Typography } from "antd";

interface GamificationAvatarProps {
  src?: string;
  label?: string;
}

export function GamificationAvatar({
  src,
  label = "",
}: GamificationAvatarProps) {
  const {
    token: { controlHeight },
  } = theme.useToken();
  return (
    <Row align="middle" justify="center">
      <Col>
        <img
          src={src}
          style={{
            padding: 1,
            height: controlHeight * 1.5,
          }}
        />
      </Col>
      <Col span={18}>
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
    </Row>
  );
}
