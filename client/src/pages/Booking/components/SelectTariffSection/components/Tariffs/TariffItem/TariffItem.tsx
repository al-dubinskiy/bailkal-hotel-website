import { Box, Stack, Typography } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
import { CustomCircleIconButton } from "../../../../../../components/shared/CustomCircleIconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { BookingTariffType } from "../../../../../../../redux/slices/BookingTariffs/types";
import { TariffsList } from "../TariffsList";
import { Features } from "./components/Features";
import { theme } from "../../../../../../../theme";
import { CustomButton } from "../../../../../../components/shared/CustomButton";
import { InfoOutlined } from "@mui/icons-material";
import { PersonIcon } from "../../../../../../../assets/icons/PersonIcon";
import { PriceDetailsPopup } from "./components/PriceDetailsPopup";
import { BookingDateType } from "../../../SelectTariffSection";
import { TariffDetails } from "./components/TariffDetails";
import { RoomCategoryType } from "../../../../../../../redux/slices/RoomsCategories/types";
import {
  BookingContext,
  BookingProgressStepType,
} from "../../../../../BookingPage";
import { useAppSelector } from "../../../../../../../hooks/redux";

interface Props {
  tariff: BookingTariffType;
  roomCategory: RoomCategoryType;
  bookingDate: BookingDateType;
}

export const TariffItem = (props: Props) => {
  const { tariff, roomCategory, bookingDate } = props;
  const { currentBooking, filterParams } = useAppSelector(
    (state) => state.bookings
  );

  const [tariffDetailsOpen, setTariffDetailsOpen] = useState<boolean>(false);

  const { updateBookingDraft, bookingProgressCurrentStep } =
    useContext(BookingContext);

  const isSelected = currentBooking?.tariff_id === tariff._id ? true : false;

  const bookingGuests = useMemo(() => {
    if (currentBooking) {
      return filterParams.rooms.find((i) => i.id === currentBooking.tempId);
    }
    return false;
  }, [filterParams, currentBooking]);

  if (!bookingGuests) return null;

  return (
    <Stack
      sx={{
        background: "#EEF4FF",
        borderRadius: "16px",
        padding: "24px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "24px",
          right: "24px",
          "&:after": {
            content: "''",
            width: "40px",
            height: "100px",
            display: tariffDetailsOpen ? "inline-block" : "none",
            position: "absolute",
            top: 0,
            left: 0,
            background: theme.palette.background.paper,
            zIndex: 0,
            borderTopLeftRadius: "40px",
            borderTopRightRadius: "40px",
          },
        }}
      >
        <CustomCircleIconButton
          icon={<KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />}
          onClick={() => setTariffDetailsOpen((prev) => !prev)}
          sx={{
            minWidth: "40px",
            width: "40px",
            height: "40px",
            zIndex: 1,
            transform: `rotate(${tariffDetailsOpen ? 180 : 0}deg)`,
          }}
        />
      </Box>

      <Typography
        variant="label"
        sx={{ fontWeight: 600, marginBottom: "24px" }}
      >
        {tariff.title}
      </Typography>

      {tariffDetailsOpen ? (
        <TariffDetails
          included_services={tariff.included_services}
          payment_and_cancellation_terms={tariff.payment_and_cancellation_terms}
          note={tariff.note}
        />
      ) : null}

      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Features
          included_breakfast={tariff.included_breakfast}
          terms_сancellation={tariff.terms_сancellation}
          payment_method_id={tariff.payment_method_id}
        />

        <Stack
          sx={{ flexDirection: "row", alignItems: "flex-end", gap: "24px" }}
        >
          <Stack
            sx={{
              paddingTop: "24px",
              gap: 0,
              alignItems: "flex-end",
            }}
          >
            {tariff.discount ? (
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
                  }}
                >
                  <Typography variant="body">-{tariff.discount}%</Typography>
                </Box>

                <Typography
                  variant="body"
                  sx={{
                    color: theme.palette.gray.light,
                    textDecoration: "line-through",
                  }}
                >
                  {((tariff.cost * 100) / (100 - tariff.discount)).toFixed()}₽
                </Typography>
              </Box>
            ) : null}

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                {bookingGuests.children > 0 ? (
                  <PersonIcon sx={{ fontSize: "16px", marginRight: "-5px" }} />
                ) : null}
                {bookingGuests.adults > 1 ? (
                  <>
                    <PersonIcon
                      sx={{ fontSize: "24px", marginRight: "-8px" }}
                    />
                    <PersonIcon sx={{ fontSize: "24px" }} />
                  </>
                ) : (
                  <>
                    <PersonIcon sx={{ fontSize: "24px" }} />
                  </>
                )}
              </Box>

              <Typography
                variant="body"
                sx={{
                  color: theme.palette.primary.dark,
                  fontSize: "20.8px",
                }}
              >
                + {tariff.cost}₽
              </Typography>

              <PriceDetailsPopup bookingDate={bookingDate} />
            </Box>
            <Typography variant="body">стоимость за 1 ночь</Typography>
          </Stack>

          <CustomButton
            label={!isSelected ? "Выбрать" : "Выбрано"}
            onClick={() => {
              const { step: currentStep } = bookingProgressCurrentStep;
              if (currentStep && roomCategory) {
                updateBookingDraft({
                  currentStep,
                  roomCategory,
                  tempBookingId: currentStep.roomId,
                  tariff: tariff,
                });
              }
            }}
            containerVariant={!isSelected ? "contained" : "outlined"}
            disabled={Boolean(isSelected)}
            containerBackgroundColor={"buttonDark"}
            containerStyle={{ padding: "0 40px" }}
            withoutAnimation
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
