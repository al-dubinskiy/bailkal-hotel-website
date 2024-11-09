import React from "react";
import { Stack, Theme, useTheme } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Container } from "./styled";

interface Props {}

export const Header = (props: Props) => {
  const {} = props;

  const theme = useTheme();

  return (
    <Stack>
      <Container defaultValue={30} />
    </Stack>
  );
};
