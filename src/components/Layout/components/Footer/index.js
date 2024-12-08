import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar, faEnvelope, faGift, faHeadphones, faHeadset, faLocationDot, faPhone, faSeedling, faTruck } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
// import Map from '~/components/Map';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer-wrapper')}>
            <div className={cx('footer-introduce')}>
                <div className={cx("value")}>
                    <FontAwesomeIcon icon={faGift} className={cx('icon')}/>
                    <h2>Sản phẩm</h2>
                    <p>Được sản xuất từ làng nghề nổi tiếng Việt Nam. Showroom sản phẩm thủ công mỹ nghệ lớn nhất tại TPHCM</p>
                </div>
                
                <div className={cx("value")}>
                    <FontAwesomeIcon icon={faTruck} className={cx('icon')}/>
                    <h2>Giao dịch linh hoạt</h2>
                    <p>Hỗ trợ vận chuyển toàn quốc và quốc tế. Hỗ trợ giao hàng gấp trong vòng 1 -2 giờ (có tính phí) khu vực HCM.</p>
                </div>
                
                <div className={cx("value")}>
                    <FontAwesomeIcon icon={faDollar} className={cx('icon')}/>
                    <h2>Giá xuất xưởng</h2>
                    <p>Sản phẩm được bán với giá gốc xuất xưởng không qua trung gian nên rẻ hơn nhiều so với thị trường.</p>
                </div>
                
                <div className={cx("value")}>
                    <FontAwesomeIcon icon={faHeadphones} className={cx('icon')}/>
                    <h2>Hỗ trợ 24/7</h2>
                    <p>Phục vụ 24/7 cho trải nghiệm mua sắm của khách hàng không bị gián đoạn.</p>
                </div>
                
                <div className={cx("value")}>
                    <FontAwesomeIcon icon={faSeedling} className={cx('icon')}/>
                    <h2>Thân thiện với môi trường</h2>
                    <p>Được sản xuất từ các nguyên liệu thiên nhiên, thân thiện với môi trường và không gây hại cho người sử dụng.</p>
                </div>

            </div>

            <div className={cx('footer-register')}>
                <div className={cx('title-register')}>
                    <h2>Đăng ký nhận tin</h2>
                    <p>Đừng bỏ lỡ hàng ngàn sản phẩm và chương trình siêu hấp dẫn</p>
                </div>
                <div className={cx('form-register')}>
                    <input type='email' placeholder='Email của bạn.....'/>
                    <button className={cx('btnRegister')}><FontAwesomeIcon icon ={faEnvelope}/>    Đăng ký</button>
                </div>
            </div>

            <div className={cx('footer')}>
                <div style={{ width: '400px' }} className={cx('footer-column')}>
                    <a href='/'><img src ={images.logo} alt="Mỹ nghệ Việt"/></a>
                    <p className={cx('company')}>Công ty cổ phẩn đầu tư - Phát triển Mỹ Nghệ Việt</p>
                    <p>Giấy chứng nhận Đăng ký Kinh doanh số 0311761046 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh, năm 2012.</p>
                    <hr/>
                    <p><FontAwesomeIcon icon={faLocationDot} className={cx('icon')}/>Showroom: <FontAwesomeIcon icon={faLocationDot} className={cx('icon')}/> <a href='https://www.google.com/maps/place/212+B%C3%B9i+T%C3%A1+H%C3%A1n,+An+Ph%C3%BA,+Qu%E1%BA%ADn+2,+H%E1%BB%93+Ch%C3%AD+Minh/@10.7949655,106.7448304,17z/data=!3m1!4b1!4m6!3m5!1s0x3175260d1d2df975:0xf10a223261968e95!8m2!3d10.7949655!4d106.7448304!16s%2Fg%2F11j8gzlzbb?hl=vi&entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D'>212 Bùi Tá Hán, P.An Phú (Q2), TP.Thủ Đức, TP.HCM</a> </p>
                    <p><FontAwesomeIcon icon={faPhone} className={cx('icon')}/>Tổng đài: 1900 63 60 76</p>
                    <p><FontAwesomeIcon icon={faPhone} className={cx('icon')}/>Hotline: 0903 30 99 89</p>
                    <p><FontAwesomeIcon icon={faPhone} className={cx('icon')}/>Tell: 028. 6281 1183</p>
                    <p><FontAwesomeIcon icon={faEnvelope} className={cx('icon')}/>info@myngheviet.vn</p>
                </div>
                <div className={cx('footer-column')}>
                    <h3 className={cx('company')}>VỀ CHÚNG TÔI</h3>
                    <ul>
                        <a href='/'><li>› Giới thiệu</li></a>
                        <a href='/product'><li>› Các nhóm sản phẩm</li></a>
                        <a href='/hawee'><li>› Hội viên Hawee</li></a>
                        <a href='/five-other'><li>› 5 điểm khác biệt tại Mỹ Nghệ Việt</li></a>
                    </ul>
                </div>
                <div className={cx('footer-column')}>
                    <h3 className={cx('company')}>CHĂM SÓC KHÁCH HÀNG</h3>
                    <ul>
                        <a href='question'><li>› Các câu hỏi thường gặp</li></a>
                        <a href='support'><li>› Hỗ trợ trực tuyến</li></a>
                        <a href='delivery'><li>› Thời gian giao hàng</li></a>
                    </ul>
                </div>
                <div className={cx('footer-column')}>
                    <h3 className={cx('company')}>KẾT NỐI VỚI CHÚNG TÔI</h3>
                    <p className={cx('hotline')}><FontAwesomeIcon icon={faHeadset} className={cx('icon-hotline')}/>1900 63 60 76</p>
                    <div className={cx('social-icons')}>
                        <div className={cx('societyn')}>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer">
                                <img src="https://news.khangz.com/wp-content/uploads/2023/05/DOI-TEN-FACEBOOK-1.jpg" alt="Facebook" />
                            </a>
                        </div>
                        <div className={cx('societyn')}>
                            <a href="https://zalo.com" target="_blank" rel="noreferrer">
                                <img src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/5f/06/af/5f06afa8-8bdf-4003-863e-c79b96492997/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png" alt="Zalo" />
                            </a>
                        </div>
                        <div className={cx('societyn')}>
                            <a href="https://youtube.com" target="_blank" rel="noreferrer">
                                <img src="https://cdn.pixabay.com/photo/2021/09/11/18/21/youtube-6616310_1280.png" alt="Youtube" />
                            </a>
                        </div>
                    </div>
                    <img src = "https://webmedia.com.vn/images/2021/09/logo-da-dang-ky-bo-cong-thuong-mau-do.jpg"/>
                </div>
            </div>
        </div>
    );
}

export default Footer;
