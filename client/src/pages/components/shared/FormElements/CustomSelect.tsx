import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SxProps, Typography } from "@mui/material";
import { theme } from "../../../../theme";

export type SelectItemType = {
  id: number | string;
  label: string;
  value: string;
  icon?: React.ReactNode;
};

interface Props {
  id?: string;
  name?: string;
  inputLabel?: string;
  value: SelectItemType;
  setValue?: (val: SelectItemType) => void;
  data: SelectItemType[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean | undefined;
  helperText?: string | false | undefined;
  customSelectStyle?: SxProps;
  contentStyles?: SxProps;
  containerStyles?: SxProps;
  labelPosition?: "left" | "top";
}

export const CustomSelect = (props: Props) => {
  const {
    id = "simple-select",
    name,
    inputLabel,
    value,
    setValue,
    data,
    onBlur,
    error,
    helperText,
    customSelectStyle,
    contentStyles,
    containerStyles,
    labelPosition = "top",
  } = props;

  const handleChange = (event: SelectChangeEvent | any) => {
    if (setValue) {
      const newValue = data.find((i) => i.value === event.target.value);
      if (newValue) {
        setValue(newValue);
      }
    }
  };

  return (
    <Box sx={{ minWidth: 120, ...containerStyles }}>
      <FormControl
        fullWidth
        sx={{
          display: "flex",
          flexDirection: labelPosition === "top" ? "column" : "row",
          alignItems: labelPosition === "top" ? "flex-start" : "center",
          gap: labelPosition === "top" ? 0 : "10px",
        }}
      >
        {inputLabel ? (
          <Typography
            variant="label"
            sx={{
              textTransform: labelPosition === "top" ? "uppercase" : "normal",
              fontWeight: 400,
              marginBottom: labelPosition === "top" ? "10px" : "0",
            }}
          >
            {inputLabel}
          </Typography>
        ) : null}
        {/* <InputLabel id={`${id}-label`}>{inputLabel}</InputLabel> */}
        <Select
          // labelId={`${id}-label`}
          id={id}
          value={value.value}
          // label={selectLabel}
          name={name}
          onChange={handleChange}
          sx={{
            "&.MuiOutlinedInput-root": {
              height: "57px",
              borderRadius: "8px",
              backgroundColor: theme.palette.layoutBackground.light,

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

            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "8px",
              borderWidth: 1,
              borderColor: theme.palette.gray.extraLight,
            },
            ...customSelectStyle,
          }}
        >
          {data.map((item) => {
            return (
              <MenuItem key={item.id} value={item.value}>
                <Typography variant="label">{item.label}</Typography>
              </MenuItem>
            );
          })}
        </Select>

        {helperText ? (
          <Typography variant="label">{helperText}</Typography>
        ) : null}
      </FormControl>
    </Box>
  );
};
