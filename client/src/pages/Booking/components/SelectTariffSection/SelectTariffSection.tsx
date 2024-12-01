import React from "react";
import { Stack } from "@mui/material";
import { RoomCategoryType } from "../../../../redux/slices/RoomsCategories/types";
import { useAppDispatch } from "../../../../hooks/redux";
import { RoomCategoryCard } from "./components/RoomCategoryCard";
import { SpecialWishesSelector } from "./components/SpecialWishesSelector";

interface Props {
  roomCategory: RoomCategoryType | null;
}

export const SelectTariffSection = (props: Props) => {
  const { roomCategory } = props;
  const dispatch = useAppDispatch();

  return (
    <Stack sx={{ alignItems: "stretch", gap: "24px" }}>
      <RoomCategoryCard roomCategory={roomCategory} />

      <SpecialWishesSelector roomCategory={roomCategory} />
    </Stack>
  );
};
