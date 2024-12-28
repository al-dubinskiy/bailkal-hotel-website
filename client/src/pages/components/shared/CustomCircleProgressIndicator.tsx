import { CircularProgress, Stack } from "@mui/material";
import React from "react";
import { theme } from "../../../theme";

interface Props {}

export const CustomCircleProgressIndicator = (props: Props) => {
  const {} = props;
  return (
    <Stack
      sx={{
        minHeight: "150px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        sx={{
          color: theme.palette.primary.dark,
        }}
        size={"24px"}
      />
    </Stack>
  );
};
