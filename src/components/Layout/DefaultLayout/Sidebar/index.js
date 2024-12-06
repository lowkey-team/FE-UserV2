import classNames from "classnames/bind";

import style from "./Sidebar.module.scss"
import { useState, useEffect } from "react";
import { fetchCategoryAPI } from "~/apis";
import { Slider, Switch } from 'antd';

const cx = classNames.bind(style);

function Sidebar({ selectedCategories, setSelectedCategories, selectedPrice, setSelectedPrice }) {
    const [categories, setCategories] = useState([]);
    const [disabled, setDisabled] = useState(false);

    // Giá trị tạm thời khi người dùng kéo thanh trượt
    const [tempSliderValue, setTempSliderValue] = useState([1, 100000]);
    // Giá trị thực sự áp dụng khi lọc
    const [sliderValue, setSliderValue] = useState([1, 100000]);

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

    const handleCategoriesChange = (e) => {
        const value = e.target.value;
        setSelectedCategories((prev) =>
            prev.includes(value)
                ? prev.filter((category) => category !== value)
                : [...prev, value]
        );
    };
    const handleSliderChange = (value) => {
        setTempSliderValue(value); // Cập nhật giá trị tạm thời
    };

    const handleFilterClick = () => {
        setSliderValue(tempSliderValue); // Áp dụng giá trị thực sự
        const priceRange = tempSliderValue.length
            ? `Từ ${tempSliderValue[0]} - ${tempSliderValue[1]}`
            : "Không áp dụng lọc theo giá";
        setSelectedPrice(priceRange);
    };

    return(
    <div className={cx('wrapper')}>
        <div className={cx('sidebar')}>

             {/* Bộ lọc giá */}
                <div className={cx('slide')}>
                    <div className={cx('silde-price')}>
                        <h3 className={cx('tittle-price')}>LỌC THEO GIÁ</h3>
                        <div className={cx('silder-price')}>
                            <Slider
                                range
                                min={1}
                                max={1000000}
                                disabled={disabled}
                                onChange={handleSliderChange} // Cập nhật giá trị tạm thời
                                value={tempSliderValue} // Hiển thị giá trị tạm thời
                            />
                        </div>
                        <div className={cx('content-price')}>
                            <h3 className={cx('label-price')}>
                                {tempSliderValue.length
                                    ? `Giá từ: ${tempSliderValue[0]}đ - ${tempSliderValue[1]}đ`
                                    : "Chưa chọn giá trị"}
                            </h3>
                            <button
                                className={cx('btn-filter')}
                                onClick={handleFilterClick} // Áp dụng giá trị khi bấm "LỌC"
                            >
                                LỌC
                            </button>
                        </div>
                    </div>
                </div>

            <div className={cx('formCategory')}>
                <h3>Loại sản phẩm</h3>
                {categories.map((category) =>(
                    <div key={category._id}>
                        <label>
                            <input
                                type="checkbox"
                                value={category.category_name}
                                checked = {selectedCategories.includes(category.category_name)}
                                onChange={handleCategoriesChange}
                            />
                            {category.category_name}
                        </label>
                    </div>
                ))}
            </div>

        </div>
    </div>
    );
}

export default Sidebar;