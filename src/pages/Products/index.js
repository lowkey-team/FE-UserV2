import { useEffect, useState } from "react";
import { fecthPorductAPI } from "~/apis";
import classNames from "classnames/bind";

import style from "./Products.module.scss";
import FormProductSale from "~/components/Forms/FormProductSale";
import FormNewProduct from "~/components/Forms/FormNewProduct";
import FormBestSaleProduct from "~/components/Forms/FormBestSaleProduct";
import FormProductByCategory from "~/components/Forms/FormProductByCategory";
import BackTop from "antd/es/float-button/BackTop";

const cx = classNames.bind(style);

function Products({ selectedCategories = [], selectedPrice = null }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

    // Fetch product data
    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const data = await fecthPorductAPI();

          const updatedProducts = data.map((product) => ({
            ...product,
            minPrice: parseFloat(product.min_price),
            maxPrice: parseFloat(product.max_price),
            discount: product.discount || 0,
          }));

          setProducts(updatedProducts);
          setFilteredProducts(updatedProducts); // Khởi tạo danh sách lọc
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, []);

  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("banner", 'container')}>
        <img
          src="https://madebymaries.com/wp-content/uploads/2021/09/wicker-baskets-6526674_1920.jpg"
          alt="Banner"
        />
      </div>


      <section className={cx("section-saleproduct")}>
        <FormProductSale products={filteredProducts}/>
      </section>

      <div className={cx("line-lane")}></div>
      <FormNewProduct products={filteredProducts}/>
      <div className={cx("line-lane")}></div>
      
      <section className={cx("section-bestsale")}>
        <FormBestSaleProduct products={filteredProducts}/>
      </section>
      <div className={cx("line-lane")}></div>

      <section className={cx("section-productByCategory")}>
        <FormProductByCategory products={filteredProducts}/>
      </section>

      <BackTop/>
    </div>
  );
}

export default Products;
