import classNames from "classnames/bind";
import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./FormForgotPassword.module.scss";
import { Form, Input, Button, message } from "antd";
import {
  fetchCheckEmailAPI,
  sendEmailAPI,
  resetPasswordAPI,
  updatePasswordAPI,
} from "~/apis";

const cx = classNames.bind(styles);

function FormForgotPassword({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const sendOtp = async (email) => {
    try {
      setLoading(true);

      const checkEmailResponse = await fetchCheckEmailAPI(email);
      if (!checkEmailResponse) {
        message.error("Email không hợp lệ hoặc chưa đăng ký.");
        setLoading(false);
        return;
      }

      const otp = generateOtp();
      sessionStorage.setItem("otp", otp);

      const formData = {
        to: email,
        subject: "Xác nhận OTP",
        text: `Mã OTP của bạn là ${otp}`,
        html: `<h1>Mã OTP của bạn là ${otp}</h1>`,
      };

      console.log("data send", formData);
      const sendOtpResponse = await sendEmailAPI(formData);
      if (sendOtpResponse) {
        message.success("Mã OTP đã được gửi đến email của bạn.");
        setOtpSent(true);
      } else {
        message.error("Có lỗi xảy ra khi gửi mã OTP.");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi gửi OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);

      const storedOtp = sessionStorage.getItem("otp");

      if (otp === storedOtp) {
        message.success("Xác thực OTP thành công!");
        setOtpVerified(true);
        setOtpSent(false);
      } else {
        message.error("Mã OTP không hợp lệ!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi xác thực OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      if (!newPassword) {
        message.error("Vui lòng nhập mật khẩu mới!");
        return;
      }
      const updatedPassword = {
        email: email,
        newPassword: newPassword,
      };
      setLoading(true);
      console.log("email : pass", updatedPassword);
      const resetPasswordResponse = await updatePasswordAPI(updatedPassword);
      if (resetPasswordResponse) {
        console.log("mk đã cập nhật thành công");
        message.success("Mật khẩu của bạn đã được thay đổi!");
        onClose();
      } else {
        message.error("Đổi mật khẩu không thành công!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi cập nhật mật khẩu.");
    }
    setLoading(false);
  };

  const onFinish = (values) => {
    setEmail(values.email);
    sendOtp(values.email);
  };

  return (
    <div className={cx("form-overlay")} onClick={onClose}>
      <div className={cx("form-register")} onClick={(e) => e.stopPropagation()}>
        <div className={cx("form-content")}>
          <button onClick={onClose} className={cx("btn-closeform")}>
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <h2 className={cx("form-title")}>
            {otpSent ? "Nhập Mã OTP" : "Quên Mật Khẩu"}
          </h2>

          <Form
            name="forgot-password"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ email: "" }}
          >
            {!otpSent && !otpVerified && (
              <>
                {/* Form nhập email */}
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email của bạn!" },
                    { type: "email", message: "Địa chỉ email không hợp lệ!" },
                  ]}
                >
                  <Input placeholder="Nhập email của bạn" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={cx("btn-submit")}
                    loading={loading}
                  >
                    Gửi yêu cầu
                  </Button>
                </Form.Item>
              </>
            )}

            {otpSent && !otpVerified && (
              <>
                {/* Form nhập OTP */}
                <Form.Item
                  label="Mã OTP"
                  name="otp"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã OTP đã gửi!" },
                  ]}
                >
                  <Input
                    placeholder="Nhập mã OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    onClick={verifyOtp}
                    loading={loading}
                    className={cx("btn-submit")}
                  >
                    Xác thực OTP
                  </Button>
                </Form.Item>
              </>
            )}

            {otpVerified && (
              <>
                {/* Form đổi mật khẩu */}
                <Form.Item
                  label="Mật khẩu mới"
                  name="newPassword"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                  ]}
                >
                  <Input.Password
                    placeholder="Nhập mật khẩu mới"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    onClick={handlePasswordReset}
                    loading={loading}
                    className={cx("btn-submit")}
                  >
                    Cập nhật mật khẩu
                  </Button>
                </Form.Item>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default FormForgotPassword;
