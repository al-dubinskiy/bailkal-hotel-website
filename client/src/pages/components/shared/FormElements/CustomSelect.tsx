import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  id?: string;
  name?: string;
  inputLabel: string;
  selectLabel: string;
  value: string;
  setValue?: (val: string) => void;
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
    onChange,
    onBlur,
    error,
    helperText,
  } = props;

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    if (setValue) {
      setValue(event.target.value as string);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`${id}-label`}>{inputLabel}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          value={value}
          label={selectLabel}
          name={name}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
