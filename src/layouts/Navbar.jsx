import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { cartContext } from "../store/store";

export default function Navbar() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(cartContext);
  const [isAuth, setisAuth] = useState(false);
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  }

  useEffect(() => {
    if (!token) return;
    setisAuth(true);
  }, [token]);

  const logout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/v2/logout`,
      );
      if (res.data.success) {
        const date = new Date(); //目前時間
        date.setMinutes(date.getMinutes() - 480).toLocaleString();
        document.cookie = `token=; expires=${date}`;
      }
      setisAuth(false);
      navigate("/");
    } catch (error) {
      alert('登出失敗');
    }
  };

  return (
    <div className='bg-white sticky-top'>
      <div className='container'>
        <nav className='navbar px-0 navbar-expand-lg navbar-light bg-white'>
          <Link
            className='navbar-brand position-absolute'
            index='true'
            style={{
              left: "50%",
              transform: "translate(-50%, -50%)",
              top: "50%",
            }}
          >
            Logo
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='collapse navbar-collapse bg-white custom-header-md-open'
            id='navbarNav'
          >
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link' aria-current='page' to='/products'>
                  Products
                </Link>
              </li>
            </ul>
          </div>
          <div className='d-flex'>
            {!isAuth ? (
              <Link className='btn btn-dark' to='/login'>
                登入
              </Link>
            ) : (
              <button
                type='button'
                className='btn btn-dark'
                onClick={() => logout()}
              >
                登出
              </button>
            )}
            <Link className='btn btn-primary position-relative' to='/carts'>
              <i className='bi bi-cart'></i>
              <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                {state.carts.length>0 && state.carts.reduce((a, b) => {
                  a += b.qty;
                  return a;
                }, 0)}
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
