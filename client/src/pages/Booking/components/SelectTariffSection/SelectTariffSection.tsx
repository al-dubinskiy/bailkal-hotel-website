import React from "react";
import { Stack } from "@mui/material";
import { RoomCategoryType } from "../../../../redux/slices/RoomsCategories/types";
import { useAppDispatch } from "../../../../hooks/redux";
import { RoomCategoryCard } from "./components/RoomCategoryCard/RoomCategoryCard";
import { SpecialWishesSelector } from "./components/RoomCategoryCard/components/SpecialWishesSelector";
import { TariffsList } from "./components/Tariffs/TariffsList";
import { RoomQuestsCountType } from "../FiltersBar/SelectQuestsDropdown";

interface Props {
  roomCategory: RoomCategoryType | null;
  roomQuestsCount: RoomQuestsCountType;
}

export const SelectTariffSection = (props: Props) => {
  const { roomCategory, roomQuestsCount } = props;
  const dispatch = useAppDispatch();

  if (!roomCategory) return null;

  return (
    <Stack sx={{ alignItems: "stretch", gap: "24px" }}>
      <RoomCategoryCard roomCategory={roomCategory} />

      <TariffsList
        roomCategory={roomCategory}
        roomQuestsCount={roomQuestsCount}
      />
    </Stack>
  );
};
