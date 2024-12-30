import {
  Button,
  ButtonOwnProps,
  CircularProgress,
  LinearProgress,
  SxProps,
  Typography,
} from "@mui/material";
import React from "react";
import { theme } from "../../../theme";

interface Props {
  label?: string;
  containerStyle?: SxProps;
  textStyle?: SxProps;
  onClick: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  containerVariant?: ButtonOwnProps["variant"];
  containerBackgroundColor?: ButtonOwnProps["color"];
  withoutAnimation?: boolean;
  loading?: boolean;
}

export const CustomButton = (props: Props) => {
  const {
    label,
    containerStyle,
    textStyle,
    onClick,
    startIcon = undefined,
    endIcon = undefined,
    disabled = false,
    containerVariant = "contained",
    containerBackgroundColor = "buttonDark",
    withoutAnimation = false,
    loading = false,
  } = props;

  return (
    <Button
      variant={containerVariant}
      size="medium"
      color={containerBackgroundColor}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        "& .MuiButton-startIcon": {
          marginRight: label ? "50px" : "0px",
        },
        "& .MuiButton-endIcon": {
          marginLeft: "5px",
        },
        opacity: !disabled ? 1 : 0.7,
        "&:hover": {
          opacity: !withoutAnimation ? 1 : 0.7,
        },
        "&:after": {
          content: withoutAnimation ? "''" : '"🡢"',
          display: withoutAnimation ? "none" : "unset",
        },
        ...containerStyle,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <CircularProgress
          sx={{
            color: "#fff",
          }}
          size={"24px"}
        />
      ) : label ? (
        <Typography variant="label" color="inherit" sx={textStyle}>
          {label}
        </Typography>
      ) : null}
    </Button>
  );
};
