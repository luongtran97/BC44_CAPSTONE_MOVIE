import {
  CheckOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { sortBy } from "lodash";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { datGhe } from "../../redux/bookingSlice";
import { https } from "../../Services/config";
import "./Booking.css";
import { useSpring, animated } from "react-spring";
export default function BookingMovie() {
  const navigate = useNavigate();
  const [ghe, setGhe] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.bookingSlice);
  let user = useSelector((state) => state.userSlice.userInfo);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const props = useSpring({
    opacity: modalIsOpen ? 1 : 0,
    transform: modalIsOpen ? "translateY(0%)" : "translateY(-100%)",
  });
  const props2 = useSpring({
    opacity: modalIsOpen2 ? 1 : 0,
    transform: modalIsOpen2 ? "translateY(0%)" : "translateY(-100%)",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await https.get(
          `api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
        );
        setGhe(res.data.content);
      } catch (err) {
        console.log("🚀 ~ err:", err);
      }
    };
    fetchData();
  }, [id]);
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
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const openModal2 = () => {
    setModalIsOpen2(true);
  };
  const closeModal2 = () => {
    setModalIsOpen2(false);
  };
  const handelOnClick = () => {
    // kiem tra dang  nhap
    if (user == null) {
      openModal();
      return;
    }
    // kiem tra da dat ghe
    if (tickets.danhSachGheDat.length === 0) {
      openModal();
      return;
    }
    let data = {
      maLichChieu: id,
      danhSachVe: tickets.danhSachGheDat,
    };
    https
      .post("api/QuanLyDatVe/DatVe", data)
      .then((res) => {
        console.log("🚀 ~ res:", res);
        openModal2();
        setTimeout(() => {
          navigate("/history");
        }, 1000);
      })
      .then((err) => {
        console.log("🚀 ~ err:", err);
      });
  };
  const renderHoTen = () => {
    if (user !== null) {
      return <span>{user.hoTen} </span>;
    }
  };
  const renderDsGhe = () => {
    if (ghe.length !== 0) {
      return ghe.danhSachGhe.map((dsGhe, index) => {
        // Css ghe da dat
        const cssGheDaDat = dsGhe.daDat ? "buttonType_reserved" : "";
        const disabled = dsGhe.daDat ? true : false;

        // Css ghe vip
        const cssGheVip = dsGhe.loaiGhe === "Vip" ? "buttonType_vip" : "";

        // CSS ghe dang dat
        const indexMaGhe = tickets.danhSachGheDat.findIndex(
          (item) => item.maGhe === dsGhe.maGhe
        );
        const cssGheDangDat = indexMaGhe !== -1 ? "buttonType_select" : "";

        return (
          <button
            disabled={disabled}
            onClick={() => {
              dispatch(datGhe(dsGhe));
            }}
            key={index}
            className={`seat focus:bg-orange-600 ${cssGheDangDat} ${cssGheVip} ${cssGheDaDat} `}
          >
            {dsGhe.daDat ? (
              <div className="font-bold leading-3 text-lg">
                <CloseOutlined />{" "}
              </div>
            ) : (
              dsGhe.tenGhe
            )}
          </button>
        );
      });
    }
  };
  const renderTicket = () => {
    const { thongTinPhim } = ghe;
    if (ghe.length !== 0) {
      return (
        <div className="bookingTicket overflow-hidden xl:col-span-2">
          <div className="h-full  xl:w-full md:w-2/5 rounded-lg ">
            <div className="px-5 py-5 rounded-lg bg-orange-600">
              <div className="bookingTicket_right">
                <p className="text-2xl text-white italic font-bold">Ticket:</p>
              </div>
              <div className="bookingTicket_right_top bg-white  xl:h-4/6 md:h-4/6 h-full relative rounded-xl px-8 pt-2 space-y-2">
                <div className="text-3xl text-orange-600 text-center italic font-bold">
                  <p>{thongTinPhim.tenPhim}</p>
                </div>
                <div className="showTime">
                  <p className="text-xl text-orange-600">ShowTime</p>
                  <p className="text-lg"> {thongTinPhim.ngayChieu} </p>
                </div>
                <div className="cinema">
                  <p className="text-xl text-orange-600">Cinema</p>
                  <p className="text-lg"> {thongTinPhim.tenCumRap} </p>
                </div>
                <div className="address">
                  <p className="text-xl text-orange-600">Location</p>
                  <p className="text-lg">{thongTinPhim.diaChi} </p>
                </div>
                <div className="seatt h-1/2  overflow-y-auto">
                  <p className="text-xl text-orange-600">Seat</p>
                  <p className="text-lg ">
                    {sortBy(tickets.danhSachGheDat, ["tenGhe"]).map((item) => {
                      return (
                        <span className="" key={item.maGhe}>
                          {item.tenGhe}{" "}
                        </span>
                      );
                    })}{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <hr className="border-2 w-3/4 border-dotted " />
              </div>
              <div className="bookingTicket_right_bootom_payment bg-white  xl:h-4/6 md:h-4/6 h-full relative rounded-xl px-8 pt-2 space-y-2">
                <div className="userName">
                  <span className="text-xl text-orange-600">User Name:</span>
                  <span>{renderHoTen()} </span>
                </div>
                <div className="toTal">
                  <p className="text-xl text-orange-600">Total:</p>
                  <p className="font-bold">
                    {" "}
                    {tickets.danhSachGheDat
                      .reduce((tongTien, item) => {
                        return (tongTien += item.giaVe);
                      }, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="button pb-2">
                  <button
                    onClick={handelOnClick}
                    className="text-xl hover:bg-orange-400 duration-300 font-bold bg-orange-600 text-white w-full italic rounded-lg py-2 "
                  >
                    PURCHASE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  const renderAlert = () => {
    if (user === null) {
      return (
        <p className="font-bold text-2xl pt-2 text-white">
          PLEASE LOGIN BEFORE BOOKING TICKET
        </p>
      );
    } else if (tickets.danhSachGheDat.length === 0) {
      return (
        <p className="font-bold text-2xl pt-2 text-white">
          PLEASE SELECT SEAT BEFORE BOOKING TICKET
        </p>
      );
    }
  };

  return (
    <div
      className="py-10"
      style={{
        background:
          "linear-gradient(to right, rgb(252, 92, 125), rgb(106, 130, 251))",
      }}
    >
      <ReactModal
        onRequestClose={closeModal}
        isOpen={modalIsOpen}
        style={customStyles}
      >
        <animated.div style={props2}>
          <div className="text-center">
            <div className="text-orange-600 rounded-full text-5xl">
              <CloseCircleOutlined />
            </div>
            {renderAlert()}
          </div>
        </animated.div>
      </ReactModal>
      {/* modal success */}
      <ReactModal
        onRequestClose={closeModal2}
        isOpen={modalIsOpen2}
        style={customStyles}
      >
        <animated.div style={props2}>
          <div className="text-orange-600 text-center rounded-full text-5xl">
            <CheckOutlined />
          </div>
          <p className="font-bold text-2xl pt-2 text-white">
            Booking Successful
          </p>
        </animated.div>
      </ReactModal>
      ;
      <div className="container">
        <div className="grid grid-cols-7  gap-5">
          <div className="xl:col-span-5 relative rounded-lg">
            <div className="flex justify-center  items-center">
              <div className="screen w-2/3">
                <p className="text-center font-bold text-2xl ">Screen</p>
              </div>
            </div>
            <div className="grid grid-cols-10 gap-2 w-full pt-5">
              {renderDsGhe()}
            </div>
            <div className="pt-5 flex items-center justify-center">
              <hr className=" border-2 w-full " />
            </div>
            <div className="button_type flex pt-2 justify-around">
              <div>
                <button className="buttonType_normal">X</button>
                <br />
                <p className="text-white font-bold ">STANDARD</p>
              </div>
              <div>
                <button className="buttonType_vip">X</button>
                <br />
                <p className="text-white font-bold text-center">VIP</p>
              </div>
              <div>
                <button className="buttonType_reserved">X</button>
                <br />
                <p className="text-white font-bold text-center">RESERVED</p>
              </div>
              <div>
                <button className="buttonType_select">X</button>
                <br />
                <p className="text-white font-bold text-center">SELECT</p>
              </div>
            </div>
          </div>
          {renderTicket()}
        </div>
      </div>
    </div>
  );
}
