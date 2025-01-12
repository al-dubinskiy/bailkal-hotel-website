import { Box, LinearProgress, Stack, SxProps, Typography } from "@mui/material";
import React, { memo, useCallback, useMemo, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { CalendarIcon } from "../../../../assets/icons/CalendarIcon";
import { theme } from "../../../../theme";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { ru } from "date-fns/locale/ru"; // the locale you want
registerLocale("ru", ru); // register it with the name you want

interface Props {
  selectedDatesMs: number[];
  setSelectedDatesMs: (val: number[]) => void;
  unavailableBookingDatesMs: number[];
}

export const CustomMultipleDatepicker = memo((props: Props) => {
  const { selectedDatesMs, setSelectedDatesMs, unavailableBookingDatesMs } =
    props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onChange = (dates: any) => {
    setSelectedDatesMs(dates.map((i: any) => i.getTime()));
  };

  const CustomDay = useCallback(
    ({ date }: { date: Date }) => {
      const isUnvailable = unavailableBookingDatesMs.find(
        (i) => i === date.getTime()
      );
      const isSelected = selectedDatesMs.find((i) => i === date.getTime());
      return (
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            background:
              isUnvailable && !isSelected
                ? theme.palette.gray.extraLight
                : isSelected
                ? "#B1CFFF"
                : "transparent",
          }}
        >
          {date.getDate()}
        </Stack>
      );
    },
    [unavailableBookingDatesMs, selectedDatesMs]
  );

  const includeDates = useMemo(() => {
    return selectedDatesMs.find((i) => unavailableBookingDatesMs.includes(i))
      ? unavailableBookingDatesMs.map((i) => new Date(i))
      : undefined;
  }, [selectedDatesMs, unavailableBookingDatesMs]);

  const excludeDates = useMemo(() => {
    return selectedDatesMs.find(
      (i) => !unavailableBookingDatesMs.includes(i)
    ) && selectedDatesMs.find((i) => unavailableBookingDatesMs.includes(i))
      ? undefined
      : selectedDatesMs.find((i) => !unavailableBookingDatesMs.includes(i))
      ? unavailableBookingDatesMs.map((i) => new Date(i))
      : undefined;
  }, [selectedDatesMs, unavailableBookingDatesMs]);

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "flex-start",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography variant="label" sx={{ fontWeight: 400 }}>
        Дата заезда и выезда
      </Typography>

      <DatePicker
        includeDates={includeDates}
        excludeDates={excludeDates}
        locale={"ru"}
        showIcon
        icon={<CalendarIcon sx={{ fontSize: "24px" }} />}
        selectsMultiple
        shouldCloseOnSelect={false}
        selectedDates={selectedDatesMs.map((i) => new Date(i))}
        onChange={onChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        monthsShown={1}
        dateFormat={"dd MMMM"}
        className={`range-date-picker ${
          isOpen ? "focused" : ""
        } ${"input-with-border"}`}
        popperPlacement="bottom-end"
        showDisabledMonthNavigation
        disabledKeyboardNavigation
        selectsDisabledDaysInRange
        withPortal={false}
        renderDayContents={(...props) => <CustomDay date={props[1]} />}
      />
    </Box>
  );
});
