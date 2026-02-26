import Header from "./layouts/Navbar";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';
import Toast from "./compontents/Toast";

export default function App() {
  return (
    <Provider store={store}>
    <div className='App'>
        <Toast />
        <Header />
        <div className='container' style={{ minHeight: "90vh" }}>
          <Outlet />
        </div>
        <div className='bg-dark py-4 text-white text-center'>作品集用</div>
    </div>
    </Provider>
  );
}
