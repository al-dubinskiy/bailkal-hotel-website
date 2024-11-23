import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  BookingType,
  BookingUserInfoType,
  CreateBookingType,
} from "../../redux/slices/Bookings/types";
import {
  BookedRoomType,
  RoomCategoryType,
} from "../../redux/slices/RoomsCategories/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import moment, { Moment } from "moment";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { dateTimeFormat } from "../../constants";
import { BookingStepType } from "./types";
import { BookingInfoWidget } from "./components/BookingInfoWidget";
import { GroupObjectByKey } from "./utils";
import { GetRoomsCategories } from "../../redux/slices/RoomsCategories/roomsCategoriesSlice";
import { GetBookings } from "../../redux/slices/Bookings/bookingsSlice";
import BasePageLayout from "../components/BasePageLayout";
import { GetUnavailableBookingDates } from "../../redux/slices/UnavailableBookingDates/unavailableBookingDates";
import { theme } from "../../theme";
import {
  CustomRangeDatepicker,
  DateRangeType,
} from "../components/shared/RangeDatepicker/CustomRangeDatepicker";
import { SelectQuestsDropdown } from "./components/FiltersBar/SelectQuestsDropdown";
import { CustomButton } from "../components/shared/CustomButton";
import { CustomSelect } from "../components/shared/FormElements/CustomSelect";
import { setLocale } from "yup";

// Типы
type RoomCategoryPriceType = {
  id: string;
  price: number;
};

type BookingDateType = {
  arrival_datetime: string;
  departure_datetime: string;
};

type SortedBookingType = {
  [key: string]: BookingDateType[];
};

type LocaleType = {
  id: number;
  label: string;
  value: string;
};

const locales: LocaleType[] = [
  {
    id: 1,
    label: "Ru",
    value: "ru",
  },
  {
    id: 2,
    label: "En",
    value: "en",
  },
];
interface Props {}

