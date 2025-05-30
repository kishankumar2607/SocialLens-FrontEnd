import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  const overlayStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };

  return (
    <div style={overlayStyles}>
      <ThreeCircles
        visible={true}
        height="80"
        width="80"
        color="#4f46e5"
        ariaLabel="three-circles-loading"
      />
    </div>
  );
};

export default Loader;
