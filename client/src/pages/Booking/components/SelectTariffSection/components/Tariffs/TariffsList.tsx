import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { TariffItem } from "./TariffItem/TariffItem";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import { GetBookingTariffs } from "../../../../../../redux/slices/BookingTariffs/bookingTariffsSlice";
import { RoomCategoryType } from "../../../../../../redux/slices/RoomsCategories/types";
import { Stack } from "@mui/material";
import { RoomQuestsCountType } from "../../../FiltersBar/SelectQuestsDropdown";
import { BookingDateType } from "../../SelectTariffSection";
import { BookingContext } from "../../../../BookingPage";

interface Props {
  roomQuestsCount: RoomQuestsCountType;
  bookingDate: BookingDateType;
}

export const TariffsList = (props: Props) => {
  const { roomQuestsCount, bookingDate } = props;
  const dispatch = useAppDispatch();
  const { bookingTariffs } = useAppSelector((state) => state.bookingTariffs);
  const { currentRoomCategory: roomCategory } = useAppSelector(
    (state) => state.bookings
  );

  const GetBookingsTariffsList = useCallback(() => {
    if (!bookingTariffs) {
      dispatch(GetBookingTariffs());
    }
  }, [bookingTariffs]);

  useEffect(() => {
    GetBookingsTariffsList();
  }, [GetBookingsTariffsList]);

  const questsCountTotal = useMemo(() => {
    const a = roomQuestsCount.adults + roomQuestsCount.children;
    return a > 0 ? a : -1;
  }, [roomQuestsCount]);

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
                  roomCategoryPrice={
                    questsCountTotal === -1
                      ? 0
                      : questsCountTotal > 1
                      ? roomCategory.price_per_night_for_two_quest
                      : roomCategory.price_per_night_for_one_quest
                  }
                  roomCategory={roomCategory}
                  roomQuestsCount={roomQuestsCount}
                  bookingDate={bookingDate}
                />
              );
            })
        : null}
    </Stack>
  );
};
