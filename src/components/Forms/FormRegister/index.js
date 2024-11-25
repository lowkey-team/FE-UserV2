import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./FormRegister.module.scss";
import {
  fetchDistrictsByProvinceId,
  fetchProvincesAPI,
  fetchWardsByDistrictId,
} from "~/apis";
import { RegisterAPI } from "~/apis";

const cx = classNames.bind(styles);

function FormRegister({ onClose }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProvincesAPI()
      .then((data) => setProvinces(data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setSelectedDistrict("");
    setSelectedWard("");
    setWards([]);

    fetchDistrictsByProvinceId(provinceId)
      .then((data) => setDistricts(data))
      .catch((error) => console.error("Error fetching districts:", error));
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setSelectedWard("");

    fetchWardsByDistrictId(districtId)
      .then((data) => setWards(data))
      .catch((error) => console.error("Error fetching wards:", error));
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem mật khẩu có khớp không
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }

    const formData = {
      FullName: fullName,
      Email: email,
      Phone: phone,
      Passwords: password,
      address: address,
    };

    try {
      const response = await RegisterAPI(formData);
      console.log("Đăng ký thành công:", response);
      onClose();
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      setErrorMessage("Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className={cx("form-overlay")} onClick={onClose}>
      <div className={cx("form-register")} onClick={(e) => e.stopPropagation()}>
        <div className={cx("form-content")}>
          <button onClick={onClose} className={cx("btn-closeform")}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h3 className={cx("title")}>Đăng ký Tài Khoản</h3>

          {/* Các input form khác */}
          <div className={cx("form-input")}>
            <label>Họ và tên</label>
            <input
              className={cx("input")}
              type="text"
              placeholder="Nhập họ và tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className={cx("form-input")}>
            <label>Email</label>
            <input
              className={cx("input")}
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={cx("form-input")}>
            <label>Số điện thoại</label>
            <input
              className={cx("input")}
              type="tel"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className={cx("form-input")}>
            <label>Mật khẩu</label>
            <input
              className={cx("input")}
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={cx("form-input")}>
            <label>Nhập lại mật khẩu</label>
            <input
              className={cx("input")}
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className={cx("form-input")}>
            <label>Địa chỉ</label>
            <input
              className={cx("input")}
              type="text"
              placeholder="Nhập địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Chọn tỉnh/quận/phường */}
          {/* Các select dropdown ở đây */}

          <div className={cx("form-btn")}>
            <button className={cx("btn-register")} onClick={handleSubmit}>
              Đăng Ký
            </button>
            <button className={cx("btn-login")}>
              <span>Bạn đã có tài khoản?</span>
              <button onClick={onClose}>Đăng nhập ngay</button>
            </button>
          </div>

          {errorMessage && (
            <p className={cx("error-message")}>{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormRegister;
