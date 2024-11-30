import React from 'react';
import { Slider } from 'antd';
import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';  // You can add your styles or use the styles you already have
import icons from '~/assets/icons';

const cx = classNames.bind(style);

function Sidebar({
  categories,
  selectedCategories,
  onCategoryChange,
  sliderValue,
  onSliderChange
}) {
  return (
    <div className={cx('sidebar')}>
      {/* Filter by Price */}
      <div className={cx('slide')}>
        <div className={cx('silde-price')}>
          <h3 className={cx('tittle-price')}>LỌC THEO GIÁ</h3>
          <Slider
            range
            min={1}
            max={1000000}
            value={sliderValue}
            onChange={onSliderChange}
          />
          <h3 className={cx('label-price')}>
            {`Giá từ: ${sliderValue[0]}đ - ${sliderValue[1]}đ`}
          </h3>
        </div>
      </div>

      {/* Filter by Category */}
      <div className={cx('formCategory')}>
        <h3>Loại sản phẩm</h3>
        {categories.map((category) => (
          <div key={category._id}>
            <label>
              <input
                type="checkbox"
                value={category.category_name}
                checked={selectedCategories.includes(category.category_name)}
                onChange={onCategoryChange}
              />
              {category.category_name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
