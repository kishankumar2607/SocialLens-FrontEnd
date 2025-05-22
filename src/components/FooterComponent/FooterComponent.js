import React from "react";
import styles from "./FooterComponent.module.scss";
import moment from "moment";

const FooterComponent = () => {
  const date = moment().format("YYYY");

  return (
    <div className={styles.footerCopyRightDivStyle}>
      <p className={styles.titleStyle}>
        Copyright &copy; {date} Website Name. All Rights Reserved.
      </p>
    </div>
  );
};

export default FooterComponent;
