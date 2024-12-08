import classNames from 'classnames/bind';
import styles from './Footer_V5.module.scss';

const cx = classNames.bind(styles);

function Footer_V5() {
    return (
        <div className={cx("wrapper_footer")}>
            <div className={cx("container")}>
                <div className={cx("title")}>
                    <h2>THỜI GIAN GIAO HÀNG</h2>
                </div>
                <div className={cx("content")}>
                    <div className={cx("section")}>
                        <p>- Khi nhận được xác nhận đặt hàng, chúng tôi sẽ liên hệ lại quý khách trong vòng 2 giờ làm việc.</p>
                        <p>- Khách hàng tại Tp.HCM, chúng tôi giao hàng trong vòng 1 - 4 giờ làm việc</p>
                        <p>- Đối với khách hàng ở xa hơn, tùy khoảng cách, chúng tôi sử dụng các dịch vụ thích hợp (nhân viên giao hàng ngay, bưu điện, hoặc các công ty giao hàng chuyên nghiệp khác). </p>
                        <div className={cx("image_section")}>
                            <img  src="http://myngheviet.vn/www/uploads/images/quy-trinh-giao-hang-SHIPNHANH.jpg" alt="Sản phẩm đa dạng" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer_V5;
