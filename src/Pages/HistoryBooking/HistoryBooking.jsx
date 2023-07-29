import Item from "antd/es/list/Item";
import moment from "moment/moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { https } from "../../Services/config";
import "./History.css";
export default function HistoryBooking() {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    https
      .post("api/QuanLyNguoiDung/ThongTinTaiKhoan")
      .then((res) => {
        setUserInfo(res.data.content);
        console.log("🚀 ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ err:", err);
      });
  }, []);


  const renderHistory = () => {
    if (userInfo.length !== 0) {
      return userInfo.thongTinDatVe.map((item) => {
        return <tr>
        <td>{item.maVe}</td>
        <td>{item.tenPhim}</td>
        <td>{moment(item.ngayDat).format("DD/MM/YYYY : hh:mm")}</td>
        <td>{item.danhSachGhe.map((dsGhe,index) => { 
            return <span key={index}> {dsGhe.tenGhe} </span>
         })} </td>
        <td>{item.danhSachGhe[0].tenHeThongRap}</td>
    </tr>
          
      });
    }
  };

  return (
    <div
      style={{
        background:
          "url(http://buster.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/2017/10/footer-bg.jpg)",
      }}
    >
      <div className="history container">
        <p className="text-2xl text-white font-bold text-center py-5">
          History Booking
        </p>
        {/* <ul>
          <li className="header flex text-center justify-between rounded">
            <div className="">ID TICKET</div>
            <div className="">FLIM</div>
            <div className="">DATE</div>
            <div className="">SEAT</div>
            <div className="">CINEMA</div>
          </li>
          {renderHistory()}
         




        </ul> */}

        <table className="table content-table text-xl text-center overflow-hidden bg-white w-full">
          <thead className="text-center"> 
            <tr>
              <th>ID TICKET</th>
              <th>FLIM</th>
              <th>DATE</th>
              <th>SEAT</th>
              <th>LOCATION</th>
            </tr>
          </thead>
          <tbody>
            {renderHistory()}
            {/* <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
