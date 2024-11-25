import classNames from "classnames/bind";

import styles from './SearchPage.module.scss'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fecthAllPorductAPI } from "~/apis";
import CardProduct from "~/components/Cards/CardProduct";

const cx = classNames.bind(styles);

function SearchPage() {
    const location = useLocation();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get("query") || ""; // Lấy từ khóa từ URL
    setQuery(queryParam);

    // Gọi API để tìm kiếm sản phẩm
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const data = await fecthAllPorductAPI(); // Thay bằng hàm API thực tế
        const filteredProducts = data.filter((product) =>
          product.productName.toLowerCase().includes(queryParam.toLowerCase()),
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (queryParam) {
      fetchSearchResults();
    }
  }, [location.search]);

    return ( 
        <div className={cx('wrapper', 'container')}>
            <div className={cx('key-search')}>
                <h5>Kết quả tìm kiếm từ khóa: <span>{query}</span></h5>
            </div>
            <div className={cx('search-result')}>
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
                    <p>Không tìm thấy sản phẩm phù hợp</p>
                    )}
                </div>
            </div>
        </div>  
     );
}

export default SearchPage;