import React from "react";
import { getCookie, getSessionStorage } from "../utils/utils.js";
import { decryptData } from "../utils/encryptDecryptData.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  // Read token and user from cookies
  const token = getCookie("token")
    ? JSON.parse(getCookie("token"))
    : getSessionStorage("token")
    ? getSessionStorage("token")
    : null;
  const user = getCookie("userName")
    ? JSON.parse(getCookie("userName"))
    : getSessionStorage("userName")
    ? getSessionStorage("userName")
    : null;

  const decryptUser = decryptData(user) || null;

  // const getToken = getSessionStorage("token");

  // console.log("get token from session: ", getToken);

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
