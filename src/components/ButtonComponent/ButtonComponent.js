import React from "react";
import styles from "./ButtonComponent.module.scss";
import { ClipLoader } from "react-spinners";

const ButtonComponent = ({ onClick, title, isLoading }) => {
  return (
    <button
      onClick={onClick}
      className={styles.buttonMainDiv}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className={styles.loaderDivStyle}>
          <p>Loading</p>
          <ClipLoader size={20} speedMultiplier={1} />
        </div>
      ) : (
        <p className={styles.textStyle}>{title}</p>
      )}
    </button>
  );
};

export default ButtonComponent;
