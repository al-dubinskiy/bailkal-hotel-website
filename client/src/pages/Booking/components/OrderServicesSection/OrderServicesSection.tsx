import { Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { BookingContext } from "../../BookingPage";
import { RoomCategoryCard } from "../SelectTariffSection/components/RoomCategoryCard/RoomCategoryCard";
import { BookingInfoWidget } from "../BookingInfoWidget";

interface Props {}

export const OrderServicesSection = (props: Props) => {
  const {} = props;

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
        </Stack>

        <BookingInfoWidget />
      </Stack>
    </Stack>
  );
};
