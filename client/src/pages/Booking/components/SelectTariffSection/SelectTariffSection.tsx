import React, { useContext } from "react";
import { Stack } from "@mui/material";
import { RoomCategoryType } from "../../../../redux/slices/RoomsCategories/types";
import { useAppDispatch } from "../../../../hooks/redux";
import { RoomCategoryCard } from "./components/RoomCategoryCard/RoomCategoryCard";
import { SpecialWishesSelector } from "./components/RoomCategoryCard/components/SpecialWishesSelector";
import { TariffsList } from "./components/Tariffs/TariffsList";
import { RoomQuestsCountType } from "../FiltersBar/SelectQuestsDropdown";
import { Moment } from "moment";
import { BookingContext } from "../../BookingPage";

export type BookingDateType = {
  arrival: Moment;
  departure: Moment;
};

interface Props {
  roomQuestsCount: RoomQuestsCountType;
  bookingDate: BookingDateType;
}

export const SelectTariffSection = (props: Props) => {
  const { roomQuestsCount, bookingDate } = props;
  const dispatch = useAppDispatch();

  return (
    <Stack sx={{ alignItems: "stretch", gap: "24px" }}>
      <RoomCategoryCard />

      <TariffsList
        roomQuestsCount={roomQuestsCount}
        bookingDate={bookingDate}
      />
    </Stack>
  );
};
