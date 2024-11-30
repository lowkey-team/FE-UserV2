import { HeaderOnly } from "~/components/Layout";
import Cart from "~/pages/Cart";
import Home from "~/pages/Home";
import News from "~/pages/News";
import ProductAll from "~/pages/ProductAll";
import ProductBySupCategory from "~/pages/ProductBySupCategory";
import ProductDetails from "~/pages/ProductDetails";
import Products from "~/pages/Products";
import Profile from "~/pages/Profile";
import SearchPage from "~/pages/SearchPage";
import ShowAllProductSale from "~/pages/ShowAllProductSale";

//Public Routes
const publicRoutes = [
  { path: "/", component: Home, layout: HeaderOnly },
  { path: "/product", component: Products, layout: HeaderOnly },
  { path: "/productall", component: ProductAll, layout: HeaderOnly },
  { path: "/cart", component: Cart, layout: HeaderOnly },
  { path: "/profile", component: Profile, layout: HeaderOnly },
  { path: "/news", component: News, layout: HeaderOnly },
  { path: "/productdetail/:id", component: ProductDetails, layout: HeaderOnly },
  {
    path: "/productBySupCategory/:id",
    component: ProductBySupCategory,
    layout: HeaderOnly,
  },
  { path: "/search", component: SearchPage, layout: HeaderOnly },
  { path: "/saleproductall", component: ShowAllProductSale, layout: HeaderOnly },
  { path: "/newproductall", component: ShowAllProductSale, layout: HeaderOnly },
];

//Private Routers
const privateRoutes = [];

export { publicRoutes, privateRoutes };
