import classNames from "classnames/bind";
import styles from "./CardVoucherSaved.module.scss";
import { formatCurrency, formatDate } from "~/utils/format";

const cx = classNames.bind(styles);

function CardVoucherSaved({
  id,
  id_voucherUser,
  voucherCode,
  description,
  maxUses,
  usedCount,
  startDate,
  endDate,
  onVoucherApply,
  max_discount_amount,
}) {
  const remainingUses = maxUses - usedCount;
  return (
    <div className={cx("wrapper")}>
      <div className={cx("left-card")}>
        <div className={cx("bg-name")}>
          <h4 className={cx("name-voucher")}>{voucherCode}</h4>
          <div className={cx("circle-top")}></div>
          <div className={cx("circle-bottom")}></div>
        </div>
      </div>

      <div className={cx("right-card")}>
        <h4 className={cx("title-voucher")}>{voucherCode}</h4>
        <h5 className={cx("detail-voucher")}>{description}</h5>
        {/* <h5 className={cx("voucher-code")}>Mã: {voucherCode}</h5> */}
        <h5 className={cx("voucher-usage")}>
          Số lượng còn: {remainingUses} / {maxUses}
        </h5>
        {max_discount_amount > 0 && (
          <h5 className={cx("voucher-usage")}>
            Giảm tối đa: {formatCurrency(max_discount_amount)}
          </h5>
        )}

        <h5 className={cx("voucher-dates")}>
          Hạn sử dụng: {formatDate(startDate)} - {formatDate(endDate)}
        </h5>
        <button className={cx("btn-copy")} onClick={() => onVoucherApply(id)}>
          Sử dụng voucher
        </button>
      </div>
    </div>
  );
}

export default CardVoucherSaved;
