import {
  Box,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { theme } from "../../../../../theme";
import moment, { Moment } from "moment";
import {
  CustomSelect,
  SelectItemType,
} from "../../../../components/shared/FormElements/CustomSelect";
import { CustomCircleIconButton } from "../../../../components/shared/CustomCircleIconButton";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { checkDateAvailable, getDaysInRange } from "../../../utils";
import { RoomCategoryType } from "../../../../../redux/slices/RoomsCategories/types";
import { dateFormat } from "../../../../../constants";
import { SelectRoomContext } from "../../SelectRoomSection";
import { useAppSelector } from "../../../../../hooks/redux";

type DateType = {
  date: Moment;
  availableStatus: boolean;
  price: number;
};

const dayCardWidth = 160;
const dayCardGapOffset = 3;

interface Props {}

export const AvailableDaysList = (props: Props) => {
  const {} = props;
  const { unavailableBookingDates } = useAppSelector(
    (state) => state.unavailableBookingDates
  );
  const { roomsCategories } = useAppSelector((state) => state.roomsCategories);
  const { bookings } = useAppSelector((state) => state.bookings);
  const { roomCategory } = useContext(SelectRoomContext);
  const daysListRef = useRef<HTMLInputElement | null>(null);

  const years = useMemo(() => {
    const curYear = moment().get("year");
    const years = [curYear, curYear + 1];

    return years.map((item, index) => {
      return {
        id: index + 1,
        label: item.toString(),
        value: item.toString(),
      };
    });
  }, []);

  const [selectedYear, setSelectedYear] = useState<SelectItemType>(years[0]);

  const dates = useMemo((): DateType[] => {
    if (
      roomCategory &&
      bookings &&
      roomsCategories &&
      unavailableBookingDates
    ) {
      const year = selectedYear.value;

      const yearDays = getDaysInRange({
        dateStart: {
          year,
          month: "0",
          day: "01",
        },
        dateEnd: {
          year,
          month: "11",
          day: "31",
        },
      });

      const a = yearDays.map((i) =>
        checkDateAvailable({
          date: i,
          specificRoomCategoryId: roomCategory._id,
          bookings,
          roomsCategories,
          unavailableBookingDates,
        })
      );

      return yearDays.map((i) => {
        const k = a.find((j) => j?.date === i);
        return {
          date: i,
          availableStatus: k?.isAvailable || false,
          price: k?.roomMinPrice || -1,
        };
      });
    }
    return [];
  }, [selectedYear]);

  console.log(dates);

  const setScrollForDaysList = (scrollOffset: number) => {
    if (daysListRef && daysListRef.current) {
      daysListRef.current.scrollLeft += scrollOffset;
    }
    return null;
  };

  // Авто доскрол до текущего дня
  useEffect(() => {
    if (dates.length) {
      const curDay = moment().format(dateFormat);
      const foundCurDayIdx = dates.findIndex((i) => i.date.isSame(curDay));

      if (daysListRef && daysListRef.current) {
        if (foundCurDayIdx !== -1) {
          daysListRef.current.scrollLeft =
            foundCurDayIdx * dayCardWidth + // учет размера карточки
            foundCurDayIdx * dayCardGapOffset; // учет расстояния между карточками
        } else {
          daysListRef.current.scrollLeft = 0; // в начало года
        }
      }
    }
  }, [dates]);

  const DayItem = ({ date }: { date: DateType }) => {
    return (
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          background: theme.palette.primary.light,
          borderRadius: "8px",
          minHeight: "80px",
          minWidth: `${dayCardWidth}px`,
          padding: 0,
        }}
      >
        <Box
          sx={{
            flex: 0.5,
            background: theme.palette.primary.main,
            padding: "5px 15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant={"label"}
            sx={{
              fontWeight: "600",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {date.date.format("ddd, DD MMMM")}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 0.5,
            padding: "5px 15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant={"label"}
            sx={{
              fontWeight: "600",
              color: theme.palette.gray.light,
              textAlign: "center",
            }}
          >
            {date.availableStatus ? date.price + " ₽" : "x"}
          </Typography>
        </Box>
      </ListItem>
    );
  };

  return (
    <Stack sx={{ alignItems: "stretch" }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="label" sx={{ fontWeight: 600 }}>
          Доступные даты для заезда
        </Typography>

        <CustomSelect
          data={years}
          value={[selectedYear.value]}
          setValue={(val) =>
            typeof val === "string"
              ? setSelectedYear(years.find((i) => i.value === val) || years[0])
              : null
          }
        />
      </Stack>

      <Box
        sx={{
          position: "relative",
          width: "calc(100% - 48px)",
          marginLeft: "24px",
        }}
      >
        <Box
          ref={daysListRef}
          sx={{
            flex: 1,
            overflowX: "auto",
            scrollBehavior: "smooth",

            "::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            background: theme.palette.primary.extraLight,
            borderRadius: "8px",
            padding: "8px",
            marginTop: "10px",
          }}
        >
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: "16px",
              gap: `${dayCardGapOffset}px`,
              padding: 0,
            }}
          >
            {dates.map((item, index) => {
              return <DayItem key={index} date={item} />;
            })}
          </List>
        </Box>

        <CustomCircleIconButton
          icon={<KeyboardArrowLeft />}
          onClick={() => setScrollForDaysList(-300)}
          sx={{
            minWidth: "40px",
            width: "40px",
            height: "40px",
            position: "absolute",
            top: "50%",
            left: "-20px",
            zIndex: 1,
            transform: "translate(0, -50%)",
          }}
        />

        <CustomCircleIconButton
          icon={<KeyboardArrowRight />}
          onClick={() => setScrollForDaysList(300)}
          sx={{
            minWidth: "40px",
            width: "40px",
            height: "40px",
            position: "absolute",
            top: "50%",
            right: "-20px",
            zIndex: 1,
            transform: "translate(0, -50%)",
          }}
        />
      </Box>
    </Stack>
  );
};
