import { Stack, SxProps, Typography } from "@mui/material";
import React from "react";

interface Props {
  label: string;
  description: string;
  containerStyle?: SxProps;
}

export const CustomLabelAndDescription = (props: Props) => {
  const { label, description, containerStyle } = props;

  return (
    <Stack
      sx={{
        alignItems: "stretch",
        gap: "5px",
        ...containerStyle,
      }}
    >
      <Typography variant="label" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography variant="label">{description}</Typography>
    </Stack>
  );
};
