import classNames from "classnames/bind";
import styles from "./CardVoucher.module.scss";
import { formatCurrency, formatDate } from "~/utils/format";
import MessageNotification from "../../Message";
import { addVoucherByUserID } from "~/apis";
import { useRef } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function CardVoucher({
  id,
  voucherCode,
  description,
  maxUses,
  usedCount,
  startDate,
  endDate,
  onVoucherAdded,
  max_discount_amount,
}) {
  const remainingUses = maxUses - usedCount;
  const messageRef = useRef();

  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;
  const handleAddVoucher = async () => {
    const dataToAdd = {
      ID_User: parseInt(storedUser.id, 10),
      ID_Voucher: parseInt(id, 10),
    };

    const jsonData = JSON.stringify(dataToAdd);

    try {
      const response = await addVoucherByUserID(JSON.parse(jsonData));
      if (response.status === 201) {
        messageRef.current.showSuccess("Voucher đã được lưu");
        onVoucherAdded();
      } else {
        messageRef.current.showError(
          "Không thể lưu voucher. Vui lòng thử lại."
        );
      }
    } catch (error) {
      messageRef.current.showError("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("circle-top")}></div>
      <div className={cx("circle-bottom")}></div>
      <div className={cx("left-card")}>
        <div className={cx("bg-name")}>
          <h4 className={cx("name-voucher")}>
            <FontAwesomeIcon className={cx('icon-gift')} icon={faGift}/>
          </h4>
        </div>
      </div>
      <div className={cx("right-card")}>
        {/* <h4 className={cx("title-voucher")}>{voucherCode}</h4> */}
        <h5 className={cx("detail-voucher")}>{description}</h5>
        <h5 className={cx("voucher-code")}>Mã: {voucherCode}</h5>
        <h5 className={cx("voucher-usage")}>
          Số lượng còn: {remainingUses} / {maxUses}
        </h5>
        <h5 className={cx("voucher-dates")}>
          Hạn sử dụng: {formatDate(startDate)} - {formatDate(endDate)}
        </h5>
        {max_discount_amount > 0 && (
          <h5 className={cx("voucher-usage")}>
            Giảm tối đa: {formatCurrency(max_discount_amount)}
          </h5>
        )}
        <button className={cx("btn-copy")} onClick={handleAddVoucher}>
          Lưu voucher
        </button>
        <MessageNotification ref={messageRef} />
      </div>
    </div>
  );
}

export default CardVoucher;
