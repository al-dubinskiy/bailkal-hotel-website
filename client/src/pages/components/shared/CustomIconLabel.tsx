import React from "react";
import { Stack, SxProps, Typography } from "@mui/material";

interface Props {
  icon: React.ReactNode;
  label?: string;
  labelComponent?: React.ReactNode;
  sx?: SxProps;
}

export const CustomIconLabel = (props: Props) => {
  const { icon, label, labelComponent, sx } = props;

  return (
    <Stack flexDirection="row" gap="10px" alignItems={"center"} sx={{ ...sx }}>
      {icon}
      {labelComponent ? (
        labelComponent
      ) : label ? (
        <Typography variant="label" fontWeight={400}>
          {label}
        </Typography>
      ) : null}
    </Stack>
  );
};
