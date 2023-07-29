import { Progress, Tabs } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactModal from "react-modal";
import Lottie from "lottie-react";
import { NavLink, useParams } from "react-router-dom";
import { https } from "../../Services/config";
import "./Detail.css";
import animation from "./detail-animated.json";
import ReactPlayer from "react-player";
import { useRef } from "react";
export default function DetailMovie() {
  const [flim, setFlim] = useState([]);
  const { id } = useParams();
  const [isopen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const myRef = useRef(null);
  useEffect(() => {
    https
      .get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
      .then((res) => {
        setFlim(res.data.content);
      })
      .catch((err) => {});
  }, [id]);

  let renderFlimEmpty = () => {
    if (flim.heThongRapChieu !== undefined) {
      if (flim.heThongRapChieu.length === 0) {
        return (
          <div className="flex text-orange-600 pt-10 items-center justify-center">
            <Lottie style={{ width: "30%" }} animationData={animation}></Lottie>
            <p>This Flim Will Comming Soon!</p>
          </div>
        );
      }
    }
  };

  let renderHeThongRapChieu = () => {
    if (flim.length !== 0) {
      return flim.heThongRapChieu.map((heThong, index) => {
        return {
          key: index,
          label: <img src={heThong.logo} width={100} alt="" />,
          children: (
            <Tabs
              tabPosition="left"
              defaultActiveKey="1"
              items={heThong.cumRapChieu.map((cumRap) => {
                return {
                  key: cumRap.maCumRap,
                  label: (
                    <div className="flex space-x-10">
                      <div className="logo">
                        <img src={heThong.logo} width={100} alt="logo" />
                      </div>
                      <div className="address">
                        <p className="text-xl">{cumRap.tenCumRap} </p>
                        <p className="text-xl">{cumRap.diaChi} </p>
                      </div>
                    </div>
                  ),
                  children: (
                    <Tabs
                      tabPosition="bottom"
                      defaultActiveKey="1"
                      items={cumRap.lichChieuPhim.map((lichChieu) => {
                        return {
                          key: lichChieu.maLichChieu,
                          label: (
                            <>
                              <button
                                onClick={() => setShowModal(true)}
                                className="bg-white hover:bg-orange-400 hover:text-white border border-orange-600 transition text-orange-600 px-2 duration-500 rounded h-10 leading-10 text-center"
                              >
                                {moment(lichChieu.ngayChieuGioChieu).format(
                                  "DD/MM/YYYY ~ hh:mm"
                                )}
                              </button>
                              <ReactModal
                                style={customStyleBooking}
                                isOpen={showModal}
                                onRequestClose={() => setShowModal(false)}
                              >
                                <div className="p-5 flex space-x-5">
                                  <div className="img w-1/3">
                                    <img src={flim.hinhAnh} alt="img" />
                                  </div>
                                  <div className="content text-white">
                                    <h2 className=" font-bold text-2xl">
                                      {flim.tenPhim}{" "}
                                    </h2>
                                    <div className="text-xl pt-4">
                                      <p className="text-xl">
                                        Director : Luong Tran
                                      </p>
                                      <p>Running Time : 120 minutes</p>
                                    </div>
                                  </div>
                                </div>
                                <hr className="border border-white" />
                                <div className="detail pt-2">
                                  <div className="grid grid-cols-2">
                                    <div className="runningTime text-white text-2xl">
                                      <p className="text-orange-600 font-bold">Running Time</p>
                                      <p>{moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YYYY ~ hh:mm" )}</p>
                                    </div>
                                    <div className="place text-white text-2xl">
                                      <p className="text-orange-600 font-bold">Cinema</p>
                                      <p className="font-bold">{cumRap.tenCumRap}</p>
                                      <p>{cumRap.diaChi}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="button text-white flex items-center justify-center pt-20">
                                  <button className="bg-orange-600 text-2xl font-bold w-2/3 rounded-xl py-2 hover:py-3 transition duration-150 outline:none">
                                    <NavLink
                                      to={`/booking/${lichChieu.maLichChieu}`}
                                    >
                                      {" "}
                                      Booking
                                    </NavLink>
                                  </button>
                                </div>
                              </ReactModal>
                            </>
                          ),
                        };
                      })}
                    />
                  ),
                };
              })}
            />
          ),
        };
      });
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%,-50%)",
      background: "#000",
      width: "60%",
      height: "60%",
    },
  };
  const customStyleBooking = {
    content: {
      margin: "20px 0",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%,-50%)",
      background: "#000",
      width: "40%",
      height: "80%",
    },
  };

  const scrollToBooking = () => {
    const booking = myRef.current;
    booking.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div
        style={{
          background:
            "url(http://buster.mbkip3ms9u-e92498n216kr.p.temp-site.link/wp-content/uploads/2017/10/footer-bg.jpg)",
        }}
      >
        <div className="container py-10 ">
          <div className="flex space-x-20">
            <div className="h-full relative w-full">
              <img className=" rounded" src={flim.hinhAnh} alt={flim.biDanh} />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="hover:w-20 hover:h-20 w-16 h-16 duration-500">
                  <button onClick={openModal}>
                    {" "}
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAABvFBMVEUAAABPT08AAAAAAABFRUX////+/v5RUVFLS0s/Pz9NTU3///8KCgpKSkr5+fn+/v7////////////////////////8/Pz///////9paWlXV1eWlpYQEBD7+/v///+6uroqKirX19eVlZWIiIhQUFAfHx/////19fX39/f////////////////////////n5+fZ2dnj4+O4uLiNjY09PT3///////////////////////////+zs7P///8VFRX///9HR0cxMTH////////////p6en////n5+fb29vq6urU1NTAwMCnp6d5eXlxcXFzc3NeXl5qamoeHh5BQUE4ODj////8/Pzt7e3a2trQ0ND///////+9vb3Pz8/GxsacnJyYmJiUlJSmpqZ2dnb////////////+/v7x8fH09PT///+5ubnU1NSsrKyhoaGJiYmcnJxaWlqRkZE4ODj////x8fHn5+f////////U1NTIyMj///+/v7+1tbWJiYn///+fn5////9BQUEyMjJgYGD////////s7Ozc3NzJycna2tq/v7+GhoZCQkIWFhb///////////////////8kNpXEAAAAk3RSTlNrawBnaPz6a2pmagZraPP8KRY59PIM9M+ti22La/PMnWu3hoCAawLx6+aomoZZGsrJxq+dawT2xLaxo5yciW5ra2toXAre1tXOzcajl5SQi4V0c2trTfbc1MXBvrSvpqShm4x5ZE9A7Onj1Lewq6aaj4aDeDjezsm9sqygoJ+cl5J/enZvQyLj1MC7tIt7Z04kIw15AUOJAAAFPElEQVRYw6XZd3/SQBgH8NBcEgKEQJiitIW2tBXpslRrl917L23VWq177733Hr837KnVEAOXEJ//+X6eu+dy44GrYIY3GMj1xGONYUEIN8biPblA0Mv+BcfStK0H5wUYQjj/YEvzOgG9gT2VYQokbzWnjnVPPX061X0s1XwrKQDhyj0Bb5ng0HI8BPhHj56YT0gehRBZJkTxSIn5E0dH/UAovjxUBpjPrQHi+KMaRSYelyE8RCY1j8ZFYC2XtwtqnQL8remErhnCTeREutUPoVOzBTZlQ1hJ1RC3WdPzdJOa1ApC2SZrULsDtTmtEJdFECXdrOKOZgFmts6goUrRx8rIkihVDTizlWGBkSfA6nXZZTPk66vAk0hpMLgb6r2XxGU7yMt7KnYHS4Gv15GcVNyuMsKtTCax/ro4GLyLaJVp9ixnsiqKu8FiYGQ3og8V6pUpKg+j2B0pAmZpfgyPIdIcs2awD+okcbschJtMquj7FzwdxkVWPdiVuYjwaSPYFENrgnoOxUQrYk2FYKYLDSeJy3GQkw3oyhSAN0WxSveciFWiqOmgdz+a9fE6G3Uz9nv/gjkhmib/B5J0VMj9ASP7kCKe/+EkyaWksC+yDS6r/hriHKPjXVzq/zxXry7/BjNxtBKnmbkPtlfX7fJxHMcfRjzzCwyExLTbmdbeX7eL2w5+TgwFfoF7MJ7wMD8td7GBupcoVhi+Mez5CQ5VoltmeAdPXjdVjOZWTTVj8HtROUTBmyF2SeSrZ+4niGGoi7pWCNbWh25ScACjiocF7gRu18j6WBerfbpiEA9hoILzHsBR2cUERdCT0PV7IunMUa4E2IYDXi54XjhBLEGI7+dlml17ndnRwVl1JMgFhOi8xxoEVneSRZodKxb8QoA7hXMJlx0Qyfu9PMeOVeS4ZxiX7IHAWK2F2IIeLo6Uxy6Ihg2ORfJH0MnFcEyxDUJ9d4NngJcR4xrRTeyDwPAMXxp8jEYujKmyQKx8WCgJTiPMAVdllifJHwUY4xJfCpwBrEDp4K4dRtC/0csxQKsht+/ijeDoDp5jDpldlCUfZwBXLtHFzSwKe9n0+zgD+GaaZ67DDcQYC1ty0X2qEBQmTIvQvLBZn141xxWCDZs+6ll+evrmYPYM4Fv6IVvFMAYN25fJ08GoXg2L7Ss4QjfYEp4ODs/q1WBvsCWOAKnfp4O0Gi8MHPMI+HlImQ/edh+ng+eumKrBOKQqNPMxKi0WbvUvPrE44zGq6Qe98fu1A5Q66OlV5LbxKuKuc8DpV5GKQIfxsiRVO/L4a2JH4BeYN17npCWfM5Be5/LFLpysCWSXRP1ScCXWrzd1nDPwAr0SF7m0S/0OvbmkMGh6VrBXDBts0Z8VNLTth4/zAW+KolbkaSa1O/RunEVX3vx4lNwOB+ybQKypyPPW47QibQifLvYAlx0u6Q3R/ACvyGSRnOKdbQpJZDNFmxj+47wD77i/eBOjIrgO/16+/Pz8WA8WbwR9W2PkyMhv7SujVSW2+fgyOF+byGhV0XnMAhPPedve8wkg+53V7sv3hXF2k+dtcfzmWYT78hYNyVeVUFvmKGnJzbWoqHxlo2Xa1YHkhVpKMrnaC0l0dDXZa+ruF1B/+FovNUtovdcO10PYr9ltO3sH9wHi2N5a3mzyNLm9YyKwb9BbRmM8cireAdQfaptd8FFkO+i2sjDbdqge6Iifijho3YcA1T/ccuTylemZmekrl4+0DPtVIFRm6143tYEDI/gnRg4MMP9csP77Y7CnM9YYAkKNsc6eQcu/P34ANod6sZ/pavoAAAAASUVORK5CYII="
                      alt="img"
                    />
                  </button>
                  <ReactModal
                    style={customStyles}
                    isOpen={isopen}
                    onRequestClose={closeModal}
                  >
                    <ReactPlayer
                      url={flim.trailer}
                      width="100%"
                      height="100%"
                      playing={true}
                    ></ReactPlayer>
                  </ReactModal>
                </div>
              </div>
            </div>

            <div className="rating text-white ">
              <p className="text-3xl font-bold text-center mb-4">Rating</p>
              <Progress
                type="circle"
                format={(percent) => `${percent / 10} Score`}
                percent={flim.danhGia * 10}
                size={150}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
              />
            </div>
            <div className="text-white">
              <p className="text-3xl font-bold mb-4">{flim.tenPhim} </p>
              <p> Running Time : 120 minutes </p>
              <p> Director : Luong Tran </p>
              <p className="pt-4 text-2xl  font-bold pb-3">Description</p>
              <p >{flim.moTa} </p>
              <button
                onClick={scrollToBooking}
                className="bg-orange-600 py-2 px-4 rounded hover:bg-orange-400 duration-500 mt-2 font-bold"
              >
                Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={myRef}
        id="booking"
        className="py-10"
        style={{ background: "#020d18" }}
      >
        <div className="container  bg-white py-10">
          <div className="font-bold text-3xl">
            <div className="title pb-5">
              <span className="mr-2 ">ShowTime :</span>
              <span>{flim.tenPhim} </span>
            </div>
            <div className="border rounded xl:space-x-4 xl:h-[40rem] md:h-96 ">
              {renderFlimEmpty()}
              <Tabs
                tabPosition="top"
                defaultActiveKey="1"
                items={renderHeThongRapChieu()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
