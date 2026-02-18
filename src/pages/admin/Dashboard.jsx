import axios from "axios";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }else{
      axios.defaults.headers.common.Authorization = token;
    }
  }, [navigate, token]);

  return (
    <>
      <div className='container-fluid bg-dark text-center py-3'>
        <p className='text-white mb-0'>後台管理系統</p>
      </div>
      <div className='d-flex' style={{ minHeight: "calc(100vh - 56px)" }}>
        <div className='bg-light' style={{ width: "200px" }}>
          <ul className='list-group list-group-flush'>
            <Link
              className='list-group-item list-group-item-action py-3'
              to='/admin'
            >
              <i className='bi bi-cup-fill me-2' />
              產品列表
            </Link>
          </ul>
        </div>
        <div className='w-100'>{token && <Outlet />}</div>
      </div>
    </>
  );
}
