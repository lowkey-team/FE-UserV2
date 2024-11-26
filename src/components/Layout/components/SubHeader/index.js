import classNames from "classnames/bind";
import styles from "./SubHeader.module.scss";
import { useEffect, useState } from "react";
import { Cascader } from "antd";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { fetchCategoryAPI } from "~/apis";

const cx = classNames.bind(styles);

function SubHeader() {
  const [categories, setCategories] = useState([]);

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


  const options = categories.map((cat) => ({
    value: cat.category_id,
    label: cat.category_name,
    children: cat.subcategories.map((subcat) => ({
      value: subcat.id,
      label: subcat.SupCategoryName || "",
    })),
  }));

  const onChange = (value) => {
    // Nếu value có 2 phần tử, nghĩa là chọn subcategory
    if (value.length === 2) {
      const subCategoryId = value[1];
      window.location.href = `/productBySupCategory/${subCategoryId}`;
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("subHeader")}>

        <div className={cx("btn-category")}>
        <Cascader
          options={options}
          onChange={onChange}
          placeholder="Chọn danh mục"
          expandTrigger="hover"
          className={cx("custom-cascader")}
          popupClassName={cx("custom-popup")}
          />

        </div>

        <div className={cx('menu-header')}>
          <ul className={cx('menu-list')}>
            <li className={cx('menu-item')}>
              <Link to="/">GIỚI THIỆU</Link>
            </li>
            <li className={cx('menu-item')}>
              <Link to="/product">TRANG CHỦ</Link>
            </li>
            <li className={cx('menu-item')}>
              <Link to="/productall">SẢN PHẨM</Link>
            </li>
            <li className={cx('menu-item')}>
              <Link to="/news">TIN TỨC</Link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default SubHeader;
