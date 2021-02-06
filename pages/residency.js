import Head from "next/head";

import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Enter your name"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Enter an email address"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], "Emails must match")
    .required("Confirm your email"),
  citizenship: Yup.string()
    .min(2, "Enter a valid country")
    .required("Enter your country of citizenship"),
  country_other: Yup.string().required("Enter a country"),
  message: Yup.string(),
});
export default function residency() {
  return (
    <div>
      <Head>
        <title>Residency Consultation - Expatriant</title>
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
                {touched.name && errors.name}
              </div>
              <div>
                <label htmlFor="email">Email*</label>
                <Field id="email" name="email" />
                {touched.email && errors.email}
              </div>
              <div>
                <label htmlFor="confirmEmail">Confirm Email*</label>
                <Field id="confirmEmail" name="confirmEmail" />
                {touched.confirmEmail && errors.confirmEmail}
              </div>
              <div>
                <label htmlFor="citizenship">Country of Citizenship*</label>
                <Field id="citizenship" name="citizenship" />
                {touched.citizenship && errors.citizenship}
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
              {values.relocation_country === "other" && (
                <div>
                  <label htmlFor="country_other">Enter a country*</label>
                  <Field id="country_other" name="country_other" />
                  {touched.country_other && errors.country_other}
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
