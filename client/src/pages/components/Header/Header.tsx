import React from "react";
import {
  AppBar,
  Box,
  Button,
  Stack,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Container } from "./styled";
import { Nav } from "./Nav/Nav";
import HotelLogo from "../../../assets/images/hotel_logo.png";
import { theme } from "../../../theme";

interface Props {}

export const Header = (props: Props) => {
  const {} = props;

  return (
    <AppBar
      position="static"
      sx={{
        marginTop: "24px",
        bgcolor: theme.palette.layoutBackground.light,
        boxShadow: "none",
        maxHeight: "50px",
      }}
    >
      <Toolbar
        sx={{
          "&.MuiToolbar-root": {
            paddingLeft: 0,
            paddingRight: 0,
            minHeight: "50px",
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <img height={"50px"} src={HotelLogo} />
          <Nav />

          <Button variant="contained" size="medium" color="buttonDark">
            Забронировать
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
