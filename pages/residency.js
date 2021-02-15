import Head from "next/head";

import { Field, Form, Formik } from "formik";
import { Box, Button, FormField, Heading, TextInput, TextArea } from "grommet";
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
    .required("Enter your email address"),
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
        <Box
          pad="large"
          margin={{ top: "3rem" }}
          round="xsmall"
          elevation="small"
        >
          <Heading>Residency Consultation</Heading>
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
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
            }) => (
              <Form>
                <FormField
                  htmlFor="name"
                  error={touched.name && errors.name}
                  label="Name*"
                  a11yTitle="Enter your name"
                >
                  <TextInput
                    value={values.name}
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormField>
                <FormField
                  htmlFor="email"
                  error={touched.email && errors.email}
                  label="Email*"
                  a11yTitle="Enter your email"
                >
                  <TextInput
                    value={values.email}
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormField>

                <FormField
                  htmlFor="confirmEmail"
                  error={touched.confirmEmail && errors.confirmEmail}
                  label="Confirm Email*"
                  a11yTitle="Confirm your email"
                >
                  <TextInput
                    value={values.confirmEmail}
                    id="confirmEmail"
                    name="confirmEmail"
                    placeholder="Confirm your email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormField>

                <FormField
                  htmlFor="citizenship"
                  error={touched.citizenship && errors.citizenship}
                  label="Country of Citizenship*"
                  a11yTitle="Confirm your email"
                >
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
                </FormField>

                <FormField
                  htmlFor="relocation_country"
                  error={
                    touched.relocation_country && errors.relocation_country
                  }
                  label="I want to move to*"
                  a11yTitle="Confirm your email"
                >
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
                </FormField>

                {values.relocation_country === "other" && (
                  <FormField
                    htmlFor="other_country"
                    error={touched.other_country && errors.other_country}
                    label="Where do you want to move?*"
                    required="true"
                    a11yTitle="Confirm your email"
                  >
                    <TextInput
                      value={values.other_country}
                      id="other_country"
                      name="other_country"
                      placeholder="Enter a country"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormField>
                )}

                <FormField
                  htmlFor="message"
                  error={touched.message && errors.message}
                  label="Message"
                  a11yTitle="Enter a message"
                >
                  <TextArea
                    value={values.message}
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    resize="vertical"
                  />
                </FormField>
                <Box>
                  <Button
                    alignSelf="center"
                    primary
                    label="Send"
                    type="submit"
                    disabled={isSubmitting}
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </main>
    </div>
  );
}
