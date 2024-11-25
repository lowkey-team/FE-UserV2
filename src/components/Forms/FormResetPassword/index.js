import classNames from "classnames/bind";

import styles from './FormResetPassword.module.scss'

const cx = classNames.bind(styles);

function FormResetPassword() {
    return ( 
        <div className={cx("content")}>
        <h2>Đổi Mật Khẩu</h2>
        <form className={cx("form")}>
            <label>Mật khẩu hiện tại:</label>
            <input type="password" />
            
            <label>Mật khẩu mới:</label>
            <input type="password" />
            
            <label>Nhập lại mật khẩu mới:</label>
            <input type="password" />
            
            <button type="submit">Đổi mật khẩu</button>
        </form>
    </div>
     );
}

export default FormResetPassword;