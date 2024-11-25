import classNames from "classnames/bind";
import styles from "./CardFeedback.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function CardFeedback({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("contentFeedback")}>
        <div className={cx("username")}>
          <span>{data.feedback_user}</span>
        </div>
        <div className={cx("image-start")}>
          {[...Array(data.feedback_rating)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} />
          ))}
        </div>

        <div className={cx("content")}>
          <p>{data.feedback_content}</p>
        </div>
        <div className={cx("time")}>
          <span>{data.feedback_created_at}</span>
        </div>
      </div>

      <div className={cx("orderFeedback")}>
        <img src={data.product_image} alt="Ảnh đánh giá"/>
      </div>
    </div>
  );
}

export default CardFeedback;
