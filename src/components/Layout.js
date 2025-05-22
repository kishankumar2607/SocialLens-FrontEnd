import React from "react";
import FooterComponent from "./FooterComponent/FooterComponent";
import HeaderComponent from "./HeaderComponent/HeaderComponent";

export default function Layout({ children }) {

  const mainStyle = {
    paddingTop: "100px",
  };

  return (
    <div>
      <HeaderComponent />
      <main style={mainStyle}>{children}</main>
      <FooterComponent />
    </div>
  );
}
