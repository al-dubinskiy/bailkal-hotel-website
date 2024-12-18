import { Stack, Typography } from "@mui/material";
import React from "react";

interface Props {
  label: string;
  description: string;
}

export const CustomLabelAndDescription = (props: Props) => {
  const { label, description } = props;

  return (
    <Stack
      sx={{
        alignItems: "stretch",
        gap: "10px",
      }}
    >
      <Typography variant="label" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography variant="label">{description}</Typography>
    </Stack>
  );
};
