import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./Profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faBox, faCog, faUser, faTicket } from "@fortawesome/free-solid-svg-icons";
import FormProfile from "~/components/Forms/FormProfile";
import FormResetPassword from "~/components/Forms/FormResetPassword";
import FormOrderManagement from "~/components/Forms/FormOrderManagement";
import FormVoucherForYou from "~/components/Forms/FormVoucherForYou";
const cx = classNames.bind(style);

function Profile() {
    const [activeContent, setActiveContent] = useState("accountManagement");

    
    const renderContent = () => {
        switch (activeContent) {
            case "accountManagement":
                return (
                    <FormProfile/>
                );
            case "orderManagement":
                return (
                    <FormOrderManagement/>
                );
            case "voucherSave":
                return (
                    <FormVoucherForYou/>
                );   
                case "changePassword":
                    return (
                       <FormResetPassword/>
                    );
            default:
                return (
                    <FormProfile/>
                );
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("sidebar")}>
                <div
                    className={cx("sidebar-title")}
                >
                    Thông tin cá nhân
                </div>

                <button
                    className={cx("sidebar-item", {
                        active: activeContent === "accountManagement",
                    })}
                    onClick={() => setActiveContent("accountManagement")}
                >
                    <FontAwesomeIcon icon={faCog} className={cx("icon")} />
                    Quản lý tài khoản
                </button>
                <button
                    className={cx("sidebar-item", {
                        active: activeContent === "orderManagement",
                    })}
                    onClick={() => setActiveContent("orderManagement")}
                >
                    <FontAwesomeIcon icon={faBox} className={cx("icon")} />
                    Quản lý đơn hàng
                </button>
                <button
                    className={cx("sidebar-item", {
                        active: activeContent === "voucherSave",
                    })}
                    onClick={() => setActiveContent("voucherSave")}
                >
                    <FontAwesomeIcon icon={faTicket} className={cx("icon")} />
                    Voucher của bạn
                </button>
                <button
                    className={cx("sidebar-item", {
                        active: activeContent === "changePassword",
                    })}
                    onClick={() => setActiveContent("changePassword")}
                >
                    <FontAwesomeIcon icon={faKey} className={cx("icon")} />
                    Đổi mật khẩu
                </button>
            </div>
            <div className={cx('right-content')}>
                <div className={cx('box-content')}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Profile;
