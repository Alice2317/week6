import axios from "axios";
import { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import { cartContext } from "../../store/store";

export default function ProductDetail() {
  const { state,dispatch } = useContext(cartContext);
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams(); 


  const getProduct = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/product/${id}`);
      // console.log(res);
      if (res.data.success) {
        setProduct(res.data.product);
      }
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    getProduct(id);
  }, [id])

  const addCart = async () => {
    let isMax = false;
    const index = state.carts.findIndex(
      (item) => item.product_id === product.id,
    );
    if(index !== -1){
      if (state.carts[index].qty>=product.num){
        isMax = true;
      };
    }
    if (isMax)return alert("已無庫存可購買");
    console.log('go');
    
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/cart`, {
        "data": {
          "product_id": product.id,
          "qty": count
        }
      });
      dispatch({ type: "addCart", payload: res.data.data });
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }
  
  return (
    !isError && (
      <div className='container'>
        <div
          style={{
            minHeight: "400px",
            backgroundImage: `url(${product.imageUrl})`,
            backgroundPosition: "center center",
          }}
        ></div>
        <div className='row justify-content-between mt-4 mb-7'>
          <div className='col-md-7'>
            <h2 className='mb-0'>{product.title}</h2>
            <p className='fw-bold'>NT$ {product.price}</p>
            <p>{product.content}</p>
          </div>
          <div className='col-md-4'>
            <div className='input-group align-items-center w-100 mb-2'>
              <span className='pe-3'>數量:</span>
              <select
                className='form-select'
                defaultValue='1'
                onChange={(e) => {
                  setCount(Number(e.target.value));
                }}
              >
                {Array.from({ length: product.num }, (_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              className='btn btn-dark w-100 rounded-0 py-3'
              onClick={addCart}
              disabled={isLoading}
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    )
  );
}