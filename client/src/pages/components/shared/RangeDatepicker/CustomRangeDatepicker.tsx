import { Box, Stack, Typography } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { CalendarIcon } from "../../../../assets/icons/CalendarIcon";
import { theme } from "../../../../theme";
import moment, { Moment } from "moment";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setFilterParams } from "../../../../redux/slices/Bookings/bookingsSlice";
import { times } from "../../../Booking/components/EnterGuestsDetailsSection/components/constants";
import {
  BookingContext,
  CheckDateAvailableType,
} from "../../../Booking/BookingPage";
import { ru } from "date-fns/locale/ru"; // the locale you want
import { addDays } from "react-datepicker/dist/date_utils";
import { getDaysInRange } from "../../../Booking/utils";
registerLocale("ru", ru); // register it with the name you want

interface Props {}

export const CustomRangeDatepicker = (props: Props) => {
  const {} = props;
  const { unavailableBookingDates } = useAppSelector(
    (state) => state.unavailableBookingDates
  );
  const minDate = moment();
  const maxDate = moment().add(1, "year");
  const { checkDateAvailable } = useContext(BookingContext);
  const dispatch = useAppDispatch();
  const { filterParams } = useAppSelector((state) => state.bookings);
  const [startDate, setStartDate] = useState<Date>(
    filterParams.arrival_datetime.toDate()
  );
  const [endDate, setEndDate] = useState<Date>(
    filterParams.departure_datetime.toDate()
  );
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

  const CustomDay = useCallback(({ date }: { date: Date }) => {
    // console.log(date);
    const price =
      datesStates?.find((i) => i.date.toDate().getTime() === date.getTime())
        ?.roomMinPrice || 0;
    return (
      <Stack flexDirection={"column"} gap={"15px"}>
        {date.getDate()}

        <span className="react-datepicker__day-cost">
          {moment(moment(date).add(1, "day")).isSameOrAfter(minDate)
            ? price + "₽"
            : "x"}
        </span>
      </Stack>
    );
  }, []);

  const datesInRange = useMemo((): Moment[] => {
    return getDaysInRange({
      dateStart: {
        year: minDate.get("year").toString(),
        month: minDate.get("month").toString(),
        day: minDate.get("date").toString(),
      },
      dateEnd: {
        year: maxDate.get("year").toString(),
        month: maxDate.get("month").toString(),
        day: maxDate.get("date").toString(),
      },
    });
  }, [minDate, maxDate, getDaysInRange]);

  const datesStates = useMemo(() => {
    if (unavailableBookingDates) {
      const a: CheckDateAvailableType[] = [];
      datesInRange.map((i) => {
        const b = checkDateAvailable({ date: i });
        if (b) {
          a.push(b);
        }
      });
      return a;
    }
  }, [datesInRange, unavailableBookingDates]);

  const excludeDates = useMemo((): Date[] => {
    return datesStates
      ? Array.from(
          datesStates.filter((i) => i.isAvailable === false),
          (i) => i.date
        ).map((i) => i.toDate())
      : [];
  }, [datesStates]);

  const DatePickerFooter = ({ dateType }: { dateType: string }) => {
    return (
      <Stack
        sx={{
          width: "100%",
          gap: "10px",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0px 0px 9.20312px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Typography variant="label">{dateType}</Typography>
        <Typography
          variant="someSmall"
          sx={{ color: theme.palette.primary.dark }}
        >
          Лучшие цены для 1 гостя за ночь*
        </Typography>
        <Typography variant="small" sx={{ color: theme.palette.primary.dark }}>
          *Цена может быть доступна при соблюдении специальных условий
          бронирования
        </Typography>

        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "15px" }}>
          <Box
            sx={{
              borderRadius: "8px",
              background: "#C9C9C9",
              width: "30px",
              height: "30px",
            }}
          ></Box>
          <Typography variant="someSmall">
            - дата недоступна для бронирования
          </Typography>
        </Stack>
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
        locale={"ru"}
        showIcon
        icon={<CalendarIcon sx={{ fontSize: "24px" }} />}
        selected={startDate}
        onChange={onChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        minDate={minDate.toDate()}
        maxDate={maxDate.toDate()}
        startDate={startDate}
        endDate={endDate}
        excludeDates={excludeDates}
        selectsRange
        monthsShown={2}
        dateFormat={"dd MMMM"}
        className={`range-date-picker ${isOpen ? "focused" : ""}`}
        popperPlacement="bottom-end"
        // focusSelectedMonth
        showDisabledMonthNavigation
        disabledKeyboardNavigation
        renderDayContents={(...props) => <CustomDay date={props[1]} />}
        selectsDisabledDaysInRange
        children={
          <DatePickerFooter
            dateType={
              startDate &&
              startDate.getTime() ===
                filterParams.arrival_datetime.toDate().getTime()
                ? "Выберите дату заезда"
                : !endDate
                ? "Выберите дату выезда"
                : ""
            }
          />
        }
      />
    </Box>
  );
};
