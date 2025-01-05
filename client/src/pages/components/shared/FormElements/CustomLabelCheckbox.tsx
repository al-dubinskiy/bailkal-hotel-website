import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { theme } from "../../../../theme";
import { PlusOne } from "@mui/icons-material";

interface Props {
  required?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  label: string;
  checked: boolean;
  handleChange: (checked: boolean) => void;
  id: string;
  name: string;
}

export const CustomLabelCheckbox = (props: Props) => {
  const {
    id,
    name,
    required = false,
    disabled = false,
    defaultChecked = false,
    label,
    checked,
    handleChange,
  } = props;
  return (
    <FormControlLabel
      required={required}
      control={
        <Checkbox
          id={id}
          name={name}
          // defaultChecked={defaultChecked}
          sx={{
            color: theme.palette.gray.extraLight,
            "&.MuiCheckbox-root": {},
            "&.Mui-checked": {
              color: theme.palette.primary.dark,
            },
            "& .MuiSvgIcon-root": { fontSize: "34px" },
          }}
          inputProps={{ "aria-label": "label-controlled-checkbox" }}
          checked={checked}
          onChange={(event, checked) => handleChange(checked)}
        />
      }
      label={label}
      sx={{
        "& .MuiTypography-root": {
          font: theme.typography.label,
          fontWeight: 400,
        },
      }}
    />
  );
};
