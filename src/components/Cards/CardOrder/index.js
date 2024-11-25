import classNames from "classnames/bind";

import styles from "./CardOrder.module.scss";
import { useState } from "react";
import { Button, Modal } from "antd";
import { formatCurrency, formatDate } from "~/utils/format";
import ModalOrderDetail from "~/components/Modals/ModalOrderDetail";

const cx = classNames.bind(styles);

function CardOrder({ orderData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("order-code")}>
        Mã đơn hàng
        <span>#{orderData.invoice_id}</span>
      </div>
      <div className={cx("order-date")}>
        Ngày đặt: <span>{formatDate(orderData.createdAt)}</span>
      </div>
      <div className={cx("order-date")}>
        Tổng tiền: <span>{formatCurrency(orderData.finalAmount)}</span>
      </div>
      <div className={cx("order-status")}>{orderData.orderStatus}</div>
      <div className={cx("order-status")}>{orderData.paymentStatus}</div>
      <Button onClick={showModal} className={cx("order-action")}>
        Xem chi tiết
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className={cx("modal-detailOrder")}
        width={900}
      >
        <ModalOrderDetail id={orderData.invoice_id} />
      </Modal>
    </div>
  );
}

export default CardOrder;
