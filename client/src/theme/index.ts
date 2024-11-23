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
      sm_md: 576,
      md: 768,
      lg: 1024,
      xl: 1320, // 1650 (on Figma layout) for 1920, but for 1536 (current width screen) is 1272 - (24*2 padding left and right)
      xxl: 1650,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: fontFaceOverrides,
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {},
      },
      defaultProps: {
        fullWidth: true,
        size: "medium",
        blurOnSelect: true,
        clearOnBlur: true,
        openOnFocus: true,
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          fontFamily: "Raleway",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: "0.04em",
          color: "#1a1a1a",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            padding: "12px 14px",
            fontFamily: "Raleway",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "0.04em",
          },
        },
      },
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
        margin: "normal",
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Raleway",
          fontStyle: "normal",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: "0.04em",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "8px",
        },
        list: {
          '&[role="menu"]': {
            "& > li": {
              color: "#1a1a1a",
              fontFamily: "Raleway",
              fontSize: "16px",
              lineHeight: 1,
              fontWeight: 500,
              letterSpacing: "0.04em",
              padding: "7.5px 24px",
            },
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", size: "medium", color: "buttonDark" },
          style: {
            minWidth: 0,
            minHeight: "50px",
            height: "50px",
            padding: "0px 15px",
            background: "#2F70D9",
            color: "#ffffff",
            display: "flex",

            "& .MuiButton-startIcon": {
              margin: 0,
            },

            "& .MuiButton-endIcon": {
              margin: 0,
            },

            "&:after": {
              content: '"🡢"',
              overflow: "hidden",
              opacity: 0,
              marginLeft: "-15px",
              transition: "all 0.3s ease-in",
            },

            "&:hover": {
              opacity: 1,
              boxShadow: "none",
              cursor: "pointer",
              "&:after": { opacity: 1, marginLeft: "7.5px" },
            },
          },
        },
        {
          props: {
            variant: "contained",
            size: "medium",
            color: "buttonLight",
          },
          style: {
            minWidth: 0,
            minHeight: "50px",
            height: "50px",
            padding: "0px 15px",
            background: "#B1CFFF",
            display: "flex",

            "& .MuiButton-startIcon": {
              margin: 0,
            },

            "& .MuiButton-endIcon": {
              margin: 0,
            },

            "&:after": {
              content: '"🡢"',
              overflow: "hidden",
              opacity: 0,
              marginLeft: "-15px",
              transition: "all 0.3s ease-in",
            },

            "&:hover": {
              opacity: 1,
              boxShadow: "none",
              cursor: "pointer",
              "&:after": { opacity: 1, marginLeft: "7.5px" },
            },
          },
        },
        {
          props: { variant: "outlined", size: "medium" },
          style: {
            minWidth: 0,
            border: "1px solid #1a1a1a",
            minHeight: "50px",
            height: "50px",
            padding: "0px 15px",
            background: "#ffffff",

            "& .MuiButton-startIcon": {
              margin: 0,
            },

            "& .MuiButton-endIcon": {
              margin: 0,
            },

            "&:hover": {
              boxShadow: "none",
              cursor: "pointer",
            },
          },
        },
        {
          props: { variant: "text", size: "medium" },
          style: {
            whiteSpace: "nowrap",
          },
        },
      ],
      styleOverrides: {
        root: {
          padding: 0,
          color: "#1a1a1a",
          minWidth: 0,
          borderRadius: "8px",
          boxShadow: "none",

          "&:hover": {
            opacity: 0.8,
          },
        },
      },
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
