import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  //styles for the loader
  const loaderStyles = {
    width: "100%",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    // backgroundColor: "#111827",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(8px)",
    zIndex: 9,
  };
  return (
    <div style={loaderStyles}>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4f46e5"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
