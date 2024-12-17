import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import CardProductCart from "~/components/Cards/CardProductCart";
import icons from "~/assets/icons";
import ModalPayment from "~/components/Modals/ModalPayment";
import { Color } from "antd/es/color-picker";
import { Link } from "react-router-dom";
import { notification, Button, Select, message, Checkbox } from "antd";
import { RadiusBottomrightOutlined } from "@ant-design/icons";
import { calculateShipment } from "~/apis/cart";
import {
  addInvoiceAPI,
  fetchCartByUserIdAPI,
  fetchVoucherByID,
  fetchVoucherByIdAPI,
  PaymentMoMoAPI,
  PaymentStatusMoMoAPI,
  updateInvoices,
} from "~/apis";
import { deleteCartByIdAPI } from "~/apis/cart";
import Cookies from "js-cookie";
import { formatCurrency } from "~/utils/format";
import MenuVoucherSaved from "~/components/MenuVoucherSaved";
import EditAddressModal from "~/components/Cards/EditAddressModal";
import { formatDateToMySQL } from "~/utils/format";
import { Option } from "antd/es/mentions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faTruckFast,
  faMobileAlt,
  faBarcode,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Cart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [data, setData] = useState([]);
  const [menuVoucherVisible, setMenuVoucherVisible] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);
  const [voucherCode, setVoucherCode] = useState();
  const [voucherCodeName, setVoucherCodeName] = useState();
  const [note, setNote] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [shipmentFee, setShipmentFee] = useState(null);
  const [selectdCart, setSelectedCart] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");

  const handlePaymentMethodChange = (value) => {
    setSelectedPaymentMethod(value);
  };

  const ResetPrice = () => {
    setTotalPrice(0);
    setSelectedProducts([]);
    setDiscountAmount(0);
    setMenuVoucherVisible(false);
    setSelectedVoucherId(null);
    setVoucherCode("");
    setVoucherCodeName("");
    setNote("");
    setShipmentFee(null);
    setSelectedCart("");
  };

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
  });

  const [locationCodes, setLocationCodes] = useState({
    districtCode: null,
    wardCode: null,
  });
  useEffect(() => {
    console.log("data id cart:", selectedProducts);
    const cartIdsObject = {
      cartIds: selectedProducts.map((cart) => cart.id),
    };
    console.log("data id cart:", cartIdsObject);
    setSelectedCart(cartIdsObject);
  }, []);

  // Hàm xử lý tích chọn tất cả
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      // Nếu tích chọn tất cả, thêm toàn bộ sản phẩm vào danh sách được chọn
      setSelectedProducts(cartItems.map((item) => item.id));
    } else {
      // Nếu bỏ tích chọn tất cả, xóa toàn bộ danh sách sản phẩm được chọn
      setSelectedProducts([]);
    }
  };

  const handleCalculateShipment = async () => {
    const formData = {
      to_district_id: locationCodes.districtCode,
      to_ward_code: locationCodes.wardCode,
      service_type_id: 2,
      height: 10,
      weight: 60,
      length: 30,
      width: 30,
    };

    try {
      const result = await calculateShipment(formData);
      setShipmentFee(result.total);
    } catch (error) {
      console.error("Error calculating shipment:", error);
    }
  };

  useEffect(() => {
    if (locationCodes.districtCode && locationCodes.wardCode) {
      handleCalculateShipment();
    }
  }, [locationCodes]);

  const handleVoucherSelect = async (id) => {
    console.log("Voucher được chọn:", id);
    setSelectedVoucherId(id);
    const voucherData = await fetchVoucherByIdAPI(id);
    setVoucherCode(voucherData);
    setVoucherCodeName(voucherData.voucherCode);
    console.log("Dữ liệu voucher:", voucherData);

    const discountAmount =
      (voucherData.discountValue / 100) * totalSelectedPrice;
    const newTotalPrice = totalSelectedPrice - discountAmount;

    setTotalPrice(newTotalPrice);
  };

  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  const removeSelectedProducts = (selectedProducts) => {
    setProducts((prevProducts) => {
      return prevProducts.filter(
        (product) =>
          !selectedProducts.some((selected) => selected.id === product.id)
      );
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchCartByUserIdAPI(storedUser.id);

        console.log("du lieu", data);
        const ListProducts = data.map((products) => ({
          ...products,
        }));

        setProducts(ListProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openNotification = (placement) => {
    api.info({
      message: "Thông báo",
      description: "Vui lòng chọn ít nhất một sản phẩm để thanh toán.",
      placement: placement,
      duration: 0,
      btn: (
        <Button type="primary" onClick={() => api.destroy()}>
          OK
        </Button>
      ),
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const updateSelectedProduct = (id, newPrice) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((product) =>
        product.id === id ? { ...product, price: newPrice } : product
      )
    );
  };

  const handleEditAddressModalOpen = () => {
    setIsEditAddressModalOpen(true);
  };

  const handleEditAddressModalClose = () => {
    setIsEditAddressModalOpen(false);
  };

  const handleSelectProduct = (
    id,
    isSelected,
    price,
    id_variation,
    quantity,
    originalPrice,
    reducedPrice,
    discount
  ) => {
    setSelectedProducts((prevSelected) => {
      console.log("Danh sách trước khi cập nhật:", prevSelected);

      let updatedSelected;
      const existingProductIndex = prevSelected.findIndex(
        (product) => product.id === id
      );

      if (existingProductIndex >= 0) {
        if (isSelected) {
          updatedSelected = prevSelected.map((product) => {
            if (product.id === id) {
              return {
                ...product,
                isSelected,
              };
            }
            return product;
          });
          console.log(
            "Danh sách sau khi cập nhật trạng thái chọn:",
            updatedSelected
          );
        } else {
          updatedSelected = prevSelected.filter((product) => product.id !== id);
          console.log(
            "Danh sách sau khi xóa sản phẩm (bỏ chọn):",
            updatedSelected
          );
        }
      } else if (isSelected) {
        updatedSelected = [
          ...prevSelected,
          {
            id,
            price,
            id_variation,
            quantity,
            originalPrice,
            reducedPrice,
            discount,
            isSelected,
          },
        ];
        console.log("Danh sách sau khi thêm mới sản phẩm:", updatedSelected);
      } else {
        updatedSelected = prevSelected;
        console.log(
          "Danh sách không thay đổi vì sản phẩm không được chọn:",
          updatedSelected
        );
      }

      console.log("danh sach tra ve: ", updatedSelected);
      return updatedSelected;
    });
  };

  useEffect(() => {
    let discount = 0;
    let total = totalSelectedPrice;

    if (voucherCode && voucherCode.discountValue) {
      if (
        voucherCode.minOrderValue === "0" ||
        totalSelectedPrice >= parseFloat(voucherCode.minOrderValue)
      ) {
        discount = (voucherCode.discountValue / 100) * totalSelectedPrice;

        if (
          parseFloat(voucherCode.max_discount_amount) !== 0 &&
          discount > parseFloat(voucherCode.max_discount_amount)
        ) {
          discount = parseFloat(voucherCode.max_discount_amount);
        }

        total -= discount;
      }
    }

    setDiscountAmount(discount);
    setTotalPrice(total);
  }, [selectedProducts, voucherCode]);

  const totalSelectedPrice = selectedProducts.reduce(
    (total, product) => total + product.price,
    0
  );

  const showMenuVoucher = () => {
    setMenuVoucherVisible(!menuVoucherVisible);
  };
  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSaveAddress = () => {
    console.log("Địa chỉ đã lưu:", address);
    setIsEditAddressModalOpen(false);
  };

  const getOrderData = (paymentStatus) => {
    return {
      userId: storedUser?.id || null,
      employeerId: null,
      totalAmount: totalSelectedPrice,
      discountAmount: discountAmount,
      finalAmount: totalPrice + shipmentFee,
      shipmentFee: shipmentFee,
      voucherCode: voucherCodeName,
      paymentStatus: paymentStatus,
      paymentMethod: selectedPaymentMethod,
      orderStatus: "Đang xử lý",
      note: note,
      invoiceDate: formatDateToMySQL(new Date()),
      receivedDate: formatDateToMySQL(
        new Date(Date.now() + 24 * 60 * 60 * 1000)
      ),
      shippingAddress: address.addressLine,
      phoneNumber: address.phone,
      customerName: address.name,
      items: selectedProducts.map((product) => ({
        productVariationId: product.id_variation,
        unitPrice: product.reducedPrice,
        amount: product.price,
        quantity: product.quantity,
      })),
    };
  };

  const handleCheckoutCOD = async () => {
    const orderData = getOrderData("Chưa thanh toán");
    console.log("orderData:", orderData);
    try {
      await addInvoiceAPI(orderData);
      notification.success({
        message: "Đơn hàng đã được hoàn tất!",
        description: "Bạn đã hoàn tất đơn hàng và chờ xử lý.",
      });
      const idCart = selectedProducts.map((item) => item.id);
      console.log("data xoa", idCart);
      const fromData = {
        cartIds: idCart,
      };
      await deleteCartByIdAPI(fromData);
      console.log("xoa", selectedProducts);
      removeSelectedProducts(selectedProducts);
      ResetPrice();
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra khi hoàn tất đơn hàng",
        description: "Vui lòng thử lại sau.",
      });
    }
  };
  const handleCheckoutMomo = async () => {
    console.log("Thanh toán Momo");
    const orderData = getOrderData("Đang xử lý");

    try {
      const invoiceResponse = await addInvoiceAPI(orderData);
      const invoiceId = invoiceResponse.data.invoiceId;
      alert("Đơn hàng đã tạo thành công. Vui lòng thực hiện thanh toán");
      const idCart = selectedProducts.map((item) => item.id);
      console.log("data xoa", idCart);
      const fromData = {
        cartIds: idCart,
      };
      await deleteCartByIdAPI(fromData);
      ResetPrice();
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
  const handleCheckout = () => {
    switch (selectedPaymentMethod) {
      case "cod":
        handleCheckoutCOD();
        break;
      case "momo":
        handleCheckoutMomo();
        break;
      case "vnpay":
        break;
      case "credit-card":
        break;
      default:
        message.error("Phương thức thanh toán không hợp lệ");
    }
  };

  return (
    <div className={cx("wrapper", "container")}>
      <div className={cx("row")}>
        <Checkbox
          checked={selectAll}
          onChange={(e) => handleSelectAll(e.target.checked)}
        >
          Chọn tất cả
        </Checkbox>
        <div className={cx("col-md-8", "product-list")}>
          {loading ? (
            <p>Loading...</p>
          ) : products && products.length > 0 ? (
            products.map((products) => (
              <CardProductCart
                setSelectAll={setSelectAll}
                key={products.ID_ProductVariation}
                id={products.id}
                id_variation={products.ID_ProductVariation}
                FirstImage={
                  products.first_image
                    ? products.first_image
                    : "placeholder.jpg"
                }
                SupCategoryName={products.SupCategoryName}
                productName={products.productName}
                variationName={products.size}
                originalPrice={products.Price}
                reducedPrice={products.discounted_price}
                discount={products.discount}
                quantity={products.quantity}
                stock={products.stock}
                totalPrice={products.total_price}
                isDelete={products.isDelete}
                onSelectProduct={handleSelectProduct}
                updateSelectedProduct={updateSelectedProduct}
              />
            ))
          ) : (
            <div className={cx("empty-cart")}>
              <h5>Giỏ hàng của bạn đang trống</h5>
              <img src={icons.emptyCart} alt="empty-cart" />
              <a href="/productall">
                <button>Mua sắm ngay</button>
              </a>
            </div>
          )}
        </div>

        <div className={cx("col-md-4", "order-summary")}>
          <div className={cx("card-order")}>
            <h2 className={cx("order-title")}>Thông tin đơn hàng</h2>
            <div className={cx("price-section")}>
              <div className={cx("price-row")}>
                <p className={cx("total-label")}>Tổng tiền chưa giảm:</p>
                <p className={cx("original-price")}>
                  {formatCurrency(totalSelectedPrice)}
                </p>
              </div>

              <div className={cx("price-row")}>
                <p className={cx("total-label")}>Số tiền giảm:</p>
                <p className={cx("discount-amount")}>
                  {formatCurrency(discountAmount)}
                </p>
              </div>
              <div className={cx("price-row")}>
                <p className={cx("total-label")}>Phí vận chuyển:</p>
                <p className={cx("discount-amount")}>
                  {formatCurrency(totalSelectedPrice > 0 ? shipmentFee : 0)}
                </p>
              </div>

              <div className={cx("price-row")}>
                <p className={cx("total-label")}>Tổng tiền thanh toán:</p>
                <p className={cx("discounted-price")}>
                  {formatCurrency(
                    totalSelectedPrice > 0 ? totalPrice + shipmentFee : 0
                  )}
                </p>
              </div>
            </div>

            <div className={cx("discount-code")}>
              <img
                src={icons.ticket}
                alt="Discount icon"
                className={cx("discount-icon")}
              />
              <span className={cx("discount-label")}>
                {voucherCode ? (
                  <>
                    {voucherCode.voucherCode}
                    <span
                      style={{ color: " red", marginLeft: 10 }}
                      onClick={() => {
                        setVoucherCode("");
                      }}
                    >
                      bỏ chọn
                    </span>
                  </>
                ) : (
                  "Không có mã giảm giá"
                )}
              </span>

              <button
                className={cx("select-discount")}
                onClick={showMenuVoucher}
              >
                Chọn mã giảm giá ---
                <MenuVoucherSaved
                  isVisible={menuVoucherVisible}
                  onClose={() => setMenuVoucherVisible(false)}
                  onVoucherSelect={handleVoucherSelect}
                />
              </button>
            </div>
            <div className={cx("note-section")}>
              <label
                className={cx("note-label")}
                value={note}
                onChange={handleNoteChange}
              >
                Ghi chú:
              </label>
              <textarea
                className={cx("note-input")}
                onChange={handleNoteChange}
              />
            </div>

            <div className={cx("info-delive")}>
              <div className={cx("delive__input")}>
                <label className={cx("payment_method-label")}>
                  Phương thức thanh toán:
                </label>
                <Select
                  className="payment-method"
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethodChange}
                  style={{ width: "100%" }}
                >
                  <Option value="cod">
                    <FontAwesomeIcon icon={faTruckFast} />
                    Thanh toán khi nhận hàng
                  </Option>
                  <Option value="momo">
                    {" "}
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnV4cUM7jBauINof35Yn_unOz976Iz5okV8A&s"
                      alt="Momo"
                      style={{ width: 20, marginRight: 8 }}
                    />
                    Momo
                  </Option>
                  <Option value="vnpay">
                    {" "}
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
                      alt="Momo"
                      style={{ width: 20, marginRight: 8 }}
                    />
                    VNPAY
                  </Option>
                  <Option value="credit-card">
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      style={{ marginRight: 8 }}
                    />
                    Thẻ tín dụng
                  </Option>
                </Select>
              </div>
            </div>

            <div>
              <div className={cx("address")}>
                <div className={cx("address_info-label")}>
                  Thông tin giao hàng:
                </div>
                <div
                  className={cx("address_info-update")}
                  onClick={handleEditAddressModalOpen}
                >
                  Cập nhật thông tin <FontAwesomeIcon icon={faEdit} />
                </div>
              </div>

              <div className={cx("info_updated")}>
                <p>
                  <strong>Họ tên:</strong> {address.name || "Chưa cập nhật"}
                </p>
                <p>
                  <strong>Số điện thoại:</strong>{" "}
                  {address.phone || "Chưa cập nhật"}
                </p>
                <p>
                  <strong>Địa chỉ:</strong>{" "}
                  {address.addressLine || "Chưa cập nhật"}
                </p>
              </div>

              {/* <p>
                <strong>id huyện:</strong>{" "}
                {locationCodes.districtCode || "Chưa cập nhật"}
              </p>
              <p>
                <strong>id xã</strong>{" "}
                {locationCodes.wardCode || "Chưa cập nhật"}
              </p> */}
            </div>

            <EditAddressModal
              isVisible={isEditAddressModalOpen}
              onClose={handleEditAddressModalClose}
              handleSave={handleSaveAddress}
              setAddress={setAddress}
              setLocationCodes={setLocationCodes}
            />

            {contextHolder}
            <button className={cx("checkout-button")} onClick={handleCheckout}>
              THANH TOÁN
            </button>

            {isModalOpen && (
              <ModalPayment
                onClose={handleCloseModal}
                selectedProducts={selectedProducts || []}
                totalPrice={totalSelectedPrice}
                discountAmount={discountAmount}
                finalAmount={totalPrice}
                voucherCode={voucherCode?.voucherCode || ""}
                note={note}
                removeSelectedProducts={removeSelectedProducts}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
