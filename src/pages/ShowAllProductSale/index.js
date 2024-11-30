import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { fecthPorductAPI, fetchCategoryAPI } from "~/apis";


import CardProduct from "~/components/Cards/CardProduct";
import styles from './ShowAllProductSale.module.scss'
import Sidebar from "~/components/Layout/components/Sidebar";
import icons from "~/assets/icons";

const cx = classNames.bind(styles);

function ShowAllProductSale() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    // const [tempSliderValue, setTempSliderValue] = useState([1, 100000]);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sliderValue, setSliderValue] = useState([1, 1000000]);
  
    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const data = await fetchCategoryAPI();
                setCategories(data);
            } catch(error){
                console.error("Error fetching categories", error)
            }
        };
        fetchCategories();
    }, [])

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
          console.error("Có lỗi xảy ra khi tải sản phẩm:", error);
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
            prev.includes(value) ? prev.filter((cat) => cat !== value) : [...prev, value]
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
            selectedCategories.includes(product.CategoryName);

        return isInPriceRange && isInSelectedCategories;
    });

return ( 
    <div className={cx('wrapper', 'container')}>

       <div className={cx('row')}>
            <div className={cx("col-md-2")}>

                <Sidebar
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoriesChange}
                    sliderValue={sliderValue}
                    onSliderChange={handleSliderChange}
                />

            </div>

            <div className={cx('col-md-10')}>
                <div className={cx('titlle-allsale')}>
                    <h5>Tất cả sản phẩm đang sale</h5>
                </div>
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
                    <div className={cx('outStock')}>
                        <p>Không tìm thấy sản phẩm phù hợp</p>
                        <img src={icons.outStock} alt="Không có sản phẩm"/>
                    </div>
                    )}
                </div>
            </div>
       </div>
    </div>
 );
}

export default ShowAllProductSale;