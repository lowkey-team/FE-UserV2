import classNames from "classnames/bind";

import styles from './CardProductSaleHorizontal.module.scss'

const cx = classNames.bind(styles);

function CardProductSaleHorizontal() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('left-card')}>
                <img src="https://picsum.photos/200/300" alt="Hình ảnh sản phẩm"/>
            </div>
            <div className={cx('right-card')}>
               <div className={cx('sale-percent')}  > 
                    <h6>-50%</h6>
                </div>
                <h5 className={cx('subcategory')}>Đồ tre đan</h5>
                <h5 className={cx('productname')}>Đèn lồng trung thu trang trí đọc đáo đáo ádoasodoasdosad</h5>
                <div className={cx('price')}>
                    <h6 className={cx('pricce-sale')}>150.000</h6>
                    <h6 className={cx('pricce-origin')}>300.000</h6>
                </div>
                <div className={cx('right__card-btn')}>
                    <button>Xem chi tiết</button>
                </div>
            </div>
        </div>
     );
}

export default CardProductSaleHorizontal;