import React, { useContext } from "react";
import { BookingServiceType } from "../../../../../../../redux/slices/BookingServices/types";
import { Box, Stack, Typography } from "@mui/material";
import { theme } from "../../../../../../../theme";
import { MiniBarIcon } from "../../../../../../../assets/icons/MiniBarIcon";
import { AdditionalBedIcon } from "../../../../../../../assets/icons/AdditionalBedIcon";
import { BreakfastBigIcon } from "../../../../../../../assets/icons/BreakfastBigIcon";
import { CustomIconLabel } from "../../../../../../components/shared/CustomIconLabel";
import { DigitsIcon } from "../../../../../../../assets/icons/DigitsIcon";
import { PersonIcon } from "../../../../../../../assets/icons/PersonIcon";
import { CustomButton } from "../../../../../../components/shared/CustomButton";
import { CheckboxIcon } from "../../../../../../../assets/icons/CheckboxIcon";
import { BookingContext } from "../../../../../BookingPage";
import { useAppSelector } from "../../../../../../../hooks/redux";

interface Props {
  service: BookingServiceType;
  isIncludes: boolean;
  allServices: BookingServiceType[];
}

export const ServicesItem = (props: Props) => {
  const { service, isIncludes, allServices } = props;

  const { currentBooking } = useAppSelector((state) => state.bookings);

  const { updateBookingDraft, bookingProgressCurrentStep } =
    useContext(BookingContext);

  if (!currentBooking) return null;

  const isSelected = currentBooking.service_id.includes(service._id);

  return (
    <Stack
      sx={{
        background: "#EEF4FF",
        borderRadius: "16px",
        padding: "24px",
        position: "relative",
        alignItems: "stretch",
        gap: "24px",
      }}
    >
      <Stack
        sx={{ flexDirection: "row", alignItems: "flex-start", gap: "24px" }}
      >
        <Box
          sx={{
            borderRadius: "16px",
            background: theme.palette.layoutBackground.light,
            minWidth: "160px",
            minHeight: "160px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {service.value === "mini_bar" ? (
            <MiniBarIcon sx={{ fontSize: "80px" }} />
          ) : service.value === "additional_bed" ? (
            <AdditionalBedIcon sx={{ fontSize: "80px" }} />
          ) : service.value === "breakfast" ? (
            <BreakfastBigIcon sx={{ fontSize: "80px" }} />
          ) : null}
        </Box>

        <Stack sx={{ gap: "10px" }}>
          <Typography variant="label" sx={{ fontWeight: 600 }}>
            {service.title}
          </Typography>

          {service.description ? (
            <Typography variant="body">{service.description}</Typography>
          ) : null}
        </Stack>
      </Stack>

      <Box
        style={{
          height: "4px",
          backgroundColor: theme.palette.layoutBackground.light,
          borderWidth: 0,
          borderRadius: "16px",
        }}
      />

      <Stack
        sx={{
          flexDirection: "row",
          gap: "24px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomIconLabel
          icon={
            service.value === "mini_bar" ? (
              <DigitsIcon sx={{ fontSize: "24px" }} />
            ) : service.value === "additional_bed" ? (
              <PersonIcon sx={{ fontSize: "24px", color: "#2F70D9" }} />
            ) : service.value === "breakfast" ? (
              <>
                <PersonIcon
                  sx={{
                    fontSize: "24px",
                    color: "#2F70D9",
                    marginRight: "-8px",
                  }}
                />
                <PersonIcon
                  sx={{
                    fontSize: "24px",
                    color: "#2F70D9",
                    marginRight: "10px",
                  }}
                />
              </>
            ) : null
          }
          label={
            service.forGuestsNumber === "all"
              ? "За 1 единицу для всех гостей"
              : service.forGuestsNumber === "1"
              ? "Для 1 гостя"
              : "Для 2 гостей"
          }
          sx={{
            gap: service.value === "breakfast" ? 0 : "10px",
          }}
        />

        {!isIncludes ? (
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="label"
                sx={{
                  color: theme.palette.primary.dark,
                  fontSize: "20.8px",
                }}
              >
                {service.price} ₽
              </Typography>
            </Box>

            <CustomButton
              label={!isSelected ? "Выбрать" : "Выбрано"}
              onClick={() => {
                const { step: currentStep } = bookingProgressCurrentStep;
                if (currentStep) {
                  updateBookingDraft({
                    currentStep,
                    tempBookingId: currentStep.roomId,
                    serviceId: service._id,
                    allServices,
                  });
                }
              }}
              containerVariant={!isSelected ? "contained" : "outlined"}
              containerBackgroundColor={"buttonDark"}
              containerStyle={{ padding: "0 40px" }}
              withoutAnimation
            />
          </Stack>
        ) : (
          <Stack sx={{ gap: "5px", alignItems: "flex-end" }}>
            <CustomIconLabel
              icon={<CheckboxIcon sx={{ fontSize: "24px" }} />}
              label={"Услуга включена"}
            />

            <Typography
              variant="small"
              sx={{ color: theme.palette.gray.light }}
            >
              за 1 ночь
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