export const BookingPage = () => {
  const dispatch = useAppDispatch();
  const { unavailableBookingDates } = useAppSelector(
    (state) => state.unavailableBookingDates
  );
  const { roomsCategories } = useAppSelector((state) => state.roomsCategories);
  const { bookings } = useAppSelector((state) => state.bookings);
  const [filterParams, setFilterParams] = useState<{
    arrival_datetime: Moment;
    departure_datetime: Moment;
    roomsQuestsCount: {
      adults: number;
      children: number;
    }[];
  }>({
    arrival_datetime: moment(),
    departure_datetime: moment().add(1, "days"),
    roomsQuestsCount: [{ adults: 1, children: 0 }],
  });
  const [curLocale, setCurLocale] = useState<LocaleType>(locales[0]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<BookingUserInfoType>({
    name: "",
    lastname: "",
    surname: "",
    phone: "",
    email: "",
  });
  const [newBookings, setNewBookings] = useState<CreateBookingType[]>([]);
  const [currentBookingStepIdx, setCurrentBookingStepIdx] = useState(0);

  const allQuestsCount = useMemo(() => {
    const { roomsQuestsCount } = filterParams;
    const adultsCount = Array.from(roomsQuestsCount, (i) => i.adults).length;
    const childrensCount = Array.from(
      roomsQuestsCount,
      (i) => i.children
    ).length;

    return adultsCount + childrensCount;
  }, [filterParams.roomsQuestsCount]);

  const bookingsByRoomCategories = useMemo((): SortedBookingType[] | null => {
    if (roomsCategories && bookings) {
      /* Сортировка бронирований по категориям комнат, где
        "ключ" - id категории комнаты, а
        "value" - массив дат "заезда" и "выезда" каждого бронирования на эту категорию:
        {"room_category_id": {
            arrival_datetime: string;
            departure_datetime: string;
          }[]
        }
      */
      const sortedBookings: SortedBookingType[] = GroupObjectByKey(
        "room_category_id",
        bookings
      );

      return sortedBookings;
    } else {
      return null;
    }
  }, [bookings, roomsCategories]);

  const getAvailableRoomCategories = (
    date: string
  ): RoomCategoryPriceType[] | null => {
    if (roomsCategories && bookings && bookingsByRoomCategories) {
      const availableRoomCategories: RoomCategoryPriceType[] = [];

      Object.entries(bookingsByRoomCategories).map((item: any, index) => {
        const bookingCategoryId: string = item[0];
        const bookingsOnCategory = item[1];

        // Поиск "категории комнат" по id
        const categoryRoom = roomsCategories.find(
          (roomCategory) => roomCategory._id === bookingCategoryId
        );

        if (categoryRoom) {
          // Получение общего количество комнат на "категорию комнат"
          const categoryRoomCount = categoryRoom.room_id.length;

          let bookedOnDateCount = 0;

          bookingsOnCategory.map((i: BookingDateType) => {
            // Подсчет забронированных комнат, диапазону "дата заезда/выезда"
            // которых принадлежит дата, переданная в ф-цию
            // (а значит на эту дату уже нельзя забронировать эти комнаты)

            if (
              (moment(date).isBetween(
                moment(i.arrival_datetime),
                moment(i.departure_datetime)
              ),
              "[]")
            ) {
              bookedOnDateCount += 1;
            }
          });

          // Если в данной "категории комнат" еще есть доступные комнаты
          if (bookedOnDateCount < categoryRoomCount) {
            // То записываем данные "категории комнат" в перечень доступных "категорий комнат", а именно id и price (в зав. от кол. гостей)
            availableRoomCategories.push({
              id: categoryRoom._id,
              price: categoryRoom.price_per_night_for_one_quest,
            });
          }
        }
      });
      // Получение id "категорий комнат" на которые забронированы комнаты
      const bookedOnCategoriesIds = Object.keys(bookingsByRoomCategories);
      // Добавить "категории комнат" на которые еще нет забронированных комнат
      roomsCategories.map((roomCategory) =>
        !bookedOnCategoriesIds.includes(roomCategory._id)
          ? availableRoomCategories.push({
              id: roomCategory._id,
              price: roomCategory.price_per_night_for_one_quest,
            })
          : roomCategory
      );
      return availableRoomCategories;
    }
    return null;
  };

  const checkDateAvailable = ({
    date,
  }: {
    date: string;
  }): { isAvailable: boolean; roomMinPrice: number | null } | null => {
    if (unavailableBookingDates) {
      // Определение доступных категорий комнат
      const availableRoomCategories = getAvailableRoomCategories(date);

      if (availableRoomCategories && availableRoomCategories.length) {
        // Определение минимальной стоимости комнаты
        const prices = Array.from(availableRoomCategories, (i) => i.price);
        const roomMinPrice = Math.min(...prices);

        return {
          isAvailable:
            !unavailableBookingDates.find((i) => i.date === date) &&
            availableRoomCategories.length > 0,
          roomMinPrice,
        };
      }
    }

    return null;
  };

  // Get data from API
  const GetRoomsCategoriesList = useCallback(() => {
    if (!roomsCategories) {
      dispatch(GetRoomsCategories());
    }
  }, [roomsCategories]);

  useEffect(() => {
    GetRoomsCategoriesList();
  }, [GetRoomsCategoriesList]);

  const GetBookingsList = useCallback(() => {
    if (!bookings) {
      dispatch(GetBookings());
    }
  }, [bookings]);

  useEffect(() => {
    GetBookingsList();
  }, [GetBookingsList]);

  const GetUnavailableBookingDatesList = useCallback(() => {
    if (!unavailableBookingDates) {
      dispatch(GetUnavailableBookingDates());
    }
  }, [bookings]);

  useEffect(() => {
    GetUnavailableBookingDatesList();
  }, [GetUnavailableBookingDatesList]);

  // useEffect(() => {
  //   checkDateAvailable({
  //     date: "2024-11-17",
  //   });
  // }, [bookings, roomsCategories, unavailableBookingDates]);

  const availableRoomCategories = useMemo(() => {
    return getAvailableRoomCategories(
      filterParams.arrival_datetime.format(dateTimeFormat)
    );
  }, [filterParams.arrival_datetime, roomsCategories, bookings]);

  // Тригер для типа визуального интерфейса 1-го шага
  const isMultiRoomBooking = useMemo(() => {
    if (filterParams.roomsQuestsCount.length > 2) return true;
    return false;
  }, [allQuestsCount]);

  const addBookingBaseInfo = ({
    roomCategoryId,
    allCategoryRoomsIDs,
    bookedCategoryRoomsIDs,
    tariffId,
    adultsCount,
    childrenCount,
  }: {
    roomCategoryId: string;
    allCategoryRoomsIDs: string[];
    bookedCategoryRoomsIDs: string[];
    tariffId?: string;
    adultsCount: number;
    childrenCount: number;
  }) => {
    // Поиск доступного номера, который не состоит в списке забронированных номеров
    const availableRoomId = allCategoryRoomsIDs.find((roomId) => {
      if (!bookedCategoryRoomsIDs.includes(roomId)) return roomId;
    });

    if (availableRoomId) {
      const newBooking: CreateBookingType = {
        room_id: availableRoomId,
        room_category_id: roomCategoryId,
        user: isMultiRoomBooking
          ? userInfo // Если забронированных номеров на одного человека будет несколько, то его данные берутся з базы
          : {
              name: "",
              lastname: "",
              surname: "",
              phone: "",
              email: "",
            },
        adults_count: adultsCount,
        childrens_count: childrenCount,
        arrival_datetime: filterParams.arrival_datetime.format(dateTimeFormat),
        departure_datetime:
          filterParams.departure_datetime.format(dateTimeFormat),
        tariff_id: tariffId ? tariffId : "",
        service_id: [],
        bed_type_id: "",
        view_from_window_id: "",
        payment_method_id: "",
        transfer_id: "",
        transfer_comment: "",
        price: -1,
      };

      if (!isMultiRoomBooking) setNewBookings([newBooking]);
      else setNewBookings((prev) => [...prev, newBooking]);
    }
  };

  const removeBooking = (index: number) => {
    setNewBookings((prev) => prev.filter((_, idx) => idx !== index));
  };

  const bookingSteps = useMemo((): BookingStepType[] => {
    const steps: BookingStepType[] = [];
    // Для бронирования одного номера
    if (!isMultiRoomBooking) {
      const booking = newBookings.length ? newBookings[0] : null;
      if (!booking) {
        steps.push("Select a room");
      } else if (booking && !booking.tariff_id) {
        steps.push("Select a tariff");
      } else if (booking && booking.tariff_id)
        steps.push("Order services", "Enter guest details");

      return steps;
    }
    // Для бронирования нескольких номеров
    else {
      const roomsCount = filterParams.roomsQuestsCount.length;
      Array.from({ length: roomsCount }, () => steps.push("Select a tariff"));
      Array.from({ length: roomsCount }, () => steps.push("Order services"));
      steps.push("Enter guest details");
    }
    return steps;
  }, [newBookings, isMultiRoomBooking]);

  const FiltersBar = () => {
    return (
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.palette.primary.lighter,
          borderRadius: "20px",
          padding: "24px",
          minHeight: "150px",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <CustomRangeDatepicker
          date={{
            arrival: moment(),
            departure: moment().set("date", moment().get("date") + 1),
          }}
          setDate={(date: DateRangeType) =>
            setFilterParams((prev) => ({
              ...prev,
              arrival_datetime: date.arrival,
              departure_datetime: date.departure,
            }))
          }
        />

        <SelectQuestsDropdown
          roomsQuestsCount={filterParams.roomsQuestsCount}
          setRoomsQuestsCount={(val) =>
            setFilterParams((prev) => ({
              ...prev,
              roomsQuestsCount: val,
            }))
          }
        />

        <CustomSelect
          inputLabel="Язык"
          selectLabel="Язык 1"
          data={locales.map(({ id, label, value }) => ({
            id,
            label,
            value,
          }))}
          value={{
            id: curLocale.id,
            label: curLocale.label,
            value: curLocale.value,
          }}
          setValue={({ id, label, value }) =>
            setCurLocale({
              id,
              label,
              value,
            })
          }
        />
      </Stack>
    );
  };

  const RoomCategoriesCards = () => {
    if (roomsCategories && roomsCategories?.length) {
      // Тип интерфейса для множественного выбора номеров (со списком номеров и тарифов)
      if (isMultiRoomBooking)
        return (
          <Box>
            {roomsCategories && roomsCategories?.length
              ? roomsCategories.map((roomCategory, index) => {
                  return (
                    <Button
                      key={index}
                      onClick={() =>
                        addBookingBaseInfo({
                          roomCategoryId: roomCategory._id,
                          allCategoryRoomsIDs: roomCategory.room_id,
                          bookedCategoryRoomsIDs: Array.from(
                            roomCategory.booked_rooms,
                            (i) => i.room_id
                          ),
                          tariffId: "672bb2c0424b6e7d9c94376a",
                          adultsCount: 1,
                          childrenCount: 0,
                        })
                      }
                    >
                      Выбрать
                    </Button>
                  );
                })
              : null}

            <BookingInfoWidget
              currentBookingStepIdx={currentBookingStepIdx}
              setCurrentBookingStepIdx={(idx: number) =>
                setCurrentBookingStepIdx(idx)
              }
            />
          </Box>
        );
      // Тип интерфейса для выбора одного номера (со списком номеров)
      return (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {roomsCategories.map((roomCategory, index) => {
              return (
                <Grid size={{ xs: 12, md: 3 }} key={index}>
                  <Typography>{roomCategory.title}</Typography>
                  {/* Проверка нет ли уже забронированого номера на выбранную дату "заезда" и "выезда" */}
                  {availableRoomCategories?.findIndex(
                    (i) => i.id === roomCategory._id
                  ) ? (
                    <CustomButton
                      label={"Выбрать"}
                      onClick={() =>
                        addBookingBaseInfo({
                          roomCategoryId: roomCategory._id,
                          allCategoryRoomsIDs: roomCategory.room_id,
                          bookedCategoryRoomsIDs: Array.from(
                            roomCategory.booked_rooms,
                            (i) => i.room_id
                          ),
                          adultsCount: filterParams.roomsQuestsCount[0].adults,
                          childrenCount:
                            filterParams.roomsQuestsCount[0].children,
                        })
                      }
                      containerVariant="contained"
                      containerBackgroundColor="buttonDark"
                      withoutAnimation
                    />
                  ) : (
                    <CustomButton
                      label={"Доступные даты для заезда"}
                      onClick={() => null}
                      containerVariant="outlined"
                      containerBackgroundColor="buttonLight"
                      withoutAnimation
                    />
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Box>
      );
    }
    return null;
  };

  return (
    <BasePageLayout isShowPageTitleBanner>
      <FiltersBar />

      <RoomCategoriesCards />
    </BasePageLayout>
  );
};
