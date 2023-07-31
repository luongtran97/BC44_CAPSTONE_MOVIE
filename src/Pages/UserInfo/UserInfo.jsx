import React, { useEffect, useState } from "react";
import { https } from "../../Services/config";
import "./User.css";
import { Button, Form, Input, message } from "antd";
import { regex } from "../../Constant/regex";
import ReactModal from "react-modal";
import { useSpring, animated } from "react-spring";
import { CheckOutlined } from "@ant-design/icons";
export default function UserInfo() {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    https
      .post("api/QuanLyNguoiDung/ThongTinTaiKhoan")
      .then((res) => {
        setUserInfo(res.data.content);
      })
      .catch((err) => {});
  }, [] );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const onFinish = (value) => {
    let data = {
      ...value,
      maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
      maNhom: userInfo.maNhom,
    };
    https
      .put("api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data)
      .then((res) => {
        message.success("Your Infor Has Been Updated Successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch((err) => {
        console.log("🚀 ~ err:", err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const renderForm = () => {
    if (userInfo.length !== 0) {
      return (
        <Form
          className="text-white"
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
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="taiKhoan"
            initialValue={userInfo.taiKhoan}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input disabled size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="matKhau"
            initialValue={userInfo.matKhau}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                pattern: regex.password,
                message:
                  "Password must contain  8-15 character which at least one lowercase letter, one uppercase letter, one numeric digit, and one special character ",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            initialValue={userInfo.email}
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
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={userInfo.soDT}
            label="Phone Number"
            name="soDT"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
              {
                pattern: regex.phone,
                message: "Please input a valid phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={userInfo.hoTen}
            label="Full Name"
            name="hoTen"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
              {
                whitespace: true,
                message: "No spaces allowed",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button onClick={()=>{
              openModal()
            }} size="large" htmlType="submit">
              <span classname="text-white text-xl font-bold ">Update</span>
            </Button>
          </Form.Item>
        </Form>
      );
    }
  };
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%,-50%) ",
      width: "auto",
      height: "auto",
      borderRadius: "30px",
      background: "#020d18",
    },
  };
  const props2 = useSpring({
    opacity: modalIsOpen ? 1 : 0,
    transform: modalIsOpen ? "translateY(0%)" : "translateY(-100%)",
  });

  return (
    <div className="h-screen user">
       <ReactModal
        onRequestClose={closeModal}
        isOpen={modalIsOpen}
        style={customStyles}
      >
        <animated.div style={props2}>
          <div className="text-center">
            <div className="text-orange-600 rounded-full text-5xl">
              <CheckOutlined />
            </div>
            <p className="font-bold text-2xl pt-2 text-white">
              UPDATE SUCCESSFUL!
        </p>
          </div>
        </animated.div>
      </ReactModal>
      <div className=" xl:scale-90 md:scale-125 flex h-full w-full  justify-center">
        <div className="w-full md:w-1/2">
          <div className="text-center py-2">
            <p className="text-5xl italic text-white font-bold">Profile</p>
            <p className="text-xl text-red-700 italic">(Editable Infor) </p>
          </div>
          {renderForm()}
        </div>
      </div>
    </div>
  );
}
