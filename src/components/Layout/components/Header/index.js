import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import {
  faBars,
  faCartShopping,
  faSearch,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
import FormLogin from "~/components/Forms/FormLogin";
import Cookies from "js-cookie";
import { Dropdown, Menu } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import SubHeader from "../SubHeader";
import { GetTotalCartByUserIdAPI } from "~/apis/cart";
import { useCart } from "~/contexts/CartContext";

const cx = classNames.bind(styles);

function Header() {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, updateCartCount } = useCart();
  const storedUser = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : null;

  useEffect(() => {
    setUser(storedUser);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user]);

  useEffect(() => {
    const fetchCartCount = async () => {
      if (storedUser) {
        try {
          const response = await GetTotalCartByUserIdAPI(storedUser.id);
          console.log("Cart count:", response);
          updateCartCount(response || 0);
        } catch (error) {
          console.error("Error fetching cart count:", error);
          updateCartCount(0);
        }
      } else {
        updateCartCount(0);
      }
    };

    fetchCartCount();
  }, [storedUser, updateCartCount]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Menu item handler functions
  const handleMenuClick = (e) => {
    switch (e.key) {
      case "account":
        navigate("/profile");
        break;
      case "settings":
        navigate("/settings");
        break;
      case "logout":
        Cookies.remove("user");
        setUser(null);
        navigate("/");
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="account" icon={<UserOutlined />}>
        Thông tin tài khoản
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Lịch sử mua hàng
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={cx("Wrapper", { scrolled: isScrolled })}>
      {isMobile ? (
        <>
          <div className={cx("sidebar", { open: isOpen })}>
            <button
              className={cx("closeButton")}
              onClick={toggleSidebar}
              aria-label="Close Menu"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <ul className={cx("navLinks")}>
              <li>
                <Link
                  to="/"
                  onClick={closeSidebar}
                  className={cx({ active: location.pathname === "/" })}
                >
                  <p className={cx("link-item")}>TRANG CHỦ</p>
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  onClick={closeSidebar}
                  className={cx({ active: location.pathname === "/product" })}
                >
                  SẢN PHẨM
                </Link>
              </li>
              <li>
                <Link
                  to="/connect"
                  onClick={closeSidebar}
                  className={cx({ active: location.pathname === "/connect" })}
                >
                  LIÊN HỆ
                </Link>
              </li>
              <li>
                <Link
                  to="/introduce"
                  onClick={closeSidebar}
                  className={cx({ active: location.pathname === "/introduce" })}
                >
                  GIỚI THIỆU
                </Link>
              </li>
            </ul>
          </div>
          <div className={cx("menuButtonContainer")}>
            <button
              className={cx("menuButton")}
              onClick={toggleSidebar}
              aria-label="Open Menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </>
      ) : (
        <div>
          <div className={cx("header__top")}>
            <img
              src="https://theme.hstatic.net/200000551679/1001282356/14/top_banner.jpg?v=516"
              alt="banner"
            />
          </div>
          <div className={cx("header__bottom")}>
            <Link to="/" className={cx("logo")}>
              <img src={images.logo} alt="logo" />
            </Link>

            <form className={cx("form-search")} onSubmit={handleSearchSubmit}>
              <div className={cx("input-container")}>
                <input
                  className={cx("input-search")}
                  placeholder="tìm kiếm sản phẩm..."
                  onChange={handleSearchChange}
                />
                <FontAwesomeIcon
                  className={cx("icon-search")}
                  icon={faSearch}
                />
              </div>
            </form>

            <div className={cx("action")}>
              <div className={cx("btn-cart")}>
                <Link to="/cart">
                  <FontAwesomeIcon
                    className={cx("icon-cart")}
                    icon={faCartShopping}
                  />
                  <span>Giỏ hàng ({cartCount})</span>
                </Link>
              </div>
              {user ? (
                <>
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <p
                      className={cx("user-name")}
                      onClick={(e) => e.preventDefault()}
                    >
                      {user.FullName}
                    </p>
                  </Dropdown>
                </>
              ) : (
                <div className={cx("btn-user")} onClick={handleLoginClick}>
                  <FontAwesomeIcon className={cx("icon-login")} icon={faUser} />
                  <span>Đăng nhập</span>
                </div>
              )}
            </div>
            {showLoginForm && <FormLogin onClose={handCloseLoginForm} />}
          </div>
          <div className={cx("sub__header")}>
            <SubHeader />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
