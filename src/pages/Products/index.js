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

  // Filter products based on selectedCategories and selectedPrice
  useEffect(() => {
    let tempProducts = [...products];

    // Filter by categories if selected
    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        selectedCategories.includes(product.category_name)
      );
    }

    // Filter by price if selected
    if (selectedPrice) {
      const [minPrice, maxPrice] = selectedPrice
        .split(" - ")
        .map((price) => parseInt(price.replace("Từ", "").replace("đ", "").trim()));

      tempProducts = tempProducts.filter(
        (product) =>
          product.minPrice >= minPrice && product.maxPrice <= maxPrice
      );
    }

    setFilteredProducts(tempProducts); // Cập nhật danh sách đã lọc
  }, [selectedCategories, selectedPrice, products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("banner")}>
        <img
          src="https://nguoiduatin.mediacdn.vn/84137818385850368/2024/10/9/xuat-khau-hang-thu-cong-my-nghe-1-17284466847581297629311.jpg"
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
