import React from "react";
import styles from "./LoaderComponent.module.scss";
import LogoComponent from "../LogoComponent/LogoComponent";
import { BallTriangle } from "react-loader-spinner";

const LoaderComponent = () => {
  return (
    <div className={styles.mainDivStyle}>
      {/* <div>
        <LogoComponent />
      </div>
      <div>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#6244C5"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div> */}

      {/* <div className={styles.spinnercontainer}>
        <div className={styles.spinner}>
          <div className={styles.spinner}>
            <div className={styles.spinner}>
              <div className={styles.spinner}>
                <div className={styles.spinner}>
                  <div className={styles.spinner}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div id={styles.page}>
        <div id={styles.container}>
          <div id={styles.ring}></div>
          <div id={styles.ring}></div>
          <div id={styles.ring}></div>
          <div id={styles.ring}></div>
          <div id={styles.h3}>Welcome</div>
        </div>
      </div>
    </div>
  );
};

export default LoaderComponent;
