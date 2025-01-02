import { Button, Stack, SxProps, Typography } from "@mui/material";
import React, { useMemo } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CustomButton } from "./CustomButton";
import { theme } from "../../../theme";

interface Props {
  id?: string;
  name?: string;
  label?: string;
  value: number;
  setValue: (val: number) => void;
  minValue: number;
  maxValue: number;
}

export const CustomCounterButton = (props: Props) => {
  const { label, value, setValue, minValue, maxValue } = props;

  const buttonStyle: SxProps = {
    padding: "15px",
  };

  return (
    <Stack sx={{ flexDirection: "column", gap: "5px" }}>
      {label ? <Typography variant="someSmall">{label}</Typography> : null}

      <Stack
        sx={{
          borderRadius: "10px",
          height: "50px",
          flexDirection: "row",
          alignItems: "center",
          overflow: "hidden",
          background: theme.palette.primary.lighter,
          gap: "15px",
        }}
      >
        <CustomButton
          startIcon={<RemoveIcon />}
          onClick={() => setValue(value - 1)}
          containerStyle={buttonStyle}
          disabled={value === minValue}
          containerBackgroundColor="buttonLight"
          withoutAnimation
        />
        <Typography variant="label">{value}</Typography>
        <CustomButton
          startIcon={<AddIcon />}
          onClick={() => setValue(value + 1)}
          containerStyle={buttonStyle}
          disabled={value === maxValue}
          containerBackgroundColor="buttonLight"
          withoutAnimation
        />
      </Stack>
    </Stack>
  );
};
