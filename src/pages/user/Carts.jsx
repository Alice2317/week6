import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../store/store";
import Loading from "../../compontents/Loading";

export default function Carts() {
  const { state, dispatch } = useContext(cartContext);

  const removeCartItem = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/cart/${id}`,
      );
      if (res.data.success) {
        dispatch({ type: "removeCart", payload: { id } });
      }
    } catch (error) {
      alert("刪除產品失敗");
    }
  };

  const updateCartItem = async (id, num) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/cart/${id}`,
        {
          data: {
            product_id: id,
            qty: num,
          },
        },
      );
      if (res.data.success) {
        dispatch({ type: "addCart", payload: res.data.data });
      }
    } catch (error) {
      alert("更新產品失敗");
    }
  };

  const clearCart = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/carts`,
      );
      if (res.data.success) {
        dispatch({ type: "clearCart" });
      }
    } catch (error) {
      alert("清空購物車失敗");
    }
  };

  return !state.isLoading ? (
    state.carts.length === 0 ? (
      <div className='d-flex justify-content-center'>
        <div className='mx-auto'>
          <div className='d-flex justify-content-between'>
            <h2 className='mt-2'>購物車</h2>
          </div>
          請選擇商品
        </div>
      </div>
    ) : (
      <div className='d-flex justify-content-center'>
        <div className='mx-auto'>
          <div className='d-flex justify-content-between'>
            <h2 className='mt-2'>購物車</h2>
          </div>
          {state?.carts?.map((item) => (
            <div
              className='d-flex mt-4 bg-light'
              key={item.id}
              style={{ width: "80vw", maxWidth: "500px" }}
            >
              <img
                src={item.product.imageUrl}
                alt='主圖'
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <div className='p-3 position-relative' style={{ width: "100%" }}>
                <p className='mb-0 fw-bold'>{item.product.title}</p>
                <button
                  type='button'
                  className='position-absolute btn-close'
                  style={{ top: "16px", right: "16px" }}
                  onClick={() => removeCartItem(item.id)}
                ></button>
                <br />
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='input-group w-50'>
                    <select
                      className='form-select'
                      defaultValue={item.qty}
                      onChange={(e) => {
                        updateCartItem(item.id, Number(e.target.value));
                      }}
                    >
                      {Array.from({ length: item.product.num }, (_, i) => (
                        <option value={i + 1} key={i}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className='mb-0 ms-auto'>NT${item.product.price}</p>
                </div>
              </div>
            </div>
          ))}
          <div className='d-flex justify-content-between mt-4'>
            <p className='mb-0 h4 fw-bold'>總金額</p>
            <p className='mb-0 h4 fw-bold'>
              NT$
              {state?.carts.reduce(function (a, b) {
                a += b.qty * b.product.price;
                return a;
              }, 0)}
            </p>
          </div>
          <Link
            to='/checkout'
            className='btn btn-dark btn-block mt-4 rounded-0 py-3'
          >
            確認購物車
          </Link>
          <button
            type='button'
            className='btn btn-danger btn-block mt-4 rounded-0 py-3'
            onClick={() => clearCart()}
          >
            清空購物車
          </button>
        </div>
      </div>
    )
  ) : (
    <Loading title='正在載入資料中' />
  );
}
