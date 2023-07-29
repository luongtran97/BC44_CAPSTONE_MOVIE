import { Card } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { https } from "../../Services/config";
const { Meta } = Card;
export default function ListMovie() {
  const [list, setList] = useState([]);

  useEffect(() => {
    https
      .get("api/QuanLyPhim/LayDanhSachPhim?maNhom=GP08")
      .then((res) => {
        setList(res.data.content);
      })
      .catch((err) => {});
  }, []);

  const renderListFlim = () => {
    return list.map((item) => {
      return (
        <Card
          key={item.maPhim}
          className="shadow mt-5"
          hoverable
          style={{ width: "240px" }}
          cover={
            <img
              className="h-60 object-cover"
              alt={item.biDanh}
              src={item.hinhAnh}
            />
          }
        >
          <Meta title={item.tenPhim} />
          <NavLink
            className="w-full bg-orange-600 inline-block font-bold  text-white rounded-lg text-center mt-2 hover:scale-75 transition duration-550"
            to={`/detail/${item.maPhim}`}
          >
            Detail
          </NavLink>
        </Card>
      );
    });
  };

  return (
    <div
      className=""
      style={{
        background:
          "url(http://buster.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/2017/10/footer-bg.jpg)",
      }}
    >
      <div className="container">
        <p className=" italic text-orange-600 text-5xl font-bold py-5 ">List Flim</p>
        <div className=" grid grid-cols-4">
        
          {renderListFlim()}</div>
            </div>
      </div>
  );
}
