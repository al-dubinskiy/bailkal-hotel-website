import { Stack, SxProps, Typography } from "@mui/material";
import React, { memo, useContext, useEffect, useState } from "react";
import { Content } from "./components/Content";
import { BookingInfoWidget } from "../BookingInfoWidget";
import { ConfirmBookingModal } from "../ConfirmBookingModal";
import { BookingContext } from "../../BookingPage";
import { WishCreateNewBooking } from "../WishCreateNewBooking";

interface Props {
  containerStyles?: SxProps;
}

export const EnterGuestsDetailsSection = (props: Props) => {
  const { containerStyles } = props;
  const { bookingProgressCurrentStep, setCompleteStep } =
    useContext(BookingContext);
  const [isEnableContinueButton, setIsEnableContinueButton] =
    useState<boolean>(false);
  const [isUpdateBookingsUserInfo, setIsUpdateBookingsUserInfo] =
    useState<boolean>(false);
  // Modals
  const [isOpenConfirmBookingModal, setIsOpenConfirmBookingModal] =
    useState<boolean>(false);
  const [isOpenWishCreateNewBookingModal, setIsOpenWishCreateNewBookingModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      bookingProgressCurrentStep.step?.name === "Enter guest details" &&
      bookingProgressCurrentStep.step.isComplete &&
      !isOpenConfirmBookingModal
    ) {
      setIsOpenConfirmBookingModal(true);
    }
  }, [bookingProgressCurrentStep]);

  const handleCloseModal = () => {
    if (
      bookingProgressCurrentStep.step?.name === "Enter guest details" &&
      bookingProgressCurrentStep.step.isComplete
    ) {
      setCompleteStep("Enter guest details", false);
    }
  };

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
        open={isOpenConfirmBookingModal}
        setOpen={setIsOpenConfirmBookingModal}
        handleCloseModal={handleCloseModal}
        setIsOpenWishCreateNewBookingModal={setIsOpenWishCreateNewBookingModal}
      />

      <WishCreateNewBooking
        open={isOpenWishCreateNewBookingModal || true}
        setOpen={setIsOpenWishCreateNewBookingModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
