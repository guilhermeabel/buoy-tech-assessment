import { useState } from "react";
import { Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UserProfileModal } from "./userProfileModal";
import { useUserCRUD } from "hooks/react-query/user";

export const UserProfile = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { useGetDetail } = useUserCRUD();
  const { data: userData } = useGetDetail();

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Button
        type="link"
        size="small"
        shape="circle"
        style={{
          padding: 0,
          height: "fit-content",
        }}
        onClick={openModal}
      >
        {userData && <Avatar src={userData.avatar} icon={<UserOutlined />} />}
      </Button>
      {userData && (
        <UserProfileModal
          userData={userData}
          open={modalIsOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
