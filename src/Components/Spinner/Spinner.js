import React from "react";
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";

export default function () {
  const { isLoading } = useSelector( (state) => state.spinnerSlice);
  console.log("🚀 ~ isLoading:", isLoading)
  return isLoading ? (
    <div
      style={{ backgroundColor: "#001219", zIndex: "99999" }}
      className=" flex items-center justify-center h-screen w-screen fixed top-0 z-60 left-0"
    >
      <PacmanLoader speedMultiplier={1.5} size={150} color="#ae2012" />
    </div>
  ) : (
    ""
  );
}
