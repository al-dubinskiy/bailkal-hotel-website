import { Box, Stack, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./style.css";
import { CalendarIcon } from "../../../../assets/icons/CalendarIcon";
import { theme } from "../../../../theme";
import moment, { Moment } from "moment";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setFilterParams } from "../../../../redux/slices/Bookings/bookingsSlice";
import { times } from "../../../Booking/components/EnterGuestsDetailsSection/components/constants";

interface Props {}

export const CustomRangeDatepicker = (props: Props) => {
  const {} = props;

  const dispatch = useAppDispatch();
  const { filterParams } = useAppSelector((state) => state.bookings);
  const date = useMemo(
    () => ({
      arrival: moment(),
      departure: moment().set("date", moment().get("date") + 1),
    }),
    []
  );
  const [startDate, setStartDate] = useState<Date>(date.arrival.toDate());
  const [endDate, setEndDate] = useState<Date>(date.departure.toDate());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      dispatch(
        setFilterParams({
          ...filterParams,
          arrival_datetime: moment(start)
            .set("hours", Number(times[0].value.split(":")[0])) // 07:00
            .set("minutes", Number(times[0].value.split(":")[1])),
          departure_datetime: moment(end)
            .set("hours", Number(times[8].value.split(":")[0])) // 15:00
            .set("minutes", Number(times[8].value.split(":")[1])),
        })
      );
    }
  };

  const CustomDay = ({ date }: { date: Date }) => {
    // console.log(date);
    return (
      <Stack flexDirection={"column"} gap={"15px"}>
        {date.getDate()}

        <span className="react-datepicker__day-cost">6600₽</span>
      </Stack>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "flex-start",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography
        variant="label"
        sx={{ textTransform: "uppercase", fontWeight: 400 }}
      >
        Дата заезда и выезда
      </Typography>

      <DatePicker
        showIcon
        icon={<CalendarIcon sx={{ fontSize: "24px" }} />}
        selected={startDate}
        onChange={onChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        monthsShown={2}
        dateFormat={"dd MMMM"}
        className={`range-date-picker ${isOpen ? "focused" : ""}`}
        popperPlacement="bottom-end"
        focusSelectedMonth
        renderDayContents={(...props) => <CustomDay date={props[1]} />}
      />
    </Box>
  );
};
