import { Stack, SxProps, Typography } from "@mui/material";
import React, { memo, useState } from "react";
import { Content } from "./components/Content";
import { BookingInfoWidget } from "../BookingInfoWidget";

interface Props {
  containerStyles?: SxProps;
}

export const EnterGuestsDetailsSection = (props: Props) => {
  const { containerStyles } = props;
  const [isEnableContinueButton, setIsEnableContinueButton] =
    useState<boolean>(false);
  const [isUpdateBookingsUserInfo, setIsUpdateBookingsUserInfo] =
    useState<boolean>(false);

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
          <Content
            isUpdateBookingsUserInfo={isUpdateBookingsUserInfo}
            setIsUpdateBookingsUserInfo={setIsUpdateBookingsUserInfo}
            isEnableContinueButton={isEnableContinueButton}
            setIsEnableContinueButton={setIsEnableContinueButton}
          />
        </Stack>

        <BookingInfoWidget
          setIsUpdateBookingsUserInfo={setIsUpdateBookingsUserInfo}
          isEnableContinueButton={isEnableContinueButton}
        />
      </Stack>
    </Stack>
  );
};
