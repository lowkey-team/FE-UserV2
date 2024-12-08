import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./News.module.scss";
const cx = classNames.bind(style);

function News() {
    
    const [selectedNews, setSelectedNews] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const newsList = [
        {
            id: 1,
            title: "Gốm sứ Việt Nam: Tinh hoa từ đất và lửa",
            description: "Gốm sứ Việt Nam từ lâu đã được biết đến là một ngành nghề truyền thống gắn liền với đời sống văn hóa và lịch sử dân tộc. Các làng nghề nổi tiếng như Bát Tràng, Chu Đậu hay Thanh Hà đều tạo ra những sản phẩm đặc sắc, kết hợp giữa sự tài hoa của nghệ nhân và các yếu tố tự nhiên như đất sét và lửa. Quy trình sản xuất gốm sứ đòi hỏi sự tỉ mỉ trong từng công đoạn, từ việc chọn nguyên liệu, nhào nặn hình dáng, trang trí họa tiết cho đến nung sản phẩm trong lò ở nhiệt độ cao. Mỗi sản phẩm không chỉ là một vật dụng mà còn là tác phẩm nghệ thuật mang đậm tinh thần văn hóa Việt Nam. Hiện nay, gốm sứ Việt không chỉ được yêu thích trong nước mà còn xuất khẩu rộng rãi, góp phần đưa hình ảnh văn hóa Việt Nam vươn tầm quốc tế.",
            image: "https://langngheviet.com.vn/stores/news_dataimages/langnghevietcomvn/092021/21/09/tinh-hoa-gom-viet-31-.3223.jpg",
            date: "26/11/2024",
        },
        {
            id: 2,
            title: "Thêu tay truyền thống: Những bức tranh trên vải",
            description: "Thêu tay là một nghệ thuật truyền thống lâu đời, được truyền qua nhiều thế hệ và phản ánh sự tài hoa của người Việt. Mỗi sản phẩm thêu tay đều chứa đựng những câu chuyện về văn hóa, con người và thiên nhiên Việt Nam, được thể hiện qua từng mũi kim tinh tế. Nghệ nhân sử dụng các kỹ thuật thêu truyền thống như thêu đâm xô, thêu lướt vặn để tạo nên những tác phẩm trên áo dài, khăn tay hay tranh trang trí. Những họa tiết được chọn thường là cảnh đồng quê, hoa lá hay các hình ảnh biểu tượng văn hóa dân gian, mang lại vẻ đẹp hài hòa và độc đáo. Ngày nay, dù công nghệ sản xuất phát triển, thêu tay truyền thống vẫn giữ được giá trị riêng và được nhiều người trong và ngoài nước yêu thích như món quà lưu niệm độc đáo.",
            image: "https://noithatbinhminh.com.vn/wp-content/uploads/2017/09/tranh-th%C3%AAu-da-nang.jpg.webp",
            date: "25/11/2024",
        },
        {
            id: 3,
            title: "Mây tre đan: Tinh hoa từ thiên nhiên",
            description: "Ngành nghề mây tre đan không chỉ là biểu tượng của sự sáng tạo mà còn thể hiện mối quan hệ gần gũi giữa con người và thiên nhiên. Sản phẩm mây tre đan được làm từ các nguyên liệu tự nhiên như mây, tre, nứa - những vật liệu quen thuộc trong đời sống nông thôn Việt Nam. Qua bàn tay tài hoa của các nghệ nhân, những sợi mây tre thô sơ được biến thành các sản phẩm như rổ, lẵng hoa, hay đồ nội thất sang trọng. Ngoài giá trị sử dụng, sản phẩm mây tre đan còn mang vẻ đẹp của sự bền vững, thân thiện với môi trường. Điều này giúp sản phẩm không chỉ được ưa chuộng tại thị trường nội địa mà còn được xuất khẩu sang nhiều quốc gia, góp phần nâng cao vị thế nghề thủ công truyền thống Việt Nam trên thị trường quốc tế.",
            image: "https://dantra.vn/uploads/san-pham/decor-tuong/combo-dia-hoa-may/may-tre-trang-tri-3.jpg",
            date: "24/11/2024",
        },
        {
            id: 4,
            title: "Đồ gỗ mỹ nghệ: Vẻ đẹp trường tồn với thời gian",
            description: "Đồ gỗ mỹ nghệ là một trong những niềm tự hào của làng nghề thủ công truyền thống Việt Nam, nơi mà nghệ nhân thổi hồn vào những khối gỗ tưởng chừng vô tri. Từng đường nét chạm trổ đều toát lên vẻ đẹp tinh xảo, mang ý nghĩa phong thủy và giá trị thẩm mỹ cao. Những sản phẩm đồ gỗ mỹ nghệ không chỉ là vật dụng trang trí mà còn là biểu tượng của sự sang trọng và bền vững. Các sản phẩm như bàn ghế, tượng gỗ hay tủ thờ đều được chế tác từ gỗ quý như lim, gụ, hương, mang đến cảm giác ấm cúng và gần gũi. Hiện nay, đồ gỗ mỹ nghệ Việt Nam không chỉ phục vụ thị trường trong nước mà còn được xuất khẩu sang nhiều quốc gia, khẳng định đẳng cấp trên thị trường quốc tế.",
            image: "https://media.loveitopcdn.com/26706/mua-do-go-my-nghe-trang-tri-phong-khach-ban-nen-luu-y-nhung-gi-9.jpg",
            date: "23/11/2024",
        },
        {
            id: 5,
            title: "Đồ thủy tinh: Vẻ đẹp tinh khiết từ bàn tay người Việt",
            description: "Thủy tinh là một chất liệu đặc biệt, kết hợp giữa sự sáng trong và khả năng chế tác linh hoạt, được ứng dụng rộng rãi trong đời sống hiện đại. Ở Việt Nam, nghệ thuật làm đồ thủy tinh thủ công đang dần được hồi sinh và phát triển nhờ sự sáng tạo không ngừng của các nghệ nhân. Từ những chiếc ly, chén, đĩa đến các vật dụng trang trí, đồ thủy tinh thủ công luôn mang lại vẻ đẹp tinh tế và độc đáo. Quy trình sản xuất đòi hỏi sự tỉ mỉ và khéo léo từ việc thổi, nặn đến việc mài giũa và tạo họa tiết. Sự kết hợp giữa chất liệu trong suốt và thiết kế đa dạng đã giúp đồ thủy tinh thủ công Việt Nam trở thành lựa chọn ưu tiên của nhiều gia đình và nhà hàng cao cấp, đồng thời chinh phục cả thị trường quốc tế.",
            image: "https://lygiavien.com/cdn/shop/collections/ly-thuy-tinh-coc-pha-le_1024x1024.webp?v=1724299986",
            date: "22/11/2024",
        },
        {
            id: 6,
            title: "Tranh dân gian Việt Nam: Sắc màu của văn hóa",
            description: "Tranh dân gian Việt Nam không chỉ là một loại hình nghệ thuật mà còn là kho báu văn hóa, lưu giữ tinh hoa của các làng nghề qua hàng thế kỷ. Những dòng tranh nổi tiếng như Đông Hồ, Hàng Trống, hay tranh làng Sình đều mang đậm dấu ấn vùng miền, thể hiện qua màu sắc, họa tiết và các câu chuyện được truyền tải. Chất liệu sử dụng chủ yếu là giấy dó, màu tự nhiên và các kỹ thuật in, vẽ thủ công, tạo nên sự độc đáo mà không dòng tranh nào có được. Chủ đề của tranh dân gian thường xoay quanh cuộc sống lao động, tín ngưỡng và các tích truyện dân gian, vừa mang tính thẩm mỹ vừa chứa đựng thông điệp giáo dục sâu sắc. Ngày nay, tranh dân gian Việt Nam tiếp tục được bảo tồn và phát triển, trở thành nguồn cảm hứng cho nhiều loại hình nghệ thuật đương đại.",
            image: "https://lh6.googleusercontent.com/proxy/mw4wfUhIcSRng7MOVTrgMTMRUY9DHFtkoNKp_eHG58Qzny28kah2f1Py-dL3k6Pz7CzflesS5ZNoXez4E8OEGwODREZ6v8IXcMSxRxy2kJteuRpQxQUo",
            date: "21/11/2024",
        },
        {
            id: 7,
            title: "Đồ chơi truyền thống: Tuổi thơ qua từng món đồ",
            description: "Đồ chơi truyền thống Việt Nam là một phần ký ức tuổi thơ của nhiều thế hệ, được làm từ các chất liệu tự nhiên như tre, nứa, giấy hay đất sét. Những món đồ chơi như đèn ông sao, tò he, chong chóng, hay trống lắc không chỉ mang đến niềm vui mà còn là biểu tượng của văn hóa dân gian Việt. Qua bàn tay khéo léo của các nghệ nhân, mỗi món đồ chơi đều toát lên sự gần gũi, mộc mạc nhưng đầy sáng tạo. Dù xã hội hiện đại đã mang đến nhiều loại đồ chơi công nghệ, những món đồ truyền thống này vẫn giữ được sức hút riêng, đặc biệt trong các dịp lễ hội như Trung Thu hay Tết Nguyên Đán. Đây không chỉ là cách để trẻ em hiện đại kết nối với văn hóa cội nguồn mà còn là một nét đẹp cần được gìn giữ và phát huy.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzOMspqVv1nGORTD-vZjYzByppcxJ75YgLGA&s",
            date: "20/11/2024",
        },
    ];
    const openModal = (news) => {
        setSelectedNews(news);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedNews(null);
        setIsModalOpen(false);
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("banner")}>
                <img
                    src="https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2024/10/19/screen-shot-2024-10-19-at-095656-17293066401371078789750-35-0-582-875-crop-1729306982733806918104.png"
                    alt="Banner Tin Tức"
                    className={cx("banner-img")}
                />
                <h1 className={cx("banner-title")}>TIN TỨC THỦ CÔNG MỸ NGHỆ VIỆT</h1>
            </div>

            <div className={cx("featured-news")}>
                <h2 className={cx("section-title")}>Tin nổi bật</h2>
                <div className={cx("featured-list")}>
                    {newsList.slice(0, 3).map((news) => (
                        <div
                            key={news.id}
                            className={cx("news-item")}
                            onClick={() => openModal(news)}
                        >
                            <img
                                src={news.image}
                                alt={news.title}
                                className={cx("news-image")}
                            />
                            <div className={cx("news-content")}>
                                <h3 className={cx("news-title")}>{news.title}</h3>
                                <p className={cx("news-description")}>
                                    {news.description}
                                </p>
                                <span className={cx("news-date")}>{news.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cx("news-list")}>
                <h2 className={cx("section-title")}>Tất cả bài viết</h2>
                {newsList.map((news) => (
                    <div
                        key={news.id}
                        className={cx("news-card")}
                        onClick={() => openModal(news)}
                    >
                        <img
                            src={news.image}
                            alt={news.title}
                            className={cx("news-card-img")}
                        />
                        <div className={cx("news-card-content")}>
                            <h3 className={cx("news-card-title")}>{news.title}</h3>
                            <p className={cx("news-card-description")}>
                                {news.description}
                            </p>
                            <span className={cx("news-card-date")}>{news.date}</span>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && selectedNews && (
                <div className={cx("modal-overlay")} onClick={closeModal}>
                    <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
                        <button className={cx("close-button")} onClick={closeModal}>
                            &times;
                        </button>
                        <img
                            src={selectedNews.image}
                            alt={selectedNews.title}
                            className={cx("modal-img")}
                        />
                        <div className={cx("modal-content")}>
                            <h3 className={cx("modal-title")}>{selectedNews.title}</h3>
                            <p className={cx("modal-description")}>
                                {selectedNews.description}
                            </p>
                            <span className={cx("modal-date")}>{selectedNews.date}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default News;