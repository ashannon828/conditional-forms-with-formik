import Head from "next/head";

import { Field, Form, Formik } from "formik";
import { Box } from "grommet";
import * as Yup from "yup";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import countries from "../data/countries/countries";

const submitFunc = (values, { setSubmitting, resetForm }) => {
  setSubmitting(true);
  axios.post("/api/email-residency", {
    ...values,
  });
  setSubmitting(false);
  resetForm();
};

const validationShape = {
  name: Yup.string().required("Enter your name"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Enter an email address"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], "Emails must match")
    .required("Confirm your email"),
  citizenship: Yup.string().matches(
    /^((?!choose).)*$/,
    "Choose your country of citizenship"
  ),
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
        <Box overflow="hidden">
          <h1>Residency Consultation</h1>
          <Formik
            initialValues={{
              name: "",
              email: "",
              confirmEmail: "",
              citizenship: "choose",
              relocation_country: "russia",
              other_country: "",
              message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={submitFunc}
          >
            {({ values, errors, touched, isSubmitting }) => (
              <Form>
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
                  <Field as="select" id="citizenship" name="citizenship">
                    <option key="choose" value="choose">
                      Choose
                    </option>
                    {countries.map((country) => (
                      <option key={uuidv4()} value={country.toLowerCase()}>
                        {country}
                      </option>
                    ))}
                  </Field>
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
                  <button type="submit" disabled={isSubmitting}>
                    Send
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </main>
    </div>
  );
}
