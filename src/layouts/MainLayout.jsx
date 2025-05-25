import React from "react";
import Cookies from "js-cookie";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  // Read token and user from cookies
  const token = Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null;
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  // console.log("Token:", token);
  // console.log("User:", user);

  return (
    <>
      <Header isAuthenticated={false} token={token} user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
