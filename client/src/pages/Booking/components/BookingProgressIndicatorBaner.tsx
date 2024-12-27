import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { CustomCircleIconButton } from "../../components/shared/CustomCircleIconButton";
import { theme } from "../../../theme";
import { SolarArrowRightOutlineIcon } from "../../../assets/icons/SolarArrowRightOutlineIcon";
import { SolarArrowLeftOutlineIcon } from "../../../assets/icons/SolarArrowLeftOutlineIcon";

interface Props {
  currentStepLabel: string;
  prevStepLabel: string;
  prevStepHandler: () => void;
  nextStepLabel: string;
  nextStepHandler: () => void;
  stepsTotal: number;
  currentStepIdx: number;
}

export const BookingProgressIndicatorBaner = (props: Props) => {
  const {
    currentStepLabel,
    prevStepLabel,
    prevStepHandler,
    nextStepLabel,
    nextStepHandler,
    stepsTotal,
    currentStepIdx,
  } = props;
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        backgroundColor: "#EEF4FF",
        height: "90px",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          position: "relative",
          padding: "0 24px",
          height: "80px",
        }}
      >
        {prevStepLabel ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <CustomCircleIconButton
              icon={<SolarArrowLeftOutlineIcon sx={{ fontSize: "32px" }} />}
              onClick={prevStepHandler}
            />
            <Typography variant="label">{prevStepLabel}</Typography>
          </Box>
        ) : (
          <div></div>
        )}

        <Typography
          variant="label"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {currentStepLabel}
        </Typography>

        {nextStepLabel ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography variant="label">{nextStepLabel}</Typography>
            <CustomCircleIconButton
              icon={<SolarArrowRightOutlineIcon sx={{ fontSize: "32px" }} />}
              onClick={nextStepHandler}
            />
          </Box>
        ) : (
          <div></div>
        )}
      </Stack>

      <Box
        sx={{
          width: "100%",
          height: "8px",
          background: theme.palette.gray.extraLight,
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: `${(currentStepIdx * 100) / stepsTotal}%`,
            height: "100%",
            background: theme.palette.primary.dark,
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "20px",
          }}
        ></Box>
      </Box>
    </Stack>
  );
};
