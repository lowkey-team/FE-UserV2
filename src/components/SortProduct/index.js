import classNames from "classnames/bind"

import styles from "./SortProduct.module.scss"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function SortProduct() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Sắp xếp");

    const handleToggleDropdown = () =>{
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (option) =>{
        setSelected(option);
        setIsOpen(false);
    };


    return ( 
        <div className={cx('sortProduct')}>
            <div className={cx('dropdownSort')}>
                <button
                    className={cx('btnDropdown')}
                    onClick={handleToggleDropdown}
                >
                    {selected}
                    <FontAwesomeIcon className={cx('iconDrop')} icon={isOpen ? faAngleUp : faAngleDown} />
                </button>
                {isOpen && (
                    <div className={cx('dropdownList')}> 
                        <p
                            className={cx('dropdownItem')}
                            onClick={() => handleSelectOption("Tăng theo giá")}
                        >
                            Tăng theo giá
                        </p>

                        <p
                            className={cx('dropdownItem')}
                            onClick={() => handleSelectOption("Giảm theo giá")}
                        >
                            Giảm theo giá
                        </p>
                        <p
                            className={cx('dropdownItem')}
                            onClick={() => handleSelectOption(" Tăng theo số lượng bán")}
                        >
                            Tăng theo số lượng bán
                        </p>

                        <p
                            className={cx('dropdownItem')}
                            onClick={() => handleSelectOption("Giảm theo số lượng bán")}
                        >
                            Giảm theo số lượng bán
                        </p>
                    </div>
                )}
            </div>
        </div>
     );
}

export default SortProduct;
