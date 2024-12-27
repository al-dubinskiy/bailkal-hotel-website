import React, { useMemo, useState } from "react";
import { NavItemType } from "../../../../../pages/components/Header/components/Nav/NavList";
import { Box, Button, Link, Typography } from "@mui/material";
import { theme } from "../../../../../theme";

interface Props {
  id: string;
  navItem: NavItemType;
}

export const NavItem = (props: Props) => {
  const { id, navItem } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleSubMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    link?: string
  ) => {
    if (link) window.location.href = link; // Если пункт меню без доп. меню
    else setAnchorEl(event.currentTarget); // Если пункт меню с доп. меню
  };

  const handleSubMenuItemClick = (link?: string) => {
    if (link) window.location.href = link;
    setAnchorEl(null);
  };

  const isActiveLink = useMemo((): boolean => {
    const a = window.location.pathname === navItem.link;
    const b =
      navItem.subItems &&
      navItem.subItems.find((i) => {
        return i.link && i.link === window.location.pathname;
      })
        ? true
        : false;

    return a || b;
  }, [navItem]);

  return (
    <Box key={id}>
      <Link
        key={navItem.id}
        onClick={(event: any) => handleMenuItemClick(event, navItem.link)}
        variant={"label"}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          textDecoration: "none",
          gap: "15px",

          "&:hover": {
            cursor: "pointer",
            opacity: 0.7,
          },
        }}
      >
        {navItem.icon ? navItem.icon : null}

        <Typography
          variant="label"
          color="inherit"
          sx={{
            color: isActiveLink
              ? theme.palette.primary.dark
              : theme.palette.text.primary,
            fontFamily: theme.typography.label.fontFamily,
            fontSize: "initial",
            textAlign: "initial",
          }}
        >
          {navItem.name}
        </Typography>
      </Link>
    </Box>
  );
};
