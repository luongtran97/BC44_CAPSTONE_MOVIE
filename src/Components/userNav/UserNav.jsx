import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { LocalStoreService } from "../../Services/LocalStoreService";

export default function UserNav() {
  let user = useSelector((state) => state.userSlice.userInfo);
  let btnClass =
    "transition font-bold text-center hover:bg-orange-400 duration-300 px-4 py-2 rounded-xl mx-2 bg-white";
  let renderUser = () => {
    if (user) {
      return (
        <div className="flex space-x-3 cursor-pointer">
        <img className="rounded-full h-9 w-9 text-xl" src="https://thuthuatnhanh.com/wp-content/uploads/2022/06/Hinh-sieu-nhan-mau-cam.jpg" alt="" />
          <span className="text-xl text-white">{user.hoTen} </span>
          <button onClick={()=>{
            LocalStoreService.removeItem("USER_LOGIN")
            window.location.reload()
          }} className={btnClass}>LogOut</button>
        </div>
      );
    } else {
      return (
        <>
          <button className={btnClass} >
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

  return (
    <div className="flex ">
      {renderUser()}
      {/* <button className={btnClass}>
        <span>
          <i class="fa fa-user-alt text-white mx-2"></i>
          <NavLink to="/login">Login</NavLink>
        </span>
      </button>

      <button className={btnClass}>
        <span>
          <i class="fa fa-users mx-2"></i>
          <NavLink to="/register">SignUp</NavLink>
        </span>
      </button> */}
    </div>
  );
}
