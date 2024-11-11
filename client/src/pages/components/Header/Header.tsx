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
import { Nav } from "./components/Nav/Nav";
import HotelLogo from "../../../assets/images/hotel_logo_ru.png";
import { theme } from "../../../theme";
import { LocaleButton } from "./components/LocaleButton";

interface Props {}

export const Header = (props: Props) => {
  const {} = props;

  return (
    <AppBar
      position="static"
      sx={{
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
          gap={{ xs: "30px", lg: "40px" }}
        >
          <img height={"50px"} src={HotelLogo} />

          <Stack flexDirection="row" alignItems={"center"} gap={"16px"}>
            <Nav />

            <LocaleButton />

            <Button
              variant="contained"
              size="medium"
              color="buttonDark"
              sx={{
                display: {
                  xs: "none",
                  sm_md: "initial",
                },
              }}
            >
              <Typography variant="label" color="inherit">
                Забронировать
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
