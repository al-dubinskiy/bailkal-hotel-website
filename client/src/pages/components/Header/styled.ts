import Slider, { SliderProps } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

export const Container = styled(Slider)<SliderProps>(({ theme }) => ({
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
