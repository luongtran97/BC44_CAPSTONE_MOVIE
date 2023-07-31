import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="text-left themeFooter w-full text-white">
      <div className=" footerPadding mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24 ">
        <div className=" grid grid-cols-4">
          <div className="">
            <h1 className="footerTitle font-bold">Account</h1>
            <div className="footerContent">
              <ul>
                <li>My Account</li>
                <li>Watchlist</li>
                <li>Collection</li>
                <li>User Guide</li>
              </ul>
            </div>
          </div>
          <div className="">
            <h1 className="footerTitle font-bold">Resources</h1>
            <div className="footerContent">
              <ul>
                <li>Forums</li>
                <li>Blog</li>
                <li>Help Center</li>
              </ul>
            </div>
          </div>
          <div className="">
            <h1 className="footerTitle font-bold">Legal</h1>
            <div className="footerContent">
              <ul>
                <li> Term Of Use</li>
                <li>Privacy Policy</li>
                <li> Sercurity</li>
              </ul>
            </div>
          </div>
          <div className="">
            <h1 className="footerTitle font-bold">Contact Us</h1>
            <div className="footerContent">
              <ul>
                <li>
                  <i className="fa fa-envelope"></i>
                  <span className="mx-2">contactme@gmai.com</span>
                </li>
                <li>
                  <i className="fa fa-phone"></i>
                  <span className="mx-2">090999999</span>
                </li>
                <li>
                  {" "}
                  <i className="fa fa-map-marker-alt"></i>
                  <span className="mx-2">CyberSoft,Ho Chi Minh, Viet Nam</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
