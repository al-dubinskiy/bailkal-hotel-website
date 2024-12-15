import { Stack, SxProps, Typography } from "@mui/material";
import React from "react";
import { Content } from "./components/Content";
import { BookingInfoWidget } from "../BookingInfoWidget";

interface Props {
  containerStyles?: SxProps;
}

export const EnterGuestsDetailsSection = (props: Props) => {
  const { containerStyles } = props;
  return (
    <Stack sx={{ alignItems: "stretch", ...containerStyles }}>
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
          <Content />
        </Stack>

        <BookingInfoWidget />
      </Stack>
    </Stack>
  );
};
