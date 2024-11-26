import classNames from "classnames/bind";
import styles from "./SubHeader.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function SubHeader() {

  return (
    <div className={cx("wrapper")}>
      <div className={cx("subHeader")}>

       
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
