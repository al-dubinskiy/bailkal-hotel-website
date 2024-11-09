import { TypographyOptions } from "@mui/material/styles/createTypography";
import { theme } from ".";

export const typography: TypographyOptions = {
  h1: {
    fontFamily: "CormorantInfant",
    fontSize: "80px",
    fontWeight: 400,
    lineHeight: 1.08,
    letterSpacing: "0%",
  },
  h2: {
    fontFamily: "CormorantInfant",
    fontSize: "68.8px",
    fontWeight: 400,
    lineHeight: 1.08,
    letterSpacing: "0%",
  },
  h3: {
    fontFamily: "CormorantInfant",
    fontSize: "48.8px",
    fontWeight: 400,
    lineHeight: 1.08,
    letterSpacing: "0%",
  },
  h4: {
    fontFamily: "CormorantInfant",
    fontSize: "40px",
    fontWeight: 400,
    lineHeight: 1.08,
    letterSpacing: "0%",
  },
  intro: {
    fontFamily: "CormorantInfant",
    fontSize: "40px",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "4%",
  },
  label: {
    fontFamily: "Raleway",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "4%",
  },
  body: {
    fontFamily: "Raleway",
    fontSize: "16px",
    lineHeight: 1.5,
    letterSpacing: "4%",
  },
  small: {
    fontFamily: "Raleway",
    fontSize: "12.8px",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "4%",
  },
  // button: {
  //   fontSize: "20px",
  //   fontWeight: 500,
  //   lineHeight: 1.25,
  //   letterSpacing: "4%",
  // },
  fontFamily: ["CormorantInfant", "Raleway", "sans-serif"].join(","),
};
