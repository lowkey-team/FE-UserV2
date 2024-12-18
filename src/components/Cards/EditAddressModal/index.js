import { Modal, Input, Button, Form, Select } from "antd";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { fecthFindByIdUserAPI } from "~/apis";
import {
  getProvincesAPI,
  getDistrictsByProvinceAPI,
  getWardsByDistrictAPI,
} from "~/apis/cart";

const EditAddressModal = ({
  isVisible,
  onClose,
  handleSave,
  setAddress,
  setLocationCodes,
}) => {
  const [form] = Form.useForm();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  useEffect(() => {
    if (storedUser && storedUser.id) {
      fecthFindByIdUserAPI(storedUser.id)
        .then((dataUser) => {
          if (dataUser) {
            setFullName(dataUser.FullName);
            setPhone(dataUser.Phone);
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [storedUser]);

  const onFinish = (values) => {
    const fullAddress = {
      ...values,
      province: provinces.find((item) => item.ProvinceID === selectedProvince)
        ?.ProvinceName,
      district: districts.find((item) => item.DistrictID === selectedDistrict)
        ?.DistrictName,
      ward: wards.find((item) => item.WardCode === selectedWard)?.WardName,
    };

    setAddress({
      name: fullAddress.name,
      phone: fullAddress.phone,
      addressLine: `${fullAddress.address}, ${fullAddress.ward}, ${fullAddress.district}, ${fullAddress.province}`,
    });

    setLocationCodes({
      districtCode: selectedDistrict,
      wardCode: selectedWard,
    });

    handleSave(fullAddress);
    onClose();
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getProvincesAPI();
        setProvinces(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy tỉnh thành:", error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await getDistrictsByProvinceAPI(selectedProvince);
          setDistricts(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy quận huyện:", error);
        }
      };
      fetchDistricts();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const response = await getWardsByDistrictAPI(selectedDistrict);
          setWards(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy phường xã:", error);
        }
      };
      fetchWards();
    }
  }, [selectedDistrict]);

  return (
    <Modal
      title="Chỉnh sửa thông tin địa chỉ"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ name: "", phone: "", address: "" }}
      >
        <Form.Item
          label="Họ tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Input placeholder="Họ tên người nhận hàng" value={fullName} />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Input placeholder="Số điện thoại" value={phone} />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Input placeholder="Địa chỉ nhận hàng" />
        </Form.Item>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
          }}
        >
          <Select
            placeholder="Chọn tỉnh thành"
            value={selectedProvince}
            onChange={(value) => setSelectedProvince(value)}
            style={{ width: 200 }}
          >
            {provinces.map((province) => (
              <Select.Option
                key={province.ProvinceID}
                value={province.ProvinceID}
              >
                {province.ProvinceName}
              </Select.Option>
            ))}
          </Select>

          <Select
            placeholder="Chọn quận huyện"
            value={selectedDistrict}
            onChange={(value) => setSelectedDistrict(value)}
            style={{ width: 200 }}
            disabled={!selectedProvince}
          >
            {districts.map((district) => (
              <Select.Option
                key={district.DistrictID}
                value={district.DistrictID}
              >
                {district.DistrictName}
              </Select.Option>
            ))}
          </Select>

          <Select
            placeholder="Chọn xã phường"
            value={selectedWard}
            onChange={(value) => setSelectedWard(value)}
            style={{ width: 200 }}
            disabled={!selectedDistrict}
          >
            {wards.map((ward) => (
              <Select.Option key={ward.WardCode} value={ward.WardCode}>
                {ward.WardName}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="modal-footer">
          <Button
            onClick={onClose}
            style={{ marginRight: "20px", color: "red" }}
          >
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Lưu thay đổi
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditAddressModal;
