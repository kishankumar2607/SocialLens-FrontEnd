import React from "react";
import Routes from "./routes/Routes";
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
