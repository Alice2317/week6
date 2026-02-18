import axios from "axios";
import { useEffect, useState } from "react";

export default function AddProduct({ eventHide, getProducts,action,tempProduct }) {
  const [tempData, setTempData] = useState({
    "category": "",
    "content": "",
    "description": "",
    "id": "",
    "is_enabled": 0,
    "origin_price": 0,
    "price": 0,
    "title": "",
    "unit": "",
    "num": 1,
    "imageUrl": "",
    "imagesUrl": [],
    "max_num": 10,
  });
  const transInt = ['is_enabled', 'origin_price', 'price']; // 轉成數字型態
  const isCheckData = ['is_enabled']; // checkbox屬性

  useEffect(()=>{
    if(action === 'edit'){
      setTempData(tempProduct)
    }else{
      setTempData({
        category: "",
        content: "",
        description: "",
        id: "",
        is_enabled: 0,
        origin_price: 0,
        price: 0,
        title: "",
        unit: "",
        num: 1,
        imageUrl: "",
        imagesUrl: [],
        max_num: 10,
      });
    }
  }, [action, tempProduct])


  const handlerChange = (e)=>{
    let value = e.target.value;
    if (transInt.includes(e.target.name)){
      if (isCheckData.includes(e.target.name)){
        value = Number(e.target.checked)
      }else{
        value = Number(e.target.value)
      }
    }
    setTempData({ ...tempData, [e.target.name]: value })
  }
  const save =async()=>{
    try {
      const api_method = action === 'edit'?'put':'post';
      const api =
        action === "edit"
          ? `${import.meta.env.VITE_API_BASE}/api/${import.meta.env.VITE_API_PATH}/admin/product/${tempProduct.id}`
          : `${import.meta.env.VITE_API_BASE}/api/${import.meta.env.VITE_API_PATH}/admin/product`;

      await axios[api_method](api, { data: tempData });
      eventHide();
      getProducts();
    } catch (error) {
      alert("save", error);
    }
  };
  
  const uploadFile =async (e)=>{
    const files = e.target.files;
    if(files.length === 0)return;
    let formData = new FormData();
    formData.append('file-to-upload',files.item(0));
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/${import.meta.env.VITE_API_PATH}/admin/upload`,
        formData,
      );
    } catch (error) {
      alert('upload',error);
    }
  }
  
  return (
    <div className='modal fade' tabIndex='-1' id='addModal'>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              {action === "edit" ? "編輯" : "建立"}商品
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={eventHide}
            />
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-sm-4'>
                <img
                  src={tempProduct?.imageUrl}
                  className={tempProduct?.imageUrl?'card-img-top primary-image':'d-none'}
                  alt='主圖'
                />
                <div className={tempProduct?.imagesUrl?'d-flex flex-wrap':'d-none'}>
                  {tempProduct?.imagesUrl?.map((url, index) => (
                    <img key={index} src={url} className='images' alt='副圖' />
                  ))}
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    輸入圖片網址
                    <input
                      type='text'
                      name='imageUrl'
                      id='image'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={handlerChange}
                      value={tempData.imageUrl}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <form
                    action='/api/thisismycourse2/admin/upload'
                    encType='multipart/form-data'
                    method='post'
                  >
                    <label className='w-100' htmlFor='customFile'>
                      或 上傳圖片
                      <input
                        type='file'
                        id='customFile'
                        name='file-to-upload'
                        className='form-control'
                        onChange={(e) => uploadFile(e)}
                      />
                    </label>
                  </form>
                </div>
                <img src='' alt='' className='img-fluid' />
              </div>
              <div className='col-sm-8'>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='title'>
                    標題
                    <input
                      type='text'
                      id='title'
                      name='title'
                      placeholder='請輸入標題'
                      className='form-control'
                      onChange={handlerChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='category'>
                      分類
                      <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='請輸入分類'
                        className='form-control'
                        onChange={handlerChange}
                        value={tempData.category}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='unit'>
                      單位
                      <input
                        type='unit'
                        id='unit'
                        name='unit'
                        placeholder='請輸入單位'
                        className='form-control'
                        onChange={handlerChange}
                        value={tempData.unit}
                      />
                    </label>
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='origin_price'>
                      原價
                      <input
                        type='number'
                        id='origin_price'
                        name='origin_price'
                        placeholder='請輸入原價'
                        className='form-control'
                        onChange={handlerChange}
                        value={tempData.origin_price}
                        min='0'
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='price'>
                      售價
                      <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='請輸入售價'
                        className='form-control'
                        onChange={handlerChange}
                        value={tempData.price}
                        min='0'
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='description'>
                    產品描述
                    <textarea
                      type='text'
                      id='description'
                      name='description'
                      placeholder='請輸入產品描述'
                      className='form-control'
                      onChange={handlerChange}
                      value={tempData.description}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='content'>
                    說明內容
                    <textarea
                      type='text'
                      id='content'
                      name='content'
                      placeholder='請輸入產品說明內容'
                      className='form-control'
                      onChange={handlerChange}
                      value={tempData.content}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <div className='form-check'>
                    <label
                      className='w-100 form-check-label text-start'
                      htmlFor='is_enabled'
                    >
                      是否啟用
                      <input
                        type='checkbox'
                        id='is_enabled'
                        name='is_enabled'
                        placeholder='請輸入產品說明內容'
                        className='form-check-input'
                        onChange={handlerChange}
                        checked={tempData.is_enabled}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={eventHide}
            >
              關閉
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={() => save()}
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}