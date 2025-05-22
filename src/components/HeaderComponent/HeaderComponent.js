import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./HeaderComponent.module.scss";
import { Container, Navbar } from "react-bootstrap";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const HeaderComponent = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);


  const isLinkActive = (href) => {
    return router.pathname === href ? styles.activeLink : "";
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.mainDivStyle}>
      <Container>
        <Navbar className={styles.navbar}>
          <div>
            <Link href="/" passHref legacyBehavior>
              <a className={styles.navLink} onClick={closeNavbar}>
                Logo
              </a>
            </Link>
          </div>
          <div className={`${styles.navItems} ${isOpen ? styles.show : ""}`}>
            <div className={styles.navItemsDivStyle}>
              <div
                className={`${styles.link1DivStyle} ${isLinkActive("/link1")}`}
              >
                <Link href={"/link1"}>
                  <h5 onClick={closeNavbar}>Link 1</h5>
                </Link>
              </div>
              <div
                className={`${styles.link2DivStyle} ${isLinkActive("/link2")}`}
              >
                <Link href={"/link2"}>
                  <h5 onClick={closeNavbar}>Link 2</h5>
                </Link>
              </div>
              <div
                className={`${styles.link3DivStyle} ${isLinkActive(
                  "/link3"
                )}`}
              >
                <Link href={"/link3"}>
                  <h5 onClick={closeNavbar}>Link 3</h5>
                </Link>
              </div>
              <div
                className={`${styles.link4DivStyle} ${isLinkActive(
                  "/link4"
                )}`}
              >
                <Link href={"/link4"}>
                  <h5 onClick={closeNavbar}>Link 4</h5>
                </Link>
              </div>
              <div
                className={`${styles.link5DivStyle} ${isLinkActive("/link5")}`}
              >
                <Link href={"/link5"}>
                  <h5 onClick={closeNavbar}>Link 5</h5>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.icon} onClick={toggleNavbar}>
            {isOpen ? (
              <FaTimes className={styles.iconStyle} />
            ) : (
              <FaBars className={styles.iconStyle} />
            )}
          </div>
        </Navbar>
      </Container>
    </div>
  );
};

export default HeaderComponent;
