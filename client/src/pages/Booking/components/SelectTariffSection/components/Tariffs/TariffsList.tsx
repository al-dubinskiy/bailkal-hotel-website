import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { TariffItem } from "./TariffItem/TariffItem";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import { GetBookingTariffs } from "../../../../../../redux/slices/BookingTariffs/bookingTariffsSlice";
import { Stack } from "@mui/material";
import { BookingDateType } from "../../SelectTariffSection";

interface Props {
  bookingDate: BookingDateType;
}

export const TariffsList = (props: Props) => {
  const { bookingDate } = props;
  const dispatch = useAppDispatch();
  const { bookingTariffs } = useAppSelector((state) => state.bookingTariffs);
  const {
    currentRoomCategory: roomCategory,
    currentBooking,
    filterParams,
  } = useAppSelector((state) => state.bookings);

  const GetBookingsTariffsList = useCallback(() => {
    if (!bookingTariffs) {
      dispatch(GetBookingTariffs());
    }
  }, [bookingTariffs]);

  useEffect(() => {
    GetBookingsTariffsList();
  }, [GetBookingsTariffsList]);

  if (!bookingTariffs || !roomCategory) return null;

  return (
    <Stack sx={{ alignItems: "stretch", gap: "24px" }}>
      {bookingTariffs
        ? bookingTariffs
            .filter((i) => roomCategory.available_tariff_id.includes(i._id))
            .map((item, index) => {
              return (
                <TariffItem
                  key={index}
                  tariff={item}
                  roomCategory={roomCategory}
                  bookingDate={bookingDate}
                />
              );
            })
        : null}
    </Stack>
  );
};
