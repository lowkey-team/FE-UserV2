import { useEffect, useState } from "react";
import { fecthPorductAPI, fetchCategoryAPI } from "~/apis";
import classNames from "classnames/bind";
import { Menu } from "antd";

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
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoryAPI();
        setCategories(data);
        // Chuyển đổi dữ liệu categories sang cấu trúc menu items
        const items = createMenuItems(data);
        setMenuItems(items);
      } catch (error) {
        console.log("Error fetching categories", error);
      }
    };
    loadCategories();
  }, []);

  const createMenuItems = (categories) => {
    return categories.map((category) => ({
      key: category.category_id.toString(),
      label: category.category_name,
      children: category.subcategories.map((sub) => ({
        key: sub.id,
        label: sub.SupCategoryName,
      })),
    }));
  };

  const onClick = ({ keyPath }) => {
    // Nếu keyPath có 2 phần tử, nghĩa là chọn subcategory
    if (keyPath.length === 2) {
      const subCategoryId = keyPath[0]; // keyPath[0] là id của danh mục con
      window.location.href = `/productBySupCategory/${subCategoryId}`;
    }
  };

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
    <div className={cx("wrapper", 'container')}>
      <div className={cx('row')}>

        {/* Left column */}
        <div className={cx('col-md-2', 'left_col')}>
          <div className={cx('form-category')}>
            <div className={cx('title-category')}>Danh mục sản phẩm</div>
            <Menu
              onClick={onClick}
              style={{
                width: "100%",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", 
              }}
              mode="vertical"
              items={menuItems}
              className={cx('Menu-category')}
            />
          </div>
        </div>

        {/* Right column */}
        <div className={cx('col-md-10', 'right_col')}>
          <div className={cx("banner")}>
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
        </div>
      </div>
      <BackTop/>
    </div>
  );
}

export default Products;
