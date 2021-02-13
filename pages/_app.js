import "../public/styles/global_styles.css";
import ExpatriantLayout from "../layouts/ExpatriantLayout";

function MyApp({ Component, pageProps }) {
  return (
    <ExpatriantLayout>
      <Component {...pageProps} />
    </ExpatriantLayout>
  );
}

export default MyApp;
