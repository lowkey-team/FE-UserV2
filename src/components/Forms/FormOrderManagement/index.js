import classNames from "classnames/bind";

import styles from "./FormOrderManagement.module.scss";
import { useState } from "react";
import CardOrder from "../../Cards/CardOrder";
import Cookies from "js-cookie";
import { fecthInvoiceByIdUserAPI } from "~/apis";

const cx = classNames.bind(styles);

function FormOrderManagement() {
  const [activeButton, setActiveButton] = useState("chothanhtoan");
  const [data, setData] = useState([]);
  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  const handleButtonClick = async (buttonType) => {
    setActiveButton(buttonType);
    const dataInvoice = await fecthInvoiceByIdUserAPI(
      storedUser.id,
      buttonType
    );
    setData(dataInvoice);
  };


  return (
    <div className={cx("wrapper")}>
      <div className={cx("order-header")}>
        <button
          className={cx({ active: activeButton === "chothanhtoan" })}
          onClick={() => handleButtonClick("chothanhtoan")}
        >
          Chờ thanh toán
        </button>
        <button
          className={cx({ active: activeButton === "choxacnhan" })}
          onClick={() => handleButtonClick("choxacnhan")}
        >
          Chờ xác nhận
        </button>
        <button
          className={cx({ active: activeButton === "cholayhang" })}
          onClick={() => handleButtonClick("cholayhang")}
        >
          Chờ lấy hàng
        </button>
        <button
          className={cx({ active: activeButton === "chogiaohang" })}
          onClick={() => handleButtonClick("chogiaohang")}
        >
          Chờ giao hàng
        </button>
        <button
          className={cx({ active: activeButton === "trahang" })}
          onClick={() => handleButtonClick("trahang")}
        >
          Trả hàng
        </button>
        <button
          className={cx({ active: activeButton === "duocgiao" })}
          onClick={() => handleButtonClick("duocgiao")}
        >
          Được giao
        </button>
        <button
          className={cx({ active: activeButton === "dahuy" })}
          onClick={() => handleButtonClick("dahuy")}
        >
          Đã hủy
        </button>
      </div>

      <div className={cx("order-content")}>
        <div className={cx("list-order")}>
          {data.map((order) => (
            <CardOrder key={order.id} orderData={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FormOrderManagement;
