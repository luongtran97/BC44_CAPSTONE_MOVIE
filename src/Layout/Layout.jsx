import React from "react";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

export default function Layout({contenPage}) {
  return (
    <div>
      <Header />
      {contenPage}
      <Footer />
    </div>
  );
}
