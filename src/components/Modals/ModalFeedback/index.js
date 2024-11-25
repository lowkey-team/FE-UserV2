import classNames from "classnames/bind";
import styles from "./ModalFeedback.module.scss";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, message, Upload, Rate, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { createfeedbacksByInvoicesDetailAPI } from "~/apis";

const cx = classNames.bind(styles);
const { TextArea } = Input;

// Hàm để chuyển file sang Base64
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

// Kiểm tra file trước khi upload
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Hình ảnh phải nhỏ hơn 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const ModalFeedback = ({ id_invoiceDetail, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const handleImageChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.originFileObj) {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        setImageFile(info.file.originFileObj);
      });
    }
  };

  const handleAdd = async () => {
    if (!rating || !content.trim()) {
      message.error("Vui lòng điền đủ thông tin và đánh giá!");
      return;
    }

    const formData = new FormData();
    formData.append("ID_InvoiceDetail", id_invoiceDetail);
    formData.append("content", content);
    formData.append("rating", rating);
    formData.append("status", true);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setLoading(true);
      const response = await createfeedbacksByInvoicesDetailAPI(formData);
      if (response.status === 201) {
        message.success("Gửi phản hồi thành công!");
        setRating(0);
        setContent("");
        setImageUrl(null);
        setImageFile(null);
        onClose();
      } else {
        message.error("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      message.error("Không thể gửi phản hồi, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const desc = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("feedback-product")}>
        <TextArea
          className={cx("content-feedback")}
          rows={5}
          placeholder="Mời bạn chia sẻ một số cảm nhận về sản phẩm..."
          maxLength={200}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className={cx("picture")}>
          <Upload
            name="avatar"
            listType="picture-card"
            className={cx("img-feedback")}
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleImageChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="feedback" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>

        <div className={cx("rate")}>
          <div className={cx("title-rate")}>
            <p>Bạn cảm thấy thế nào về sản phẩm? (Chọn sao)</p>
          </div>
          <div className={cx("form-star")}>
            <Rate
              tooltips={desc}
              onChange={setRating}
              value={rating}
              character={
                <span className={cx("custom-star")}>
                  <FontAwesomeIcon className={cx("icon-star")} icon={faStar} />
                </span>
              }
              className={cx("rate-feedback")}
            />
          </div>
        </div>

        <Button
          className={cx("btn-send")}
          type="primary"
          onClick={handleAdd}
          loading={loading}
        >
          GỬI ĐÁNH GIÁ
        </Button>
      </div>
    </div>
  );
};

export default ModalFeedback;
