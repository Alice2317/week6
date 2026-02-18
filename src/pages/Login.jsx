import axios from "axios";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { InputDom } from "../compontents/FormEelements";

export default function Login() {
  const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      watch,
      getValues,
      control,
      formState: { errors },
    } = useForm({
      mode: "onTouched",
    });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/v2/admin/signin`, {
        username: data.email,
        password: data.password,
      });
      const { token, expired } = res.data;
      axios.defaults.headers.common["Authorization"] = token;
      document.cookie = `token=${token};expired:${new Date(expired)}`;
      navigate("/admin");
    } catch (error) {
      alert('登入失敗')
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='container py-5'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <h2>登入帳號</h2>
            <div className='mb-2'>
              <InputDom
                register={register}
                errors={errors}
                id='email'
                labelText='Email'
                type='email'
                rules={{
                  required: {
                    value: true,
                    message: "Email 為必填",
                  },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email 格式不正確",
                  },
                }}
              />
            </div>
            <div className='mb-2'>
              <InputDom
                register={register}
                errors={errors}
                id='password'
                labelText='password'
                type='password'
                rules={{
                  required: {
                    value: true,
                    message: "password 為必填",
                  },
                  pattern: {
                    value: /[A-Za-z\d]{5,}/i,
                    message: "password 格式不正確",
                  },
                }}
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              登入
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}