import Head from 'next/head'

import { Formik } from "formik"


export default function Home() {
  return (
    <div>
      <Head>
        <title>Formik Demo</title>
      </Head>

      <main >
        <Formik initialValues={{ Name: "", email: "" }}>
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <form>
              <div>
                <label htmlFor='name'>Name</label>
                <input 
                type='text' 
                name='name' 
                id='name' 
                placeholder='Enter your name' 
                onChange={handleChange} 
                value={values.name} 
                />
              </div>
            </form>
          )}
        </Formik>
      </main >
    </div >
  )
}
