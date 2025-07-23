import { useEffect, useState } from "react";
import { Card, Avatar, Typography, Row, Col } from "antd";
import { useUpdateBrandId, useGetBrandId } from "hooks";
import { SelectBrandModal } from "./selectBrandModal";
import { AppPath } from "components";
import { BrandProfileData } from "services/brandProfile/interface";
import { DownOutlined } from "@ant-design/icons";
import { useGetMyBrands } from "hooks/react-query/user/useGetMyBrands";

export const searchFilter =
  (searchValue: string) => (brand: BrandProfileData) =>
    normalizeString(brand.name || "").includes(normalizeString(searchValue)) ||
    brand.id.toString().includes(searchValue);

const normalizeString = (text: string) => text.toLocaleLowerCase().trim();

export const BrandSelect = () => {
  const brandId = useGetBrandId();
  const updateBrandId = useUpdateBrandId(AppPath.home);

  const { data: myBrands } = useGetMyBrands();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<BrandProfileData | null>();
  const [searchValue, setSearchValue] = useState<string>("");

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSelection = (brandId: number) => {
    updateBrandId(brandId.toString());
    closeModal();
  };

  const brandList =
    myBrands &&
    myBrands.list &&
    myBrands.list.filter(searchFilter(searchValue));

  useEffect(() => {
    const matchingBrand =
      brandId && brandList && brandList.find(({ id }) => id === +brandId);
    if (matchingBrand && matchingBrand?.id !== selectedBrand?.id) {
      setSelectedBrand(matchingBrand);
    } else if (!matchingBrand) {
      updateBrandId(myBrands?.list[0]?.id?.toString() || "0");
    }
  }, [myBrands, brandList, brandId]);

  const fetchBrands = () => {};
  const onSearch = (val: string) => {
    setSearchValue(val || "");
  };

  useEffect(() => {
    return () => setSearchValue("");
  }, []);

  const selectableBrands = myBrands && myBrands.list.length > 1;

  return (
    <>
      {!selectableBrands && (
        <Card bordered={false} size="small" style={{ padding: 0 }}>
          <Row align="middle" gutter={10}>
            <Col>
              <Avatar
                shape="circle"
                src={selectedBrand?.logo || selectedBrand?.avatar}
              />
            </Col>
            <Col>
              <Typography.Text>{selectedBrand?.name}</Typography.Text>
            </Col>
          </Row>
        </Card>
      )}

      {selectableBrands && (
        <Card
          bordered={false}
          hoverable
          size="small"
          style={{ padding: 0, cursor: "pointer" }}
          onClick={openModal}
        >
          <Row align="middle" gutter={10}>
            <Col>
              <Avatar
                shape="circle"
                src={selectedBrand?.logo || selectedBrand?.avatar}
              />
            </Col>
            <Col>
              <Typography.Text>{selectedBrand?.name}</Typography.Text>
            </Col>
            <Col>
              <DownOutlined style={{ fontSize: "10px" }} />
            </Col>
          </Row>
        </Card>
      )}

      {brandList && (
        <SelectBrandModal
          open={modalIsOpen}
          closeModal={closeModal}
          handleSelection={handleSelection}
          brandList={brandList}
          fetchData={fetchBrands}
          hasMoreBrands={false}
          onSearch={onSearch}
        />
      )}
    </>
  );
};
