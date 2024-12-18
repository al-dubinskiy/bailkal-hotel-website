import React from "react";
import { Container, Stack, Theme } from "@mui/material";
import { Header } from "./Header/Header";
import { Footer } from "./Footer";

interface Props {
  children: React.ReactNode;
}

const BasePageLayout = (props: Props) => {
  const { children } = props;

  return (
    <Container maxWidth="xl">
      <Header></Header>
      {children}
      <Footer></Footer>
    </Container>
  );
};

export default BasePageLayout;
