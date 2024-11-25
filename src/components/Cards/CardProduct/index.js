import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Button from "../../Button";
import style from "./CardProduct.module.scss";
import { useState } from "react";
import ModalDetailProduct from "../../Modals/ModalDetailProduct"; // Ensure consistent naming
import { formatCurrency } from "~/utils/format";
const cx = classNames.bind(style);

function CardProduct({
  id,
  FirstImage,
  SupCategoryName,
  productName,
  originalPrice,
  reducedPrice,
  discount,
  isNew,
}) {
  const navigate = useNavigate();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleDetailClick = () => {
    navigate(`/productdetail/${id}`);
    window.scrollTo(0, 0);
  };

  const openDetailModal = () => setIsDetailModalOpen(true);
  const closeDetailModal = () => setIsDetailModalOpen(false);

  return (
    <div className={cx("wrapper")}>
      {discount ? (
        <div className={cx("tag-sale")}>giảm {discount}%</div>
      ) : (
        <></>
      )}

      {isNew ? <div className={cx("tag-new")}>new</div> : <></>}
      <div className={cx("box-img")}>
        <img
          className={cx("image")}
          src={FirstImage}
          alt={productName || "Product Image"}
        />
      </div>
      <div className={cx("box-content")}>
        <p className={cx("CategoryName")}>
          {SupCategoryName || "Unknown Category"}
        </p>
        <p className={cx("ProductName")}>{productName || "Unknown Product"}</p>
        <p className={cx("Product__price")}>
          {discount ? (
            <div className={cx("Product__price--discount")}>
              <div className={cx("Product__price--reduced")}>
                {reducedPrice ? formatCurrency(reducedPrice) : "N/A"}
              </div>
              <div className={cx("Product__price--original")}>
                {originalPrice ? formatCurrency(originalPrice) : "N/A"}
              </div>
            </div>
          ) : (
            <div className={cx("Product__price--originalOnly")}>
              {originalPrice ? formatCurrency(originalPrice) : "N/A"}
            </div>
          )}
        </p>
      </div>
      <div className={cx("box-btn")}>
        <Button DetailCart onClick={handleDetailClick}>
          Xem chi tiết
        </Button>
        <Button AddCart onClick={openDetailModal}>
          <FontAwesomeIcon icon={faCartPlus} className={cx("btn-iconCart")} />
        </Button>
      </div>

      {/* Modal for showing product details */}
      <ModalDetailProduct
        isOpen={isDetailModalOpen}
        onRequestClose={closeDetailModal}
        productId={id}
      />
    </div>
  );
}

export default CardProduct;
