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

    const { currentRoomCategory } = useAppSelector((state) => state.bookings);

    if (!currentRoomCategory) return null;

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

            <Typography
              variant="label"
              sx={{ fontWeight: 600, alignSelf: "center" }}
            >
              Выберите дополнительные услуги
            </Typography>

            <ServicesList />

            <Transfer />
          </Stack>

          <BookingInfoWidget />
        </Stack>
      </Stack>
    );
  },
  (prevProps, nextProps) =>
    shallowEqual(prevProps, nextProps) ||
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
