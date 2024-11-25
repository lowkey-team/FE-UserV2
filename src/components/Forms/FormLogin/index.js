import classNames from "classnames/bind";
import { Input, Spin, message, notification, Form } from "antd"; // Import Spin từ Ant Design
import { useState } from "react";

import styles from "./FormLogin.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import icons from "~/assets/icons";
import FormRegister from "../FormRegister";
import { LoginAPI } from "~/apis";
import Cookies from "js-cookie";

import ProgressBar from "../../ProgressBar/ProgressBar";
import FormForgotPassword from "../FormForgotPassword";

const cx = classNames.bind(styles);

function FormLogin({ onClose }) {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showFormForgotPassword, setShowFormForgotPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [Passwords, setPasswords] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  const handleForgotPasswordClick = () => {
    setShowFormForgotPassword(true);
  };

  const handleCloseForgotPasswordForm = () => {
    setShowFormForgotPassword(false);
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    console.log(identifier, Passwords);
    try {
      const response = await LoginAPI({
        identifier: identifier,
        Passwords: Passwords,
      });

      if (response && response.token && response.user) {
        const { token, user } = response;
        Cookies.set("token", token, { expires: 7, secure: true });

        Cookies.set("user", JSON.stringify(user), { expires: 7, secure: true });
        console.log("User:", user);
        console.log("Token:", token);
        notification.success({
          message: "Đăng nhập thành công",
          description: "Chào mừng bạn đến với hệ thống!",
        });
        window.location.reload();
      } else {
        setError("Đăng nhập thất bại: Sai thông tin đăng nhập.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Đăng nhập thất bại: Thông tin không hợp lệ.");
      } else {
        setError("Lỗi kết nối: Vui lòng thử lại.");
      }
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ProgressBar isLoading={isLoading} />
      {!showRegisterForm && (
        <div className={cx("form-overlay")} onClick={onClose}>
          <div
            className={cx("form-login")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={cx("form-content")}>
              <button onClick={onClose} className={cx("btn-closeform")}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <h3 className={cx("title")}>Đăng nhập</h3>
              {error && <div className={cx("error")}>{error}</div>}

              <div className={cx("form-input")}>
                <input
                  className={cx("input")}
                  type="text"
                  placeholder="Email hoặc Số điện thoại"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
                <FontAwesomeIcon className={cx("icon-input")} icon={faUser} />
              </div>

              <div className={cx("form-input")}>
                <Input.Password
                  className={cx("input")}
                  placeholder="Nhập mật khẩu"
                  value={Passwords}
                  onChange={(e) => setPasswords(e.target.value)}
                />
                <FontAwesomeIcon className={cx("icon-input")} icon={faLock} />
              </div>

              <div className={cx("remember")}>
                <input type="checkbox" />
                <span className={cx("text-remember")}>Nhớ mật khẩu</span>
              </div>

              <div className={cx("form-btn")}>
                <button className={cx("btn-login")} onClick={handleLogin}>
                  {isLoading ? <Spin /> : "Đăng nhập"}{" "}
                  {/* Hiển thị Spin nếu đang loading */}
                </button>
                <button className={cx("btn-forgotPassowrd")}>
                  <a onClick={handleForgotPasswordClick}>Quên mật khẩu?</a>
                </button>

                <div className={cx("more-login")}>
                  <h6>Hoặc đăng nhập với</h6>
                  <button className={cx("btn-loginGoogle")}>
                    <img src={icons.google} alt="" />
                    <span>Đăng nhập bằng Google</span>
                  </button>
                </div>

                <button className={cx("btn-register")}>
                  <span>Bạn chưa có tài khoản?</span>
                  <button onClick={handleRegisterClick}>Đăng ký ngay</button>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRegisterForm && <FormRegister onClose={handleCloseRegisterForm} />}
      {showFormForgotPassword && (
        <FormForgotPassword onClose={handleCloseForgotPasswordForm} />
      )}
    </>
  );
}

export default FormLogin;
