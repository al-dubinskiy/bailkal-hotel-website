import React, { useState } from "react";
import { Box, Button, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavList } from "./NavList";
import { theme } from "../../../../theme";

interface Props {}

export const Nav = (props: Props) => {
  const {} = props;
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <>
      <Button
        variant="text"
        onClick={() => toggleDrawer(true)}
        sx={{
          color: theme.palette.gray.dark,
          display: { xs: "flex", md: "none" },
        }}
      >
        <MenuIcon />
      </Button>
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
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            onClick={() => toggleDrawer(false)}
            sx={{ color: theme.palette.gray.dark }}
          >
            <CloseIcon />
          </Button>
        </Box>
        <NavList />
      </Drawer>
      <NavList
        sx={{
          display: { xs: "none", md: "inherit" },
        }}
      />
    </>
  );
};
