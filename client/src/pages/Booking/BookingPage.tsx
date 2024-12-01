import React, { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  BookingType,
  BookingUserInfoType,
  CreateBookingType,
} from "../../redux/slices/Bookings/types";
import { RoomCategoryType } from "../../redux/slices/RoomsCategories/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import moment, { Moment } from "moment";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
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
import { CustomSelect } from "../components/shared/FormElements/CustomSelect";
import { findLastIndex } from "lodash";
import { SelectRoomSection } from "./components/SelectRoomSection";

// Типы
export type RoomCategoryPriceType = {
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

export type BookingStepNameType =
  | "Select a room"
  | "Select a tariff"
  | "Order services"
  | "Enter guest details"
  | "";

export type BookingStepType = {
  roomId: string;
  name: BookingStepNameType;
  isCurrent: boolean;
  isComplete: boolean;
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

export type BookingProgressStepType = {
  step: BookingStepType | null;
  label: string;
};

export type BookingProgressType = {
  currentStep: BookingProgressStepType;
  prevStep: BookingProgressStepType;
  nextStep: BookingProgressStepType;
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
    if (roomsCategories && sortedBookingsByRoomCategories) {
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

  const availableRoomCategories = useMemo(() => {
    return getAvailableRoomCategories(
      filterParams.arrival_datetime.format(dateTimeFormat)
    );
  }, [filterParams.arrival_datetime, roomsCategories, bookings]);

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

  const updateNewBookingDraft = useCallback(
    ({
      tempBookingId,
      currentStep,
      roomCategory,
    }: {
      tempBookingId: string;
      currentStep: BookingStepType;
      roomCategory: RoomCategoryType;
    }) => {
      // Проверяем правильно ли переданы данные и соответствуют ли они друг другу
      if (tempBookingId && currentStep.roomId === tempBookingId) {
        if (currentStep.name === "Select a room") {
          const { rooms } = filterParams;
          const roomQuestsCount = rooms[0].adults + rooms[0].children;

          setNewBookings((prev) => ({
            ...prev,
            bookings: prev.bookings.map((i) => {
              if (i.tempId === tempBookingId) {
                return {
                  ...i,
                  room_category_id: roomCategory._id,
                  price:
                    roomQuestsCount > 1
                      ? roomCategory.price_per_night_for_two_quest
                      : roomCategory.price_per_night_for_one_quest,
                };
              }
              return i;
            }),
          }));
          toNextStep();
        }
      }
    },
    []
  );

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
    // console.log("actionType ", actionType);
    if (actionType !== "") {
      let steps: BookingStepType[] = bookingSteps;
      const rooms = filterParams.rooms;
      const roomsCount = rooms.length;
      const { bookings } = newBookings;

      if (actionType === "addRooms") {
        // console.log("roomsCount ", roomsCount);

        // Если список шагов еще пустой
        if (!steps.length) {
          if (roomsCount === 1) {
            rooms.map((item, index) =>
              steps.push({
                roomId: item.id,
                name: "Select a room",
                isCurrent: index === 0 ? true : false, // Делаем активным первый шаг
                isComplete: false,
              })
            );
          }

          rooms.map((item, index) =>
            steps.push({
              roomId: item.id,
              name: "Select a tariff",
              isCurrent: index === 0 ? true : false, // Делаем активным первый шаг
              isComplete: false,
            })
          );

          rooms.map((item, index) =>
            steps.push({
              roomId: item.id,
              name: "Order services",
              isCurrent: false,
              isComplete: false,
            })
          );
          steps.push({
            roomId: "",
            name: "Enter guest details",
            isCurrent: false,
            isComplete: false,
          });
        }
        // Если список шагов не пустой тогда делаем дозапись
        else {
          // Заменяем имя шага "Select a room" (для одиночного бронирования) на "Select a tariff"
          // (для множественного бронирования)
          if (roomsCount > 1) {
            // Если есть название шага с таким именем, то...
            steps = steps.filter((i) => i.name !== "Select a room");
          }
          // Подсчет количества комнат на которые расчитаны шаги по "Select a tariff"
          let prevRoomsCount = steps.reduce(
            (acc, i) => (acc = i.name === "Select a tariff" ? acc + 1 : acc),
            0
          );
          // Исключить предудущие и оставить новые комнаты
          const newRooms = rooms.slice(prevRoomsCount);

          const a: BookingStepType[] = newRooms.map((i) => {
            return {
              roomId: i.id,
              name: "Select a tariff",
              isCurrent: false,
              isComplete: false,
            };
          });
          // Получаем индекс последнего вхождения шага "select a tariff"
          let lastSelectTariffStepIdx = findLastIndex(
            steps,
            (step) => step.name === "Select a tariff"
          );
          // Вставляем дополнительный шаг "select a tariff" и делаем его "текущим шагом"
          steps.splice(lastSelectTariffStepIdx, 0, ...a);

          const b: BookingStepType[] = newRooms.map((i) => {
            return {
              roomId: i.id,
              name: "Order services",
              isCurrent: false,
              isComplete: false,
            };
          });
          // Получаем индекс последнего вхождения шага "order services"
          let lastOrderServicesStepIdx = findLastIndex(
            steps,
            (step) => step.name === "Order services"
          );

          // Вставляем дополнительный шаг "order services"
          steps.splice(lastOrderServicesStepIdx, 0, ...b);
        }
        // Если для всех предыдущих комнат тарифы уже были выбраны,
        // то убираем для текущего шага статус "текущий шаг"...
        steps = steps.map((i) =>
          i.isCurrent ? { ...i, isCurrent: false } : i
        );
        // ... и ставим его для нового шага
        const idx = bookings.findIndex((item, i) => !item.tariff_id);
        steps = steps.map((item, i) => {
          if (i === idx) {
            return { ...item, isCurrent: true };
          }
          return item;
        });
      } else if (actionType === "removeRooms") {
        // Получаем индексы комнат после удаления в фильтре "Гости"
        const roomsIds = Array.from(rooms, (i) => i.id);

        let currentItemIdx = steps.findIndex((i) => i.isCurrent);
        const lastCurrentStepIdx = steps.findIndex((i) => i.isCurrent);
        let newCurrentStepIdx = -1;
        let isSomeRemoveItemMatchCurrent = false;
        let prevRemoveItemsCount = 0;
        let nextRemoveItemsCount = 0;
        // Подсчет количества удаляемых элементов...
        for (let i = 0; i < steps.length; i++) {
          if (!roomsIds.includes(steps[i].roomId) && steps[i].roomId !== "") {
            // ... до текущего элемента
            if (i < currentItemIdx) {
              prevRemoveItemsCount += 1;
            }
            // ...является текущим элементом
            else if (i === currentItemIdx) {
              isSomeRemoveItemMatchCurrent = true;
            }
            // ...больше текущего элемента
            else if (i > currentItemIdx) {
              nextRemoveItemsCount += 1;
            }
          }
        }

        // Удалить все шаги, id комнат которых уже нет в списке фильтра "Гости", но оставить шаг для "Указания данных гостей"
        steps = steps.filter(
          (i) => roomsIds.includes(i.roomId) || i.roomId === ""
        );

        // Убираем для текущего шага статус "текущий шаг"
        steps = steps.map((i) =>
          i.isCurrent ? { ...i, isCurrent: false } : i
        );

        // Если удаляемые элементы расположены только до текущего элемента
        if (
          prevRemoveItemsCount > 0 &&
          !isSomeRemoveItemMatchCurrent &&
          nextRemoveItemsCount === 0
        ) {
          // в примере индексация элементов начинается с "1"
          // a b c | f g h | o -
          // 1 2 3 | 4 5 6 | 7
          // --- 1 ---
          // a c | f h | o -> b g элементы были удалены
          // 1 2 | 3 4 | 5
          // --- 2 ---
          // c | h | o -> a b f g элементы были удалены
          // 1 | 2 | 3
          newCurrentStepIdx = lastCurrentStepIdx - prevRemoveItemsCount;
        } else if (
          prevRemoveItemsCount > 0 &&
          isSomeRemoveItemMatchCurrent &&
          nextRemoveItemsCount === 0
        ) {
          // a b c | f g h | o -
          // 1 2 3 | 4 5 6 | 7
          // --- 1 ---
          // c | h | o -> g (current) a b f g элементы были удалены
          // 1 | 2 | 3
          // --- 2 ---
          // b c | g h | o -> f (current) a f элементы были удалены
          // 1 2 | 3 4 | 5
          newCurrentStepIdx = lastCurrentStepIdx - prevRemoveItemsCount + 1;
        } else if (
          prevRemoveItemsCount > 0 &&
          isSomeRemoveItemMatchCurrent &&
          nextRemoveItemsCount > 0
        ) {
          // a b c | f g h | o -
          // 1 2 3 | 4 5 6 | 7
          // --- 1 ---
          // a | f | o -> g (current) b c g h элементы были удалены
          // 1 | 2 | 3
          // --- 2 ---
          // b c | g h | o -> f (current) b c g h элементы были удалены
          // 1 2 | 3 4 | 5
          newCurrentStepIdx =
            lastCurrentStepIdx -
            prevRemoveItemsCount +
            1 +
            nextRemoveItemsCount;
        }

        if (newCurrentStepIdx < 0) newCurrentStepIdx = 0;
        // Устанавливаем состояние "текущий" для нового шага
        steps = steps.map((item, i) =>
          i === newCurrentStepIdx ? { ...item, isCurrent: true } : item
        );

        // Заменяем имя шага "Select a tariff" (для множественного бронирования) на "Select a room"
        // (для одиночного бронирования)
        if (roomsCount === 1) {
          // Если есть название шага с таким именем, то...
          steps = steps.map((i) =>
            i.isCurrent ? { ...i, isCurrent: false } : i
          );
          steps.splice(0, 0, {
            ...steps[0],
            name: "Select a room",
            isCurrent: true,
          });
        }
      }
      setBookingSteps(steps);
    }
    console.log("abcd");
  }, [newBookings.bookings.length, newBookings.actionType]);

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
      // Создать черновики букингов по количеству выбранных комнат в фильтре "Гости"
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
            tempId: i.id,
            adultsCount: i.adults,
            childrenCount: i.children,
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

  // Обновить количество гостей для букингов если был изменен фильтр "Гости"
  const updateNewBookingsQuests = useCallback(() => {
    const { rooms } = filterParams;
    const { bookings } = newBookings;

    if (rooms.length === bookings.length) {
      setNewBookings((prev) => {
        return {
          bookings: prev.bookings.map((item, i) => {
            return {
              ...item,
              adults_count: rooms[i].adults,
              children_count: rooms[i].children,
            };
          }),
          actionType: "",
        };
      });
    }
  }, [filterParams.rooms]);

  useEffect(() => {
    updateNewBookingsQuests();
  }, [updateNewBookingsQuests]);

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

  const bookingProgress = useMemo((): BookingProgressType => {
    let currentStep: BookingProgressStepType = { step: null, label: "" };
    let prevStep: BookingProgressStepType = { step: null, label: "" };
    let nextStep: BookingProgressStepType = { step: null, label: "" };
    // Определение индекса текущего шага
    const curIdx = bookingSteps.findIndex((i) => i.isCurrent);
    // Определение текущего шага
    const cur = bookingSteps.find((i) => i.isCurrent);
    if (cur) {
      const curName = cur.name;
      let curStepLabel = "";
      if (curName === "Select a room") {
        curStepLabel = "Выберите номер";
      } else if (curName === "Select a tariff") {
        const elements = bookingSteps.filter(
          (i) => i.name === "Select a tariff"
        );
        const idx = elements.findIndex((i) => i.isCurrent);

        if (idx) {
          curStepLabel =
            elements.length > 1
              ? `Выберите тариф для ${idx + 1}-го номера`
              : "Выберите тариф";
        }
      } else if (curName === "Order services") {
        const elements = bookingSteps.filter(
          (i) => i.name === "Order services"
        );
        const idx = elements.findIndex((i) => i.isCurrent);

        if (idx) {
          curStepLabel =
            elements.length > 1
              ? `Закажите услуги для ${idx + 1}-го номера`
              : "Выберите услуги";
        }
      } else if (curName === "Enter guest details") {
        curStepLabel = "Введите данные гостей";
      }
      currentStep = {
        step: cur,
        label: curStepLabel,
      };
    }
    // Определение предыдущего шага
    if (curIdx >= 0) {
      const prevCurIdx = curIdx > 0 ? curIdx - 1 : null;
      if (prevCurIdx) {
        const prevCur = bookingSteps.find((_, idx) => idx === prevCurIdx);
        if (prevCur) {
          let prevStepLabel = "";
          if (prevCur.name === "Select a room") {
            prevStepLabel = "К номерам";
          } else if (prevCur.name === "Select a tariff") {
            const elements = bookingSteps.filter(
              (i) => i.name === "Select a tariff"
            );
            const idx = elements.findIndex((i) => i.roomId === prevCur.roomId);
            // Если индекс не равен последнем элементу данного типа шага
            prevStepLabel =
              idx && idx < elements.length - 1
                ? `К тарифам ${idx + 1}-го номера`
                : "К тарифам";
          } else if (prevCur.name === "Order services") {
            const elements = bookingSteps.filter(
              (i) => i.name === "Order services"
            );
            const idx = elements.findIndex((i) => i.roomId === prevCur.roomId);
            // Если индекс не равен последнем элементу данного типа шага
            prevStepLabel =
              idx && idx < elements.length - 1
                ? `К услугам ${idx + 1}-го номера`
                : "К услугам";
          }
          prevStep = {
            step: prevCur,
            label: prevStepLabel,
          };
        }
      }
    }
    // Определение следующего шага
    if (curIdx >= 0) {
      const nextCurIdx = curIdx < bookingSteps.length - 1 ? curIdx + 1 : null;
      if (nextCurIdx) {
        const nextCur = bookingSteps.find((_, idx) => idx === nextCurIdx);
        if (nextCur) {
          let nextStepLabel = "";

          if (nextCur.isComplete) {
            nextStepLabel = "Продолжить бронирование";
          }

          nextStep = {
            step: nextCur,
            label: nextStepLabel,
          };
        }
      }
    }

    return {
      currentStep,
      prevStep,
      nextStep,
    };
  }, [bookingSteps]);

  const toPrevStep = () => {
    const curIdx = bookingSteps.findIndex((i) => i.isCurrent);
    if (curIdx) {
      const prevCurIdx = curIdx > 0 ? curIdx - 1 : 0;
      if (prevCurIdx !== curIdx) {
        setBookingSteps((prev) =>
          prev.map((item, idx) => ({
            ...item,
            isCurrent: idx === prevCurIdx ? true : false,
          }))
        );
      }
    }
  };

  const toNextStep = () => {
    const curIdx = bookingSteps.findIndex((i) => i.isCurrent);

    if (curIdx >= 0) {
      const nextCurIdx = curIdx < bookingSteps.length - 1 ? curIdx + 1 : null;
      if (nextCurIdx && nextCurIdx !== curIdx) {
        setBookingSteps((prev) =>
          prev.map((item, idx) => ({
            ...item,
            isCurrent: idx === nextCurIdx ? true : false,
          }))
        );
      }
    }
  };

  const RoomCategoriesCards = () => {
    if (roomsCategories && roomsCategories?.length) {
      // Тип интерфейса для множественного выбора номеров (со списком номеров и тарифов)
      if (filterParams.rooms.length > 1) {
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
      }

      // Тип интерфейса для выбора одного номера (со списком номеров)
      if (bookingProgress.currentStep.step?.name === "Select a room") {
        return (
          <SelectRoomSection
            currentStepIdx={bookingSteps.findIndex((i) => i.isCurrent) + 1 || 1}
            stepsTotal={bookingSteps.length}
            availableRoomCategories={availableRoomCategories}
            roomQuestsCount={
              filterParams.rooms[0].adults + filterParams.rooms[0].children
            }
            updateNewBookingDraft={updateNewBookingDraft}
            bookingProgress={bookingProgress}
            nextStepHandler={toNextStep}
            prevStepHandler={toPrevStep}
          />
        );
      }
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
