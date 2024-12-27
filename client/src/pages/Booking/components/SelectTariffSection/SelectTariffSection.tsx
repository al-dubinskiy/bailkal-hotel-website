import React, { useContext } from "react";
import { Stack, SxProps } from "@mui/material";
import { RoomCategoryType } from "../../../../redux/slices/RoomsCategories/types";
import { useAppDispatch } from "../../../../hooks/redux";
import { RoomCategoryCard } from "./components/RoomCategoryCard/RoomCategoryCard";
import { TariffsList } from "./components/Tariffs/TariffsList";
import { Moment } from "moment";

export type BookingDateType = {
  arrival: Moment;
  departure: Moment;
};

interface Props {
  bookingDate: BookingDateType;
  containerStyles: SxProps;
}

export const SelectTariffSection = (props: Props) => {
  const { bookingDate, containerStyles } = props;
  const dispatch = useAppDispatch();

  return (
    <Stack sx={{ alignItems: "stretch", gap: "24px", ...containerStyles }}>
      <RoomCategoryCard />

      <TariffsList bookingDate={bookingDate} />
    </Stack>
  );
};
