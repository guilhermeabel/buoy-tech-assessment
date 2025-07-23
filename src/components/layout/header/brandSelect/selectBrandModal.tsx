import { Modal, Row, Col, Input } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { BrandItem } from "./brandItem";
import { useState } from "react";
import { BrandProfileData } from "services/brandProfile/interface";

interface SelectBrandModalProps {
  open: boolean;
  closeModal: () => void;
  handleSelection: (brandId: number) => void;
  brandList: BrandProfileData[];
  hasMoreBrands: boolean;
  fetchData: () => void;
  onSearch: (query: string) => void;
}
export const SelectBrandModal = ({
  open,
  closeModal,
  handleSelection,
  brandList,
  fetchData,
  hasMoreBrands,
  onSearch,
}: SelectBrandModalProps) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [hasMouseOver, setHasMouseOver] = useState(false);

  return (
    <Modal open={open} onCancel={closeModal} title={"Marcas"} footer={null}>
      <Input
        placeholder="Buscar..."
        onChange={(e) => onSearch(e.target.value)}
        style={
          hasFocus || hasMouseOver
            ? undefined
            : {
                borderColor: "transparent",
                transition: "border 1s ease 0s",
              }
        }
        onFocus={() => {
          setHasFocus(true);
        }}
        onBlur={() => {
          setHasFocus(false);
        }}
        onMouseEnter={() => {
          setHasMouseOver(true);
        }}
        onMouseLeave={() => {
          setHasMouseOver(false);
        }}
      />
      <InfiniteScroll
        dataLength={brandList.length}
        next={fetchData}
        hasMore={hasMoreBrands}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p
            style={{
              textAlign: "center",
            }}
          >
            <b>Yay! You have seen it all</b>
          </p>
        }
        scrollableTarget="scrollableDiv"
        height={"60vh"}
      >
        <Row
          align="top"
          justify="start"
          className="scrollableDiv"
          style={{ width: "100%", marginTop: 10, marginBottom: 10 }}
        >
          {brandList.map((brandData) => (
            <Col key={brandData.id} span={24}>
              <BrandItem
                {...brandData}
                onClick={() => handleSelection(brandData.id)}
              />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </Modal>
  );
};
