import { ThemeOptions, createTheme, responsiveFontSizes } from "@mui/material";
import { palette } from "./palette";

import { fontFaceOverrides } from "./fonts";
import { typography } from "./typography";

const themeOptions: ThemeOptions = {
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 768,
      lg: 1024,
      xl: 1200,
      xxl: 1536,
      xxxl: 1920,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: fontFaceOverrides,
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Raleway",
          fontStyle: "normal",
          fontSize: "20px",
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: "4%",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", size: "medium" },
          style: {
            height: 65,
            borderRadius: "10px",
            padding: "18px 42px",
            background: "#2F70D9",
            color: "#ffffff",
          },
        },
        {
          props: { variant: "contained", size: "medium" },
          style: {
            height: 65,
            borderRadius: "10px",
            padding: "18px 42px",
            background: "#DAE8FF",
            color: "#1a1a1a",
          },
        },
        {
          props: { variant: "outlined", size: "medium" },
          style: {
            border: "1px solid #173236",
            style: {
              height: 65,
              borderRadius: "10px",
              padding: "18px 42px",
              background: "#ffffff",
              color: "#1a1a1a",
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            fontSize: "20px",
            lineHeight: 1,
            fontWeight: 400,
            letterSpacing: "4%",
          },
        },
      ],
      // styleOverrides: {
      //   root: {
      //     borderRadius: "10px",
      //     boxShadow: "none",
      //     textTransform: "none",
      //   },
      // },
    },
  },
  palette,
  shape: {
    borderRadius: 20,
  },
};

let theme = createTheme(themeOptions);
theme = responsiveFontSizes(theme);

export { theme };
