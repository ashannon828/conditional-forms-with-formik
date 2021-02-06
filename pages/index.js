import Head from "next/head";

import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(255, "Name must be shorter than 255")
    .required("Enter a name"),
  email: Yup.string()
    .email("Enter a valid email")
    .max(255, "Email must be shorter than 255")
    .required("Enter an email"),
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Formik Demo</title>
      </Head>

      <main>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            name: "",
            email: "",
            confirmEmail: "",
            citizenship: "",
            reason: "",
            relocation_country: "",
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <div>
                <label htmlFor="name">Name</label>
                <Field id="name" name="name" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field id="email" name="email" />
              </div>
              <div>
                <label htmlFor="confirmEmail">Confirm Email</label>
                <Field id="confirmEmail" name="confirmEmail" />
              </div>
              <div>
                <label htmlFor="citizenship">Country of Citizenship</label>
                <Field id="citizenship" name="citizenship" />
              </div>
              <div>
                <label htmlFor="reason">How can we help?</label>
                <Field as="select" id="reason" name="reason">
                  <option value="residency">Residency</option>
                  <option value="visa">Visa</option>
                  <option value="career">Career Consultation</option>
                </Field>
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
              <div>
                <button type="submit">Submit</button>
              </div>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}
