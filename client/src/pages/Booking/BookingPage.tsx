import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
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
import {
  RoomQuestsCountType,
  SelectQuestsDropdown,
} from "./components/FiltersBar/SelectQuestsDropdown";
import { CustomButton } from "../components/shared/CustomButton";
import { CustomSelect } from "../components/shared/FormElements/CustomSelect";
import { setLocale } from "yup";
import { findLastIndex } from "lodash";

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

type BookingStepNameType =
  | "Select a room"
  | "Select a tariff"
  | "Order services"
  | "Enter guest details"
  | "";

type BookingStepType = {
  roomId: string;
  name: BookingStepNameType;
  isCurrent: boolean;
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

type ActionType = "addRooms" | "removeRooms" | "";

type CreateBookingLocalType = CreateBookingType & { tempId: string };

type NewBookingsType = {
  bookings: CreateBookingLocalType[];
  actionType: ActionType;
};

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
    rooms: RoomQuestsCountType[];
  }>({
    arrival_datetime: moment(),
    departure_datetime: moment().add(1, "days"),
    rooms: [{ id: uuidv4(), adults: 1, children: 0 }],
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
  const [newBookings, setNewBookings] = useState<NewBookingsType>({
    bookings: [],
    actionType: "",
  });
  const [bookingSteps, setBookingSteps] = useState<BookingStepType[]>([]);
  const [currentBookingStepIdx, setCurrentBookingStepIdx] = useState(0);

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

  const sortedBookingsByRoomCategories = useMemo(():
    | SortedBookingType[]
    | null => {
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

  // const allQuestsCount = useMemo(() => {
  //   const { rooms } = filterParams;

  //   return rooms.reduce(
  //     (accumulator, i) => accumulator + (i.adults + i.children),
  //     0
  //   );
  // }, [filterParams.rooms]);

  const getAvailableRoomCategories = (
    date: string
  ): RoomCategoryPriceType[] | null => {
    if (roomsCategories && bookings && sortedBookingsByRoomCategories) {
      const availableRoomCategories: RoomCategoryPriceType[] = [];

      Object.entries(sortedBookingsByRoomCategories).map((item: any, index) => {
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
      const bookedOnCategoriesIds = Object.keys(sortedBookingsByRoomCategories);
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

  const availableRoomCategories = useMemo(() => {
    return getAvailableRoomCategories(
      filterParams.arrival_datetime.format(dateTimeFormat)
    );
  }, [filterParams.arrival_datetime, roomsCategories, bookings]);

  // const addBookingBaseInfo = ({
  //   roomCategoryId,
  //   allCategoryRoomsIDs,
  //   bookedCategoryRoomsIDs,
  //   tariffId,
  //   adultsCount,
  //   childrenCount,
  // }: {
  //   roomCategoryId: string;
  //   allCategoryRoomsIDs: string[];
  //   bookedCategoryRoomsIDs: string[];
  //   tariffId?: string;
  //   adultsCount: number;
  //   childrenCount: number;
  // }) => {
  //   // Поиск доступного номера, который не состоит в списке забронированных номеров
  //   const availableRoomId = allCategoryRoomsIDs.find((roomId) => {
  //     if (!bookedCategoryRoomsIDs.includes(roomId)) return roomId;
  //   });

  //   if (availableRoomId) {
  //     const newBooking: CreateBookingLocalType = {
  //       tempId: "",
  //       room_id: availableRoomId,
  //       room_category_id: roomCategoryId,
  //       user: false
  //         ? userInfo // Если забронированных номеров на одного человека будет несколько, то его данные берутся з базы
  //         : {
  //             name: "",
  //             lastname: "",
  //             surname: "",
  //             phone: "",
  //             email: "",
  //           },
  //       adults_count: adultsCount,
  //       children_count: childrenCount,
  //       arrival_datetime: filterParams.arrival_datetime.format(dateTimeFormat),
  //       departure_datetime:
  //         filterParams.departure_datetime.format(dateTimeFormat),
  //       tariff_id: tariffId ? tariffId : "",
  //       service_id: [],
  //       bed_type_id: "",
  //       view_from_window_id: "",
  //       payment_method_id: "",
  //       transfer_id: "",
  //       transfer_comment: "",
  //       price: -1,
  //     };

  //     if (!false) setNewBookings([newBooking]);
  //     else setNewBookings((prev) => [...prev, newBooking]);
  //   }
  // };

  // const bookingSteps = useMemo((): BookingStepType[] => {
  //   const steps: BookingStepType[] = [];
  //   // Для бронирования одного номера
  //   if (!isMultiRoomBooking) {
  //     const booking = newBookings.length ? newBookings[0] : null;
  //     if (!booking) {
  //       steps.push("Select a room");
  //     } else if (booking && !booking.tariff_id) {
  //       steps.push("Select a tariff");
  //     } else if (booking && booking.tariff_id)
  //       steps.push("Order services", "Enter guest details");

  //     return steps;
  //   }
  //   // Для бронирования нескольких номеров
  //   else {
  //     const rooms = filterParams.rooms.length;
  //     Array.from({ length: rooms }, () => steps.push("Select a tariff"));
  //     Array.from({ length: rooms }, () => steps.push("Order services"));
  //     steps.push("Enter guest details");
  //   }
  //   return steps;
  // }, [newBookings, isMultiRoomBooking]);

  const createNewBookingDraft = ({
    tempId,
    adultsCount,
    childrenCount,
  }: {
    tempId: string;
    adultsCount: number;
    childrenCount: number;
  }): CreateBookingLocalType => {
    const { arrival_datetime, departure_datetime } = filterParams;

    return {
      tempId: tempId,
      room_id: "",
      room_category_id: "",
      user: userInfo,
      adults_count: adultsCount,
      children_count: childrenCount,
      arrival_datetime: arrival_datetime.format(dateTimeFormat),
      departure_datetime: departure_datetime.format(dateTimeFormat),
      tariff_id: "",
      service_id: [],
      bed_type_id: "",
      view_from_window_id: "",
      payment_method_id: "",
      transfer_id: "",
      transfer_comment: "",
      price: 0,
    };
  };

  const updateBookingSteps = useCallback(() => {
    const actionType = newBookings.actionType;
    console.log("actionType ", actionType);
    if (actionType !== "") {
      let steps: BookingStepType[] = bookingSteps;
      const rooms = filterParams.rooms;
      const roomsCount = rooms.length;

      if (actionType === "addRooms") {
        console.log("roomsCount ", roomsCount);

        // Если список шагов еще пустой
        if (!steps.length) {
          rooms.map((item, index) =>
            steps.push({
              roomId: item.id,
              name: "Select a tariff",
              isCurrent: roomsCount === 1 ? false : index === 0 ? true : false, // Делаем активным первый шаг
            })
          );
          rooms.map((item, index) =>
            steps.push({
              roomId: item.id,
              name: "Order services",
              isCurrent: false,
            })
          );
          steps.push({
            roomId: "",
            name: "Enter guest details",
            isCurrent: false,
          });
        }
        // Если список шагов не пустой тогда делаем дозапись
        else {
          const { bookings } = newBookings;
          // Подсчет количества комнат на которые расчитаны шаги по "Select a tariff"
          const prevRoomsCount = steps.reduce(
            (acc, i) => (acc = i.name === "Select a tariff" ? acc + 1 : acc),
            0
          );
          const newRooms = Array.from({ length: prevRoomsCount });
          console.log("newRooms ", newRooms);
          const lastRoomId = rooms[rooms.length - 1].id;
          // Убираем для текущего шага статус "текущий шаг"
          steps = steps.map((i) =>
            i.isCurrent ? { ...i, isCurrent: false } : i
          );

          const a: BookingStepType[] = newRooms.map((i) => {
            return {
              roomId: lastRoomId,
              name: "Select a tariff",
              isCurrent: true,
            };
          });
          // Получаем индекс последнего вхождения шага "select a tariff"
          let lastSelectTariffStepIdx = findLastIndex(
            steps,
            (step) => step.name === "Select a tariff"
          );
          console.log("a", a);
          // Вставляем дополнительный шаг "select a tariff" и делаем его "текущим шагом"
          steps.splice(lastSelectTariffStepIdx, 0, ...a);

          const b: BookingStepType[] = newRooms.map((i) => {
            return {
              roomId: lastRoomId,
              name: "Order services",
              isCurrent: true,
            };
          });
          // Получаем индекс последнего вхождения шага "order services"
          let lastOrderServicesStepIdx = findLastIndex(
            steps,
            (step) => step.name === "Order services"
          );
          console.log("b", b);

          // Вставляем дополнительный шаг "order services"
          steps.splice(lastOrderServicesStepIdx, 0, ...b);
        }
      } else if (actionType === "removeRooms") {
        const roomsIds = Array.from(rooms, (i) => i.id);
        let lastCurrentStepName = "";
        let lastCurrentStepIdx = -1;

        // Удалить все шаги, id комнат которых уже нет в списке фильтра "Гости"
        steps = steps.filter((i, idx) => {
          const includes = roomsIds.includes(i.roomId);
          if (!includes && i.isCurrent) {
            lastCurrentStepName = i.name;
            lastCurrentStepIdx = idx;
          }
          return includes;
        });
        // Установить статус "текущий" для нового шага, относительно это формулы
        // b, g, f | r, m, n | o - элементы (если текущий шар "выбор тарифа" (применяем для прошлого индекса))
        // 0  1  2 | 3  4  5 | 6 - индексы
        // f | n | o - элементы после удаления
        // 0 | 1 | 2 - индексы после удаления
        // ------
        // b, g, f | r, m, n | o - элементы (если текущий шар "выбор услуг" (применяем для прошлого индекса - 2))
        // 0  1  2 | 3  4  5 | 6 - индексы
        // b, f | r, n | o  элементы после удаления
        // 0, 1 | 2, 3 | 4 - индексы после удаления

        const newCurrentStepIdx =
          lastCurrentStepName === "Select a tariff"
            ? lastCurrentStepIdx
            : lastCurrentStepName === "Order services"
            ? lastCurrentStepIdx - 2
            : lastCurrentStepIdx;

        // Убираем для текущего шага статус "текущий шаг"
        steps = steps.map((i) =>
          i.isCurrent ? { ...i, isCurrent: false } : i
        );
        // Ставим новый "текущий шаг"
        steps = steps.map((item, index) =>
          index === newCurrentStepIdx ? { ...item, isCurrent: true } : item
        );
      }
      console.log(steps.findIndex((i) => i.name === "Select a room"));
      // Если комнат в фильтре "Гости" == 1,
      // то добавляем шаг (для бронирования одной комнаты) "Select a room"
      if (
        roomsCount === 1 &&
        steps.findIndex((i) => i.name === "Select a room") === -1
      ) {
        console.log(456);
        steps.splice(0, 0, {
          roomId: rooms[0].id,
          name: "Select a room",
          isCurrent: true,
        });
      }
      // Если комнат в фильтре "Гости" было выбрано больше одной,
      // то удаляем (если существует) шаг для бронирования одной комнаты "Select a room"
      else if (
        roomsCount > 1 &&
        steps.findIndex((i) => i.name === "Select a room") !== -1
      ) {
        steps = steps.filter((i) => i.name !== "Select a room");
      }

      setBookingSteps(steps);
    }
  }, [newBookings]);

  useEffect(() => {
    updateBookingSteps();
  }, [updateBookingSteps]);

  console.log("filterParams ", JSON.stringify(filterParams));
  console.log("bookingsSteps ", JSON.stringify(bookingSteps));
  console.log("newBookings ", JSON.stringify(newBookings));

  // Сформировать список букингов в зависимости от установленного фильтра "Гости"
  const updateNewBookings = useCallback(() => {
    const { rooms } = filterParams;
    const { bookings } = newBookings;
    // 1. Если фильтр "Гости" был установлен первый раз список букингов еще пустой
    if (rooms.length && !bookings.length) {
      const data = rooms.map((i): CreateBookingLocalType => {
        return createNewBookingDraft({
          tempId: i.id,
          adultsCount: i.adults,
          childrenCount: i.children,
        });
      });
      // Обновить перечень букингов и установить тип действия для формирования списка шагов
      setNewBookings({ bookings: data, actionType: "addRooms" });
    }
    // 2. Если в фильтре "Гости" добавили одну или несколько комнат
    else if (rooms.length > bookings.length) {
      const newRooms = rooms.slice(bookings.length);
      // Обновить перечень букингов и установить тип действия для формирования списка шагов
      setNewBookings((prev) => {
        const data = newRooms.map((i) => {
          return createNewBookingDraft({
            tempId: rooms[rooms.length - 1].id,
            adultsCount: rooms[rooms.length - 1].adults,
            childrenCount: rooms[rooms.length - 1].children,
          });
        });
        return {
          bookings: [...prev.bookings, ...data],
          actionType: "addRooms",
        };
      });
    }
    // 3. Если в фильтре "Гости" удалили одну комнату
    else if (rooms.length < bookings.length) {
      const roomsIds = Array.from(rooms, (i) => i.id);
      // Обновить перечень букингов и установить тип действия для формирования списка шагов
      setNewBookings((prev) => {
        return {
          bookings: prev.bookings.filter((i) => roomsIds.includes(i.tempId)),
          actionType: "removeRooms",
        };
      });
    }
  }, [filterParams.rooms]);

  useEffect(() => {
    updateNewBookings();
  }, [updateNewBookings]);

  // Обновить даты новых букингов если был изменен фильтр "Дата заезда и выезда"
  const updateNewBookingsDates = useCallback(() => {
    const { arrival_datetime, departure_datetime } = filterParams;
    const { bookings } = newBookings;

    if (arrival_datetime && departure_datetime) {
      if (bookings.length) {
        setNewBookings((prev) => {
          return {
            bookings: prev.bookings.map((i) => {
              return {
                ...i,
                arrival_datetime: arrival_datetime.format(dateTimeFormat),
                departure_datetime: departure_datetime.format(dateTimeFormat),
              };
            }),
            actionType: "",
          };
        });
      }
    }
  }, [filterParams.arrival_datetime, filterParams.departure_datetime]);

  useEffect(() => {
    updateNewBookingsDates();
  }, [updateNewBookingsDates]);

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
          rooms={filterParams.rooms}
          setRooms={(val) =>
            setFilterParams((prev) => ({
              ...prev,
              rooms: val,
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
      if (filterParams.rooms.length > 1)
        return (
          <Box>
            {roomsCategories && roomsCategories?.length
              ? roomsCategories.map((roomCategory, index) => {
                  return (
                    <Button
                      key={index}
                      onClick={
                        () => null
                        // addBookingBaseInfo({
                        //   roomCategoryId: roomCategory._id,
                        //   allCategoryRoomsIDs: roomCategory.room_id,
                        //   bookedCategoryRoomsIDs: Array.from(
                        //     roomCategory.booked_rooms,
                        //     (i) => i.room_id
                        //   ),
                        //   tariffId: "672bb2c0424b6e7d9c94376a",
                        //   adultsCount: 1,
                        //   childrenCount: 0,
                        // })
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
                      onClick={
                        () => null
                        // addBookingBaseInfo({
                        //   roomCategoryId: roomCategory._id,
                        //   allCategoryRoomsIDs: roomCategory.room_id,
                        //   bookedCategoryRoomsIDs: Array.from(
                        //     roomCategory.booked_rooms,
                        //     (i) => i.room_id
                        //   ),
                        //   adultsCount: filterParams.rooms[0].adults,
                        //   childrenCount: filterParams.rooms[0].children,
                        // })
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
