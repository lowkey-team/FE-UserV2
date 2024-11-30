import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { fecthAllPorductAPI, fecthPorductAPI, fetchTop10ProductNewAPI } from "~/apis";

import CountdownTimer from "~/components/CountdownTimer";
import CardProduct from "~/components/Cards/CardProduct";
import styles from './ShowAllNewProduct.module.scss';

const cx = classNames.bind(styles);

function ShowAllNewProduct() {
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
    return ( 
        <div className={cx("wrapper", 'wrapper-showAllPage', 'container')}>
            <div className={cx("header")}>
                <div className={cx("title")}>
                <p>Tất cả sản phẩm mới</p>
                </div>
            </div>

            <div className={cx('product-listAllPage')}>
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

export default ShowAllNewProduct;