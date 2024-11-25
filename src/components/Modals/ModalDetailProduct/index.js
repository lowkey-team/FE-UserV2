import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import Modal from "react-modal";

import style from "./ModalDetailProduct.module.scss";
import FormDetailProduct from "../../Forms/FormDetailProduct";
import { fetchProductByIdAPI } from "~/apis";

const cx = classNames.bind(style);

Modal.setAppElement('#root');

function ModalDetailProduct({ isOpen, onRequestClose, productId }) {
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchData = async () => {
            if (isOpen && productId) {
                setLoading(true);
                setError(null); // Reset error state before fetching
                try {
                    const data = await fetchProductByIdAPI(productId);
                    console.log("du lieu:", data)
                    setProductDetails(data);
                    
                } catch (error) {
                    console.error("Error fetching product data:", error);
                    setError("Failed to load product details."); // Update error state
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [isOpen, productId]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={cx("modal")}
            overlayClassName={cx("overlay")}
        >
            <div className={cx("btnClose")} onClick={onRequestClose}>
                <h1>X</h1>
            </div>
            <div className={cx("title")}>
                <h2>CHI TIẾT SẢN PHẨM</h2>
            </div>

            {loading ? (
                <p>Loading product details...</p>
            ) : error ? (
                <p>{error}</p> 
            ) : (
                <div className={cx('inner-content')}>
                    <FormDetailProduct productDetails={productDetails} />
                </div>
            )}
        </Modal>
    );
}

export default ModalDetailProduct;
