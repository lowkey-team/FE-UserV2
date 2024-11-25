import classNames from "classnames/bind";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import styles from './FormVoucherForYou.module.scss';
import { fetchGetVoucherSaveAPI } from "~/apis";
import CardMyVoucher from "~/components/Cards/CardMyVoucher";

const cx = classNames.bind(styles);

function FormVoucherForYou() {

    const [vouchers, setVouchers] = useState([]);
    const storedUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : 0;

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
        <div className={cx("wrapper")}>
            <div className={cx("content")}>
               <div className={cx("voucher-list")}>
               <div className={cx("list-item")}>
                    {vouchers.map((voucher) => (
                    <CardMyVoucher
                        key={voucher.id}
                        id={voucher.id}
                        id_voucherUser={voucher.id_voucher_user}
                        voucherCode={voucher.voucherCode}
                        description={voucher.description}
                        maxUses={voucher.maxUses}
                        usedCount={voucher.usedCount}
                        endDate={voucher.endDate}
                        StartDate={voucher.endDate}
                        // onVoucherApply={onVoucherSelect}
                        max_discount_amount={voucher.max_discount_amount}
                    />
                    ))}
                </div>
               </div>
            </div>
        </div>
     );
}

export default FormVoucherForYou;
