import classNames from "classnames/bind";

import styles from './FormProfile.module.scss'
import { useEffect, useState } from "react";
import { fetchDistrictsByProvinceId, fetchProvincesAPI, fetchWardsByDistrictId } from "~/apis";

const cx = classNames.bind(styles);

function FormProfile() {

    // State for address data
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // State for selected address values
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
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
                <input type="text" />

                <label>Tên đăng nhập:</label>
                <input type="text" />

                <label>Số điện thoại:</label>
                <input type="text" />

                <label>Email:</label>
                <input type="email" />

                <label>Địa chỉ:</label>
                <input type="text" />

                <div className={cx("address-select")}>
                    <select onChange={handleProvinceChange} value={selectedProvince}>
                        <option value="">Chọn tỉnh / thành</option>
                        {provinces.map((province) => (
                            <option key={province.province_id} value={province.province_id}>
                                {province.province_name}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={handleDistrictChange}
                        value={selectedDistrict}
                        disabled={!selectedProvince}
                    >
                        <option value="">Chọn quận / huyện</option>
                        {districts.map((district) => (
                            <option key={district.district_id} value={district.district_id}>
                                {district.district_name}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(e) => setSelectedWard(e.target.value)}
                        value={selectedWard}
                        disabled={!selectedDistrict}
                    >
                        <option value="">Chọn phường / xã</option>
                        {wards.map((ward) => (
                            <option key={ward.ward_id} value={ward.ward_id}>
                                {ward.ward_name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Thay đổi thông tin</button>
            </form>
        </div>
    );
}

export default FormProfile;