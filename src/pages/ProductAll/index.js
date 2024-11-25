import classNames from "classnames/bind";

import style from './ProductAll.module.scss';
import { useEffect, useState } from "react";
import { fecthAllPorductAPI } from "~/apis";
import CardProduct from "~/components/Cards/CardProduct";

const cx = classNames.bind(style);

function ProductAll() {
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fecthAllPorductAPI();

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
    return ( 
        <div className={cx('wrapper')}>
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
        </div>
     );
}

export default ProductAll;