import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./FormNewProduct.module.scss";
import { fetchTop10ProductNewAPI } from "~/apis";
import Button from "../../Button";
import CardProduct from "../../Cards/CardProduct";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function FormNewProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchTop10ProductNewAPI();

        const updatedProducts = data.map((product) => ({
          ...product,
          ReducedPrice: parseInt(product.final_price),
          originalPrice: parseInt(product.original_price),
          discount: product.discount_percentage || 0,
          new: product.isNew,
        }));

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    <>
      <div className={cx("wrapper", 'container')}>
        <div className={cx("header")}>
          <div className={cx("title")}>
            <p>Sản phẩm mới nhất</p>
          </div>
          <div className={cx("btn-more")}>
            <Link to="/newproductall"><p>Xem tất cả <FontAwesomeIcon icon={faAnglesRight}/></p></Link>
          </div>
        </div>
        <div className={cx("product-list")}>
          {loading ? (
            <p>Loading...</p>
          ) : products.length > 0 ? (
            <Slider {...sliderSettings}>
              {products.map((product) => (
                <div key={product.product_id} className={cx("product-item")}>
                  <CardProduct
                    id={product.product_id}
                    FirstImage={
                      product.FirstImage
                        ? product.FirstImage
                        : "placeholder.jpg"
                    }
                    SupCategoryName={product.SupCategoryName}
                    productName={product.productName}
                    originalPrice={product.originalPrice}
                    reducedPrice={product.ReducedPrice}
                    discount={product.discount}
                    isNew={product.isNew}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default FormNewProduct;
