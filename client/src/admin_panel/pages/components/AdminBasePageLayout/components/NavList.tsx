import { Stack, SxProps } from "@mui/material";
import React from "react";
import { NavItemType } from "../../../../../pages/components/Header/components/Nav/NavList";
import { navItems } from "./navItems";
import { NavItem } from "./NavItem";

interface Props {
  sx?: SxProps;
}

export const NavList = (props: Props) => {
  const { sx } = props;

  return (
    <Stack sx={{ gap: "24px", ...sx }}>
      {navItems.map((navItem: NavItemType, navItem_index: number) => {
        return (
          <NavItem key={navItem_index} id={navItem.name} navItem={navItem} />
        );
      })}
    </Stack>
  );
};
