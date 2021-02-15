import React from "react";
import { Anchor, Box, Heading, Text } from "grommet";

import { Field, Form, Formik, FormikProps } from "formik";

export default function Home() {
  return (
    <Box pad="medium" margin="large">
      <Heading size="small">How can we help?</Heading>
      <Box direction="row">
        <Box pad="small">
          <Anchor href="/residency">Residency Abroad</Anchor>
        </Box>
        <Box pad="small">
          <Anchor href="/">Career Consultation</Anchor>
        </Box>
      </Box>
    </Box>
  );
}
