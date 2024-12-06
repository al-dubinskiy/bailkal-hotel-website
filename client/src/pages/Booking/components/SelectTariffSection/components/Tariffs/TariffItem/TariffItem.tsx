import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { CustomCircleIconButton } from "../../../../../../components/shared/CustomCircleIconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { BookingTariffType } from "../../../../../../../redux/slices/BookingTariffs/types";
import { TariffsList } from "../TariffsList";
import { Features } from "./components/Features";
import { theme } from "../../../../../../../theme";
import { CustomButton } from "../../../../../../components/shared/CustomButton";
import { InfoOutlined } from "@mui/icons-material";
import { PersonIcon } from "../../../../../../../assets/icons/PersonIconIcon";
import { RoomQuestsCountType } from "../../../../FiltersBar/SelectQuestsDropdown";
import { PriceDetailsPopup } from "./components/PriceDetailsPopup";
import { BookingDateType } from "../../../SelectTariffSection";

interface Props {
  tariff: BookingTariffType;
  roomCategoryPrice: number;
  roomQuestsCount: RoomQuestsCountType;
  bookingDate: BookingDateType;
}

export const TariffItem = (props: Props) => {
  const { tariff, roomCategoryPrice, roomQuestsCount, bookingDate } = props;

  const isSelected = false;

  return (
    <Stack
      sx={{
        background: "#EEF4FF",
        borderRadius: "16px",
        padding: "24px",
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <CustomCircleIconButton
        icon={<KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />}
        onClick={() => null}
        sx={{
          position: "absolute",
          top: "24px",
          right: "24px",
          minWidth: "40px",
          width: "40px",
          height: "40px",
        }}
      />

      <Stack
        sx={{
          alignItems: "stretch",
        }}
      >
        <Typography
          variant="label"
          sx={{ fontWeight: 600, marginBottom: "24px" }}
        >
          {tariff.title}
        </Typography>

        <Features
          included_breakfast={tariff.included_breakfast}
          terms_сancellation={tariff.terms_сancellation}
          payment_method_id={tariff.payment_method_id}
          included_services={tariff.included_services}
          paymentAndCancellationTerms={tariff.paymentAndCancellationTerms}
        />
      </Stack>

      <Stack sx={{ flexDirection: "row", alignItems: "flex-end", gap: "24px" }}>
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
                {roomCategoryPrice +
                  (tariff.cost * 100) / (100 - tariff.discount)}
                ₽
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
              {roomQuestsCount.children > 0 ? (
                <PersonIcon sx={{ fontSize: "16px", marginRight: "-5px" }} />
              ) : null}
              {roomQuestsCount.adults > 1 ? (
                <>
                  <PersonIcon sx={{ fontSize: "24px", marginRight: "-8px" }} />
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
              {roomCategoryPrice + tariff.cost}₽
            </Typography>

            <PriceDetailsPopup bookingDate={bookingDate} />
          </Box>
          <Typography variant="body">стоимость за 1 ночь</Typography>
        </Stack>

        <CustomButton
          label={!isSelected ? "Выбрать" : "Выбрано"}
          onClick={() => {
            // const currentStep = bookingProgress.currentStep.step;
            // if (currentStep) {
            //   updateNewBookingDraft({
            //     currentStep,
            //     roomCategory,
            //     tempBookingId: currentStep.roomId,
            //   });
            // }
          }}
          containerVariant={!isSelected ? "contained" : "outlined"}
          disabled={Boolean(isSelected)}
          containerBackgroundColor={"buttonDark"}
          containerStyle={{ padding: "0 40px" }}
          withoutAnimation
        />
      </Stack>
    </Stack>
  );
};
