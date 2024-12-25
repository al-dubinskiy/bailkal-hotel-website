import { Stack, SxProps } from "@mui/material";
import React, { ReactElement, useMemo } from "react";
import { theme } from "../../../../../theme";
import { useTranslation } from "react-i18next";
import { NavItem } from "./NavItem";
import { navItems } from "./navItems";

export type NavItemType = {
  name: string;
  id: string;
  link?: string;
  subItems?: {
    name: string;
    id: string;
    link?: string;
  }[];
  icon?: ReactElement;
};

interface Props {
  sx?: SxProps;
}

export const NavList = (props: Props) => {
  const { sx } = props;

  return (
    <Stack
      overflow="auto"
      direction={{ xs: "column", md: "row" }}
      width={{ xs: "100%", md: "initial" }}
      sx={{
        ...sx,
        flex: 1,
        justifyContent: "flex-end",
        columnGap: {
          xs: "0px",
          md: "22px",
          lg: "30px",
          xl: "35px",
          xxl: "43px",
        },
        rowGap: { xs: "24px", md: "10px" },
        flexWrap: { xs: "nowrap", md: "wrap" },
        padding: { xs: "24px", md: "0" },
        alignItems: "center",
      }}
    >
      {navItems.map((navItem: NavItemType, navItem_index: number) => {
        return (
          <NavItem key={navItem_index} id={navItem.name} navItem={navItem} />
        );
      })}
    </Stack>
  );
};
