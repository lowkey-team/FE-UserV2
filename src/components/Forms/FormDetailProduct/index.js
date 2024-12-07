import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from "js-cookie";
import { useCart } from "~/contexts/CartContext";
import { notification } from "antd";
import { Link } from "react-router-dom";

import { addToCartAPI } from "~/apis";
import MessageNotification from "../../Message";
import style from "./FormDetailProduct.module.scss";
import { GetTotalCartByUserIdAPI } from "~/apis/cart";
import FormLogin from "../FormLogin";

const cx = classNames.bind(style);

function FormDetailProduct({ productDetails }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tempValue, setTempValue] = useState("1");
  const { updateCartCount } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const messageRef = useRef();
  const [isLoginFormVisible, setLoginFormVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isInputError, setInputError] = useState(false);

  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  useEffect(() => {
    if (productDetails) {
      setSelectedImage(productDetails.images[0].image_url);
      setSelectedVariant(productDetails.variations[0]); // Lấy variant đầu tiên làm mặc định
    }
  }, [productDetails]);

  const adjustQuantity = (adjustment) => {
    const newQuantity = quantity + adjustment;
    if (
      newQuantity >= 1 &&
      (!selectedVariant || newQuantity <= selectedVariant.stock)
    ) {
      setQuantity(newQuantity);
      setTempValue(newQuantity.toString());
      setInputError(false); // Xóa lỗi khi thay đổi số lượng hợp lệ
      setErrorMessage("");
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setTempValue(inputValue);
    const numericValue = parseInt(inputValue, 10);
    if (numericValue > selectedVariant?.stock) {
      setErrorMessage(
        `Số lượng không được vượt quá ${selectedVariant.stock}`
      );
      setInputError(true);
      // notification.warning({
      //   message: "Cảnh báo",
      //   description: `Số lượng không được vượt quá tồn kho (${selectedVariant.stock}).`,
      // });
    } else {
      setErrorMessage("");
      setInputError(false);
    }
  };

  const handleInputBlur = () => {
    let numericValue = parseInt(tempValue, 10);
    if (isNaN(numericValue) || numericValue <= 0) {
      numericValue = 1;
    }
    const stock = selectedVariant?.stock || 1;
    const finalValue = Math.min(numericValue, stock);
    setQuantity(finalValue);
    setTempValue(finalValue.toString());

    if (finalValue > stock) {
      setErrorMessage(`Số lượng không được vượt quá ${stock}`);
      setInputError(true);
    } else {
      setErrorMessage(""); 
      setInputError(false);
    }
  };

  const handleSizeClick = (variant) => {
    setSelectedSize(variant.size);
    setSelectedVariant(variant);
    setQuantity(1);

    setErrorMessage("");
    setInputError(false);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleLoginSuccess = () => {
    setLoginFormVisible(false);
  };

  const handleAddToCart = async () => {
    if (!storedUser) {
      setLoginFormVisible(true);
      return;
    }

    if (!selectedVariant) {
      messageRef.current.showWarning("Vui lòng chọn kích thước!");
      return;
    }

    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      messageRef.current.showWarning("Vui lòng nhập số lượng!");
      return;
    }

    const dataToAdd = {
      userId: parseInt(storedUser.id, 10),
      productVariationId: selectedVariant.variation_id,
      quantity: parsedQuantity,
    };

    const jsonData = JSON.stringify(dataToAdd);
    try {
      const response = await addToCartAPI(JSON.parse(jsonData));
      if (response.status === 200) {
        messageRef.current.showSuccess("Sản phẩm được cập nhật vào giỏ hàng");
        const updatedCartCount = await GetTotalCartByUserIdAPI(storedUser.id);
        updateCartCount(updatedCartCount || 0);
      } else {
        messageRef.current.showError("Thêm thất bại");
      }
    } catch (error) {
      messageRef.current.showError("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      if (storedUser) {
        try {
          const response = await GetTotalCartByUserIdAPI(storedUser.id);
          console.log("Cart count:", response);
          setCartCount(response || 0);
        } catch (error) {
          console.error("Error fetching cart count:", error);
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    fetchCartCount();
  }, [storedUser]);

  return productDetails ? (
    <div className={cx("modal-content")}>
      <div className={cx("Product-Image")}>
        <div className={cx("ImageBig")}>
          <img
            src={selectedImage}
            alt={productDetails.productName}
            className={cx("modal-image")}
          />
        </div>
        {productDetails.images.length > 1 && (
          <div className={cx("ImageSmalls")}>
            <Slider {...sliderSettings}>
              {productDetails.images.map((image, index) => (
                <div
                  key={index}
                  className={cx("image-small")}
                  onClick={() => handleImageClick(image.image_url)}
                >
                  <img
                    src={image.image_url}
                    alt={`${productDetails.productName} ${index}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>

      <div className={cx("Product-Detail")}>
        <p className={cx("categoryName")}>
          Loại sản phẩm: <span>{productDetails.category_name}</span>
        </p>
        <p className={cx("productName")}>
          Tên sản phẩm: <span>{productDetails.productName}</span>
        </p>

        {/* Hiển thị giá từ khi chưa chọn size */}
        {selectedVariant ? (
          <div>
            <p className={cx("Price-MinMax")}>
              {selectedVariant.discount_percentage > 0 ? (
                <>
                  Khuyến mãi:{" "}
                  <span className={cx("discount-text")}>
                    {selectedVariant.discount_percentage}% Giảm giá
                  </span>
                </>
              ) : (
                <></>
              )}
            </p>
            <p className={cx("Price-MinMax")}>
              Giá:{" "}
              {selectedVariant.discount_percentage > 0 ? (
                <>
                  <span className={cx("discount-price")}>
                    {(
                      selectedVariant.price *
                      (1 - selectedVariant.discount_percentage / 100)
                    ).toLocaleString("vi-VN")}{" "}
                    VND
                  </span>
                  <span className={cx("original-price_discount")}>
                    {selectedVariant.price.toLocaleString("vi-VN")} VND
                  </span>
                </>
              ) : (
                <>
                  {" "}
                  <span className={cx("discount-price")}>
                    {selectedVariant.price.toLocaleString("vi-VN")} VND
                  </span>
                </>
              )}{" "}
            </p>
          </div>
        ) : (
          <p className={cx("Price-MinMax")}>
            Giá từ:{" "}
            <span>
              {Number(parseFloat(productDetails.min_price)).toLocaleString(
                "vi-VN"
              )}{" "}
              -{" "}
              {Number(parseFloat(productDetails.max_price)).toLocaleString(
                "vi-VN"
              )}
            </span>
          </p>
        )}

        {productDetails?.variations && productDetails.variations.length > 0 ? (
          <div>
            <p>Chọn kích thước:</p>
            <div className={cx("size-options")}>
              {productDetails.variations.map((variant) => (
                <button
                  key={variant.variation_id}
                  className={cx({
                    selected: selectedSize === variant.size,
                  })}
                  onClick={() => handleSizeClick(variant)}
                >
                  {variant.size}
                </button>
              ))}
            </div>

            {selectedVariant ? (
              <div className={cx("variant-details")}>
                <p className={cx("quantity-size")}>
                  Số lượng tồn: <span>{selectedVariant.stock}</span>
                </p>

                <div className={cx("Quantity")}>
                  <p
                    onClick={() => adjustQuantity(-1)}
                    style={{ cursor: "pointer" }}
                  >
                    -
                  </p>
                  <input
                    type="number"
                    value={tempValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    style={{
                      width: "50px",
                      textAlign: "center",
                      borderColor: isInputError ? "red" : "#ccc",
                    }}
                  />
                  <p
                    onClick={() => adjustQuantity(1)}
                    style={{ cursor: "pointer" }}
                  >
                    +
                  </p>
                </div>
                {isInputError && (
                  <p className={cx("error-message")}>{errorMessage}</p>
                )}
              </div>
            ) : null}
          </div>
        ) : (
          <p>Không có biến thể hợp lệ.</p>
        )}

        <div className={cx("btn")}>
          <div className={cx("btnBuy")}>
            <button>
              <Link to="/productall">MUA TIẾP</Link>
            </button>
          </div>
          <div className={cx("btnAddCart")}>
            <button className={cx("btn_AddCart")} onClick={handleAddToCart}>
              THÊM VÀO GIỎ
            </button>
            {isLoginFormVisible && !storedUser && (
              <FormLogin
                onLoginSuccess={handleLoginSuccess}
                onClose={() => setLoginFormVisible(false)}
              />
            )}
          </div>
        </div>
      </div>
      <MessageNotification ref={messageRef} />
    </div>
  ) : (
    <p>No product details available.</p>
  );
}

export default FormDetailProduct;
