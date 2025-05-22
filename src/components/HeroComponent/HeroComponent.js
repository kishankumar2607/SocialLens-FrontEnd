import React from "react";
import styles from "./HeroComponent.module.scss";

const HeroComponent = () => {

  return (
    <div id={styles.mainDivId}>
      <h1 className={styles.title}>Welcome to My Website!</h1>
      <p className={styles.description}>This is a simple website created using Next.js and React.</p>
    </div>
  );
};

export default HeroComponent;
