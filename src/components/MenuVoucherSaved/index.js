import classNames from "classnames/bind";
import styles from "./MenuVoucherSaved.module.scss"; // Ensure you create this SCSS file with relevant styles
import CardVoucherSaved from "../Cards/CardVoucherSaved";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { fetchGetVoucherSaveAPI } from "~/apis";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function MenuVoucherSaved({ isVisible, onClose, onVoucherSelect }) {
  const [vouchers, setVouchers] = useState([]);
  const storedUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : 0;
  // const [selectedVoucherId, setSelectedVoucherId] = useState(null);

  // const handleVoucherApply = (id) => {
  //   console.log("Voucher ID được chọn:", id);
  //   setSelectedVoucherId(id);
  // };

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await fetchGetVoucherSaveAPI(parseInt(storedUser.id));
        console.log("du lieu voucher:", data);
        setVouchers(data);
      } catch (error) {
        console.log("Error fetching vouchers:", error);
      }
    };
    fetchVouchers();
  }, []);
  
  return (
    <div className={cx("menu-voucher", { "menu-visible": isVisible })}>
      <div className={cx("form-menu")}>
        <div className={cx("form-header")}>
          <div className={cx("close-button")}>
            <button onClick={onClose}>
              <FontAwesomeIcon
                className={cx("icon-close")}
                icon={faAnglesRight}
              />
            </button>
          </div>
          <div className={cx("title")}>
            <h2>Voucher của bạn</h2>
          </div>
        </div>

        <div className={cx("voucher-list")}>
          <div className={cx("list-item")}>
            {vouchers.map((voucher) => (
              <CardVoucherSaved
                key={voucher.id}
                id={voucher.id}
                id_voucherUser={voucher.id_voucher_user}
                voucherCode={voucher.voucherCode}
                description={voucher.description}
                maxUses={voucher.maxUses}
                usedCount={voucher.usedCount}
                endDate={voucher.endDate}
                StartDate={voucher.endDate}
                onVoucherApply={onVoucherSelect}
                max_discount_amount={voucher.max_discount_amount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuVoucherSaved;
