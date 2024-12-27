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
import { theme } from "../../../theme";
import { LocaleButton } from "./components/LocaleButton";
import { CustomButton } from "../shared/CustomButton";
import { hotelLogo } from "../../../assets/images";

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
          <img height={"50px"} src={hotelLogo.HotelLogoRu} />

          <Stack
            flex="1"
            flexDirection="row"
            alignItems={"center"}
            justifyContent={"flex-end"}
            gap={"16px"}
          >
            <Nav />

            <LocaleButton />

            <CustomButton
              containerStyle={{
                display: {
                  xs: "none",
                  sm_md: "initial",
                },
                minWidth: "210px",
              }}
              label="Забронировать"
              onClick={() => null}
            />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
