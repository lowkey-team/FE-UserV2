import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";

import CardVoucher from "~/components/Cards/CardVoucher";
import FormDetailProduct from "~/components/Forms/FormDetailProduct";
import styles from "./ProductDetails.module.scss";
import {
  fetchProductByIdAPI,
  fetchGetVoucherAPI,
  fetchFeedbackByProductIdAPI,
} from "~/apis";
import CardProductSaleHorizontal from "~/components/Cards/CardProductSaleHorizontal";
import { icon } from "@fortawesome/fontawesome-svg-core";
import icons from "~/assets/icons";
import CardFeedback from "~/components/Cards/CardFeedback";
import Cookies from "js-cookie";

const cx = classNames.bind(styles);

function ProductDetails() {
  const { id: productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [statistics, setStatistics] = useState({
    totalRatings: 0,
    averageRating: 0,
    ratingCounts: [0, 0, 0, 0, 0],
  });
  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await fetchGetVoucherAPI(storedUser.id);
        console.log("du lieu voucher:", data);
        setVouchers(data);
      } catch (error) {
        console.log("Error fetching vouchers:", error);
      }
    };
    fetchVouchers();
  }, []);

  const fullDescription = `
        Sản phẩm mỹ nghệ của chúng tôi là một tác phẩm nghệ thuật được chế tác tỉ mỉ và tinh xảo, mang đậm giá trị văn hóa và nghệ thuật truyền thống. Mỗi món đồ đều được làm thủ công bởi những người thợ lành nghề, với kỹ thuật truyền thống qua nhiều thế hệ, kết hợp cùng sự sáng tạo và tinh thần tỉ mỉ trong từng chi tiết.

        Chất liệu sản phẩm được chọn lọc kỹ càng, bao gồm gỗ tự nhiên, đá quý, sứ, đồng và những vật liệu cao cấp khác, mang đến sự bền bỉ và vẻ đẹp vượt thời gian. Những đường nét chạm khắc, họa tiết trang trí trên sản phẩm không chỉ thể hiện sự khéo léo mà còn chứa đựng những câu chuyện lịch sử và ý nghĩa sâu sắc, phản ánh đậm nét văn hóa dân gian và những giá trị truyền thống quý báu.

        Các sản phẩm mỹ nghệ của chúng tôi không chỉ là những món đồ trang trí nội thất, mà còn là những tác phẩm nghệ thuật có giá trị sưu tầm cao. Chúng phù hợp với mọi không gian, từ phòng khách sang trọng, phòng làm việc thanh lịch cho đến các không gian văn hóa, bảo tàng hoặc các bộ sưu tập cá nhân.

        Sản phẩm mỹ nghệ của chúng tôi cũng là món quà tặng đầy ý nghĩa dành cho những dịp đặc biệt như lễ tết, kỷ niệm, hoặc những buổi gặp gỡ quan trọng. Mỗi món quà mang trong mình thông điệp tôn vinh vẻ đẹp thủ công và tình yêu đối với nghệ thuật, chắc chắn sẽ tạo nên ấn tượng sâu sắc đối với người nhận.

        Hãy đến với chúng tôi để khám phá những sản phẩm mỹ nghệ độc đáo, đậm chất nghệ thuật và giá trị văn hóa, mang lại sự sang trọng và tinh tế cho không gian sống của bạn.
  `;

  const previewLength = 200;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchProductByIdAPI(productId);
          console.log("du lieu:", data);
          setProductDetails(data);
        } catch (error) {
          console.error("Error fetching product data:", error);
          setError("Failed to load product details.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await fetchFeedbackByProductIdAPI(productId);
        console.log("Dữ liệu feedback:", data);

        const totalRatings = data.length;
        const ratingCounts = [0, 0, 0, 0, 0];
        let totalScore = 0;

        data.forEach((feedback) => {
          ratingCounts[feedback.feedback_rating - 1]++;
          totalScore += feedback.feedback_rating;
        });

        const averageRating =
          totalRatings > 0 ? (totalScore / totalRatings).toFixed(1) : 0;

        setFeedbacks(data);
        setStatistics({
          totalRatings,
          averageRating,
          ratingCounts,
        });
      } catch (error) {
        console.log("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, [productId]);

  const handleVoucherAdded = async () => {
    // Cập nhật lại danh sách voucher sau khi lưu thành công
    try {
      const data = await fetchGetVoucherAPI(storedUser.id); // Lấy lại danh sách voucher mới
      setVouchers(data); // Cập nhật state vouchers
    } catch (error) {
      console.log("Error fetching vouchers:", error);
    }
  };

  return (
    <div className={cx("wrapper", "container")}>
      <section className={cx("section__detailvoucher")}>
        <div className="row">
          <div className={cx("col-detail", "col-md-12")}>
            {loading ? (
              <p>Loading product details...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <FormDetailProduct productDetails={productDetails} />
            )}
          </div>
        </div>
      </section>

      <section className={cx("section__des")}>
        <div className={cx("row")}>
          <div className={cx("des-content", "col-md-9")}>
            <div className={cx("des-title")}>
              <h3>Mô tả sản phẩm</h3>
              <hr></hr>
            </div>
            <p>
              {isExpanded
                ? fullDescription
                : fullDescription.substring(0, previewLength) + "..."}
            </p>
            <div className={cx("des__btn-more")}>
              <button onClick={toggleDescription}>
                {isExpanded ? "Thu gọn " : "Xem thêm "}
                <FontAwesomeIcon
                  icon={isExpanded ? faAnglesUp : faAnglesDown}
                />
              </button>
            </div>
          </div>

          <div className={cx("col-voucher", "col-md-3")}>
            <div className={cx("voucher-content")}>
              {vouchers.map((voucher) => (
                <CardVoucher
                  key={voucher.id}
                  id={voucher.id}
                  voucherCode={voucher.voucherCode}
                  description={voucher.description}
                  maxUses={voucher.maxUses}
                  usedCount={voucher.usedCount}
                  endDate={voucher.endDate}
                  StartDate={voucher.endDate}
                  onVoucherAdded={handleVoucherAdded}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={cx("section__feedback")}>
        <div className={cx("row")}>
          <section className={cx("section__feedback")}>
            <div className={cx("row")}>
              <h3>Đánh giá sản phẩm</h3>
              <div className={cx("col-feedback", "col-md-6")}>
                {feedbacks.map((feedback) => (
                  <CardFeedback key={feedback.feedback_id} data={feedback} />
                ))}
              </div>
              <div className={cx("col-star", "col-md-6")}>
                <div className={cx("star-rating")}>
                  <div className={cx("star-rating-header")}>
                    <span className={cx("average-rating")}>
                      {statistics.averageRating}
                    </span>
                    <div className={cx("stars")}>
                      {Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <span
                            key={index}
                            className={cx("star", {
                              "half-star":
                                index + 0.5 < statistics.averageRating,
                            })}
                          >
                            ★
                          </span>
                        ))}
                    </div>
                    <span className={cx("total-reviews")}>
                      {statistics.totalRatings} đánh giá
                    </span>
                  </div>
                  <div className={cx("star-breakdown")}>
                    {statistics.ratingCounts.map((count, index) => {
                      const percentage =
                        statistics.totalRatings > 0
                          ? (count / statistics.totalRatings) * 100
                          : 0;
                      return (
                        <div key={index} className={cx("star-row")}>
                          <span>{index + 1} ★</span>
                          <div className={cx("bar")}>
                            <div
                              className={cx("filled-bar")}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span>{Math.round(percentage)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
