import classNames from 'classnames/bind';
import styles from './Footer_V1.module.scss';

const cx = classNames.bind(styles);

function Footer_V1() {
    return (
        <div className={cx("wrapper_footer")}>
            <div className={cx("container")}>
                <div className={cx("title")}>
                    <h2>5 ĐIỂM KHÁC BIỆT TẠI MỸ NGHỆ VIỆT</h2>
                </div>
                <div className={cx("content")}>
                    <div className={cx("section")}>
                        <h3>SẢN PHẨM ĐA DẠNG VÀ GIÀU BẢN SẮC VIỆT NAM</h3>
                        <p>Sản phẩm tân gia - khai trương tại Mỹ Nghệ Việt tất cả đều được sản xuất từ các làng nghề nổi tiếng lâu đời như gốm sứ Bát Tràng, sản phẩm sơn mài Bình Dương, Lụa trứ danh Hà Đông, sản phẩm đồng từ làng đồng Đại Bái,.. không chỉ đa dạng về mẫu mã , kích thước mà còn mang đậm bản sắc dân tộc Việt Nam. Chúng tôi tự tin rằng sẽ mang đến cho Qúy khách hàng những lựa chọn tốt nhất trong các nhu cầu sử dụng gia đình hay làm quà tặng cho cho đối tác, bạn bè trong dịp tân gia-khai trương.</p>
                        <div className={cx("image_section")}>
                            <img src="http://tangia-khaitruong.com/www/uploads/images/m%E1%BB%A5c%201.jpg" alt="Sản phẩm đa dạng" />
                        </div>
                    </div>
                    <hr/>
                    <div className={cx("section")}>
                        <h3>DỊCH VỤ CHUYÊN NGHIỆP</h3>
                        <p>Nhân viên viên tư vấn với nhiều năm kinh nghiệm trong nghề, thân thiện, nhiêt tình là những điểm mạnh của quà tết mỹ nghệ tại Mỹ Nghệ Việt. Nếu Qúy khách hàng chưa chọn được sản phẩm thích hợp hãy nhanh tay gọi đến Hotline: 090 330 9989 để được chúng tôi tư vấn giúp Qúy khách hàng chọn sản phẩm thích hợp với nhu cầu của mình. Hotline phục vụ 24/7 giúp những khách hàng dù bận rộn nhất vẫn có thể mua sắm và được tư vấn bất kì lúc nào. </p>
                        <div className={cx("image_section")}>
                            <img src="http://tangia-khaitruong.com/www/uploads/images/d%E1%BB%8Bch%20v%E1%BB%A5.jpg" alt="Dịch vụ chuyên nghiệp" />
                        </div>
                    </div>
                    <hr/>
                    <div className={cx("section")}>
                        <h3>GIÁ XUẤT XƯỞNG TỪ CÁC LÀNG NGHỀ</h3>
                        <p>Qúy khách hàng sẽ được mua sản phẩm với giá gốc tại xưởng không qua trung gian nên sẽ rẻ hơn rất nhiều so với thị trường.</p>
                        <div className={cx("image_section")}>
                            <img src="http://myngheviet.vn/www/uploads/images/Banner/doanh-nghiep_compressed.jpg" alt="Dịch vụ chuyên nghiệp" />
                        </div>
                    </div>
                    <hr/>
                    <div className={cx("section")}>
                        <h3>SẢN PHẨM THÂN THIỆN VỚI MÔI TRƯỜNG</h3>
                        <p>Vốn xuất xứ từ các làng nghề nổi danh của Việt Nam như: sơn mài Bình Dương, đồ đồng Đại Bái - Bắc Ninh, làng lụa Hà Đông (Vạn Phúc), gốm sứ Bát Tràng,... nên sản phẩm từ Qùa tết mỹ nghệ được làm bằng thủ công kết hợp cùng các nguyện liệu thân thiện như gỗ cây, tơ tằm, đồng nguyên chất, đất sét và cao lanh,... Vì nguyên liệu thân thiện với môi trường nên an toàn cho người sử dụng giúp khách hàng an tâm mua sắm. </p>
                        <div className={cx("image_section")}>
                            <img src="http://tangia-khaitruong.com/www/uploads/images/nguy%C3%AAn%20li%E1%BB%87u.jpg" alt="Dịch vụ chuyên nghiệp" />
                        </div>
                    </div>
                    <hr/>
                    <div className={cx("section")}>
                        <h3>GIAO DỊCH LINH HOẠT: SHOWROOM, ĐIỆN THOẠI </h3>
                        <p> Vận chuyển linh hoạt, giao hàng nội thành  trong vòng 1-4 giờ (sau khi xác nhận), miễn phí một số quận với đơn hàn từ 300.000đ. Đối với khách hàng ngoại tỉnh giao bằng các dịch vụ: giao hàng tiết kiệm, tốc hành, giao hàng nhanh,.. để khách hàng nhận được sản phẩm trong thời gian sớm nhất. Ngoài ra, chúng tôi còn cung cấp dịch vụ giao hàng quốc tế nhằm mang lại sự tiện ích nhất cho khách hàng.</p>
                        <div className={cx("image_section")}>
                            <img src="http://tangia-khaitruong.com/www/uploads/images/d%E1%BB%8Bch%20v%E1%BB%A5.jpg" alt="Dịch vụ chuyên nghiệp" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer_V1;
