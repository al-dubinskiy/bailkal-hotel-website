import React from "react";
import { Stack, Theme, useTheme } from "@mui/material";
import Slider, { SliderProps } from "@mui/material/Slider";
import { alpha, styled } from "@mui/material/styles";

const SuccessSlider = styled(Slider)<SliderProps>(({ theme }) => ({
  width: 300,
  color: theme.palette.success.main,
  // "& .MuiSlider-thumb": {
  //   "&:hover, &.Mui-focusVisible": {
  //     boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
  //   },
  //   "&.Mui-active": {
  //     boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
  //   },
  // },
}));

interface Props {}

export const Header = (props: Props) => {
  const {} = props;

  const theme = useTheme();

  return (
    <Stack>
      <SuccessSlider defaultValue={30} />
    </Stack>
  );
};
