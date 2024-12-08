import classNames from "classnames/bind";
import { Button, Modal } from "antd";

import styles from "./CardOrderDetail.module.scss";
import { useState } from "react";
import ModalFeedback from "../../Modals/ModalFeedback";

const cx = classNames.bind(styles);

function CardOrderDetail({ product, isFeedBack }) {
  const [modalFeedback, setModalFeedback] = useState(false);

  const {
    id,
    productName,
    productImage,
    Quantity,
    UnitPrice,
    Amount,
    subCategoryName,
    productVariationName,
    ID_productVariation,
  } = product;

  console.log("data invoice du lieu vao model con", product);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("product-img")}>
        <img
          src={productImage || "https://picsum.photos/200/300"}
          alt="hình ảnh"
        />
      </div>
      <div className={cx("product-info")}>
        <div className={cx("category-name")}>{subCategoryName}</div>
        <div className={cx("product-name")}>{productName}</div>
        <div className={cx("product-size")}>
          Kích thước: {productVariationName}
        </div>
        <div className={cx("product-size")}>Giá: {UnitPrice}</div>
      </div>
      <div className={cx("order-quantity")}>
        Số lượng:<span>{Quantity} sản phẩm</span>
      </div>
      <div className={cx("order-price")}>
        Tổng tiền:
        <span>{Amount} vnđ</span>
      </div>
      <div className={cx("order-feedback")}>
        {isFeedBack ? (
          <Button
            className={cx("btn-feedback")}
            onClick={() => setModalFeedback(true)}
          >
            Đánh giá
          </Button>
        ) : (
          <></>
        )}
      </div>

      <Modal
        title="Đánh giá sản phẩm"
        centered
        open={modalFeedback}
        onCancel={() => setModalFeedback(false)}
        footer={null}
      >
        <ModalFeedback
          id_invoiceDetail={id}
          onClose={() => setModalFeedback(false)}
        />
      </Modal>
    </div>
  );
}

export default CardOrderDetail;
