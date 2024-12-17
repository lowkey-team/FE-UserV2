import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Input, Space, Upload, message } from "antd";
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ModalExchange.module.scss";
import Cookies from "js-cookie";
import { UploadOutlined } from "@ant-design/icons";
import { createReturnAPI } from "~/apis/returnDetail";

const cx = classNames.bind(styles);

function ModalExchange({
  id,
  visible,
  onCancel,
  invoiceID,
  id_ProductVariation,
}) {
  const [reason, setReason] = useState("");
  const [quantity, setQuantity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fileList, setFileList] = useState([]);

  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  console.log("id đơn hàng: ", invoiceID);
  const handleConfirm = async () => {
    if (!reason || !quantity || !phoneNumber) {
      message.error("Vui lòng nhập đầy đủ lý do, số lượng, và số điện thoại.");
      return;
    }

    if (!storedUser) {
      message.error("Vui lòng đăng nhập để thực hiện yêu cầu.");
      return;
    }

    const formData = new FormData();
    formData.append("ID_invoiceDetail", invoiceID);
    formData.append("returnQuantity", quantity);
    formData.append("reason", reason);
    formData.append("phoneNumber", phoneNumber);
    formData.append("ID_User", storedUser.id);

    fileList.forEach((file) => {
      formData.append("image", file.originFileObj);
    });
    console.log("formData:", formData);

    try {
      const response = await createReturnAPI(formData);
      message.success("Tạo đơn đổi hàng thành công!");
      console.log("Response:", response);
      onCancel();
    } catch (error) {
      console.error("Error creating return order:", error);
      message.error("Không thể tạo đơn đổi hàng. Vui lòng thử lại.");
    }
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Bạn chỉ được tải lên file hình ảnh!");
    }
    return isImage;
  };

  return (
    <Modal
      visible={visible}
      title="Đổi hàng"
      onCancel={onCancel}
      footer={null}
      className={cx("modal")}
    >
      <div className={cx("modal-content")}>
        <div className={cx("input-group")}>
          <label className={cx("label")}>Lý do đổi hàng</label>
          <Input.TextArea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Nhập lý do đổi hàng"
          />
        </div>

        <div className={cx("input-group")}>
          <label className={cx("label")}>Số lượng</label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Nhập số lượng"
          />
        </div>

        <div className={cx("input-group")}>
          <label className={cx("label")}>Số điện thoại liên lạc</label>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className={cx("input-group")}>
          <label className={cx("label")}>Chọn hình ảnh</label>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={beforeUpload}
            maxCount={1} //đổi số lượng hình ảnh ở đây
          >
            {fileList.length < 1 && "+ Chọn hình ảnh"}
          </Upload>
        </div>

        <Space className={cx("footer-buttons")}>
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>
        </Space>
      </div>
    </Modal>
  );
}

export default ModalExchange;
