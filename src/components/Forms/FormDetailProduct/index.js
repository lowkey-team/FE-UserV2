import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./FormDetailProduct.module.scss";
import { addToCartAPI } from "~/apis";
import Cookies from "js-cookie";
import MessageNotification from "../../Message";

const cx = classNames.bind(style);

function FormDetailProduct({ productDetails }) {
  const [selectedSize, setSelectedSize] = useState(null); // Kiểm tra xem đã chọn size chưa
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null); // Lưu thông tin về size đã chọn
  const [quantity, setQuantity] = useState(1);

  const messageRef = useRef();

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
    }
  };

  const handleInputChange = (e) => {
    const value = Math.max(
      1,
      Math.min(selectedVariant?.stock || 1, parseInt(e.target.value, 10) || 1)
    );
    setQuantity(value);
  };

  const handleBlur = () => {
    if (quantity < 1) setQuantity(1);
  };

  const handleSizeClick = (variant) => {
    setSelectedSize(variant.size);
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity khi thay đổi size
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const priceAfterDiscount = selectedVariant
    ? Math.round(selectedVariant.price * (1 - selectedVariant.discount / 100))
    : 0;

  const totalPrice = priceAfterDiscount * quantity;

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

  const handleAddToCart = async () => {
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
      productVariationId: parseInt(selectedVariant.variation_id, 10),
      quantity: parsedQuantity,
    };

    const jsonData = JSON.stringify(dataToAdd);

    try {
      const response = await addToCartAPI(JSON.parse(jsonData));
      if (response.status === 200) {
        messageRef.current.showSuccess("Sản phẩm được cập nhật vào giỏ hàng");
      } else {
        messageRef.current.showError("Thêm thất bại");
      }
    } catch (error) {
      messageRef.current.showError("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

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
                    value={quantity}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    min="1"
                    style={{ width: "50px", textAlign: "center" }}
                  />
                  <p
                    onClick={() => adjustQuantity(1)}
                    style={{ cursor: "pointer" }}
                  >
                    +
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <p>No variants available.</p>
        )}

        <div className={cx("btn")}>
          <div className={cx("btnBuy")}>
            <button>MUA NGAY</button>
          </div>
          <div className={cx("btnAddCart")}>
            <button onClick={handleAddToCart}>THÊM VÀO GIỎ</button>
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
