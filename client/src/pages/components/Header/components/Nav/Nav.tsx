import React, { useState } from "react";
import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavList } from "./NavList";
import { theme } from "../../../../../theme";
import HotelLogo from "../../../../../assets/images/hotel_logo_ru.png";
import { CustomCircleIconButton } from "../../../shared/CustomCircleIconButton";
import { LocaleButton } from "../LocaleButton";
import { CustomButton } from "../../../shared/CustomButton";

interface Props {}

export const Nav = (props: Props) => {
  const {} = props;
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <>
      <CustomCircleIconButton
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
          <img height={"50px"} src={HotelLogo} />

          <Stack gap="16px" flexDirection={"row"}>
            <LocaleButton />

            <CustomCircleIconButton
              icon={<CloseIcon />}
              onClick={() => toggleDrawer(false)}
            />
          </Stack>
        </Box>

        <NavList />

        <CustomButton
          label={"Забронировать"}
          containerStyle={{
            minWidth: "210px",
            alignSelf: "center",
            margin: "24px 0",
          }}
          onClick={() => null}
        />
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
