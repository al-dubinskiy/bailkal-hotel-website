import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavItemType } from "./NavList";
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

          "&:hover": {
            cursor: "pointer",
            opacity: 0.7,
          },
        }}
      >
        <Typography
          variant="label"
          color="inherit"
          sx={{
            color: isActiveLink
              ? theme.palette.primary.dark
              : theme.palette.text.primary,
            fontFamily: {
              xs: theme.typography.h4.fontFamily,
              md: theme.typography.label.fontFamily,
            },
            fontSize: { xs: theme.typography.h4.fontSize, md: "initial" },
            textAlign: { xs: "center", md: "initial" },
          }}
        >
          {navItem.name}
        </Typography>

        {navItem.subItems ? (
          <Button
            onClick={handleSubMenuOpen}
            sx={{
              minWidth: "0",
              padding: "0",
              marginLeft: "5px",
              transform: `rotate(${anchorEl ? "180deg" : 0})`,
              "& > *": {
                backgroundColor: "unset",
                background: "unset",
              },
            }}
          >
            <ExpandMoreIcon
              sx={{ fontSize: "16px" }}
              htmlColor={
                isActiveLink
                  ? theme.palette.primary.dark
                  : theme.palette.text.primary
              }
            />
          </Button>
        ) : null}
      </Link>

      {navItem.subItems ? (
        <Menu
          disablePortal
          id={`nav-sub-menu-menu-${id}`}
          anchorEl={anchorEl}
          open={open}
          onClose={handleSubMenuClose}
          sx={{
            borderRadius: theme.shape.borderRadius,

            "& .MuiList-root": {
              "& .MuiButtonBase-root": {},
            },
          }}
          MenuListProps={{
            "aria-labelledby": `nav-sub-menu-button-${id}`,
          }}
          role="menu"
        >
          {navItem.subItems.map(
            (subItem: NavItemType, subItem_index: number) => {
              return (
                <MenuItem
                  key={subItem_index}
                  href={subItem.link ? subItem.link : "/"}
                  LinkComponent={"a"}
                  onClick={() => handleSubMenuItemClick(subItem.link)}
                >
                  <Typography variant="label">{subItem.name}</Typography>
                </MenuItem>
              );
            }
          )}
        </Menu>
      ) : null}
    </Box>
  );
};
