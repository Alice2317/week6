import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Modal } from "bootstrap";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import Pagination from "../../compontents/Pagination";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [action, setAction] = useState('add');
  const [tempProduct, setTempProduct] = useState({});
  const addModal = useRef(null);
  const deleteModal = useRef(null);

  const getProducts = async (page=1) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/api/${import.meta.env.VITE_API_PATH}/admin/products?page=${String(page)}`,
      );
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  }

  useEffect(() => {
    addModal.current = new Modal('#addModal', { backdrop: 'static' });
    deleteModal.current = new Modal('#deleteModal', { backdrop: 'static' });
    getProducts();
  }, [])

  const openModal = (type, product) => {
    setAction(type)
    setTempProduct(product)
    if(type === 'delete'){
      deleteModal.current.show()
    }else{
      addModal.current.show()
    }
  }

  const hideModal = (type) => {
    if (type === 'delete') {
      deleteModal.current.hide()
    } else {
      addModal.current.hide()
    }
  }
  


  return (
    <div className='p-3'>
      <h3>產品列表</h3>
      <hr />
      <div className='text-end'>
        <button
          type='button'
          className='btn btn-primary btn-sm'
          onClick={() => openModal("add")}
        >
          建立新商品
        </button>
      </div>
      <AddProduct
        eventHide={() => hideModal("add")}
        getProducts={getProducts}
        action={action}
        tempProduct={tempProduct}
      />
      <DeleteProduct
        eventHide={() => hideModal("delete")}
        tempProduct={tempProduct}
        getProducts={getProducts}
      />
      <table className='table'>
        <thead>
          <tr>
            <th>產品名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th>是否啟用</th>
            <th>查看細節</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.origin_price}</td>
                <td>{item.price}</td>
                <td className={!item.is_enabled ? "text-danger" : ""}>
                  {item.is_enabled ? "啟用" : "未啟用"}
                </td>
                <td>
                  <button
                    type='button'
                    className='btn btn-primary mx-1'
                    onClick={() => openModal("edit", item)}
                  >
                    編輯
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-danger'
                    onClick={() => openModal("delete", item)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5'>尚無產品資料</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <Pagination pagination={pagination} getProducts={getProducts} />
      </div>
    </div>
  );
}