import classNames from "classnames/bind";
import styles from './FormVoucherForYou.module.scss';
import { useState } from "react";
import CardVoucher from "../../Cards/CardVoucher"; // You can remove this if not needed
const cx = classNames.bind(styles);

function FormVoucherForYou() {
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("content")}>
               <div className={cx("voucher-list")}>
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
                   <CardVoucher />
               </div>
            </div>
        </div>
     );
}

export default FormVoucherForYou;
