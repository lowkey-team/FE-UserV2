import classNames from "classnames/bind";
import styles from './FormBestSaleProduct.module.scss';
import { useEffect, useState } from "react";
import { fecthPorductAPI, fetchCategoryAPI } from "~/apis";
import images from "~/assets/images";
import CardProduct from "../../Cards/CardProduct";
import Button from "../../Button";

const cx = classNames.bind(styles);

function FormBestSaleProduct() {
    const [categories, setCategories] = useState([]); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategoryAPI();
                setCategories(data);
            } catch (error) {
                console.log("Error fetching categories", error);
            }
        };
        loadCategories();
    }, []);

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
        <div className={cx('wrapper', 'container')}>
            <div className={cx('title')}>Sản phẩm bán chạy</div>

            <div className={cx('form-bestsell')}>
                <div className={cx('category-list')}>
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <li key={cat.category_id} className={cx("categoryItem")}>
                                {cat.category_name}
                            </li>
                        ))
                    ) : (
                        <p>Không có danh mục</p>
                    )}
                </div>

                <div className={cx('form-content')}>
                    {/* <div className={cx('banner-sell')}>
                        <img src={images.logo2} alt=""/>
                    </div> */}

                    <div className={cx('right-content')}>
                        <div className={cx('product-list')}>
                            {loading ? (
                                <p>Loading...</p>
                            ) : products.length > 0 ? (
                                products.slice(0, 5).map((product) => (
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
                                  />
                                ))
                            ) : (
                                <p>No products available.</p>
                            )}
    
                        </div>

                        <div className={cx('btn-more')}>
                            <Button outline>Xem thêm</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormBestSaleProduct;
