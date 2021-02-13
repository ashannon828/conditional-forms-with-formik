import React from "react";
import { Box, Heading, Text } from "grommet";

import { Field, Form, Formik, FormikProps } from "formik";

export default function Home() {
  return (
    <Box>
      <Heading>What do you want help with?</Heading>
      <Box direction="row">
        <Box width="50%" background="green">
          <a href="/residency">
            <Text>Residency</Text>
          </a>
          <a href="/residency">
            <Text>Residency</Text>
          </a>
        </Box>
        <Box width="50%" background="gray">
          <a href="/residency">
            <Text>Residency</Text>
          </a>
        </Box>
      </Box>
    </Box>
  );
}
