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
        <title>Formik Demo</title>
      </Head>

      <main>
        <h1>Residency Consultation</h1>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            name: "",
            email: "",
            confirmEmail: "",
            citizenship: "",
            relocation_country: "russia",
            country_other: "",
            message: "",
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <div>
                <label htmlFor="name">Name*</label>
                <Field
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="name"
                  name="name"
                />
              </div>
              <div>
                <label htmlFor="email">Email*</label>
                <Field id="email" name="email" />
              </div>
              <div>
                <label htmlFor="confirmEmail">Confirm Email*</label>
                <Field id="confirmEmail" name="confirmEmail" />
              </div>
              <div>
                <label htmlFor="citizenship">Country of Citizenship*</label>
                <Field id="citizenship" name="citizenship" />
              </div>
              <div>
                <label htmlFor="relocation_country">Choose a country</label>
                <Field
                  as="select"
                  id="relocation_country"
                  name="relocation_country"
                >
                  <option value="russia">Russia</option>
                  <option value="turkey">Turkey</option>
                  <option value="ukraine">Ukraine</option>
                  <option value="other">Other</option>
                </Field>
              </div>
              {relocation_country.value === "other" && (
                <div>
                  <label htmlFor="country_other">Enter a country</label>
                  <Field id="country_other" name="country_other" />
                </div>
              )}
              <div>
                <label htmlFor="message">Message</label>
                <Field as="textarea" id="message" name="message" />
              </div>
              <div>
                <button type="submit">Send</button>
              </div>
              {JSON.stringify(values)}
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}
