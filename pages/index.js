import Head from "next/head";

import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Enter your name"),
  email: Yup.string().email("Enter a valid email address"),
  confirmEmail: Yup.string(),
  citizenship: Yup.string(),
  relocation_country: Yup.string(),
  country_other: Yup.string(),
  message: Yup.string(),
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Contact</title>
      </Head>

      <main>
        <h1>Contact Us</h1>
      </main>
    </div>
  );
}
