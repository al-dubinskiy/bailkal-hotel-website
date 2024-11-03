import { TypographyOptions } from "@mui/material/styles/createTypography";

export const typography: TypographyOptions = {
  h1: {
    fontFamily: "CormorantInfant",
    fontSize: "100px",
    fontWeight: 400,
    lineHeight: 1.08,
    letterSpacing: "0%",
  },
  h2: {
    fontFamily: "CormorantInfant",
    fontSize: "86px",
    fontWeight: 400,
    lineHeight: 1.08,
    letterSpacing: "0%",
  },
  h3: {
    fontFamily: "CormorantInfant",
    fontSize: "50px",
    fontWeight: 400,
    lineHeight: 1.08,
    letterSpacing: "0%",
  },
  intro: {
    fontFamily: "CormorantInfant",
    fontSize: "50px",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "4%",
  },
  body: {
    fontFamily: "Raleway",
    fontSize: "20px",
    lineHeight: 1.5,
    letterSpacing: "4%",
  },
  small: {
    fontFamily: "Raleway",
    fontSize: "16px",
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
