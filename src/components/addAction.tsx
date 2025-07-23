import { PlusCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, FloatButton, Row, theme } from "antd";
import React from "react";

interface AddActionProps {
  title: React.ReactNode;
  onClick: () => void;
  style?: any;
}

const AddAction = ({ title, onClick, style = {} }: AddActionProps) => {
  const {
    token: { colorBorder, colorPrimary, fontSizeIcon },
  } = theme.useToken();

  return (
    // <FloatButton
    //   icon={<PlusCircleOutlined />}
    //   type="primary"
    //   onClick={onClick}
    // ></FloatButton>

    <Button
      icon={<PlusCircleOutlined />}
      type="default"
      onClick={onClick}
      shape="round"
    >
      {title}
    </Button>

    // <Card
    //   hoverable
    //   size="small"
    //   style={{
    //     ...style,
    //     background: "transparent",
    //     border: "2px dashed " + colorBorder,
    //   }}
    //   onClick={onClick}
    // >
    //   <Row align="middle" justify="space-around">
    //     <Col span={1}>
    //       <PlusCircleFilled
    //         style={{ color: colorPrimary, fontSize: fontSizeIcon * 2 }}
    //       ></PlusCircleFilled>
    //     </Col>
    //     <Col span={22}> {title}</Col>
    //   </Row>
    // </Card>
  );
};

export default AddAction;
