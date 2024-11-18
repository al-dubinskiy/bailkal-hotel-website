import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./style.css";
import { CalendarIcon } from "../../../../assets/icons/CalendarIcon";
import { theme } from "../../../../theme";

interface Props {}

export const RangeDatepicker = (props: Props) => {
  const {} = props;
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const onChange = (dates: any) => {
    console.log(dates);
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const CustomDay = ({ date }: { date: Date }) => {
    console.log(date);
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
        startDate={startDate}
        endDate={endDate}
        selectsRange
        monthsShown={2}
        dateFormat={"dd MMMM"}
        className={"range-date-picker"}
        popperPlacement="bottom-end"
        focusSelectedMonth
        renderDayContents={(...props) => <CustomDay date={props[1]} />}
      />
    </Box>
  );
};
