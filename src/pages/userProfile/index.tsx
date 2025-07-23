import { useIntl } from "react-intl";
import { InboxOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Row,
  Space,
  Form,
  Input,
  Typography,
  Button,
  Spin,
} from "antd";

import UploadField from "components/uploadField";
import { useUserCRUD } from "hooks/react-query/user";
import ContentLayout from "components/layout/content/contentLayout";

export function UserProfile() {
  const { formatMessage } = useIntl();

  const { useGetDetail, useUpdate } = useUserCRUD();
  const { data, isSuccess, isLoading, isError } = useGetDetail();
  const { mutateAsync, isLoading: updateIsLoading } = useUpdate(data?.id);

  const handleOnFinish = (values: Record<string, string>) => {
    mutateAsync(values);
  };

  return (
    <ContentLayout>
      {isLoading && <Spin />}
      {!isLoading && isSuccess && data && (
        <Form
          disabled={updateIsLoading}
          initialValues={data}
          onFinish={handleOnFinish}
        >
          <Row justify="space-around" gutter={[0, 20]}>
            <Col span={24}>
              <Card
                title={formatMessage({
                  id: "page.userProfile.form.basicInfo.title",
                })}
              >
                <Form.Item
                  label={formatMessage({
                    id: "page.userProfile.form.basicInfo.first_name",
                  })}
                  name={"first_name"}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={formatMessage({
                    id: "page.userProfile.form.basicInfo.last_name",
                  })}
                  name={"last_name"}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={formatMessage({
                    id: "page.userProfile.form.basicInfo.email",
                  })}
                  name={"email"}
                >
                  <Input />
                </Form.Item>
                <Space
                  direction="vertical"
                  style={{
                    width: "100%",
                  }}
                  align="center"
                >
                  <Form.Item
                    label={formatMessage({
                      id: "page.userProfile.form.basicInfo.avatar",
                    })}
                    name={"avatar"}
                    noStyle
                  >
                    <UploadField
                      initialValue={data.avatar}
                      width={"240px"}
                      height={"132px"}
                    >
                      <>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <Typography.Paragraph>
                          {formatMessage({
                            id: "page.userProfile.form.basicInfo.avatar.placeholder",
                          })}
                        </Typography.Paragraph>
                      </>
                    </UploadField>
                  </Form.Item>
                </Space>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title={formatMessage({
                  id: "page.userProfile.form.accessInfo.title",
                })}
              >
                <Form.Item
                  label={formatMessage({
                    id: "page.userProfile.form.accessInfo.password",
                  })}
                  name={"password"}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label={formatMessage({
                    id: "page.userProfile.form.accessInfo.passwordConfirm",
                  })}
                  name={"passwordConfirmation"}
                  dependencies={["password"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator: (rule, value) => {
                        const password = getFieldValue("password");
                        if (!password && !value) {
                          return Promise.resolve();
                        }
                        if (password === value) {
                          return Promise.resolve();
                        }
                        Promise.reject(
                          formatMessage({
                            id: "page.userProfile.form.accessInfo.passwordConfirm.missMatchError",
                          })
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Card>
            </Col>
            <Col>
              <Button size="large" htmlType="submit" type="primary">
                {formatMessage({
                  id: "page.userProfile.form.btn",
                })}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </ContentLayout>
  );
}
