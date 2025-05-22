import React, { useState } from "react";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import ImageComponent from "./../src/components/ImageComponent/ImageComponent";
import errorImage from "../src/assets/images/error-image.png";
import styles from "./errorStyle.module.scss";
import ButtonComponent from '../src/components/ButtonComponent/ButtonComponent';

const errorPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const onClick = () => {
        setLoading(true);
        setTimeout(() => {
            router.push("/");   
            setLoading(false);
        }, 3000);     
    }

  return (
    <div className={styles.errorDivStyle}>
      <Container>
        <div className={styles.errorInnerDivStyle}>
          <Row>
            <Col lg={6} md={12}>
              <div className={styles.container}>
                <h2 className={styles.title}>404 - Page Not Found</h2>
                <p className={styles.description}>
                  Oops! The page you are looking for does not exist.
                </p>
                <ButtonComponent title={"Go to Home"} onClick={()=> onClick()} isLoading={loading}/>
              </div>
            </Col>

            <Col lg={6} md={12}>
              <div>
                <ImageComponent
                  src={errorImage}
                  alt={"Error Image"}
                  imageStyle={styles.imageStyle}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default errorPage;
