import React, { memo, useContext } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { NotFoundRoomCategoriesBanner } from "./NotFoundRoomCategoriesBanner";
import { BookingContext, BookingProgressType } from "../BookingPage";
import { Box, Button, Stack } from "@mui/material";
import { BookingProgressIndicatorBaner } from "./BookingProgressIndicatorBaner";
import { theme } from "../../../theme";
import { CustomCircleProgressIndicator } from "../../components/shared/CustomCircleProgressIndicator";
import { SelectRoomSection } from "./SelectRoomSection";
import { SelectTariffSection } from "./SelectTariffSection/SelectTariffSection";
import { OrderServicesSection } from "./OrderServicesSection/OrderServicesSection";
import { EnterGuestsDetailsSection } from "./EnterGuestsDetailsSection/EnterGuestsDetailsSection";

interface Props {
  bookingProgress: BookingProgressType;
  isLoadingApiData: boolean;
}

export const StepContent = memo((props: Props) => {
  const { bookingProgress, isLoadingApiData } = props;
  const { roomsCategories } = useAppSelector((state) => state.roomsCategories);
  const { bookingSteps, filterParams, newBookings } = useAppSelector(
    (state) => state.bookings
  );
  const { availableRoomCategories, toPrevStep, toNextStep } =
    useContext(BookingContext);

  if (roomsCategories && roomsCategories?.length) {
    return availableRoomCategories && !availableRoomCategories.length ? (
      <NotFoundRoomCategoriesBanner />
    ) : (
      <Stack
        sx={{
          alignItems: "stretch",
          margin: "24px 0",
          background: theme.palette.layoutBackground.lightGray,
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <BookingProgressIndicatorBaner
          currentStepLabel={bookingProgress.currentStep.label}
          prevStepLabel={bookingProgress.prevStep.label}
          prevStepHandler={toPrevStep}
          nextStepLabel={bookingProgress.nextStep.label}
          nextStepHandler={toNextStep}
          currentStepIdx={bookingSteps.findIndex((i) => i.isCurrent) + 1 || 1}
          stepsTotal={bookingSteps.length}
        />

        {isLoadingApiData ? (
          <CustomCircleProgressIndicator />
        ) : (
          <Stack sx={{ flex: 1, padding: "24px" }}>
            {/* Тип интерфейса для множественного выбора номеров (со списком номеров и тарифов) */}
            {filterParams.rooms.length > 1 ? (
              <Box>
                {roomsCategories && roomsCategories?.length
                  ? roomsCategories.map((roomCategory, index) => {
                      return (
                        <Button key={index} onClick={() => null}>
                          Выбрать
                        </Button>
                      );
                    })
                  : null}

                {/* <BookingInfoWidget
              currentBookingStepIdx={currentBookingStepIdx}
              setCurrentBookingStepIdx={(idx: number) =>
                setCurrentBookingStepIdx(idx)
              }
            /> */}
              </Box>
            ) : //  Тип интерфейса для выбора одного номера (со списком номеров)
            filterParams.rooms.length === 1 ? (
              bookingProgress.currentStep.step?.name === "Select a room" ? (
                <SelectRoomSection
                  selectedRoomCategoryId={
                    newBookings.bookings.find(
                      (i) =>
                        i.tempId === bookingProgress.currentStep.step?.roomId
                    )?.room_category_id || null
                  }
                  availableRoomCategories={availableRoomCategories}
                  nextStepHandler={toNextStep}
                  prevStepHandler={toPrevStep}
                  containerStyles={{}}
                />
              ) : bookingProgress.currentStep.step?.name ===
                "Select a tariff" ? (
                <SelectTariffSection
                  bookingDate={{
                    arrival: filterParams.arrival_datetime,
                    departure: filterParams.departure_datetime,
                  }}
                  containerStyles={{}}
                />
              ) : bookingProgress.currentStep.step?.name ===
                "Order services" ? (
                <OrderServicesSection containerStyles={{}} />
              ) : bookingProgress.currentStep.step?.name ===
                "Enter guest details" ? (
                <EnterGuestsDetailsSection containerStyles={{}} />
              ) : null
            ) : null}
          </Stack>
        )}
      </Stack>
    );
  }
  return null;
});
