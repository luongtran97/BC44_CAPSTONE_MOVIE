import moment from "moment/moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { https } from "../../Services/config";

export default function SelectFlim() {
  const [flim, setFlim] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const [lichChieu, setLichChieu] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    https
      .get("api/QuanLyPhim/LayDanhSachPhim?maNhom=GP08")
      .then((res) => {
        setFlim(res.data.content);
      })
      .catch((err) => {});
  }, []);

  const renderListFlim = () => {
    return flim.map((item) => {
      return (
        <option key={item.maPhim} value={item.maPhim}>
          {item.tenPhim}
        </option>
      );
    });
  };
  const handelOnChange = (event) => {
    let maPhim = event.target.value;
    https
      .get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
      .then((res) => {
        setCumRap(res.data.content.heThongRapChieu);
      })
      .catch((err) => {});
  };

  let renderCumRap = () => {
    return cumRap.map((item) => {
      return item.cumRapChieu.map((cumRap, index) => {
        return <option key={index}>{cumRap.tenCumRap}</option>;
      });
    });
  };
  let renderTime = () => {
    return cumRap.map((item) => {
      return item.cumRapChieu.map((cumRap) => {
        return cumRap.lichChieuPhim.map((lichChieuPhim) => {
          return (
            <option
              key={lichChieuPhim.maLichChieu}
              value={lichChieuPhim.maLichChieu}
            >
              {moment(lichChieuPhim.ngayChieuGioChieu).format(
                "DD/MM/YYYY ~ hh:mm "
              )}{" "}
            </option>
          );
        });
      });
    });
  };
  const handelClick = (e) => {
    let maLichChieu = e.target.value;
    setLichChieu(maLichChieu);
  };
  const handelBooking = () => {
    navigate(`/booking/${lichChieu}`);
  };

  return (
    <div className="booking container flex items-center justify-center pt-20 pb-10">
      <div className="grid  grid-cols-4 xl:w-5/6 md:w-full md:p-2 border border-orange-600 shadow-xl rounded">
        <div className="w-full flex items-center p-2 ">
          <select
            onChange={handelOnChange}
            className="w-full text-center  text-xl rounded outline-none p-2 "
            style={{
              color: "rgb(156 163 175)",
              background: "rgb(229 231 235)",
            }}
          >
            <option value="0">Select Flim</option>
            {renderListFlim()}
          </select>
        </div>
        <div className="w-full flex items-center p-2 ">
          <select
            className="w-full  text-xl text-center rounded outline-none p-2 "
            style={{
              color: "rgb(156 163 175)",
              background: "rgb(229 231 235)",
            }}
          >
            <option value="0">Thearter Place</option>
            {renderCumRap()}
          </select>
        </div>
        <div className="w-full flex items-center p-2 ">
          <select
            onChange={handelClick}
            className="w-full text-xl text-center  rounded outline-none p-2 "
            style={{
              color: "rgb(156 163 175)",
              background: "rgb(229 231 235)",
            }}
          >
            <option value="0">Time</option>
            {renderTime()}
          </select>
        </div>
        <div className="flex items-center justify-center ">
          <button
            onClick={handelBooking}
            className="bg-orange-600 hover:px-4 hover:py-3 font-bold text-xl duration-150 px-3 py-2 text-white w-full rounded-xl"
          >
            Booking
          </button>
        </div>
      </div>
    </div>
  );
}
