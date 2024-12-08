import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import {
  fecthFindByIdUserAPI,
  fetchDistrictsByProvinceId,
  fetchProvincesAPI,
  fetchWardsByDistrictId,
} from "~/apis";
import styles from "./FormProfile.module.scss";

const cx = classNames.bind(styles);

function FormProfile() {
  // State for user data
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  // State for address data
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // State for selected address values
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    const storedUser = Cookies.get("user")
      ? JSON.parse(Cookies.get("user"))
      : null;
    if (storedUser && storedUser.id) {
      fecthFindByIdUserAPI(storedUser.id)
        .then((data) => {
          setUser(data);
          // Set initial address values if available
          setSelectedProvince(data.province || "");
          setSelectedDistrict(data.district || "");
          setSelectedWard(data.ward || "");
        })
        .catch((error) => console.error("Error fetching user data:", error))
        .finally(() => setLoadingUser(false));
    } else {
      setLoadingUser(false);
    }
  }, []);

  // Fetch provinces on component mount
  useEffect(() => {
    fetchProvincesAPI().then((data) => {
      setProvinces(data);
    });
  }, []);

  // Handle province change and load districts
  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setSelectedDistrict("");
    setSelectedWard("");
    setDistricts([]);
    setWards([]);

    if (provinceCode) {
      fetchDistrictsByProvinceId(provinceCode).then((data) => {
        setDistricts(data);
        console.log("province:", data);
      });
    }
  };

  // Handle district change and load wards
  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    setSelectedWard("");
    setWards([]);

    if (districtCode) {
      fetchWardsByDistrictId(districtCode).then((data) => {
        setWards(data);
      });
    }
  };

  return (
    <div className={cx("content")}>
      <h2>Thông Tin Cá Nhân</h2>
      <form className={cx("form")}>
        <label>Họ và tên:</label>
        <input type="text" value={user.FullName || ""} />

        <label>Số điện thoại:</label>
        <input type="text" value={user.Phone || ""} />

        <label>Email:</label>
        <input type="text" value={user.email || ""} />

        <label>Địa chỉ:</label>
        <input type="text" value={user.address || ""} />
        <button type="submit">Thay đổi thông tin</button>
      </form>
    </div>
  );
}

export default FormProfile;
