import classNames from "classnames/bind";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import style from "./Home.module.scss";
import images from "~/assets/images";
import icons from "~/assets/icons";
import Button from "~/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useInView } from "react-intersection-observer";
import BackTop from "antd/es/float-button/BackTop";
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};

function Home() {

    const { ref: leftRef, inView: leftInView } = useInView({ triggerOnce: true });
    const { ref: rightRef, inView: rightInView } = useInView({ triggerOnce: true });
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/productall');
    };

    const handleClickProductOfSubCategory = () => {
        navigate('/product');
    };

    return ( 
        <div className={cx('wrapper', 'container')}>
            <div className={cx('banner-section')}>
                <Slider {...settings} className={cx('banner')}>
                    <div className={cx('img-banner')}>
                        <img src={images.banner1} alt="Banner 1" />
                    </div>
                    <div className={cx('img-banner')}>
                        <img src={images.banner2} alt="Banner 2" />
                    </div>
                    <div className={cx('img-banner')}>
                        <img src={images.banner3} alt="Banner 3" />
                    </div>
                </Slider>
            </div>

            <div className={cx('form-action')}>
                <div className={cx('form-option')}>
                    <img src={icons.newProduct} alt="new product"/>
                    <span>HÀNG  MỚI VỀ</span>
                </div>
                <div className={cx('form-option')}>
                    <img src={icons.hotSale} alt="new product"/>
                    <span>BÁN CHẠY</span>
                </div>
                <div className={cx('form-option')}>
                    <img src={icons.precent} alt="new product"/>
                    <span>GIẢM GIÁ</span>
                </div>
                <div className={cx('form-option')}>
                    <img src={icons.orderSearch} alt="new product"/>
                    <span>TRA CỨU ĐƠN HÀNG</span>
                </div>
            </div>
            <hr></hr>

            {/* Section */}
            <section>
                <div className={cx('wrapper-pottery')}>
                    <div className="row">
                        <div className="col-md-6 col-12 col-sm-12">
                            <div className={cx('left-potteryBox')}>
                                <div className="row">
                                    <div className="col-md-6 col-6 col-sm-6">
                                        <div 
                                            className={cx('left-img')}
                                        >
                                            <img src="https://nld.mediacdn.vn/zoom/700_438/291774122806476800/2022/2/16/thu-cong-my-nghe-163225843-16449759786522113839681.jpeg" alt=""/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-6 col-sm-6">
                                        <div
                                            className={cx('right-img')}
                                        >
                                            <img src="https://res.cloudinary.com/dkcizqsb3/image/upload/e_improve,w_300,h_600,c_thumb,g_auto/v1727362649/ttqjfjtrirnnn6pibbfk.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h3 className={classNames(cx('titlePottery'))}>THỦ CÔNG MỸ NGHỆ</h3>
                            <p className={classNames(cx('ContentPottery'))}>
                            Sản phẩm thủ công mỹ nghệ là mặt hàng phong phú, có truyền thống lâu đời mà ông cha ta từ ngày xưa để lại. 
                            Mặt hàng rất đa dạng và được tạo ra bởi các nghệ nhân có tay nghề cao. Với các sản phẩm nổi tiếng như: gốm sứ Bát Tràng, lụa Vạn Phúc, đồ đồng, mây tre đan,… không chỉ được yêu thích ở trong nước mà còn được sự quan tâm rất lớn từ các nước quốc tế. 
                            Việt Nam là nước xuất khẩu mặt hàng này sang các nước khác với số lượng rất lớn. Các doanh nghiệp hiện nay cũng đang nhanh chóng tìm kiếm, tiếp cận các đối tác của cả trong nước và nước ngoài.
                            </p>
                            {/* { outline primary to="/login" onClick={()=>alert('checked!')} target="_blank"} */}
                            <div className={classNames(cx('wrapper-btnPottery'))}>
                            <Button outline displayRight onClick={handleClick}>Xem sản phẩm <FontAwesomeIcon icon={faArrowRight} /></Button>
                            </div>
                        </div>
                    </div>
                </div>
        </section>

        <section>
            <div className={classNames(cx('wrapper-bambooProducts'), 'container')}>
                <div className={classNames(cx('box-imgBamboo'), 'row')}>
                    <div className="col-md-4"></div>
                    <div className={classNames(cx('box-img_BambooProduct'), 'col-md-8')}>
                        <img src="https://cuahangminhlong.com/wp-content/uploads/2022/09/binhhoagomsuminhlong.jpg" alt=""></img>
                    </div>
                </div>
                <div className={classNames(cx('box-contentBamboo'), 'row')}>
                    <div className={classNames(cx('Content-BambooProduct'), 'col-md-6')} >
                        <h3>SẢN PHẨM GỐM SỨ</h3>
                        <p>Gốm sứ Việt Nam là một trong những ngành nghề thủ công có bề dày lịch sử và phát triển mạnh mẽ. 
                            Các làng nghề gốm nổi tiếng như Bát Tràng (Hà Nội), Chu Đậu (Hải Dương), và Phước Tích (Huế) đã tồn tại và phát triển qua nhiều thế hệ, tạo ra những sản phẩm độc đáo, từ chén đĩa, bình hoa, cho đến các tượng gốm nghệ thuật. 
                            Gốm sứ Việt Nam được yêu thích nhờ vào họa tiết tinh tế, màu sắc phong phú và chất lượng bền đẹp. Các nghệ nhân không chỉ làm ra những sản phẩm dùng trong gia đình mà còn tạo ra các tác phẩm nghệ thuật mang tính trang trí cao, phù hợp với nhiều không gian nội thất.</p>
                        <div className={classNames(cx('wrapper-btnBamboo'))}>
                            <Button outline displayRight onClick={handleClickProductOfSubCategory} >Xem sản phẩm <FontAwesomeIcon icon={faArrowRight} /></Button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
            
        <section>
            <div className={classNames(cx('wrapper-bambooProducts'), 'container')}>
                <div className={classNames(cx('box-imgBamboo'), 'row')}>
                    <div className="col-md-4"></div>
                    <div className={classNames(cx('box-img_BambooProduct'), 'col-md-8')}>
                    <img src="https://media.baoquangninh.vn/upload/image/202106/medium/1846325_bang_su_sang_tao_kheo_leo_nguoi_dan_dong_hai_da_lam_ra_nhung_san_pham_may_tre_dan_don_gian_moc_mac_dam_chat_lang_que_11121401.jpg" alt=""></img>
                    </div>
                </div>
                <div className={classNames(cx('box-contentBamboo'), 'row')}>
                    <div className={classNames(cx('Content-BambooProduct'), 'col-md-6')}>
                        <h3>SẢN PHẨM TRE ĐAN</h3>
                        <p>Sản phẩm tre đan là nét đặc trưng của làng nghề Việt Nam, thể hiện sự khéo léo của nghệ nhân qua các vật dụng như giỏ, khay, túi xách và đồ trang trí. 
                            Phát triển mạnh ở Thạch Thất, Chương Mỹ (Hà Nội) và Kim Sơn (Ninh Bình), nghề tre đan không chỉ gắn bó với đời sống thường nhật mà còn được ưa chuộng nhờ tính thân thiện với môi trường, mang lại vẻ đẹp tự nhiên và bền vững.</p>
                        <div className={classNames(cx('wrapper-btnBamboo'))}>
                        <Button outline displayRight onClick={handleClickProductOfSubCategory} >Xem sản phẩm <FontAwesomeIcon icon={faArrowRight} /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section>
            <div className={classNames(cx('wrapper-bambooProducts'), 'container')}>
                <div className={classNames(cx('box-imgBamboo'), 'row')}>
                    <div className="col-md-4"></div>
                    <div className={classNames(cx('box-img_BambooProduct'), 'col-md-8')}>
                        <img src="https://gomottam.com/wp-content/uploads/2023/06/z4462375803585_d400b937b61292f37919480050c2c5c7-scaled.jpg" alt=""></img>
                    </div>
                </div>
                <div className={classNames(cx('box-contentBamboo'), 'row')}>
                    <div className={classNames(cx('Content-BambooProduct'), 'col-md-6')}>
                        <h3>SẢM PHẨM TRANG TRÍ</h3>
                        <p>Các sản phẩm trang trí thủ công tại Việt Nam thể hiện sự sáng tạo không giới hạn và sự đa dạng trong chất liệu, từ đồ gỗ chạm khắc, tranh sơn mài, tượng đồng, đến những món đồ nhỏ xinh bằng gốm, đá, hay sừng.
                        Các sản phẩm trang trí này không chỉ mang tính thẩm mỹ mà còn là cầu nối văn hóa, mang theo những câu chuyện truyền thống và tinh hoa nghệ thuật của từng vùng miền.
                        Đặc biệt, tranh sơn mài hay tranh thêu truyền thống là những sản phẩm trang trí đặc sắc, vừa mang tính nghệ thuật cao vừa góp phần tôn vinh văn hóa Việt trong không gian sống hiện đại.
                        </p>
                        <div className={classNames(cx('wrapper-btnBamboo'))}>
                        <Button outline displayRight onClick={handleClickProductOfSubCategory} >Xem sản phẩm <FontAwesomeIcon icon={faArrowRight} /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className={cx("community-wrapper")}>
                <p class={cx("community-title")}>MANG LẠI GIÁ TRỊ CHO CỘNG ĐỒNG</p>
                <hr/>

                <div className={cx("vision-mission")}>
                    <div className={cx("card")}>
                        <FontAwesomeIcon icon={faEye} className={cx("icon")}/>
                        <h2>Tầm nhìn</h2>
                        <p>Trở thành nhà phân phối & xúc tiến thương mại tin cậy nhất của khách hàng trong nước và quốc tế về thủ công - mỹ nghệ</p>
                    </div>
                    <div className={cx("card")}>
                        <FontAwesomeIcon icon={faHeart} className={cx("icon")}/>
                        <h2>Sứ mệnh</h2>
                        <p>Cùng cộng đồng tiến bộ góp phần giữ gìn, tôn tạo và phát huy các giá trị văn hóa Việt qua các sản phẩm thủ công - mỹ nghệ</p>
                    </div>
                </div>

                <div className={cx("value-cards")}>
                    <div className={cx("value-card")}>
                        <div className={cx('value__card-img')}><img src="https://binhtra.vn/www/uploads/images/2_result.jpg" alt="Uy tín"/></div>
                        <h5>UY TÍN KHI LÀM VIỆC VỚI KHÁCH HÀNG VÀ ĐỐI TÁC</h5>
                        <p>Chúng tôi luôn đặt uy tín lên hàng đầu khi làm việc với các đối tác từ Bắc chí Nam với hy vọng góp phần giữ gìn và phát triển các làng nghề thủ công lâu đời; đồng thời luôn giữ chữ Tín khi làm việc và phục vụ hàng ngàn khách hàng mỗi năm.</p>
                    </div> 
                    <div className={cx("value-card")}>  
                        <div className={cx('value__card-img')}><img src="https://hungiota.com/wp-content/uploads/2020/04/Ke-go-tron-va-dot-trang-tri-phong-spa-salon-nail-mi.jpg" alt="Uy tín"/></div>
                        <h5>UY TÍN KHI LÀM VIỆC VỚI KHÁCH HÀNG VÀ ĐỐI TÁC</h5>
                        <p>Chúng tôi luôn tạo điều kiện để khách hàng có thể an tâm nhất khi mua sắm, tất cả các mặt hàng đều được khách hàng kiểm tra chất lượng trước khi thanh toán; đồng thời, toàn bộ quy trình sản xuất đều được công bố trên website.</p>
                    </div>
                    <div className={cx("value-card")}>
                        <div className={cx('value__card-img')}><img src="https://homegift.vn/img/cms/Products/Decor-trang-ri/qu%C3%A0-t%E1%BA%B7ng-t%C6%B0%E1%BB%A3ng-decor-trang-tr%C3%AD-nh%C3%A0.jpg" alt="Tiên phong"/></div>
                        <h5>TIÊN PHONG KHAI PHÁ SẢN PHẨM MỚI TRONG NGÀNH</h5>
                        <p>Chúng tôi luôn nghiên cứu và tìm kiếm để phát hiện các sản phẩm mới mang đậm bản sắc văn hóa Việt với chất lượng đảm bảo để mang đến cho khách hàng ngày càng nhiều lựa chọn phù hợp hơn.</p>
                    </div>
                </div>

            </div>
        </section>

        <section>
            <div className={cx("statistical-wrapper")}>
                <div className={cx("statistical-content")}>

                    <div className={cx("statistical")}>
                        <div className={cx("number")}>
                            <p style={{ color:"#df0024" }}>10+</p>
                        </div>
                        <div className={cx("title")}>
                            <p>LÀNG NGHỀ TRUYỀN THỐNG TIÊU BIỂU VIỆT NAM</p>
                        </div>
                    </div>
                    
                    <div className={cx("statistical")}>
                        <div className={cx("number")}>
                            <p style={{ color:"#f3c300" }}>15+</p>
                        </div>
                        <div className={cx("title")}>
                            <p>NĂM KINH NGHIỆM TRONG NGÀNH</p>
                        </div>
                    </div>
                    <div className={cx("statistical")}>
                        <div className={cx("number")}>
                            <p style={{ color:"#00ac9f" }}>30+</p>
                        </div>
                        <div className={cx("title")}>
                            <p>WEBSITE SẢN PHẨM MỸ NGHỆ ĐỘC ĐÁO</p>
                        </div>
                    </div>
                    <div className={cx("statistical")}>
                        <div className={cx("number")}>
                            <p style={{ color:"#2e6db4" }}>5000+</p>
                        </div>
                        <div className={cx("title")}>
                            <p>SẢN PHẨM THỦ CÔNG MỸ NGHỆ</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className={cx('wrapper-gift')}>
                <p className={cx('Title-gift')}> QUÀ TẶNG DOANH NGHIỆP </p>
                <p className={cx('content-gift')}>
                    Chúng tôi cung cấp quà tặng cao cấp, sáng tạo, giúp doanh nghiệp thể hiện sự trân trọng với đối tác và khách hàng.
                </p>
                <p className={cx('content-gift')}>Sản phẩm của chúng tôi luôn đảm bảo chất lượng và thiết kế tinh tế.</p>
                <div className={cx('box-gift')}>
                    <div className={cx('item-gift')}>
                        <div className={cx("title")}>
                            <img src = {icons.diamond} alt="Diamond"/>
                            <h2>QUÀ TẶNG CAO CẤP</h2>
                        </div>
                        <div className={cx("content")}>
                            <p>Dành cho ngân sách trên 500.000₫, Sản phẩm quà tặng cao cấp, tinh xảo nhiều ý nghĩa, hoặc các bộ combo nhiều món quà đặc sắc</p>
                        </div>
                    </div>

                    <div className={cx('item-gift')}>
                        <div className={cx("title")}>
                            <img src = {icons.present} alt=""/>
                            <h2>QUÀ TẶNG BẢN SẮC</h2>
                        </div>
                        <div className={cx("content")}>
                            <p>Tập trung vào ý nghĩa của sự kiên tâng quà, bản sắc thương hiệu để lựa chọn giải pháp quả tặng độc đáo và ấn tượng nhất</p>
                        </div>
                    </div>

                    <div className={cx('item-gift')}>
                        <div className={cx("title")}>
                            <img src = {icons.giftbox} alt=""/>
                            <h2>QUÀ TẶNG PHỔ THÔNG</h2>
                        </div>
                        <div className={cx("content")}>
                            <p>Thường dành cho các sản phẩm quà tặng truyền thông, sự kiện, khuyến mãi với số lượng lớn</p>
                        </div>
                    </div>

                    <div className={cx('item-gift')}>
                        <div className={cx("title")}>
                            <img src = {icons.giftcard} alt=""/>
                            <h2>QUÀ TẶNG TÔN SẢN PHẨM</h2>
                        </div>
                        <div className={cx("content")}>
                            <p>Những món quà làm nên đề gây sự chú ý vào cho sản phẩm chính hoặc thông điệp chính của doanh nghiệp</p>
                        </div>    
                    </div>
                </div>
            </div>
        </section>
        <BackTop/>
        </div>
     );
}

export default Home;