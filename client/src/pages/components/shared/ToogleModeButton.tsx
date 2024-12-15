import React, { ReactNode } from "react";
import { CustomButton } from "./CustomButton";
import { TwoPersonsBedIcon } from "../../../assets/icons/TwoPersonsBedIcon";
import { theme } from "../../../theme";
import { Stack, SxProps, Typography } from "@mui/material";

export type ToogleButtonModeType = {
  id: string;
  label?: string;
  value: string;
  icon?: ReactNode;
  isSelected: boolean;
};

interface Props {
  label?: string;
  modes: ToogleButtonModeType[];
  setMode: Function;
  contentStyle?: SxProps;
  buttonsDirection?: "row" | "column";
  isCanUnchecked?: boolean;
  helperText?: string;
}

export const ToogleModeButton = (props: Props) => {
  const {
    label,
    modes,
    setMode,
    contentStyle,
    buttonsDirection = "row",
    isCanUnchecked = true,
    helperText,
  } = props;

  const changeModeHandler = (val: ToogleButtonModeType) => {
    const found = modes.find((i) => i.value === val.value);
    if (found && !found.isSelected) {
      setMode(
        modes.map((i) => ({
          ...i,
          isSelected: i.value === found.value ? true : false,
        }))
      );
    } else if (found && found.isSelected && isCanUnchecked) {
      setMode(
        modes.map((i) => ({
          ...i,
          isSelected: false,
        }))
      );
    }
  };

  return (
    <Stack sx={{ gap: "10px" }}>
      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          columnGap: "24px",
          rowGap: "10px",
          width: { xs: "100%", md: "max-content" },
        }}
      >
        {label ? <Typography variant="label">{label}</Typography> : null}
        <Stack
          sx={{
            flexDirection: buttonsDirection === "row" ? "row" : "column",
            borderRadius: "10px",
            overflow: "hidden",
            border: `1px solid ${theme.palette.primary.light}`,
          }}
        >
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
                  border: "unset",
                  borderRight:
                    idx === 0 && buttonsDirection === "row"
                      ? `1px solid ${theme.palette.primary.light}`
                      : "unset",

                  borderBottom:
                    idx === 0 && buttonsDirection === "column"
                      ? `1px solid ${theme.palette.primary.light}`
                      : "unset",

                  "& .MuiButton-startIcon": {
                    marginRight: "10px",
                  },
                }}
                withoutAnimation
              />
            );
          })}
        </Stack>
      </Stack>
      {helperText ? (
        <Typography variant="small">{helperText}</Typography>
      ) : null}
    </Stack>
  );
};
