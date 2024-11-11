import React, { useState } from "react";
import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavList } from "./NavList";
import { theme } from "../../../../../theme";
import HotelLogo from "../../../../../assets/images/hotel_logo_ru.png";
import { CircleIconButton } from "../../../shared/CircleIconButton";
import { LocaleButton } from "../LocaleButton";

interface Props {}

export const Nav = (props: Props) => {
  const {} = props;
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <>
      <CircleIconButton
        icon={<MenuIcon />}
        sx={{
          order: 1,
          display: { xs: "flex", md: "none" },
        }}
        onClick={() => toggleDrawer(true)}
      />

      <Drawer
        open={open}
        onClose={() => toggleDrawer(false)}
        anchor="right"
        sx={{
          display: { xs: "inherit", md: "none" },
          "& .MuiDrawer-paper": {
            height: "100%",
            width: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            padding: "24px",
          }}
        >
          {/* {window.innerWidth > theme.breakpoints.values.md ? ( */}
          <img height={"50px"} src={HotelLogo} />
          {/* ) : (
            <img height={"50px"} src={HotelLogoIcon} />
         )} */}
          <Stack gap="16px" flexDirection={"row"}>
            <LocaleButton />

            <CircleIconButton
              icon={<CloseIcon />}
              onClick={() => toggleDrawer(false)}
            />
          </Stack>
        </Box>
        <NavList />

        {/* <Button
          variant="contained"
          size="medium"
          color="buttonDark"
          sx={{ alignSelf: "center", margin: "24px 0" }}
        >
          <Typography variant="label" color="inherit">
            Забронировать
          </Typography>
        </Button> */}
        <Button
          variant="contained"
          size="medium"
          color="buttonDark"
          sx={{
            alignSelf: "center",
            margin: "24px 0",
          }}
        >
          <Typography variant="label" color="inherit">
            Забронировать
          </Typography>
        </Button>
      </Drawer>
      <NavList
        sx={{
          marginRight: { md: 0, lg: "24px" },
          display: { xs: "none", md: "inherit" },
        }}
      />
    </>
  );
};
