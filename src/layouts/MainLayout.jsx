import React from "react";
import { getCookie } from "../utils/utils.js";
import { decryptData } from "../utils/encryptDecryptData.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  // Read token and user from cookies
  const token = getCookie("token") ? JSON.parse(getCookie("token")) : null;
  const user = getCookie("userName") ? JSON.parse(getCookie("userName")) : null;

  const decryptUser = decryptData(user) || null;

  // console.log("Token:", token);
  // console.log("Encrypted User:", user);
  // console.log("Decrypted User:", decryptUser);

  return (
    <>
      <Header isAuthenticated={false} token={token} user={decryptUser} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
