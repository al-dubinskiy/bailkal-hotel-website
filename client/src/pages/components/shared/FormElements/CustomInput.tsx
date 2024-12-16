import { SxProps, TextField } from "@mui/material";
import React from "react";
import { theme } from "../../../../theme";

interface Props {
  id: string;
  name: string;
  label?: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean | undefined;
  helperText?: string | false | undefined;
  multiline?: boolean;
  containerStyles?: SxProps;
}

export const CustomInput = (props: Props) => {
  const {
    id,
    name,
    label,
    value,
    placeholder,
    onChange,
    onBlur,
    error,
    helperText,
    multiline = false,
    containerStyles,
  } = props;

  return (
    <TextField
      fullWidth
      id={id}
      name={name}
      label={label}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      multiline={multiline}
      sx={{
        marginTop: 0,
        marginBottom: 0,

        "& .MuiInputBase-input": {
          height: "33px",
          minHeight: !multiline ? "33px" : "100px",
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

        ...containerStyles,
      }}
    />
  );
};
