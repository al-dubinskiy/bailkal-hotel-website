import React, { useContext } from "react";
import { RoomCategoryType } from "../../../../../redux/slices/RoomsCategories/types";
import { Box, Stack, Typography } from "@mui/material";
import { theme } from "../../../../../theme";
import { CustomButton } from "../../../../components/shared/CustomButton";
import { SelectRoomContext } from "../../SelectRoomSection";
import { BookingContext } from "../../../BookingPage";

interface Props {}

export const PriceBottomBar = (props: Props) => {
  const {} = props;
  const { roomCategory, roomGuestsCount, selectedRoomCategoryId } =
    useContext(SelectRoomContext);

  const { updateBookingDraft, bookingProgressCurrentStep } =
    useContext(BookingContext);

  if (!roomCategory) return null;

  const roomPrice =
    roomGuestsCount > 1
      ? roomCategory.price_per_night_for_two_quest
      : roomCategory.price_per_night_for_one_quest;

  const roomDiscount = Number(
    ((roomPrice * 100) / (100 - roomCategory.discount)).toFixed(0)
  );

  const isSelected =
    selectedRoomCategoryId && selectedRoomCategoryId === roomCategory._id;

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "24px",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 1,
        boxShadow: "0px 3.2px 40px rgba(0, 0, 0, 0.25);",
        width: "100%",
        height: "120px",
        background: theme.palette.layoutBackground.light,
        padding: "0 24px",
        borderRadius: "16px",
      }}
    >
      <Stack
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0px",
        }}
      >
        {roomCategory.discount > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.palette.secondary.main,
                padding: "0 5px",
              }}
            >
              <Typography variant="body">-{roomCategory.discount}%</Typography>
            </Box>

            <Typography
              variant="body"
              sx={{
                color: theme.palette.gray.light,
                textDecoration: "line-through",
              }}
            >
              {roomDiscount} ₽
            </Typography>
          </Box>
        ) : null}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Typography variant="body" sx={{ color: theme.palette.text.primary }}>
            от
          </Typography>

          <Typography
            variant="label"
            sx={{
              color: theme.palette.primary.dark,
              fontSize: "20.8px",
            }}
          >
            {roomPrice} ₽
          </Typography>
        </Box>

        <Typography variant="body">
          1 ночь / {roomGuestsCount} гост
          {roomGuestsCount > 1 ? "я" : "ь"}
        </Typography>
      </Stack>

      <CustomButton
        label={!isSelected ? "Выбрать" : "Выбрано"}
        onClick={() => {
          const { step: currentStep } = bookingProgressCurrentStep;
          if (currentStep) {
            updateBookingDraft({
              currentStep,
              roomCategory,
              tempBookingId: currentStep.roomId,
            });
          }
        }}
        containerVariant={!isSelected ? "contained" : "outlined"}
        disabled={Boolean(isSelected)}
        containerBackgroundColor={"buttonDark"}
        withoutAnimation
      />
    </Stack>
  );
};
