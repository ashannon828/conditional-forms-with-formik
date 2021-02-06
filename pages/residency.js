import Head from "next/head";

import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

let validationShape = {
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
  relocation_country: Yup.string(),
  other_country: Yup.string().when("relocation_country", {
    is: (country) => country === "other",
    then: Yup.string().required("Enter your desired country"),
    otherwise: null,
  }),
};

const validationSchema = Yup.object().shape(validationShape);

export default function residency() {
  return (
    <div>
      <Head>
        <title>Residency Consultation - Expatriant</title>
      </Head>

      <main>
        <h1>Residency Consultation</h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            confirmEmail: "",
            citizenship: "",
            relocation_country: "russia",
            other_country: "",
            message: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));

              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {({ values, errors, touched }) => (
            <Form>
              Errors: {JSON.stringify(errors)}
              <div>
                <label htmlFor="name">Name*</label>
                <Field type="text" id="name" name="name" />
                {touched.name && errors.name}
              </div>
              <div>
                <label htmlFor="email">Email*</label>
                <Field type="text" id="email" name="email" />
                {touched.email && errors.email}
              </div>
              <div>
                <label htmlFor="confirmEmail">Confirm Email*</label>
                <Field type="text" id="confirmEmail" name="confirmEmail" />
                {touched.confirmEmail && errors.confirmEmail}
              </div>
              <div>
                <label htmlFor="citizenship">Country of Citizenship*</label>
                <Field type="text" id="citizenship" name="citizenship" />
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
                  <label htmlFor="other_country">Enter a country*</label>
                  <Field id="other_country" name="other_country" />
                  {touched.other_country && errors.other_country}
                </div>
              )}
              <div>
                <label htmlFor="message">Message</label>
                <Field as="textarea" id="message" name="message" />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
              {JSON.stringify(values)}
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}
