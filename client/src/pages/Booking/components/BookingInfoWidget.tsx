import React from "react";
import { Button, Stack } from "@mui/material";

interface Props {
  currentBookingStepIdx: number;
  setCurrentBookingStepIdx: (idx: number) => void;
}

export const BookingInfoWidget = (props: Props) => {
  const { currentBookingStepIdx, setCurrentBookingStepIdx } = props;

  return (
    <Stack>
      <Button
        onClick={() => setCurrentBookingStepIdx(currentBookingStepIdx + 1)}
      >
        Продолжить
      </Button>
    </Stack>
  );
};
