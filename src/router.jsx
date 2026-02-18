import {createHashRouter} from "react-router-dom";

import App from './App';
import UserHome from './pages/user/Home';
import Carts from "./pages/user/Carts";
import Checkout from "./pages/user/Checkout";
import UserProductDetail from "./pages/user/ProductDetail";
import UserProducts from "./pages/user/Products";
import MsgSuccess from "./pages/user/MsgSuccess";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";

let router = createHashRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: UserHome,
      },
      {
        path: "/products",
        Component: UserProducts,
      },
      {
        path: "/product/:id",
        Component: UserProductDetail,
      },
      {
        path: "/carts",
        Component: Carts,
      },
      {
        path: "/checkout",
        Component: Checkout,
      },
      {
        path: "/msg/:id",
        Component: MsgSuccess,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/admin",
        Component: AdminDashboard,
        children: [
          {
            index: true,
            Component: AdminProducts,
          },
        ],
      },
    ],
  },
]);

export default router;