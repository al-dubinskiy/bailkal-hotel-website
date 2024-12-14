import React from "react";
import { TransferCarType } from "../../../../../../../redux/slices/TransferCars/types";
import { Box, Stack, SxProps, Typography } from "@mui/material";
import { PeoplesIcon } from "../../../../../../../assets/icons/PeoplesIcon";
import { CustomIconLabel } from "../../../../../../components/shared/CustomIconLabel";
import { theme } from "../../../../../../../theme";
import { CustomButton } from "../../../../../../components/shared/CustomButton";

interface Props {
  transferCars: TransferCarType[] | null;
  selectedCarId: string;
  setSelectedCardId: (id: string) => void;
  containerStyles?: SxProps;
}

export const TransportStepContent = (props: Props) => {
  const { transferCars, selectedCarId, setSelectedCardId, containerStyles } =
    props;

  if (!transferCars) return null;

  return (
    <Stack sx={{ alignItems: "stretch", gap: "24px" }}>
      {transferCars.map((item, index) => {
        const isSelected = selectedCarId === item._id;
        return (
          <Stack
            key={index}
            sx={{
              background: "#EEF4FF",
              borderRadius: "16px",
              padding: "24px",
              position: "relative",
              alignItems: "stretch",
              gap: "24px",
              ...containerStyles,
            }}
          >
            <Stack sx={{ gap: "10px" }}>
              <Typography variant="label" sx={{ fontWeight: 600 }}>
                {item.brand + " " + item.model}
              </Typography>

              <CustomIconLabel
                icon={<PeoplesIcon sx={{ fontSize: "24px" }} />}
                label={`До ${item.seats_number} человек`}
              />
            </Stack>

            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "24px",
                alignSelf: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Typography
                  variant="label"
                  sx={{
                    color: theme.palette.primary.dark,
                    fontSize: "20.8px",
                  }}
                >
                  {1500} ₽
                </Typography>

                <Typography
                  variant="someSmall"
                  sx={{
                    color: theme.palette.gray.light,
                  }}
                >
                  за 1 поездку
                </Typography>
              </Box>

              <CustomButton
                label={!isSelected ? "Выбрать" : "Выбрано"}
                onClick={() => {
                  setSelectedCardId(item._id);
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
      })}
    </Stack>
  );
};
