import { Stack, SxProps, Typography } from "@mui/material";
import React, { memo, useContext, useEffect, useState } from "react";
import { Content } from "./components/Content";
import { BookingInfoWidget } from "../BookingInfoWidget";
import { ConfirmBookingModal } from "../ConfirmBookingModal";
import { BookingContext } from "../../BookingPage";
import { WishCreateNewBooking } from "../WishCreateNewBooking";
import { useAppSelector } from "../../../../hooks/redux";

interface Props {
  containerStyles?: SxProps;
}

export const EnterGuestsDetailsSection = memo((props: Props) => {
  const { containerStyles } = props;
  const { createBooking } = useAppSelector((state) => state.bookings);
  const { bookingProgressCurrentStep, setCompleteStep } =
    useContext(BookingContext);
  const [isEnableContinueButton, setIsEnableContinueButton] =
    useState<boolean>(false);
  const [isUpdateBookingsUserInfo, setIsUpdateBookingsUserInfo] =
    useState<boolean>(false);
  // Modals
  const [openModal, setOpenModal] = useState<
    "confirm_booking" | "wish_create_new_booking_modal" | ""
  >("");

  useEffect(() => {
    if (
      bookingProgressCurrentStep.step?.name === "Enter guest details" &&
      bookingProgressCurrentStep.step.isComplete &&
      openModal === ""
    ) {
      setOpenModal("confirm_booking");
    }
  }, [bookingProgressCurrentStep]);

  useEffect(() => {
    if (createBooking.successMessage) {
      setOpenModal("wish_create_new_booking_modal");
    }
  }, [createBooking.successMessage]);

  return (
    <>
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

      <ConfirmBookingModal
        open={openModal === "confirm_booking"}
        setOpen={() => setOpenModal("")}
      />

      <WishCreateNewBooking
        open={openModal === "wish_create_new_booking_modal"}
        setOpen={() => setOpenModal("")}
      />
    </>
  );
});
