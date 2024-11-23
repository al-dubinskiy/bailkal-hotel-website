import React from "react";
import { Button, Stack, SxProps } from "@mui/material";
import { theme } from "../../../theme";

interface Props {
  icon: React.ReactNode;
  sx?: SxProps;
  onClick: () => void;
}

export const CustomCircleIconButton = (props: Props) => {
  const { icon, sx, onClick } = props;

  return (
    <Button
      onClick={onClick}
      sx={{
        ...sx,
        borderRadius: "100px",
        border: "1px solid",
        borderColor: theme.palette.gray.light,
        padding: "15px",
        width: "50px",
        height: "50px",
        minWidth: "0px",
        color: theme.palette.gray.dark,
        background: theme.palette.layoutBackground.light,

        "&:hover": {
          opacity: 0.8,
        },
      }}
    >
      {icon}
    </Button>
  );
};
