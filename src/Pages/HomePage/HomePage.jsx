import React, { useState } from "react";
import "./HomePage.css";
import { Carousel } from "antd";
import SelectFlim from "./SelectFlim";
import { useEffect } from "react";
import { https } from "../../Services/config";
import ListMovie from "./ListMovie";
import News from "./News";
import TabsMovie from "./TabsMovie";


const contentStyle = {
  height: "50vh",
  color: "#000",
  width: "100%",
  lineHeight: "160px",
  textAlign: "center",
  background: "#fff",
  margin: "5vh 0",
  padding: "10px",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  transform: "translate3d(0px,-4px,0px)",
  display: "flex",
  alignItem: "center",
  jusityContent: "center",
  cursor:
    "url(https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png) 39 39 , auto",
};
export default function HomePage() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    https
      .get("api/QuanLyPhim/LayDanhSachBanner")
      .then((res) => {
        setBanner(res.data.content);
      })
      .catch((err) => {});
  }, []);

  const renderBanner = () => {
    return banner.map((item) => {
      return (
        <div key={item.maBanner}>
          <img src={item.hinhAnh} style={contentStyle} alt={item.biDanh} />
        </div>
      );
    });
  };

  return (
    <>
      <Carousel autoplay>
        <div>
          <img
            src="https://i.pinimg.com/1200x/28/58/fe/2858fe8b4fb490fb181b72081dd4d5f3.jpg"
            style={contentStyle}
            alt="img"
          />
        </div>
        <div>
          <img
            src="https://writedrunkeditdrunk.files.wordpress.com/2021/05/170997e1-474b-4820-bb99-09475c8a0355.jpeg"
            style={contentStyle}
            alt="img"
          />
        </div>
        <div>
          <img
            src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/07/john-wick-4-keanu-reeves-social-feature.jpg"
            style={contentStyle}
            alt="img"
          />
        </div>
        <div>
          <img
            src="https://media.socastsrm.com/wordpress/wp-content/blogs.dir/460/files/2022/11/banner-blackpantherwakandaforever.jpg"
            style={contentStyle}
            alt="img"
          />
        </div>
        <div>
          <img
            src="https://live.staticflickr.com/4038/4686112993_efe13b4937_h.jpg"
            style={contentStyle}
            alt="img"
          />
        </div>
        {renderBanner()}
      </Carousel>
      <SelectFlim />
      <ListMovie/>
      <TabsMovie/>
      <News/>
    </>
  );
}
