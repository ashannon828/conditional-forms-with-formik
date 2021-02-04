import Head from "next/head";

import { Formik } from "formik";
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
          initialValues={{ name: "", email: "" }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <form>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={touched.name && errors.name ? "has-error" : null}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={touched.email && errors.email ? "has-error" : null}
                />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          )}
        </Formik>
      </main>
    </div>
  );
}
