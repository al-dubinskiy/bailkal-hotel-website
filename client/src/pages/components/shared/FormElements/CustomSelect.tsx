import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Checkbox, SxProps, Typography } from "@mui/material";
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
  value: string[];
  setValue: (val: string[]) => void;
  data: SelectItemType[];
  disabledItems?: SelectItemType[];
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean | undefined;
  helperText?: string | false | undefined;
  customSelectStyle?: SxProps;
  contentStyles?: SxProps;
  containerStyles?: SxProps;
  labelPosition?: "left" | "top";
  multiple?: boolean;
  placeholder?: string;
}

export const CustomSelect = (props: Props) => {
  const {
    id = "simple-select",
    name,
    inputLabel,
    value: selectedValues,
    setValue: setSelectedValues,
    data: items,
    disabledItems,
    onBlur,
    error,
    helperText,
    customSelectStyle,
    contentStyles,
    containerStyles,
    labelPosition = "top",
    multiple = false,
    placeholder = "Выберите значение",
  } = props;

  const handleChange = (event: any) => {
    setSelectedValues(event.target.value);
  };

  const renderValue = (selected: string[]) => {
    const selectedItems = disabledItems
      ? [...disabledItems.map((i) => i.value), ...selected]
      : selected;

    return (
      <Typography variant="label">
        {selectedItems.length === 0
          ? placeholder
          : selectedItems
              .map((value) => items.find((o) => o.value === value)?.label)
              .join(", ")}
      </Typography>
    );
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
          value={selectedValues}
          // label={selectLabel}
          name={name}
          placeholder="Выберите значение"
          onChange={handleChange}
          sx={{
            "&.MuiOutlinedInput-root": {
              // height: "57px",
              flex: 1,
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

            "& .MuiTypography-root": {
              whiteSpace: "normal",
            },
            ...customSelectStyle,
          }}
          onBlur={onBlur}
          error={error}
          multiple={multiple}
          renderValue={renderValue}
          displayEmpty
        >
          {items.map((item) => {
            const isCheckedDefault = disabledItems?.find(
              (i) => i.value === item.value
            )
              ? true
              : false || false;
            return (
              <MenuItem
                key={item.id}
                value={item.value}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      opacity: !multiple ? 1 : 0.7,
                    },
                  },

                  "&.Mui-disabled": {
                    opacity: 0.6,
                  },
                }}
                disabled={isCheckedDefault}
              >
                {multiple ? (
                  <Checkbox
                    sx={{
                      padding: 0,
                      color: theme.palette.gray.extraLight,
                      "&.MuiCheckbox-root": {},
                      "&.Mui-checked": {
                        color: theme.palette.primary.dark,
                      },
                      "& .MuiSvgIcon-root": { fontSize: "24px" },
                    }}
                    inputProps={{ "aria-label": "label-controlled-checkbox" }}
                    checked={
                      isCheckedDefault ||
                      selectedValues.find((i) => i === item.value)
                        ? true
                        : false
                    }
                  />
                ) : null}
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
