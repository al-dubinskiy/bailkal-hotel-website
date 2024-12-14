import { Stack, Typography } from "@mui/material";
import React from "react";
import { Content } from "./components/Content";

interface Props {}

export const Transfer = (props: Props) => {
  const {} = props;

  return (
    <Stack
      sx={{
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <Typography variant="label" sx={{ fontWeight: 600, alignSelf: "center" }}>
        Трансфер в отель
      </Typography>

      <Content />
    </Stack>
  );
};
