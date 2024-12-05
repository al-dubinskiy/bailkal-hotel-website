import React from "react";
import { Box, Stack, SxProps, Typography } from "@mui/material";

interface Props {
  icon: React.ReactNode;
  label?: string;
  labelComponent?: React.ReactNode;
  sx?: SxProps;
  onClick?: () => null;
}

export const CustomIconLabel = (props: Props) => {
  const { icon, label, labelComponent, sx, onClick } = props;

  return (
    <Stack
      flexDirection="row"
      gap="10px"
      alignItems={"center"}
      sx={{ ...sx }}
      onClick={onClick}
    >
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
