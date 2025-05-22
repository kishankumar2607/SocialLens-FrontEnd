import React from "react";
import styles from "./LinearButtonComponent.module.scss";
import { RotatingLines } from "react-loader-spinner";

const LinearButtonComponent = ({ onClick, title, isLoading }) => {
  return (
    <button onClick={onClick} className={styles.buttonMainDiv}>
      {isLoading ? (
        <div className={styles.loaderDivStyle}>
          <p>Loading</p>
          <RotatingLines
            // strokeColor="#ffffff"
            strokeWidth="5"
            animationDuration="0.75"
            width="25"
            visible={true}
          />
        </div>
      ) : (
        <p className={styles.textStyle}>{title}</p>
      )}
    </button>
  );
};

export default LinearButtonComponent;
