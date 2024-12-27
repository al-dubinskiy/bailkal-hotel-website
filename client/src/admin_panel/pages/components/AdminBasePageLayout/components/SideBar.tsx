import { Box, Drawer, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { hotelLogo } from "../../../../../assets/images";
import { CustomCircleIconButton } from "../../../../../pages/components/shared/CustomCircleIconButton";
import { NavList } from "./NavList";

interface Props {}

export const SideBar = (props: Props) => {
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
        <Stack
          sx={{
            gap: "24px",
            padding: "48px 24px",
            boxShadow: "0px 0px 16px 8px rgba(0, 0, 0, 0.15);",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <Typography variant="label" fontWeight={600}>
              Админ-панель
            </Typography>
            <img height={"50px"} src={hotelLogo.HotelLogoRu} />
          </Box>

          <Stack gap="16px" flexDirection={"row"}>
            <CustomCircleIconButton
              icon={<CloseIcon />}
              onClick={() => toggleDrawer(false)}
            />
          </Stack>
        </Stack>

        <NavList />
      </Drawer>

      <Stack
        sx={{
          gap: "48px",
          padding: "24px",
          boxShadow: "0px 0px 16px 8px rgba(0, 0, 0, 0.15);",
          borderRadius: "16px",
          maxWidth: "280px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Typography variant="label" fontWeight={600}>
            Админ-панель
          </Typography>
          <img height={"50px"} src={hotelLogo.HotelLogoRu} />
        </Box>
        <NavList
          sx={{
            marginRight: "24px",
            display: "inherit",
          }}
        />
      </Stack>
    </>
  );
};
