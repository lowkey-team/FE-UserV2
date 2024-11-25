import classNames from "classnames/bind";
import styles from "./FormProductSale.module.scss";
import CountdownTimer from "../../CountdownTimer";
import CardProduct from "../../Cards/CardProduct";
import { useEffect, useState } from "react";
import { fecthPorductAPI } from "~/apis";
import Button from "../../Button";

const cx = classNames.bind(styles);

function FormProductSale() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fecthPorductAPI();

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
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("title")}>
          <p>Sản phẩm khuyến mãi</p>
        </div>
        <div className={cx("countdown")}>
          <CountdownTimer initialTime={99999} />
        </div>
      </div>

      <div className={cx("product-list")}>
        {loading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <CardProduct
              key={product.ProductID}
              id={product.ProductID}
              FirstImage={
                product.FirstImage ? product.FirstImage : "placeholder.jpg"
              }
              SupCategoryName={product.SupCategoryName}
              productName={product.productName}
              originalPrice={product.originalPrice}
              reducedPrice={product.ReducedPrice}
              discount={product.discount}
              isNew={product.isNew}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      <div className={cx("btn-more")}>
        <Button outline>Xem tất cả</Button>
      </div>
    </div>
  );
}

export default FormProductSale;
