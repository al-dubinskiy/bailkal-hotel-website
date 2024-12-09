import { Stack, Typography } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { BookingContext } from "../../BookingPage";
import { RoomCategoryCard } from "../SelectTariffSection/components/RoomCategoryCard/RoomCategoryCard";
import { BookingInfoWidget } from "../BookingInfoWidget";
import { MoreAdvantageousRoomCategoryCard } from "./components/MoreAdvantageousRoomCategoryCard";
import { useAppSelector } from "../../../../hooks/redux";
import { RoomCategoryType } from "../../../../redux/slices/RoomsCategories/types";

interface Props {}

export const OrderServicesSection = (props: Props) => {
  const {} = props;

  const { roomQuests, roomCategory } = useContext(BookingContext);

  if (!roomQuests || !roomCategory) return null;

  const roomQuestsCount = roomQuests.adults + roomQuests.children;

  const roomCategoryPrice =
    roomQuestsCount === 1
      ? roomCategory.price_per_night_for_one_quest
      : roomCategory.price_per_night_for_two_quest;

  return (
    <Stack sx={{ alignItems: "stretch", gap: "24px" }}>
      <RoomCategoryCard />

      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-betwee",
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
        </Stack>

        <BookingInfoWidget roomCategoryPrice={roomCategoryPrice} />
      </Stack>
    </Stack>
  );
};
