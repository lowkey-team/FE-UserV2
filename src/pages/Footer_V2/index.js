import classNames from 'classnames/bind';
import styles from './Footer_V2.module.scss';

const cx = classNames.bind(styles);

function Footer_V2() {
    return (
        <div className={cx("wrapper_footer")}>
            <div className={cx("container")}>
                <div className={cx("title")}>
                    <h2>GIÁM ĐỐC CÔNG TY MỸ NGHỆ VIỆT THỨC GIA NHẬP HAWEE</h2>
                </div>
                <div className={cx("content")}>
                    <div className={cx("section")}>
                        <h3>Giới thiệu về Hawee</h3>
                        <p>Hawee - Hội nữ doanh nhân thành phố Hồ Chí Minh gồm các chị nữ doanh nhân có uy tín tại thành phố đã được thành lập với mong muốn - Tập hợp các nữ doanh nhân thành phố để cùng nhau gắn bó, chia sẻ và nâng đỡ nhau cùng phát triển trong kinh doanh cũng như cân bằng, tiến bộ trong cuộc sống, làm cho mỗi chị em ý thức được về tiềm năng của mình, nắm lấy cơ hội và tạo ra nhiều cơ hội khác để các chị em khác cùng thành công.</p>
                        <div className={cx("image_section")}>
                            <img src="https://myngheviet.vn/www/uploads/images/gia%20nh%E1%BA%ADp%20hawee.jpg" alt="Sản phẩm đa dạng" />
                        </div>
                        <p>HAWEE là một tập thể luôn gắn kết bằng tình bạn, sự chân thành và tình bạn ấy sẽ luôn bền chặt theo thời gian cho dù thương trường hay cuộc sống có nhiều sóng gió và thay đổi. Khai phá và phát huy tận dung được nhiều nguồn hỗ trợ quan trọng từ các tổ chức quốc tế cho sự phát triển của phụ nữ nói chung và nữ Doanh nhân nói riêng.</p>
                    </div>
                    <hr/>
                    <div className={cx("section")}>
                        <h3>Chị Phượng - Giám đốc Mỹ Nghệ Việt chính thức gia nhập hội nữ doanh nhân thành phố Hồ Chí Minh Hawee</h3>
                        <p>Việc gia nhập hội nữ doanh nhân thành phố Hồ Chí Minh là một bước quan trọng trong sự phát triển và gắn kết của chị Nguyễn Thị Nhựt Phượng với cộng đồng doanh nhân nữ. Hội nữ doanh nhân thành phố Hồ Chí Minh là một tổ chức chuyên nghiệp và uy tín, tập hợp những người phụ nữ thành công và có sự đóng góp lớn cho sự phát triển kinh tế và xã hội của thành phố. </p>
                        <div className={cx("image_section")}>
                            <img src="https://myngheviet.vn/www/uploads/images/logo-%E1%BA%A3nh.jpg" alt="Dịch vụ chuyên nghiệp" />
                        </div>
                        <p>Sự gia nhập thành công hội Hawee tôn vinh những giá trị mà chị Phượng đã tạo ra cho công động trong suốt những năm vừa qua. Đồng thời, đây cũng là dịp để chị có nhiều cơ hội tiếp xúc với các đối tác và lĩnh vực khác nhau. Từ đó phát triển và đưa các sản phẩm mang đậm nét văn hóa Việt tại công ty ra những thị trường mới hơn.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer_V2;
