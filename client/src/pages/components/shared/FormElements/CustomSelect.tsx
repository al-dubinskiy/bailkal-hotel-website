import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";

type MenuItemType = {
  id: number;
  label: string;
  value: string;
};

interface Props {
  id?: string;
  name?: string;
  inputLabel: string;
  selectLabel: string;
  value: MenuItemType;
  setValue?: (val: MenuItemType) => void;
  data: MenuItemType[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean | undefined;
  helperText?: string | false | undefined;
}

export const CustomSelect = (props: Props) => {
  const {
    id = "simple-select",
    name,
    inputLabel,
    selectLabel,
    value,
    setValue,
    data,
    onChange,
    onBlur,
    error,
    helperText,
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
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {inputLabel ? (
          <Typography
            variant="label"
            sx={{
              textTransform: "uppercase",
              fontWeight: 400,
              marginBottom: "10px",
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
          label={selectLabel}
          name={name}
          onChange={handleChange}
        >
          {data.map((item) => {
            return (
              <MenuItem key={item.id} value={item.value}>
                <Typography variant="label">{item.label}</Typography>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
