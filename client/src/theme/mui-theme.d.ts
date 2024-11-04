import { BreakpointOverrides } from "@mui/system/createTheme/createBreakpoints";
import { ThemeOptions, Button, PaletteColor, TextField } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    primaryShades: {
      light1?: PaletteColor;
      light2?: PaletteColor;
    };
    layoutBackground: PaletteColor;
    buttonLight: PaletteColor;
    buttonDark: PaletteColor;
  }

  interface PaletteOptions {
    layoutBackground: PaletteColorOptions;
    buttonLight: PaletteColorOptions;
    buttonDark: PaletteColorOptions;
  }

  interface PaletteColor {
    lighter?: string;
    extraLight?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    extraLight?: string;
  }

  interface TypographyVariants {
    intro: React.CSSProperties;
    body: React.CSSProperties;
    small: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    intro?: React.CSSProperties;
    body?: React.CSSProperties;
    small?: React.CSSProperties;
  }

  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    buttonLight: true;
    buttonLighten: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    large: false;
    intro: true;
    body: true;
    small: true;
    mini: false;
    tiny: false;
    h4: false;
    h5: false;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    caption: false;
    button: true;
    overline: false;
  }
}
