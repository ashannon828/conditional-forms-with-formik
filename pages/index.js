import React from "react";

import { Field, Form, Formik, FormikProps } from "formik";

const MyInput = ({ field, form, ...props }) => {
  return <input {...field} {...props} />;
};

export default function Home() {
  return (
    <div>
      <h1>My Form</h1>

      <Formik
        initialValues={{ email: "", color: "red", firstName: "", lastName: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(FormikProps) => (
          <Form>
            <Field name="firstName" placeholder="firstName" />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
