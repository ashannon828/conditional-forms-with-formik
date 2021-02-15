import React from "react";
import Head from "next/head";
import { Anchor, Box, Heading } from "grommet";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Contact Us - Expatriant</title>
      </Head>
      <main>
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
      </main>
    </div>
  );
}
