import classNames from 'classnames/bind';
import styles from './Footer_V3.module.scss';

const cx = classNames.bind(styles);

function Footer_V3() {
    return (
        <div className={cx("wrapper_footer")}>
            <div className={cx("container")}>
                <div className={cx("title")}>
                    <h2>CÁC CÂU HỎI THƯỜNG GẶP</h2>
                </div>
                <div className={cx("content")}>
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Những hình ảnh sản phẩm bên ngoài có giống như hình ảnh trên website của Mỹ Nghệ Việt không?</p>
                        <p className={cx("reply")}>Trả lời: Mỹ Nghệ Việt cam kết tất cả hình ảnh sản phẩm thực bên ngoài đều giống như hình ảnh trên website.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Khi đặt hàng thì trong bao lâu tôi có thể nhận được hàng?</p>
                        <p className={cx("reply")}>Trả lời: Mỹ Nghệ Việt sẽ xử lý đơn hàng trong vòng 24h kể từ khi nhận được đơn đặt hàng, hàng sẽ chuyển đến khách hàng chậm nhất trong vòng 24h tiếp theo (đối với khu vực Tp.HCM). Ngoài khu vực Tp.HCM Mỹ Nghệ Việt sẽ thỏa thuận với khách hàng về thời gian vận chuyển.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Khi đặt hàng chúng tôi có được miễn phí vận chuyển không?</p>
                        <p className={cx("reply")}>Trả lời: Đối với khu vực nội thành Tp.HCM, bạn sẽ được miễn phí giao hàng với những đơn hàng trị giá 300.000Đ trở lên, Khu vực ngoại thành Mỹ Nghệ Việt sẽ thu thêm phí giao hàng từ 30.000Đ-150.000Đ tùy vào hàng hóa cồng kềnh hay không.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Nếu ở Hà Nội hoặc miền Bắc thì tôi sẽ đặt hàng như thế nào?</p>
                        <p className={cx("reply")}>Trả lời: Bạn có thể đặt hàng trực tiếp qua website http://myngheviet.vn/</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Khi giao hàng nếu không hài lòng về sản phẩm tôi có thể trả lại không?</p>
                        <p className={cx("reply")}>Trả lời: Khi nhận hàng nếu bạn không hài lòng về sản phẩm, bạn hoàn toàn có thể đổi trả lại sản phẩm cho nhân viên giao hàng.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Sản phẩm gốm của Mỹ Nghệ Việt có phải là gốm Bát Tràng không?</p>
                        <p className={cx("reply")}>Trả lời: Mỹ Nghệ Việt là đại lý gốm sứ Bát Tràng lớn nhất tại Tp.HCM nên 99% sản phẩm gốm sứ được sản xuất từ Bát Tràng, 1% còn lại là gốm sứ của các cơ sở sản xuất khác. Đặc biệt Mỹ Nghệ Việt cam kết không kinh doanh hàng Trung Quốc.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Mỹ Nghệ Việt có thể gói và bảo quản để tôi dễ vận chuyển sản phẩm đi nước ngoài không?</p>
                        <p className={cx("reply")}>Trả lời: Hiện rất nhiều sản phẩm của Mỹ Nghệ Việt được vận chuyển đi nước ngoài làm quà tặng, đặc biệt là tranh sơn mài và bình trà Bát Tràng. Khi bạn yêu cầu Mỹ Nghệ Việt sẽ gói và bảo quản cẩn thận để quý khách dễ vận chuyển khi đi di chuyển bằng đường hàng không.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Mỹ Nghệ Việt có thể gói quà làm quà tân gia, nhà mới không?</p>
                        <p className={cx("reply")}>Trả lời: Hiện Mỹ Nghệ Việt có cung cấp dịch vụ gói quà để tôn sự trang trọng khi bạn muốn dùng làm quà tặng tân gia các sản phẩm như: tranh sơn mài, tranh thư pháp…</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Mỹ Nghệ Việt có thể nhận đơn hàng với số lượng lớn không?</p>
                        <p className={cx("reply")}>Trả lời: Mỹ Nghệ Việt chuyên cung cấp sản phẩm gốm sứ, quà tặng tết cho các công ty và đối tác lớn như Đông Á Bank, Datalogic, KMS technology…và chuyên xuất khẩu với số lượng lớn nên Mỹ Nghệ Việt tự tin sẽ đáp ứng được nhu cầu của bạn.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Mỹ Nghệ Việt có thể sản xuất hàng hóa theo mẫu mã yêu cầu của tôi không?</p>
                        <p className={cx("reply")}>Trả lời: Tùy sản phẩm đó có phải thuộc ngành nghề của Mỹ Nghệ Việt hay không, nếu có Mỹ Nghệ Việt sẵn sàng sản xuất theo đơn đặt hàng của bạn.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Làm sao để biết được Mỹ Nghệ Việt nhận được tiền chuyển khoản?</p>
                        <p className={cx("reply")}>Trả lời: Mỹ Nghệ Việt gọi thông báo khách hàng khi nhận được tiền chuyển khoản và thông báo thời gian giao hàng.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Mua số lượng nhiều có được giảm giá hay không?</p>
                        <p className={cx("reply")}>Trả lời: Tùy theo số lượng đơn hàng lớn, Mỹ Nghệ Việt sẽ có những chính sách ưu đãi thích hợp.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Máy bị treo trong lúc thanh toán, làm sao để tôi biết đặt hàng thành công?</p>
                        <p className={cx("reply")}>Trả lời: Đơn hàng thành công sẽ có bảng thông báo xác nhận trên website. Trong trường hợp kể trên, bạn vui lòng đặt hàng và thực hiện lại các bước thanh toán.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Các mặt hàng nào có thể được đổi trả? Nếu đổi trả tôi có được hoàn tiền hay không và hoàn tiền trong thời gian bao lâu?</p>
                        <p className={cx("reply")}>Trả lời: Hình thức đổi trả và hoàn tiền áp dụng cho tất cả các mặt hàng trong thời gian tối đa 24h nếu quý khách không hài lòng với sản phẩm.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Làm thế nào để đặt hàng tại Mỹ Nghệ Việt?</p>
                        <p className={cx("reply")}>Trả lời: Hiện tại khách hàng có thể đặt hàng trên website myngheviet.vn hoặc trực tiếp đến showroom để xem và mua hàng.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Làm thế nào để kiểm tra tình trạng đơn hàng của tôi?</p>
                        <p className={cx("reply")}>Trả lời: Để kiểm tra tình trạng chi tiết đơn hàng, bạn có thể truy cập vào mục giỏ hàng hoặc gọi điện thoại đến bộ phận chăm sóc khách hàng để được tư vấn thêm.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Làm thế nào kiểm tra sản phẩm còn hàng hay không?</p>
                        <p className={cx("reply")}>Trả lời: Bạn vui lòng liên hệ qua số điện thoại trực tuyến 0903 309 989 hoặc +84 8 6281 1183 để nhận được thông tin chính xác.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Làm thế nào để liên hệ bộ phận chăm sóc khách hàng?</p>
                        <p className={cx("reply")}>Trả lời: Để nhận được sự hỗ trợ nhanh chóng, bạn có thể liên hệ qua số điện thoại trực tuyến 0903 309 989 hoặc +84 8 6281 1183.</p>
                    </div>
                    <hr />
                    <div className={cx("section")}>
                        <p className={cx("question")}>- Các hình thức thanh toán nào được Mỹ Nghệ Việt chấp nhận?</p>
                        <p className={cx("reply")}>Trả lời: Hiện tại, Mỹ Nghệ Việt áp dụng các hình thức thanh toán sau: thu tiền khi giao hàng, chuyển khoản, qua thẻ tín dụng/thẻ ghi nợ.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer_V3;
