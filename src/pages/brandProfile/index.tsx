import { useIntl } from "react-intl";
import { InboxOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Row,
  Anchor,
  Form,
  Input,
  Typography,
  Button,
  Spin,
} from "antd";
import UploadField from "components/uploadField";
import { useBrandCRUD } from "hooks/react-query/brand";
import { useGetBrandId } from "hooks";
import ContentLayout from "components/layout/content/contentLayout";

export function BrandProfile() {
  const { formatMessage } = useIntl();
  const brandId = useGetBrandId();

  const { useGetDetail, useUpdate } = useBrandCRUD();

  const { data, isSuccess, isLoading } = useGetDetail(brandId, []);
  const { mutateAsync, isLoading: updateIsLoading } = useUpdate(brandId);

  const formItemStyle: React.CSSProperties = {};
  const cardStyle: React.CSSProperties = {};

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
              <Row justify="space-around" gutter={[0, 20]}>
                <Anchor
                  direction="horizontal"
                  items={[
                    {
                      key: "basicInfo",
                      href: "#basicInfo",
                      title: formatMessage({
                        id: "page.brandProfile.anchor.basicInfo",
                      }),
                    },
                    {
                      key: "regionInfo",
                      href: "#regionInfo",
                      title: formatMessage({
                        id: "page.brandProfile.anchor.regionInfo",
                      }),
                    },
                    {
                      key: "rss",
                      href: "#rss",
                      title: formatMessage({
                        id: "page.brandProfile.anchor.rss",
                      }),
                    },
                  ]}
                />
              </Row>
            </Col>
            <Col span={24}>
              <Row
                gutter={[0, 50]}
                style={{
                  maxHeight: "60vh",
                  overflow: "scroll",
                }}
                justify="space-around"
              >
                <Col span={14}>
                  <Card
                    id="basicInfo"
                    style={cardStyle}
                    title={formatMessage({
                      id: "page.brandProfile.form.basicInfo.title",
                    })}
                  >
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.basicInfo.name",
                      })}
                      name={"name"}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.basicInfo.email",
                      })}
                      name={"email"}
                    >
                      <Input />
                    </Form.Item>

                    <Row justify="space-evenly" gutter={[0, 10]}>
                      <Col>
                        <Form.Item
                          label={formatMessage({
                            id: "page.brandProfile.form.basicInfo.avatar",
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
                                  id: "page.brandProfile.form.basicInfo.avatar.placeholder",
                                })}
                              </Typography.Paragraph>
                            </>
                          </UploadField>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={14}>
                  <Card
                    id="regionInfo"
                    style={cardStyle}
                    title={formatMessage({
                      id: "page.brandProfile.form.region.title",
                    })}
                  >
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.region.address",
                      })}
                      name={"address"}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.region.city",
                      })}
                      name={"city"}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.region.country",
                      })}
                      name={"country"}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.region.postal_code",
                      })}
                      name={"postal_code"}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.region.prefix",
                      })}
                      name={"prefix"}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.region.region",
                      })}
                      name={"region"}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.region.vat",
                      })}
                      name={"vat"}
                    >
                      <Input />
                    </Form.Item>
                  </Card>
                </Col>
                <Col span={14}>
                  <Card
                    id="rss"
                    style={cardStyle}
                    title={formatMessage({
                      id: "page.brandProfile.form.rss.title",
                    })}
                  >
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.rss.code",
                      })}
                      name={"code"}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.rss.analytics_id",
                      })}
                      name={"analytics_id"}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={formatMessage({
                        id: "page.brandProfile.form.rss.facebook_account_id",
                      })}
                      name={"facebook_account_id"}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.rss.facebook_pixel",
                      })}
                      name={"facebook_pixel"}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={formatMessage({
                        id: "page.brandProfile.form.rss._facebook_account",
                      })}
                      name={"_facebook_account"}
                    >
                      <Input disabled />
                    </Form.Item>
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.rss.hubspot_api",
                      })}
                      name={"hubspot_api"}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.rss.landbot_id",
                      })}
                      name={"landbot_id"}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={formItemStyle}
                      label={formatMessage({
                        id: "page.brandProfile.form.rss.metricool_url",
                      })}
                      name={"metricool_url"}
                    >
                      <Input />
                    </Form.Item>
                  </Card>
                </Col>
                <Col span={14}></Col>
              </Row>
            </Col>
            <Col>
              <Button htmlType="submit" type="primary" size="large">
                {formatMessage({
                  id: "page.brandProfile.form.btn",
                })}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </ContentLayout>
  );
}
