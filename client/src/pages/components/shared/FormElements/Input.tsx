import { TextField } from "@mui/material";
import React from "react";
import { theme } from "../../../../theme";

interface Props {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error: boolean | undefined;
  helperText: string | false | undefined;
}

export const Input = (props: Props) => {
  const { id, name, label, value, onChange, onBlur, error, helperText } = props;

  return (
    <TextField
      fullWidth
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      sx={{
        marginTop: 0,
        marginBottom: 0,

        "& .MuiInputBase-input": {
          height: "33px",
        },

        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "8px",
          borderWidth: 1,
          borderColor: theme.palette.gray.extraLight,
        },

        "& .MuiInputLabel-root": {
          font: theme.typography.label,
          fontWeight: 400,
          color: theme.palette.text.disabled,

          "&.MuiFormLabel-filled": {
            color: theme.palette.text.primary,
          },

          "&.Mui-focused": {
            color: theme.palette.primary.dark,

            "&.Mui-error": {
              color: theme.palette.error.main,
            },
          },
        },

        "& .MuiOutlinedInput-root": {
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: 1,
              borderColor: theme.palette.primary.dark,
            },

            "&.Mui-error": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: 1,
                borderColor: theme.palette.error.main,
              },
            },
          },
        },

        "& .MuiFormHelperText-root": {
          font: theme.typography.small,
          color: theme.palette.error.main,
        },
      }}
    />
  );
};
