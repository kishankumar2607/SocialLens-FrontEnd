import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from './../src/components/Layout';

export default function App({ Component, pageProps }) {
  return(
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}
