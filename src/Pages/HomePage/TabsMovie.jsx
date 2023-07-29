import {  Tabs } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { https } from "../../Services/config";

export default function TabsMovie() {
  const [heThongRap, setHeThongRap] = useState([]);

  useEffect(() => {
    https
      .get("api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP08")
      .then((res) => {
        setHeThongRap(res.data.content);
      })
      .catch((err) => {});
  }, []);


  let renderDsPhim = (dsp) => {
    return dsp.map((phim) => {
      return (
        <div className="p-5 flex space-x-5">
          <img
            src={phim.hinhAnh}
            alt="hinhAnh"
            className="h-60 w-40 object-cover rounded"
          />
          <div className="grid grid-cols-4 w-full gap-5">
            {phim.lstLichChieuTheoPhim.slice(0, 8).map((lichChieu) => {
              return (   
                  <button
                    className="bg-orange-600 hover:bg-orange-400 transition duration-500 text-white rounded h-10 leading-10 text-center"
                  >
                    <NavLink to={`/booking/${lichChieu.maLichChieu}`}>
                    {moment(lichChieu.ngayChieuGioChieu).format(
                      "DD/MM/YYY ~ hh:mm"
                    )}
                    </NavLink>
                  </button>  
              );
            })}
          </div>
        </div>
      );
    });
  };

  let renderHeThongRap = () => {
    return heThongRap.map((heThong, index) => {
      return {
        key: index,
        label: <img src={heThong.logo} width={100} alt="logo" />,
        children: (
          <Tabs
            tabPosition="left"
            defaultActiveKey="1"
            items={heThong.lstCumRap.map((cumRap) => {
              return {
                key: cumRap.maCumRap,
                label: (
                  <div className="text-left whitespace-normal">
                    <p className="text-orange-600 text-xl font-bold">
                      {cumRap.tenCumRap}
                    </p>
                    <p className="truncate text-md flex-nowrap">
                      {cumRap.diaChi}
                    </p>
                  </div>
                ),
                children: renderDsPhim(cumRap.danhSachPhim),
              };
            })}
          />
        ),
      };
    });
  };

  return (
    <div className="py-5 pt-20" style={{ background: "#020d18" }}>
      <div className="container tabs rounded p-10  bg-white">
        <p className="pb-10 text-orange-600 font-bold text-5xl italic">
          NOW SHOWING
        </p>
        <Tabs defaultActiveKey="1" items={renderHeThongRap()}></Tabs>
      </div>
    </div>
  );
}
