import React, { ReactNode } from "react";
import { CustomButton } from "./CustomButton";
import { TwoPersonsBedIcon } from "../../../assets/icons/TwoPersonsBedIcon";
import { theme } from "../../../theme";
import { Stack, Typography } from "@mui/material";

export type ToogleButtonModeType = {
  label: string;
  value: string;
  icon: ReactNode;
  isSelected: boolean;
};

interface Props {
  label: string;
  modes: ToogleButtonModeType[];
  setMode: Function;
}

export const ToogleModeButton = (props: Props) => {
  const { label, modes, setMode } = props;

  const changeModeHandler = (val: ToogleButtonModeType) => {
    const found = modes.find((i) => i.value === val.value);
    if (found && !found.isSelected) {
      setMode(
        modes.map((i) => ({
          ...i,
          isSelected: i.value === found.value ? true : false,
        }))
      );
    } else if (found && found.isSelected) {
      setMode(
        modes.map((i) => ({
          ...i,
          isSelected: false,
        }))
      );
    }
  };

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        columnGap: "24px",
        rowGap: "10px",
        width: { xs: "100%", md: "max-content" },
      }}
    >
      <Typography variant="label">{label}</Typography>
      <Stack sx={{ flexDirection: "row" }}>
        {modes.map((i, idx) => {
          return (
            <CustomButton
              key={idx}
              startIcon={i.icon}
              label={i.label}
              onClick={() => changeModeHandler(i)}
              containerVariant={i.isSelected ? "contained" : "outlined"}
              containerBackgroundColor={"buttonLight"}
              containerStyle={{
                border: `1px solid ${theme.palette.primary.light}`,
                "& .MuiButton-startIcon": {
                  marginRight: "10px",
                },
                borderTopRightRadius: idx === 0 ? 0 : "10px",
                borderBottomRightRadius: idx === 0 ? 0 : "10px",
                borderTopLeftRadius: idx > 0 ? 0 : "10px",
                borderBottomLeftRadius: idx > 0 ? 0 : "10px",
              }}
              withoutAnimation
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
