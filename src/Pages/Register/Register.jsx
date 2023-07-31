import { Button, Form, Input, message } from "antd";
import { Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { regex } from "../../Constant/regex";
import { https } from "../../Services/config";


export default function Register() {
  const navigate = useNavigate()
  const onFinish = (value) => {
   let cloneValue={...value,maNhom:"03"}
    https.post("api/QuanLyNguoiDung/DangKy",cloneValue).then((res) => { 
      console.log("🚀 ~ res:", res)
      message.success("Tạo tài khoản thành công!")
      navigate("/login")
     }).catch((err) => { 
      console.log("🚀 ~ err:", err)
      message.error(err.response.data.content)
      })
  };
  return (
    <div className="flex h-screen items-center justify-center bg-orange-500">
      <div className="flex items-center justify-center xl:w-1/2 md:w-1/2 w-4/5 xl:px-8 py-8 md:py-12  bg-white rounded p-5">
        <div className=" xl:w-2/3 md:w-full md:space-y-2">
          <Form className="p-5" onFinish={onFinish}>
            <Typography.Title level={1} className="text-left ">
              Register
            </Typography.Title>
            <Form.Item
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: "Please input your UserName!",
                },
                {
                  pattern:regex.user,
                  message:"Username do not contain whitespace and special character"
                }
              ]}
            >
              <Input placeholder="Username" size="large"/>
            </Form.Item>
            <Form.Item
              name="matKhau"
              rules={[
                {
                  pattern: regex.password,
                  message:
                    "Password must contain  8-15 character which at least one lowercase letter, one uppercase letter, one numeric digit, and one special character ",
                },
                {
                  required: true,
                  message: "Please input your PassWord! ",
                },
              ]}
            >
              <Input.Password placeholder="Password" size="large"/>
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail",
                },
              ]}
            >
              <Input placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item
              name="soDT"
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number!",
                },
                {
                  pattern: regex.phone,
                  message: "Please input a valid Phone Number",
                },
              ]}
            >
              <Input placeholder="Phone Number" size="large"/>
            </Form.Item>
            <Form.Item
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: "Please input Your Name!",
                },
                {
                  whitespace: true,
                  message: "No spaces allowed",
                },
              ]}
            >
              <Input placeholder="Full Name"  size="large"/>
            </Form.Item>
            <Form.Item>
              <Button
                className="bg-orange-500 rounded xl:w-full md:w-full w-full xl:text-lg md:text-lg "
                size="large"
                htmlType="submit"
                type="primary"
              >
                <p className="text-3xl leading-none text-white">SignUp</p>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
