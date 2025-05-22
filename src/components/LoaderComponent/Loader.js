import React from "react";
import styles from "./LoaderComponent.module.scss";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className={styles.loaderStyle}>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#6244c5"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
