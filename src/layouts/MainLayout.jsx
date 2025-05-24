import React from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const MainLayout = ({ children }) => (
  <>
    <Header isAuthenticated={false} />
    <main>{children}</main>
    <Footer />
  </>
);

export default MainLayout;
