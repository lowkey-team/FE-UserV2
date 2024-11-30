import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./ProductBySupCategory.module.scss";
import { fetchGetProductBySupCategoryAPI } from "~/apis";
import CardProduct from "~/components/Cards/CardProduct";
import Button from "~/components/Button";
import CountdownTimer from "~/components/CountdownTimer";

const cx = classNames.bind(styles);

function ProductBySupCategory() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchGetProductBySupCategoryAPI(id);

        const updatedProducts = data.map((product) => ({
          ...product,
          ReducedPrice: parseInt(product.FinalPrice),
          originalPrice: parseInt(product.VariationPrice),
          discount: product.MaxDiscount || 0,
        }));

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className={cx("wrapper", "container")}>
      <div className={cx("header")}>
        <div className={cx("title")}>
          <p>Sản phẩm: <span>{products.SupCategoryName}</span></p>
        </div>
      </div>

      <div className={cx("product-list")}>
        {loading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <CardProduct
              key={product.product_id}
              id={product.product_id}
              FirstImage={
                product.FirstImage ? product.FirstImage : "placeholder.jpg"
              }
              SupCategoryName={product.SupCategoryName}
              productName={product.productName}
              originalPrice={product.original_price}
              reducedPrice={product.final_price}
              discount={product.discount_percentage}
              isNew={product.isNew}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}

export default ProductBySupCategory;
