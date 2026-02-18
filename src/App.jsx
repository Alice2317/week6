import axios from "axios";
import Header from "./layouts/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { cartContext, cartReducer, initCarts } from "./store/store";

export default function App() {
  const [state, dispatch] = useReducer(cartReducer, initCarts);

  const getCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/cart`,
      );
      if (res.data.success) {
        dispatch({ type: "initCarts", payload: res.data.data });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCart();
  }, []);
  

  return (
    <div className='App'>
      <cartContext.Provider value={{ state, dispatch }}>
        <Header />
        <div className='container' style={{ minHeight: "90vh" }}>
          <Outlet />
        </div>
        <div className='bg-dark py-4 text-white text-center'>作品集用</div>
      </cartContext.Provider>
    </div>
  );
}
