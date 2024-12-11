import classNames from "classnames/bind";
import styles from "./CardProductCart.module.scss";
import { useState, useRef } from "react";
import { formatCurrency } from "~/utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import MessageNotification from "../../Message";
import { deleteCartByIdAPI, updateProductQuantityAPI } from "~/apis";
import { useCart } from "~/contexts/CartContext";
import { GetTotalCartByUserIdAPI } from "~/apis/cart";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);

function CardProductCart({
  id_variation,
  id,
  FirstImage,
  SupCategoryName,
  productName,
  variationName,
  originalPrice,
  reducedPrice,
  discount,
  quantity,
  stock,
  totalPrice,
  isDelete,
  onSelectProduct,
  updateSelectedProduct,
  setSelectAll,
}) {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [isVisible, setIsVisible] = useState(true);
  const [isSelected, setIsSelected] = useState(false);

  const messageRef = useRef();
  const debounceTimeoutRef = useRef(null);

  const calculateTotalPrice = () => reducedPrice * currentQuantity;

  const { updateCartCount } = useCart();

  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  const handleSelect = (e) => {
    console.log("Props truyền vào:", {
      id_variation,
      id,
      FirstImage,
      SupCategoryName,
      productName,
      variationName,
      originalPrice,
      reducedPrice,
      discount,
      quantity,
      stock,
      totalPrice,
      isDelete,
      setSelectAll,
    });

    setIsSelected(e.target.checked);
    setSelectAll(false);
    onSelectProduct(
      id,
      e.target.checked,
      calculateTotalPrice(),
      id_variation,
      quantity,
      parseFloat(originalPrice),
      parseFloat(reducedPrice),
      discount
    );
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleDeleteProduct = async (id_cart) => {
    console.log("id_cart", id_cart);
    try {
      await deleteCartByIdAPI(id_cart);
      setIsVisible(false);
      messageRef.current.showSuccess("Sản phẩm đã được xóa khỏi giỏ hàng");
      const updatedCartCount = await GetTotalCartByUserIdAPI(storedUser.id);
      updateCartCount(updatedCartCount || 0);
    } catch (error) {
      messageRef.current.showError("Lỗi khi xóa sản phẩm khỏi giỏ hàng");
    }
  };

  const handleQuantityChange = async (newQuantity) => {
    setCurrentQuantity(newQuantity);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        await updateProductQuantityAPI(id, newQuantity);
        const newTotalPrice = reducedPrice * newQuantity;
        updateSelectedProduct(id, newTotalPrice);
        onSelectProduct(
          id,
          isSelected,
          newTotalPrice,
          id_variation,
          newQuantity,
          parseFloat(originalPrice),
          parseFloat(reducedPrice),
          discount
        );
        messageRef.current.showSuccess("số lượng đã cập nhật thành công");
      } catch (error) {
        console.error("Lỗi khi cập nhật số lượng:", error);
      }
    }, 10);
  };

  const handleIncrease = () => {
    if (currentQuantity < stock) {
      handleQuantityChange(currentQuantity + 1);
    } else {
      messageRef.current.showWarning("Số lượng vượt quá số lượng có sẵn");
    }
  };

  const handleDecrease = () => {
    if (currentQuantity > 1) {
      handleQuantityChange(currentQuantity - 1);
    }
  };

  if (!isVisible) {
    return null;
  }

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setCurrentQuantity(value === "" ? "" : parseInt(value, 10));
    }
  };

  const handleInputBlur = () => {
    if (currentQuantity === "" || currentQuantity < 1) {
      setCurrentQuantity(1);
    } else if (currentQuantity > stock) {
      setCurrentQuantity(stock);
      messageRef.current.showWarning("Số lượng vượt quá số lượng có sẵn");
    } else {
      handleQuantityChange(currentQuantity);
    }
  };

  return (
    <div className={cx("card-product")}>
      <div className={cx("checkbox")}>
        <input type="checkbox" checked={isSelected} onChange={handleSelect} />
      </div>

      <div className={cx("image-product")}>
        <img src={FirstImage} alt={productName} />
      </div>

      <div className={cx("title-product")}>
        <p className={cx("name-category")}>{SupCategoryName}</p>
        <h2 className={cx("name-product")}>{productName}</h2>
        <p className={cx("size")}>Kích thước: {variationName}</p>
        <p className={cx("price")}>
          {discount === 0 ? (
            <>{formatCurrency(originalPrice)}</>
          ) : (
            <>
              {formatCurrency(reducedPrice)}{" "}
              <span className={cx("original-price")}>
                {formatCurrency(originalPrice)}
              </span>
            </>
          )}
        </p>
      </div>

      <div className={cx("box-control")}>
        <div className={cx("total_Price")}>
          <p>{formatCurrency(calculateTotalPrice())}</p>
        </div>

        <div className={cx("quantity-control")}>
          <button className={cx("decrease")} onClick={handleDecrease}>
            -
          </button>
          {/* <span className={cx("quantity")}>{currentQuantity}</span> */}
          <input
            className={cx("quantity")}
            value={currentQuantity}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          <button className={cx("increase")} onClick={handleIncrease}>
            +
          </button>
        </div>

        <div
          className={cx("Trash-control")}
          onClick={() => handleDeleteProduct(id)}
        >
          <FontAwesomeIcon icon={faTrash} className={cx("btn-faTrash")} />
        </div>
      </div>

      <MessageNotification ref={messageRef} />
    </div>
  );
}

export default CardProductCart;
