import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { Input, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import styles from "./ModalPayment.module.scss";
import { formatDateToMySQL } from "~/utils/format";
import { deleteCartByIdAPI } from "~/apis/cart";
import {
  addInvoiceAPI,
  fecthFindByIdUserAPI,
  fetchDistrictsByProvinceId,
  fetchProvincesAPI,
  fetchWardsByDistrictId,
  PaymentMoMoAPI,
  PaymentStatusMoMoAPI,
  updateInvoices,
} from "~/apis";

const cx = classNames.bind(styles);
const { TextArea } = Input;
function ModalPayment({
  onClose,
  selectedProducts = [],
  totalPrice,
  discountAmount,
  finalAmount,
  voucherCode,
  note,
  removeSelectedProducts 
}) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWardName, setSelectedWardName] = useState("");

  const [selectdCart, setSelectedCart] = useState("");

  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  useEffect(() => {
    console.log("data id cart:", selectedProducts);
    const cartIdsObject = {
      cartIds: selectedProducts.map((cart) => cart.id),
    };
    console.log("data id cart:", cartIdsObject);
    setSelectedCart(cartIdsObject);

    fetchProvincesAPI()
      .then((data) => setProvinces(data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

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

  useEffect(() => {
    const updatedAddress = `${address}, ${selectedWardName || ""}, ${
      selectedDistrictName || ""
    }, ${selectedProvinceName || ""}`;
    setFullAddress(updatedAddress);
  }, [address, selectedWardName, selectedDistrictName, selectedProvinceName]);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    const provinceName =
      provinces.find((p) => p.province_id === provinceId)?.province_name || "";

    setSelectedProvince(provinceId);
    setSelectedProvinceName(provinceName);

    // Reset các giá trị huyện và xã khi thay đổi tỉnh
    setSelectedDistrict("");
    setSelectedDistrictName("");
    setSelectedWard("");
    setSelectedWardName("");

    setDistricts([]); // Xóa danh sách quận/huyện
    setWards([]); // Xóa danh sách phường/xã

    if (provinceId) {
      fetchDistrictsByProvinceId(provinceId)
        .then((data) => setDistricts(data))
        .catch((error) => console.error("Error fetching districts:", error));
    }
  };

  // Xử lý thay đổi quận/huyện
  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    const districtName =
      districts.find((d) => d.district_id === districtId)?.district_name || "";

    setSelectedDistrict(districtId);
    setSelectedDistrictName(districtName);

    // Reset giá trị xã khi thay đổi huyện
    setSelectedWard("");
    setSelectedWardName("");
    setWards([]); // Xóa danh sách phường/xã

    if (districtId) {
      fetchWardsByDistrictId(districtId)
        .then((data) => setWards(data))
        .catch((error) => console.error("Error fetching wards:", error));
    }
  };

  // Xử lý thay đổi phường/xã
  const handleWardChange = (e) => {
    const wardId = e.target.value;
    const wardName = wards.find((w) => w.ward_id === wardId)?.ward_name || "";

    setSelectedWard(wardId);
    setSelectedWardName(wardName);
  };

  const handleCODPayment = async () => {
    const orderData = getOrderData(paymentMethod, "Chưa thanh toán");
    console.log("orderData:", orderData);
    try {
      await addInvoiceAPI(orderData);
      notification.success({
        message: "Đơn hàng đã được hoàn tất!",
        description: "Bạn đã hoàn tất đơn hàng và chờ xử lý.",
      });
      onClose();
      await deleteCartByIdAPI(selectdCart);
      removeSelectedProducts(selectedProducts);
      // console.log("data delete:", selectdCart);

    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra khi hoàn tất đơn hàng",
        description: "Vui lòng thử lại sau.",
      });
    }
    // await deleteCartByIdAPI(selectdCart);
  };

  const handleMomoPayment = async () => {
    const orderData = getOrderData(paymentMethod, "Đang xử lý");

    try {
      const invoiceResponse = await addInvoiceAPI(orderData);
      const invoiceId = invoiceResponse.data.invoiceId;
      alert("Đơn hàng đã tạo thành công. Vui lòng thực hiện thanh toán");
      await deleteCartByIdAPI(selectdCart);
      removeSelectedProducts(selectedProducts);
      const paymentData = await PaymentMoMoAPI(orderData);

      if (paymentData && paymentData.payUrl) {
        const orderId = paymentData.orderId;

        const paymentWindow = window.open(paymentData.payUrl, "_blank");

        const checkPaymentStatusInterval = setInterval(async () => {
          try {
            await PaymentStatusMoMoAPI(orderId);

            const updatedData = {
              invoiceId: invoiceId,
              paymentStatus: "Đã thanh toán",
              orderStatus: "Đã hoàn thành",
            };

            await updateInvoices(updatedData);
            alert("Đơn hàng đã thanh toán thành công!");
            clearInterval(checkPaymentStatusInterval);
            paymentWindow.close();
          } catch (error) {
            console.error("Lỗi khi kiểm tra trạng thái thanh toán:", error);
          }
        }, 5000);
      } else {
        console.error("Không có link thanh toán trong phản hồi:", paymentData);
        alert("Không thể tạo link thanh toán, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi thanh toán MoMo:", error);
      alert("Có lỗi xảy ra khi thanh toán MoMo. Vui lòng thử lại.");
    }
  };

  const getOrderData = (paymentMethod, paymentStatus) => {
    const selectedProvinceName =
      provinces.find((prov) => prov.province_id === selectedProvince)
        ?.province_name || "";
    const selectedDistrictName =
      districts.find((dist) => dist.district_id === selectedDistrict)
        ?.district_name || "";
    const selectedWardName =
      wards.find((ward) => ward.ward_id === selectedWard)?.ward_name || "";

    const fullAddress = `${address}, ${selectedWardName}, ${selectedDistrictName}, ${selectedProvinceName}`;

    return {
      userId: storedUser?.id || null,
      employeerId: null,
      totalAmount: totalPrice,
      discountAmount: discountAmount,
      finalAmount: finalAmount,
      voucherCode: voucherCode,
      paymentStatus: paymentStatus,
      paymentMethod: paymentMethod,
      orderStatus: "Đang xử lý",
      note: note,
      invoiceDate: formatDateToMySQL(new Date()),
      receivedDate: formatDateToMySQL(
        new Date(Date.now() + 24 * 60 * 60 * 1000)
      ),
      shippingAddress: fullAddress,
      phoneNumber: phone,
      customerName: fullName,
      items: selectedProducts.map((product) => ({
        productVariationId: product.id_variation,
        unitPrice: product.reducedPrice,
        amount: product.price,
        quantity: product.quantity,
      })),
    };
  };

  //   const provinceId = e.target.value;
  //   setSelectedProvince(provinceId);
  //   setSelectedDistrict("");
  //   setSelectedWard("");
  //   setWards([]);

  //   fetchDistrictsByProvinceId(provinceId)
  //     .then((data) => setDistricts(data))
  //     .catch((error) => console.error("Error fetching districts:", error));
  // };

  // const handleDistrictChange = (e) => {
  //   const districtId = e.target.value;
  //   setSelectedDistrict(districtId);
  //   setSelectedWard("");

  //   fetchWardsByDistrictId(districtId)
  //     .then((data) => setWards(data))
  //     .catch((error) => console.error("Error fetching wards:", error));
  // };

  // const handleWardChange = (e) => {
  //   setSelectedWard(e.target.value);
  // };
  const handleZaloPayPayment = () => {
    alert("Thanh toán ZaloPay đang phát triển");
  };

  const handleVNPayPayment = () => {
    alert("Thanh toán ZaloPay đang phát triển");
  };
  const handlePaymentMethodChange = () => {
    switch (paymentMethod) {
      case "COD":
        handleCODPayment();
        break;
      case "Momo":
        handleMomoPayment();
        break;
      case "ZaloPay":
        handleZaloPayPayment();
        break;
      case "VNPay":
        handleVNPayPayment();
        break;
      default:
        console.log("Chưa chọn phương thức thanh toán.");
        break;
    }
  };
  const handlePhoneChange = (e) => {
    // Chỉ cho phép nhập các ký tự số
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  return (
    <div className={cx("modal-overlay")}>
      <div className={cx("modal-content")}>
        <div className={cx("btnClose")} onClick={onClose}>
          <h1>X</h1>
        </div>
        <form className={cx("formConfirm")}>
          <h2>Thông tin đặt hàng</h2>
          <div className={cx("form-input")}>
            <label>Họ và tên</label>
            <input type="text" placeholder="Họ và tên" value={fullName} />
          </div>
          <div className={cx("form-input")}>
            <label>Số điện thoại</label>
            <input
              className={cx("phone")}
              type="text"
              onChange={handlePhoneChange}
              value={phone}
              placeholder="Số điện thoại"
            />
          </div>
          <div className={cx("form-input")}>
            <label>Địa chỉ đầy đủ</label>
            <Input
              placeholder="maxLength is 6"
              value={fullAddress}
              readOnly
              className={cx("full-address")}
            />
          </div>

          <div className={cx("City")}>
            <div className={cx("streetName")}>
              <Input
                type="text"
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <select
              className={cx("Input-City")}
              value={selectedProvince}
              onChange={handleProvinceChange}
            >
              <option value="">Tỉnh/Thành phố</option>
              {provinces.map((province) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>

            <select
              className={cx("Input-District")}
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedProvince}
            >
              <option value="">Quận/Huyện</option>
              {districts.map((district) => (
                <option key={district.district_id} value={district.district_id}>
                  {district.district_name}
                </option>
              ))}
            </select>

            <select
              className={cx("Input-Ward")}
              value={selectedWard}
              onChange={handleWardChange}
              disabled={!selectedDistrict}
            >
              <option value="">Phường/Xã</option>
              {wards.map((ward) => (
                <option key={ward.ward_id} value={ward.ward_id}>
                  {ward.ward_name}
                </option>
              ))}
            </select>
          </div>
          <div className={cx("Payment")}>
            <div className={cx("Option-Payment")}>
              <button
                type="button"
                onClick={() => setPaymentMethod("COD")}
                className={cx("Shipcod", { active: paymentMethod === "COD" })}
              >
                <FontAwesomeIcon icon={faTruckFast} /> Thanh toán khi nhận hàng
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("Momo")}
                className={cx("Online", { active: paymentMethod === "Momo" })}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnV4cUM7jBauINof35Yn_unOz976Iz5okV8A&s"
                  alt="payment"
                />
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("ZaloPay")}
                className={cx("Online", {
                  active: paymentMethod === "ZaloPay",
                })}
              >
                <img
                  src="https://play-lh.googleusercontent.com/woYAzPCG1I8Z8HXCsdH3diL7oly0N8uth_1g6k7R_9Gu7lbxrsYeriEXLecRG2E9rP0"
                  alt="payment"
                />
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("VNPay")}
                className={cx("Online", { active: paymentMethod === "VNPay" })}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                  alt="payment"
                />
              </button>
            </div>
          </div>

          <div className={cx("completeOrder")}>
            <button
              type="button"
              className={cx("btnConfirmOrder")}
              onClick={handlePaymentMethodChange}
            >
              HOÀN TẤT ĐƠN HÀNG
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalPayment;
