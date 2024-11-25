import classNames from "classnames/bind";
import SubHeader from "../components/SubHeader";
import Header from "../components/Header";
import Sidebar from "./Sidebar";

import styles from './DefaultLayout.module.scss'
import Products from "~/pages/Products";
import { useState } from "react";
import SortProduct from "~/components/SortProduct";
import Footer from "../components/Footer";
const cx = classNames.bind(styles);


function DefaultLayout() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [products, setProducts] = useState([]); 
    const [selectedPrice, setSelectedPrice] = useState("");
    return <div>
        <Header />
        <div className={cx('container')}>
            <div className={cx('row', 'wrapper')}>
                <div className={cx('col-md-2')}>
                    <SortProduct/>
                    <Sidebar
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        selectedPrice={selectedPrice}
                        setSelectedPrice={setSelectedPrice}
                    />
                </div>
                <div className={cx('col-md-10')}>
                    <div className={cx('content')}>
                        <Products
                            products={products} 
                            selectedCategories={selectedCategories}
                            setProducts={setProducts}
                            selectedPrice={selectedPrice}
                        />      
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
}

export default DefaultLayout;