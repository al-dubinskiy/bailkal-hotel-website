import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useButtonDropdownCardStyles = makeStyles((theme: Theme) => ({
  // Root
  popper: {
    zIndex: 2000,

    '&[data-popper-placement*="top"]': {
      top: "-10px !important",
    },
    '&[data-popper-placement*="bottom"] $arrow': {
      top: "10px",
      left: "50%",
      transform: "translateX(-50%)",
      marginTop: "-0.71em",
      marginLeft: 4,
      marginRight: 4,
      "&::before": {
        transformOrigin: "0 100%",
      },
    },
    '&[data-popper-placement*="top"] $arrow': {
      bottom: "0px",
      left: "50%",
      transform: "translateX(-50%)",
      marginBottom: "-0.71em",
      marginLeft: 4,
      marginRight: 4,
      "&::before": {
        transformOrigin: "100% 0",
      },
    },
    '&[data-popper-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.71em",
      height: "1em",
      width: "0.71em",
      marginTop: 4,
      marginBottom: 4,
      "&::before": {
        transformOrigin: "100% 100%",
      },
    },
    '&[data-popper-placement*="left"] $arrow': {
      right: 0,
      marginRight: "-0.71em",
      height: "1em",
      width: "0.71em",
      marginTop: 4,
      marginBottom: 4,
      "&::before": {
        transformOrigin: "0 0",
      },
    },
  },
  // Main container
  popoverRoot: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 10px 40px 0px rgba(23, 50, 54, 0.15) !important",
    borderRadius: "10px !important",
    marginTop: 10,
  },
  // Stolen from https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Tooltip/Tooltip.js
  arrow: {
    overflow: "hidden",
    position: "absolute",
    width: "1em",
    height: "0.71em" /* = width / sqrt(2) = (length of the hypotenuse) */,
    boxSizing: "border-box",
    color: theme.palette.background.paper,
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: "100%",
      height: "100%",
      boxShadow: "0px 10px 40px 0px rgba(23, 50, 54, 0.15)",
      backgroundColor: "currentColor",
      transform: "rotate(45deg)",
    },
  },
  content: {
    minWidth: "160px",
    padding: "24px",
  },
}));
