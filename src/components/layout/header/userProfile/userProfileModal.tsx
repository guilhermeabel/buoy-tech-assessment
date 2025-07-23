import { useCallback } from "react";
import { Avatar, Modal, Row, Col, Button, Typography } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppNavigate } from "hooks";
import LoginService from "services/login";
import { updateAuth } from "store/auth";
import { UserProfileData } from "services/userProfile/interface";

interface UserProfileModalProps {
  open: boolean;
  closeModal: () => void;
  userData?: UserProfileData;
}
export const UserProfileModal = ({
  open,
  closeModal,
  userData,
}: UserProfileModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();

  const logout = useCallback(() => {
    LoginService.logout();
    dispatch(updateAuth({ accessToken: null, refreshToken: null }));
  }, []);

  return (
    <Modal open={open} onCancel={closeModal} footer={null} width={"800px"}>
      <Row
        align="middle"
        justify="space-between"
        wrap={false}
        style={{ minHeight: "100px" }}
      >
        <Col>
          <Row gutter={[16, 16]} justify="start" wrap={false}>
            <Col>
              <Avatar
                size={70}
                icon={<UserOutlined />}
                src={userData?.avatar}
              />
            </Col>
            <Col>
              <Row>
                <Col span={24}>
                  <Typography.Text
                    strong
                  >{`${userData?.first_name} ${userData?.last_name}`}</Typography.Text>
                </Col>
                <Col span={24}>{userData?.email}</Col>
                <Col span={24}>Brand Manager</Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col>
          <Row>
            <Col span={24}>
              <Button
                type="link"
                onClick={() => {
                  navigate("/profile");
                  closeModal();
                }}
              >
                <UserOutlined /> Profile
              </Button>
            </Col>
            <Col span={24}>
              <Button type="link" onClick={logout}>
                <LogoutOutlined /> Log out
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};
