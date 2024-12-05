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

interface Props {
  tariff: BookingTariffType;
  roomCategoryPrice: number;
  roomQuestsCount: RoomQuestsCountType;
}

export const TariffItem = (props: Props) => {
  const { tariff, roomCategoryPrice, roomQuestsCount } = props;

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
            paddingTop: "74px",
            gap: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
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
              <Typography variant="body">-15%</Typography>
            </Box>

            <Typography
              variant="body"
              sx={{
                color: theme.palette.gray.light,
                textDecoration: "line-through",
              }}
            >
              -6600 ₽
            </Typography>
          </Box>

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
                alignItems: "flex-start",
              }}
            >
              {roomQuestsCount.adults > 1 ? (
                <>
                  <PersonIcon sx={{ fontSize: "24px" }} />
                  <PersonIcon sx={{ fontSize: "24px" }} />
                </>
              ) : (
                <>
                  <PersonIcon sx={{ fontSize: "24px" }} />
                </>
              )}

              {roomQuestsCount.children > 0 ? (
                <PersonIcon sx={{ fontSize: "16px" }} />
              ) : null}
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

            <CustomButton
              startIcon={
                <InfoOutlined
                  sx={{ fontSize: "24px", color: theme.palette.gray.dark }}
                />
              }
              containerStyle={{
                padding: 0,
                background: "transparent",
              }}
              withoutAnimation
              onClick={() => null}
            />
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
          withoutAnimation
        />
      </Stack>
    </Stack>
  );
};
