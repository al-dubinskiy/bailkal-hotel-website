import { Stack, SxProps, Typography } from "@mui/material";
import React, { memo, useContext, useMemo } from "react";
import { BookingContext } from "../../BookingPage";
import { RoomCategoryCard } from "../SelectTariffSection/components/RoomCategoryCard/RoomCategoryCard";
import { BookingInfoWidget } from "../BookingInfoWidget";
import { MoreAdvantageousRoomCategoryCard } from "./components/MoreAdvantageousRoomCategoryCard";
import { useAppSelector } from "../../../../hooks/redux";
import { RoomCategoryType } from "../../../../redux/slices/RoomsCategories/types";
import { shallowEqual } from "react-redux";
import { ServicesList } from "./components/Services/ServicesList";
import { Transfer } from "./components/Transfer/Transfer";

interface Props {
  containerStyles: SxProps;
}

export const OrderServicesSection = memo(
  (props: Props) => {
    const { containerStyles } = props;

    const { roomQuests } = useContext(BookingContext);

    const { currentRoomCategory: roomCategory } = useAppSelector(
      (state) => state.bookings
    );

    if (!roomQuests || !roomCategory) return null;

    const roomQuestsCount = roomQuests.adults + roomQuests.children;

    const roomCategoryPrice =
      roomQuestsCount === 1
        ? roomCategory.price_per_night_for_one_quest
        : roomCategory.price_per_night_for_two_quest;

    return (
      <Stack sx={{ alignItems: "stretch", gap: "24px", ...containerStyles }}>
        <RoomCategoryCard />

        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "24px",
          }}
        >
          <Stack
            sx={{
              alignItems: "stretch",
              gap: "24px",
              flex: 0.7,
            }}
          >
            <Typography
              variant="label"
              sx={{ fontWeight: 600, alignSelf: "center" }}
            >
              Повысить комфорт
            </Typography>

            <MoreAdvantageousRoomCategoryCard />

            <ServicesList />

            <Transfer />
          </Stack>

          <BookingInfoWidget roomCategoryPrice={roomCategoryPrice} />
        </Stack>
      </Stack>
    );
  },
  (prevProps, nextProps) =>
    shallowEqual(prevProps, nextProps) ||
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
