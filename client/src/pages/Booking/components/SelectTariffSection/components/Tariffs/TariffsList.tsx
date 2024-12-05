import React, { useCallback, useEffect, useMemo } from "react";
import { TariffItem } from "./TariffItem/TariffItem";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import { GetBookingTariffs } from "../../../../../../redux/slices/BookingTariffs/bookingTariffsSlice";
import { RoomCategoryType } from "../../../../../../redux/slices/RoomsCategories/types";
import { Stack } from "@mui/material";
import { RoomQuestsCountType } from "../../../FiltersBar/SelectQuestsDropdown";

interface Props {
  roomCategory: RoomCategoryType;
  roomQuestsCount: RoomQuestsCountType;
}

export const TariffsList = (props: Props) => {
  const { roomCategory, roomQuestsCount } = props;
  const dispatch = useAppDispatch();
  const { bookingTariffs } = useAppSelector((state) => state.bookingTariffs);

  const GetUnavailableBookingDatesList = useCallback(() => {
    if (!bookingTariffs) {
      dispatch(GetBookingTariffs());
    }
  }, [bookingTariffs]);

  useEffect(() => {
    GetUnavailableBookingDatesList();
  }, [GetUnavailableBookingDatesList]);

  const questsCountTotal = useMemo(() => {
    const a = roomQuestsCount.adults + roomQuestsCount.children;
    return a > 0 ? a : -1;
  }, [roomQuestsCount]);

  if (!bookingTariffs) return <></>;

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
                  roomQuestsCount={roomQuestsCount}
                />
              );
            })
        : null}
    </Stack>
  );
};
