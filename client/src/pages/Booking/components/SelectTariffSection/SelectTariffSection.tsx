import React from "react";
import { Stack, SxProps } from "@mui/material";
import { useAppDispatch } from "../../../../hooks/redux";
import { RoomCategoryCard } from "./components/RoomCategoryCard/RoomCategoryCard";
import { TariffsList } from "./components/Tariffs/TariffsList";

interface Props {
  containerStyles?: SxProps;
}

export const SelectTariffSection = (props: Props) => {
  const { containerStyles } = props;

  return (
    <Stack sx={{ alignItems: "stretch", gap: "24px", ...containerStyles }}>
      <RoomCategoryCard />

      <TariffsList />
    </Stack>
  );
};
