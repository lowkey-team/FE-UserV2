import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import CardProductCart from "~/components/Cards/CardProductCart";
import icons from "~/assets/icons";
import ModalPayment from "~/components/Modals/ModalPayment";
import {
  fetchCartByUserIdAPI,
  fetchVoucherByID,
  fetchVoucherByIdAPI,
} from "~/apis";
import Cookies from "js-cookie";
import { formatCurrency } from "~/utils/format";
import MenuVoucherSaved from "~/components/MenuVoucherSaved";
import { Color } from "antd/es/color-picker";

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
  const [note, setNote] = useState("");

  const handleVoucherSelect = async (id) => {
    console.log("Voucher được chọn:", id);
    setSelectedVoucherId(id);
    const voucherData = await fetchVoucherByIdAPI(id);
    setVoucherCode(voucherData);
    console.log("Dữ liệu voucher:", voucherData);

    const discountAmount =
      (voucherData.discountValue / 100) * totalSelectedPrice;
    const newTotalPrice = totalSelectedPrice - discountAmount;

    setTotalPrice(newTotalPrice);
  };

  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

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

  // Hàm mở modal
  const handleCheckout = () => {
    setIsModalOpen(true);
    console.log("data trước khi gửi:", selectedProducts);
  };

  // Hàm đóng modal
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

  return (
    <div className={cx("wrapper", "container")}>
      <div className={cx("row")}>
        <div className={cx("col-md-8", "product-list")}>
          {loading ? (
            <p>Loading...</p>
          ) : products && products.length > 0 ? (
            products.map((products) => (
              <CardProductCart
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
              <button>Mua sắm ngay</button>
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
                  -{formatCurrency(discountAmount)}
                </p>
              </div>

              <div className={cx("price-row")}>
                <p className={cx("total-label")}>Tổng tiền sau khi giảm:</p>
                <p className={cx("discounted-price")}>
                  {formatCurrency(totalPrice)}
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
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
