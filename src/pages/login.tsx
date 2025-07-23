import { Button, Col, Form, Image, Input, Layout, Row, Typography } from "antd";
import React, { useState } from "react";
import { theme } from "antd";
import LoginService from "services/login";
import { updateAuth } from "store/auth";
import { useAppDispatch } from "hooks";
import { login_big, login_logo } from "assets";
import { useIntl } from "react-intl";

const { Content } = Layout;
const { Title } = Typography;

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null || "");

  const {
    token: { colorPrimary, colorWhite, padding },
  } = theme.useToken();

  const handleLogin = async (values: any) => {
    setLoading(true);
    const { email, password } = values;

    try {
      const response = await LoginService.login({ email, password });

      dispatch(
        updateAuth({
          accessToken: response.access,
          refreshToken: response.refresh,
        })
      );
    } catch (error) {
      console.error(error);
      setError("Correo o contraseña inválida");
    } finally {
      setLoading(false);
    }
  };
  // if (loading) return <Loading />;

  return (
    <Layout>
      <Content>
        <Row style={{ height: "100vh" }}>
          <Col span={12} style={{ height: "100vh" }}>
            <Row align="middle" justify="center" style={{ height: "100vh" }}>
              <Col span={14}>
                <Title level={2} style={{ textAlign: "center" }}>
                  {formatMessage({ id: "login.form.title" })}
                </Title>

                <Form name="basic" onFinish={handleLogin}>
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Introduce tu email" }]}
                    extra={
                      error && (
                        // <Form.Item>
                        <Typography.Text type="danger">{error}</Typography.Text>
                        // </Form.Item>
                      )
                    }
                  >
                    <Input type="email" placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Introduce tu contraseña",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Contraseña" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      loading={loading}
                    >
                      {formatMessage({ id: "login.form.button" })}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ height: "100vh", background: colorPrimary }}>
            <Row align="middle" justify="center" style={{ height: "100vh" }}>
              <Col
                style={{ paddingLeft: padding * 4, paddingRight: padding * 4 }}
              >
                <Image
                  src={login_big}
                  preview={false}
                  style={{ maxHeight: "50vh" }}
                ></Image>
              </Col>
              <Col span={24}>
              </Col>
              <Col flex="100%">
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginScreen;
