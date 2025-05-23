import React from "react";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import MetaDataComponent from "./utils/metaDataComponent";

function App() {
  return (
    <>
      <Routes />
      <MetaDataComponent />
      <ToastContainer />
    </>
  );
}

export default App;
