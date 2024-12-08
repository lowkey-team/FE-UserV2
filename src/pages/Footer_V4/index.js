import classNames from 'classnames/bind';
import styles from './Footer_V4.module.scss';

const cx = classNames.bind(styles);

function Footer_V4() {
    return (
        <div className={cx("wrapper_footer")}>
            <div className={cx("container")}>
                <div className={cx("title")}>
                    <h2>HỖ TRỢ TRỰC TUYẾN</h2>
                </div>
                <div className={cx("content")}>
                    <div className={cx("section")}>
                        <h3>Vui lòng liên hệ với chúng tôi thông qua một trong các cách sau đây:</h3>
                        <p><span>Địa chỉ showroom:</span> số 4, đường 19, P. An Phú, Q.2, TPHCM </p>
                        <p><span>Địa chỉ văn phòng:</span> 212 Bùi Tá Hán, P. An Phú, Q.2, TPHCM</p>
                        <p><span>Hotline:</span> 090 330 9989 - 0971 327 095</p>
                        <p><span>Tel:</span> (+84) 8 6281 1183</p>
                        <p><span>Tổng đài: </span> 1900 63 60 76 - 1900 60 63 76 (1000đ/phút)</p>
                        <p><span>Email:</span> info@myngheviet.vn </p>
                        <p><span>Zalo - Viber:</span> 090 330 9989</p>
                        <p><span>Trực tiếp tại showroom:</span> Số 4, Đường 19, P. An Phú, Q.2, TPHCM (Gần siêu thị METRO An Phú)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer_V4;
