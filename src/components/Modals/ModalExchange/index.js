import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Input, Space, Upload, message } from "antd";
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ModalExchange.module.scss";
import Cookies from "js-cookie";
import { exchangeGoodsAPI } from "~/apis/suggest";
import { UploadOutlined } from "@ant-design/icons"; // Import Upload icon

const cx = classNames.bind(styles);

function ModalExchange({
  id,
  visible,
  onCancel,
  invoiceID,
  id_ProductVariation,
}) {
  // State to store reason, quantity, and image list
  const [reason, setReason] = useState("");
  const [quantity, setQuantity] = useState("");
  const [fileList, setFileList] = useState([]);

  // Retrieve the user data from cookies (if available)
  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  // Handler for Confirm button
  const handleConfirm = async () => {
    // Validate the input
    if (!reason || !quantity) {
      alert("Vui lòng nhập đầy đủ lý do và số lượng.");
      return;
    }

    // Ensure the user data is available
    if (!storedUser) {
      alert("Vui lòng đăng nhập để thực hiện yêu cầu.");
      return;
    }

    // Process form submission (including image upload if needed)
    // For now, just log the data
    console.log("Reason:", reason);
    console.log("Quantity:", quantity);
    console.log("Images:", fileList);
  };

  // Function to handle file upload (you can customize the behavior here)
  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
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
          <label htmlFor="reason" className={cx("label")}>
            Lý do đổi hàng
          </label>
          <Input.TextArea
            id="reason"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Nhập lý do đổi hàng"
          />
        </div>

        <div className={cx("input-group")}>
          <label htmlFor="quantity" className={cx("label")}>
            Số lượng
          </label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Nhập số lượng"
          />
        </div>

        {/* Image Upload Section */}
        <div className={cx("input-group")}>
          <label htmlFor="image" className={cx("label")}>
            Chọn hình ảnh
          </label>
          <Upload
            action="/upload"  // Your upload endpoint
            listType="picture-card"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={beforeUpload}
            maxCount={3}  // You can limit the number of images
          >
            {fileList.length < 3 && "+ Chọn hình ảnh"}
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
