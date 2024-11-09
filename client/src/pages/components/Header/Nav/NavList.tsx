import { Link, Stack, SxProps } from "@mui/material";
import React from "react";
import { theme } from "../../../../theme";

const navItems = [
  { name: "Главная", id: "home" },
  { name: "Номера", id: "rooms" },
  { name: "Об отеле", id: "about" },
  { name: "Отзывы", id: "reviews" },
  { name: "Контакты", id: "contacts" },
  { name: "Услуги", id: "services" },
  { name: "Еще", id: "more" },
];

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
        gap: { xs: "20px", md: "43.2px" },
      }}
    >
      {navItems.map((navItem) => (
        <Link
          key={navItem.id}
          textAlign={{ xs: "center", md: "initial" }}
          fontSize={{ xs: theme.typography.h4.fontSize, md: "initial" }}
          variant={"label"}
          sx={{
            color: theme.palette.text.primary,
            textDecoration: "none",
          }}
        >
          {navItem.name}
        </Link>
      ))}
    </Stack>
  );
};
