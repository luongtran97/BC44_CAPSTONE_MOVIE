import React from "react";
import { Button, Form, Input, message } from "antd";
import { https } from "../../Services/config";
import { NavLink, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Animation from "./bg-animated.json"
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/userSlice";
import { LocalStoreService } from "../../Services/LocalStoreService";
import "./Login.css"
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onFinish = (value) => {
    https
      .post("api/QuanLyNguoiDung/DangNhap", value)
      .then((res) => {
        message.success("Đăng nhập thành công!");
        navigate("/");
        dispatch(setLogin(res.data.content))
        LocalStoreService.setItem(res.data.content,"USER_LOGIN")

      })
      .catch((err) => {
        console.log("🚀 ~ err:", err)
        message.error(err.response.data.content);
      });
  };
let dataLocal = LocalStoreService.getItem("USER_LOGIN")
  console.log("🚀 ~ dataLocal:", dataLocal)
  return (
    <div className="flex items-center justify-center bg-orange-500 h-screen">
      <div className="container flex bg-white rounded p-5">
        <div className="w-1/2 h-full">
          <Lottie animationData={Animation} style={{width:"300px"}} loop={true}></Lottie>
        </div>
        <div className="w-1/2 h-full pt-10">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="UserName"
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: "Please input your UserName!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="PassWord"
              name="matKhau"
              rules={[
                {
                  required: true,
                  message: "Please input your PassWord!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
            className="text-right"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button className="bg-orange-600 mx-4 pt-0" type="primary" htmlType="submit">
                <p className="text-white text-xl">Login</p>
              </Button>
              <Button className="bg-orange-600 text-xl pt-0" type="primary">
                <NavLink to="/register">SignUp</NavLink>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
