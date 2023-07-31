import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { LocalStoreService } from "../../Services/LocalStoreService";
import { Button, Drawer } from "antd";
import "./User.css";
import {
  HistoryOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
export default function UserNav() {
  const [open, setOpen] = useState(false);

  let user = useSelector((state) => state.userSlice.userInfo);


  let btnClass =
    "transition font-bold text-center hover:bg-orange-400 duration-300 px-4 py-2 rounded-xl mx-2 bg-white";
  let renderUser = () => {
    if (user) {
      return (
        <div className="flex space-x-3 cursor-pointer">
          <img
            className="rounded-full h-9 w-9 text-xl"
            src="https://thuthuatnhanh.com/wp-content/uploads/2022/06/Hinh-sieu-nhan-mau-cam.jpg"
            alt=""
          />
          <span className="text-xl text-white">{user.hoTen}</span>
          <Button className="px-4" onClick={showDrawer}>
            <MenuFoldOutlined
              style={{
                fontSize: "25px",
                color: "rgb(234 88 12)",
                border:"none"
              }}
            />
          </Button>
        </div>
      );
    } else {
      return (
        <>
          <button className={btnClass}>
            <span>
              <i class="fa fa-user-alt text-black "></i>
              <NavLink to="/login">Login</NavLink>
            </span>
          </button>

          <button className={btnClass}>
            <span>
              <i class="fa fa-users mx-2"></i>
              <NavLink to="/register">SignUp</NavLink>
            </span>
          </button>
        </>
      );
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const renderTitle = () => {
    let dataLocal = LocalStoreService.getItem("USER_LOGIN");
    if (dataLocal !== null) {
      return (
        <div className="flex items-center text-white space-x-3">
          <img
            className="w-12 h-12 rounded-full"
            src="https://thuthuatnhanh.com/wp-content/uploads/2022/06/Hinh-sieu-nhan-mau-cam.jpg"
            alt="img"
          />
          <div className="cursor-pointer">
            <button>
              <NavLink to="/userInfo">
                <p>{user.hoTen} </p>
                <p className="font-normal">View Profile</p>
              </NavLink>
            </button>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="flex space-x-3  ">
      {renderUser()}
      <Drawer
        style={{ background: "rgb(24 25 26)" }}
        title={
          <div className="flex items-center text-white space-x-3">
          <img
            className="w-12 h-12 rounded-full"
            src="https://thuthuatnhanh.com/wp-content/uploads/2022/06/Hinh-sieu-nhan-mau-cam.jpg"
            alt="img"
          />
          <div className="cursor-pointer">
            <button>
              <NavLink to="/userInfo">
                <p>{ user !== null ? user.hoTen : ""} </p>
                <p className="font-normal">View Profile</p>
              </NavLink>
            </button>
          </div>
        </div>
        }
        placement="left"
        onClose={onClose}
        open={open}
      >
        <div className="text-white">
          <button className=" mb-5 text-xl hover:bg-orange-400  rounded  py-2 w-full text-left">
            <NavLink to="/history">
              <div className="flex items-center space-x-3">
                <HistoryOutlined />
                <p>History booking</p>
              </div>
            </NavLink>
          </button>
          <button
            onClick={() => {
              LocalStoreService.removeItem("USER_LOGIN");
              window.location.reload();
            }}
            className="flex space-x-3 items-center text-xl hover:bg-orange-400  rounded  py-2 w-full text-left"
          >
            <LogoutOutlined />
            <p>LogOut</p>
          </button>
        </div>
      </Drawer>
    </div>
  );
}
