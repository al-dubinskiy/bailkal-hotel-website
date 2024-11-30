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
}

export const BookingStepsIndicatorBaner = (props: Props) => {
  const {
    currentStepLabel,
    prevStepLabel,
    prevStepHandler,
    nextStepLabel,
    nextStepHandler,
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
        padding: "24px",
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
        }}
      >
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
      </Stack>

      <Box
        sx={{
          height: "10px",
          background: theme.palette.primary.dark,
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "30%",
            background: theme.palette.primary.lighter,
          }}
        ></Box>
      </Box>
    </Stack>
  );
};
