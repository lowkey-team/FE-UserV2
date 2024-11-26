import classNames from "classnames/bind";

import styles from "./FormProductByCategory.module.scss";
import { useEffect, useState } from "react";
import { fecthPorductAPI, fetchProductByCategory } from "~/apis";
import CardProduct from "../../Cards/CardProduct";

const cx = classNames.bind(styles);

function FormProductByCategory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProductByCategory();

        const updatedProducts = data.map((product) => ({
          ...product,
          ReducedPrice: parseInt(product.final_price),
          originalPrice: parseInt(product.original_price),
          discount: product.discount_percentage || 0,
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

  // Nhóm sản phẩm theo danh mục
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.categoryName]) {
      acc[product.categoryName] = [];
    }
    acc[product.categoryName].push(product);
    return acc;
  }, {});

  return (
    <div className={cx("wrapper", "container")}>
      <div className={cx("header")}>
        <div className={cx("title")}>
          <p>Sản phẩm theo danh mục</p>
        </div>
      </div>

      <div className={cx("form-productByCategory")}>
        {loading ? (
          <p>Loading...</p>
        ) : Object.keys(groupedProducts).length > 0 ? (
          // Lặp qua các nhóm danh mục và hiển thị sản phẩm
          Object.keys(groupedProducts).map((category) => (
            <div key={category} className={cx("category-section")}>
              <div className={cx("category-name")}>
                <div className={cx("title-category")}>
                  <h4>
                    Sản phẩm: <span>{category}</span>
                  </h4>
                </div>
              </div>
              <div className={cx("product-list")}>
                {groupedProducts[category].map((product) => (
                  <CardProduct
                    key={product.product_id}
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
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

export default FormProductByCategory;
