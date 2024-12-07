import classNames from "classnames/bind";

import style from "./ProductAll.module.scss";
import { useEffect, useState } from "react";
import { fecthAllPorductAPI, fetchCategoryAPI } from "~/apis";
import CardProduct from "~/components/Cards/CardProduct";
import { Slider } from "antd";
import icons from "~/assets/icons";
import Sidebar from "~/components/Layout/components/Sidebar";

const cx = classNames.bind(style);

function ProductAll() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [tempSliderValue, setTempSliderValue] = useState([1, 100000]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sliderValue, setSliderValue] = useState([1, 1000000]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchCategoryAPI();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

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

  // Cập nhật danh mục
  const handleCategoriesChange = (event) => {
    const value = event.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((cat) => cat !== value)
        : [...prev, value]
    );
  };

  // Cập nhật giá
  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const filteredProducts = products.filter((product) => {
    const isInPriceRange =
      product.ReducedPrice >= sliderValue[0] &&
      product.ReducedPrice <= sliderValue[1];

    const isInSelectedCategories =
      selectedCategories.length === 0 || // Không chọn danh mục nào => Hiển thị tất cả
      selectedCategories.includes(product.categoryName);

    return isInPriceRange && isInSelectedCategories;
  });

  return (
    <div className={cx("wrapper", "container")}>
      <div className={cx("row")}>
        <div className={cx("col-md-2", "left_col")}>
          <Sidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoriesChange}
            sliderValue={sliderValue}
            onSliderChange={handleSliderChange}
          />
        </div>

        <div className={cx("col-md-10", "right_col")}>
          <div className={cx("product-list")}>
            {loading ? (
              <p>Loading...</p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <CardProduct
                  key={product.product_id}
                  id={product.product_id}
                  FirstImage={product.FirstImage || "placeholder.jpg"}
                  SupCategoryName={product.SupCategoryName}
                  productName={product.productName}
                  originalPrice={product.originalPrice}
                  reducedPrice={product.ReducedPrice}
                  discount={product.discount}
                  isNew={product.isNew}
                />
              ))
            ) : (
              <div className={cx("outStock")}>
                <p>Không tìm thấy sản phẩm phù hợp</p>
                <img src={icons.outStock} alt="Không có sản phẩm" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAll;
