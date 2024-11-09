import { ThemeOptions, createTheme, responsiveFontSizes } from "@mui/material";

import { fontFaceOverrides } from "./fonts";
import { typography } from "./typography";
import { palette } from "./palette";

const themeOptions: ThemeOptions = {
  typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 768,
      lg: 1024,
      xl: 1320, // 1650 (on Figma layout) for 1920, but for 1536 (current width screen) is 1328
      xxl: 1536, // 1650 (on Figma layout) for 1920, but for 1536 (current width screen) is 1328
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
          props: { variant: "contained", size: "medium", color: "buttonDark" },
          style: {
            height: 50,
            borderRadius: "8px",
            padding: "16.5px 33.6px",
            background: "#2F70D9",
            color: "#ffffff",
            fontFamily: "Raleway",
            fontSize: "16px",
            lineHeight: 1,
            fontWeight: 500,
            letterSpacing: "4%",
            textTransform: "capitalize",
          },
        },
        {
          props: {
            variant: "contained",
            size: "medium",
            color: "buttonLight",
          },
          style: {
            height: 50,
            borderRadius: "8px",
            padding: "16.5px 33.6px",
            background: "#DAE8FF",
            color: "#1a1a1a",
            fontFamily: "Raleway",
            fontSize: "16px",
            lineHeight: 1,
            fontWeight: 500,
            letterSpacing: "4%",
            textTransform: "capitalize",
          },
        },
        {
          props: { variant: "outlined", size: "medium" },
          style: {
            border: "1px solid #173236",
            style: {
              height: 50,
              borderRadius: "10px",
              padding: "16.5px 33.6px",
              background: "#ffffff",
              color: "#1a1a1a",
              fontFamily: "Raleway",
              fontSize: "16px",
              lineHeight: 1,
              fontWeight: 500,
              letterSpacing: "4%",
              textTransform: "capitalize",
            },
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
