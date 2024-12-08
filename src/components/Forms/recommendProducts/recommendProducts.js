import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./recommendProducts.module.scss";
import { recommendProductsByPurchaseHistoryAPI } from "~/apis/suggest";
import CardProduct from "../../Cards/CardProduct";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function RecommendProducts({ productId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorRecommendations, setErrorRecommendations] = useState(null);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const minSupport = 0.4; // Thiết lập minSupport
        setLoading(true);
        const data = await recommendProductsByPurchaseHistoryAPI(
          productId,
          minSupport
        );
        console.log("Dữ liệu recommended:", data);
        setProducts(data); // Lưu sản phẩm vào state
      } catch (error) {
        console.error("Error fetching recommended products:", error);
        setErrorRecommendations("Failed to load recommended products.");
      } finally {
        setLoading(false); // Đánh dấu đã xong quá trình tải
      }
    };

    if (productId) {
      fetchRecommendedProducts(); // Gọi API khi có productId
    }
  }, [productId]);

  // Cấu hình cho slider
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "10px",
        },
      },
    ],
  };

  return (
    <div className={cx("wrapper", "container")}>
      <div className={cx("product-list")}>
        {loading ? (
          <p>Đang tải...</p>
        ) : errorRecommendations ? (
          <p>{errorRecommendations}</p>
        ) : products.length > 0 ? (
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <div key={product.product_id} className={cx("product-item")}>
                <CardProduct
                  id={product.product_id}
                  FirstImage={product.FirstImage || "placeholder.jpg"}
                  SupCategoryName={product.SupCategoryName}
                  productName={product.productName}
                  originalPrice={product.original_price}
                  reducedPrice={product.final_price}
                  discount={product.discount_percentage}
                  isNew={product.isNew}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p>Không có sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
}

export default RecommendProducts;
