import React from "react";
import { Anchor, Box, Heading, Text } from "grommet";

import { Field, Form, Formik, FormikProps } from "formik";

export default function Home() {
  return (
    <Box>
      <Heading>What do you want help with?</Heading>
      <Box direction="row">
        <Box width="50%">
          <Anchor href="/residency">Residency Abroad</Anchor>
        </Box>
        <Box width="50%">
          <Anchor href="/">Career Consultation</Anchor>
        </Box>
      </Box>
    </Box>
  );
}
