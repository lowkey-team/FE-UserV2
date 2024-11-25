import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ModalOrderDetail.module.scss";
import { fetchInvoiceDetailByIdInvoiceAPI } from "~/apis";
import CardOrderDetail from "~/components/Cards/CardOrderdetail";

const cx = classNames.bind(styles);
const { confirm } = Modal;

function ModalOrderDetail({ id }) {
  const [invoiceDetails, setInvoiceDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("id:", id);
      const response = await fetchInvoiceDetailByIdInvoiceAPI(id);
      console.log("response:", response);
      if (response && response[0] && response[0].invoice_info) {
        setInvoiceDetails(response[0].invoice_info);
      }
    };

    if (id) {
      fetchData();
      console.log("data");
    }
  }, [id]);

  console.log("data invoice information", invoiceDetails);

  const showDeleteConfirm = () => {
    confirm({
      title: "Bạn có chắc muốn hủy đơn hàng này?",
      icon: <ExclamationCircleFilled />,
      content: "Đơn hàng sẽ được hủy trước khi giao hàng",
      okText: "Hủy đơn",
      okType: "danger",
      cancelText: "Quay lại",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  if (!invoiceDetails) {
    return <div>Loading...</div>;
  }
  const currentDate = new Date();
  const receivedDate = new Date(invoiceDetails.receivedDate);

  const startOfCurrentDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const startOfReceivedDate = new Date(
    receivedDate.getFullYear(),
    receivedDate.getMonth(),
    receivedDate.getDate()
  );

  const daysDifference =
    (startOfCurrentDate - startOfReceivedDate) / (1000 * 3600 * 24);

  console.log("Ngày nhận:", startOfReceivedDate);
  console.log("Ngày hiện tại:", startOfCurrentDate);
  console.log(
    "Sự khác biệt giữa ngày nhận và ngày hiện tại (số ngày):",
    daysDifference
  );

  return (
    <div className={cx("modal-content")}>
      <div className={cx("title")}>Chi tiết đơn hàng</div>
      <hr />
      <div className={cx("modal-des")}>
        <div className={cx("order-detail")}>
          <div className={cx("detail-row")}>
            <label>Mã đơn hàng: </label>
            <span>{invoiceDetails.invoice_id}</span>
            {"    "}
            <label>trình trạng: </label>
            <span>{invoiceDetails.orderStatus}</span>
          </div>
          <div className={cx("order-date")}>
            <div className={cx("detail-row")}>
              <label>Ngày đặt: </label>
              <span>{invoiceDetails.createdAt}</span>{" "}
            </div>
            <div className={cx("detail-row")}>
              <label>- Ngày nhận dự kiến: </label>
              <span>{invoiceDetails.receivedDate}</span>{" "}
            </div>
          </div>
          <div className={cx("detail-row")}>
            <label>Tên người nhận: </label>
            <span>{invoiceDetails.customerName}</span>{" "}
          </div>
          <div className={cx("detail-row")}>
            <label>Địa chỉ nhận: </label>
            <span>{invoiceDetails.shippingAddress}</span>{" "}
          </div>
          <div className={cx("detail-row")}>
            <label>Số điện thoại: </label>
            <span>{invoiceDetails.phoneNumber}</span>{" "}
          </div>
          <div className={cx("detail-row")}>
            <label>Số lượng sản phẩm: </label>
            <span>{invoiceDetails.totalQuantity}</span>{" "}
          </div>
          <div className={cx("detail-row")}>
            <label>Tổng tiền: </label>
            <span>{invoiceDetails.finalAmount} vnđ</span>{" "}
          </div>
        </div>

        <div className={cx("product-list")}>
          <span>Danh sách sản phẩm</span>
          <div className={cx("list-item")}>
            {invoiceDetails.invoice_details &&
            invoiceDetails.invoice_details.length > 0 &&
            invoiceDetails.invoice_details.some(
              (product) => product.ID_productVariation != null
            ) ? (
              invoiceDetails.invoice_details.map((product, index) => (
                <CardOrderDetail
                  key={index}
                  product={product}
                  isFeedBack={
                    invoiceDetails.orderStatus === "Được giao" ? true : false
                  }
                />
              ))
            ) : (
              <p>Không có chi tiết hóa đơn.</p>
            )}
          </div>
        </div>

        <div className={cx("action-order")}>
          {(invoiceDetails.orderStatus === "Chờ thanh toán" ||
            invoiceDetails.orderStatus === "Chờ xác nhận") && (
            <Button
              onClick={showDeleteConfirm}
              style={{
                color: "white",
                borderColor: "red",
                backgroundColor: "red",
              }}
            >
              Hủy đơn
            </Button>
          )}

          {invoiceDetails.orderStatus === "Đã giao" && daysDifference <= 7 && (
            <Button
              style={{
                color: "white",
                borderColor: "blue",
                backgroundColor: "blue",
              }}
            >
              Trả hàng
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalOrderDetail;
