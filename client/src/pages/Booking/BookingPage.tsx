import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import {
  BookingGuestsDetailsType,
  BookingStepNameType,
  BookingStepType,
  BookingType,
  BookingGuestsDetailsPrimitiveType,
  CreateBookingLocalType,
  CreateBookingType,
  RoomGuestsCountType,
  BookingDateTimeType,
  NewBookingsType,
} from "../../redux/slices/Bookings/types";
import { RoomCategoryType } from "../../redux/slices/RoomsCategories/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import moment, { Moment } from "moment";
import { Box, Button, Card, Link, Stack, Typography } from "@mui/material";
import { dateFormat, dateTimeFormat } from "../../constants";
import { BookingInfoWidget } from "./components/BookingInfoWidget";
import { GroupObjectByKey, isDateTimeRangeContained } from "./utils";
import { GetRoomsCategories } from "../../redux/slices/RoomsCategories/roomsCategoriesSlice";
import {
  GetBookings,
  setBookingSteps,
  setCurrentBooking,
  setCurrentRoomCategory,
  setNewBookings,
} from "../../redux/slices/Bookings/bookingsSlice";
import BasePageLayout from "../components/BasePageLayout";
import { GetUnavailableBookingDates } from "../../redux/slices/UnavailableBookingDates/unavailableBookingDates";
import { theme } from "../../theme";
import { CustomRangeDatepicker } from "../components/shared/RangeDatepicker/CustomRangeDatepicker";
import { CustomSelect } from "../components/shared/FormElements/CustomSelect";
import { findLastIndex, isEqual } from "lodash";
import { SelectRoomSection } from "./components/SelectRoomSection";
import { BookingProgressIndicatorBaner } from "./components/BookingProgressIndicatorBaner";
import { SelectTariffSection } from "./components/SelectTariffSection/SelectTariffSection";
import { OrderServicesSection } from "./components/OrderServicesSection/OrderServicesSection";
import { BookingTariffType } from "../../redux/slices/BookingTariffs/types";
import { BookingServiceType } from "../../redux/slices/BookingServices/types";
import { EnterGuestsDetailsSection } from "./components/EnterGuestsDetailsSection/EnterGuestsDetailsSection";
import { SelectGuestsDropdown } from "./components/FiltersBar/SelectGuestsDropdown";
import { useGetApiData } from "../../hooks/getApiData";
import { CustomCircleProgressIndicator } from "../components/shared/CustomCircleProgressIndicator";
import { CustomIconLabel } from "../components/shared/CustomIconLabel";
import { PhoneIcon } from "../../assets/icons/PhoneIcon";
import { ErrorOutlined } from "@mui/icons-material";
import { EmailIcon } from "../../assets/icons/EmailIcon";
import { NotFoundRoomCategoriesBanner } from "./components/NotFoundRoomCategoriesBanner";
import { StepContent } from "./components/StepContent";
import { FiltersBar } from "./components/FiltersBar";

// Типы
export type RoomCategoryPriceType = {
  id: string;
  price: number;
};

export type SortedBookingType = {
  [key: string]: BookingType[];
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

export const BookingContext = createContext<{
  checkDateAvailable: ({
    date,
    specificRoomCategoryId,
  }: {
    date: Moment;
    specificRoomCategoryId?: string;
  }) => CheckDateAvailableType | null;
  availableRoomCategories: RoomCategoryPriceType[] | null;
  updateBookingDraft: ({
    tempBookingId,
    currentStep,
    roomCategory,
    tariff,
    roomCategoryPrice,
    serviceId,
    transferId,
    transferComment,
    allServices,
    bedTypeId,
    viewFromWindowId,
    newRoomCategory,
    guestsDetails,
    isSetCompleteStep,
  }: {
    tempBookingId?: string;
    currentStep: BookingStepType;
    roomCategory?: RoomCategoryType;
    tariff?: BookingTariffType;
    roomCategoryPrice?: number;
    serviceId?: string;
    transferId?: string;
    transferComment?: string;
    allServices?: BookingServiceType[];
    bedTypeId?: string;
    viewFromWindowId?: string;
    newRoomCategory?: RoomCategoryType & { additionalPayment: number };
    guestsDetails?: BookingGuestsDetailsPrimitiveType;
    isSetCompleteStep?: boolean;
  }) => void;
  bookingProgressCurrentStep: BookingProgressStepType;
  toPrevStep: () => void;
  toNextStep: (isSetPrevComplete?: boolean) => void;
  setCompleteStep: (stepName: BookingStepNameType, status: boolean) => void;
}>({
  checkDateAvailable: () => null,
  availableRoomCategories: null,
  updateBookingDraft: () => null,
  bookingProgressCurrentStep: {
    step: null,
    label: "",
  },
  toPrevStep: () => null,
  toNextStep: () => null,
  setCompleteStep: () => null,
});

export type CheckDateAvailableType = {
  date: Moment;
  isAvailable: boolean;
  roomMinPrice: number | null;
};

interface Props {}

export const BookingPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading: isLoadingApiData } = useGetApiData();
  const { unavailableBookingDates } = useAppSelector(
    (state) => state.unavailableBookingDates
  );
  const { roomsCategories } = useAppSelector((state) => state.roomsCategories);
  const { transferVariants } = useAppSelector(
    (state) => state.transfersVariants
  );
  const { bookings, newBookings, bookingSteps, filterParams, currentBooking } =
    useAppSelector((state) => state.bookings);

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

  const getAvailableRoomCategories = useCallback(
    ({
      arrival_datetime,
      departure_datetime,
    }: BookingDateTimeType): RoomCategoryPriceType[] | null => {
      // Если в диапазоне выбранной даты заезда и выезда есть хотя бы одна из "недоступных дат"
      if (unavailableBookingDates) {
        if (
          unavailableBookingDates.find(
            (i) =>
              moment(i.date).isBetween(
                moment(arrival_datetime),
                moment(departure_datetime)
              ),
            "[]"
          )
        ) {
          return [];
        }
      }
      if (roomsCategories && sortedBookingsByRoomCategories) {
        const availableRoomCategories: RoomCategoryPriceType[] = [];

        Object.entries(sortedBookingsByRoomCategories).map(
          (item: any, index) => {
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

              bookingsOnCategory.map((i: BookingType) => {
                // Подсчет забронированных комнат, диапазону "дата заезда/выезда"
                // которых принадлежит дата, переданная в ф-цию
                // (а значит на эту дату уже нельзя забронировать эти комнаты)

                if (
                  isDateTimeRangeContained({
                    start1: moment(
                      moment(i.arrival_datetime).format(dateFormat)
                    ),
                    end1: moment(
                      moment(i.departure_datetime).format(dateFormat)
                    ),
                    start2: moment(arrival_datetime.format(dateFormat)),
                    end2: moment(departure_datetime.format(dateFormat)),
                  })
                  // (
                  // moment(date).isBetween(
                  //   moment(i.arrival_datetime),
                  //   moment(i.departure_datetime)
                  // ),
                  // "[]"
                  // )
                ) {
                  bookedOnDateCount += 1;
                }
              });

              // console.log(categoryRoom.title, bookedOnDateCount, categoryRoomCount);
              // Если в данной "категории комнат" еще есть доступные комнаты
              if (bookedOnDateCount < categoryRoomCount) {
                // То записываем данные "категории комнат" в перечень доступных "категорий комнат", а именно id и price (в зав. от кол. гостей)
                availableRoomCategories.push({
                  id: categoryRoom._id,
                  price: categoryRoom.price_per_night_for_one_quest,
                });
              }
            }
          }
        );
        // Получение id "категорий комнат" на которые забронированы комнаты
        const bookedOnCategoriesIds = Object.keys(
          sortedBookingsByRoomCategories
        );
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
    },
    [unavailableBookingDates, roomsCategories, sortedBookingsByRoomCategories]
  );

  const availableRoomCategories = useMemo(() => {
    if (roomsCategories && bookings) {
      const { arrival_datetime, departure_datetime } = filterParams;
      return getAvailableRoomCategories({
        arrival_datetime: arrival_datetime,
        departure_datetime: departure_datetime,
      });
    }
    return null;
  }, [
    filterParams.arrival_datetime,
    filterParams.departure_datetime,
    roomsCategories,
    bookings,
  ]);

  const checkDateAvailable = useCallback(
    ({
      date,
      specificRoomCategoryId,
    }: {
      date: Moment;
      specificRoomCategoryId?: string;
    }): CheckDateAvailableType | null => {
      if (unavailableBookingDates) {
        // Определение доступных категорий комнат
        const availableRoomCategories = getAvailableRoomCategories({
          arrival_datetime: date,
          departure_datetime: date,
        });

        if (availableRoomCategories && availableRoomCategories.length) {
          if (specificRoomCategoryId) {
            const exist = availableRoomCategories.find(
              (i) => i.id === specificRoomCategoryId
            );

            return {
              date,
              isAvailable: exist ? true : false,
              roomMinPrice: exist ? exist.price : -1,
            };
          }
          // Определение минимальной стоимости комнаты
          const prices = Array.from(availableRoomCategories, (i) => i.price);
          const roomMinPrice = Math.min(...prices);

          return {
            date,
            isAvailable:
              !unavailableBookingDates.find(
                (i) => i.date === date.format(dateFormat)
              ) && availableRoomCategories.length > 0,
            roomMinPrice,
          };
        }
      }

      return null;
    },
    [unavailableBookingDates]
  );

  const updateBookingDraft = useCallback(
    ({
      tempBookingId,
      currentStep,
      roomCategory,
      tariff,
      serviceId,
      transferId,
      transferComment,
      allServices,
      newRoomCategory,
      bedTypeId,
      viewFromWindowId,
      guestsDetails,
      isSetCompleteStep = false,
    }: {
      tempBookingId?: string;
      currentStep: BookingStepType;
      roomCategory?: RoomCategoryType;
      tariff?: BookingTariffType;
      serviceId?: string;
      transferId?: string;
      transferComment?: string;
      allServices?: BookingServiceType[];
      newRoomCategory?: RoomCategoryType & { additionalPayment: number };
      bedTypeId?: string;
      viewFromWindowId?: string;
      guestsDetails?: BookingGuestsDetailsPrimitiveType;
      isSetCompleteStep?: boolean;
    }) => {
      const getRoomCategoryPrice = ({
        room,
        roomCategory,
      }: {
        room: RoomGuestsCountType;
        roomCategory: RoomCategoryType;
      }) => {
        // Подсчитываем количество гостей комнаты
        const roomGuestsCount = room.adults + room.children;
        // Получаем стоимость категории комнаты
        return roomGuestsCount > 1
          ? roomCategory.price_per_night_for_two_quest
          : roomCategory.price_per_night_for_one_quest;
      };

      // Проверяем правильно ли переданы данные (соответствуют ли id черновика букинга id текущего шага)
      if (
        ((tempBookingId && currentStep.roomId === tempBookingId) ||
          currentStep.roomId === "") && // Для шага "Введите данные гостей"
        bookings &&
        roomsCategories
      ) {
        // Специальные пожелания (кровать, вид из окна, смена категории комнаты)
        if (
          currentStep.name === "Select a tariff" ||
          currentStep.name === "Order services"
        ) {
          if (newRoomCategory) {
            dispatch(
              setNewBookings({
                ...newBookings,
                bookings: newBookings.bookings.map((i) => {
                  if (i.tempId === tempBookingId) {
                    return {
                      ...i,
                      room_category_id: newRoomCategory._id,
                      roomPrice:
                        i.roomPrice + newRoomCategory.additionalPayment,
                      tariffPrice: 0,
                      servicePriceTotal: 0,
                      tariff_id: "",
                      service_id: [],
                      view_from_window_id: "",
                      bed_type_id: "",
                      isRoomCategoryWasChanged: true,
                    };
                  }
                  return i;
                }),
              })
            );

            toSpecificStep("Select a tariff");
          } else if (bedTypeId !== undefined) {
            dispatch(
              setNewBookings({
                ...newBookings,
                bookings: newBookings.bookings.map((i) => {
                  if (i.tempId === tempBookingId) {
                    return {
                      ...i,
                      bed_type_id: bedTypeId,
                    };
                  }
                  return i;
                }),
              })
            );
          } else if (viewFromWindowId !== undefined) {
            dispatch(
              setNewBookings({
                ...newBookings,
                bookings: newBookings.bookings.map((i) => {
                  if (i.tempId === tempBookingId) {
                    return {
                      ...i,
                      view_from_window_id: viewFromWindowId,
                    };
                  }
                  return i;
                }),
              })
            );
          }
        }
        // Для одиночного режима бронирования
        if (currentStep.name === "Select a room" && roomCategory) {
          // Получить id всех комнат, которые забронированы на данную категорию
          const currentBookedRoomsOnCategory = Array.from(
            newBookings.bookings.filter(
              (i) => i.room_category_id === roomCategory._id
            ),
            (i) => i.room_id
          );
          // Поиск id забронированных на данную категорию
          const prevBookedRoomOnCategory = bookings
            .filter((i) => i.room_category_id === roomCategory._id)
            .map((i) => i.room_id);
          // Найти id доступной комнаты для бронирования
          const freeRoomId = roomCategory.room_id.find(
            (i) =>
              !currentBookedRoomsOnCategory.includes(i) &&
              !prevBookedRoomOnCategory.includes(i)
          );

          if (freeRoomId) {
            const roomPrice = getRoomCategoryPrice({
              room: filterParams.rooms[0], // при одиночном бронирования только одна комната в списке
              roomCategory,
            });

            dispatch(
              setNewBookings({
                ...newBookings,
                bookings: newBookings.bookings.map((i, index) => {
                  if (index === 0) {
                    return {
                      ...i,
                      room_category_id: roomCategory._id,
                      room_id: freeRoomId,
                      tariffPrice: 0,
                      servicePriceTotal: 0,
                      roomPrice,
                      price: roomPrice + i.transferPrice, // добавить цену трансфера, если он ранее был выбран, а после была заменена категория комнаты
                      service_id: [],
                      tariff_id: "",
                      bed_type_id: "",
                      view_from_window_id: "",
                    };
                  }
                  return i;
                }),
              })
            );

            // Установить флаг complete для текущего шага и перейти к следующему шагу
            toNextStep(true);
          }
        } else if (currentStep.name === "Select a tariff" && roomCategory) {
          if (tariff) {
            dispatch(
              setNewBookings({
                ...newBookings,
                bookings: newBookings.bookings.map((i) => {
                  if (i.tempId === tempBookingId) {
                    const room = filterParams.rooms.find(
                      (j) => j.id === i.tempId
                    );

                    if (room) {
                      const roomPrice = getRoomCategoryPrice({
                        room,
                        roomCategory,
                      });

                      return {
                        ...i,
                        tariff_id: tariff._id,
                        tariffPrice: tariff.cost,
                        roomPrice,
                        price:
                          roomPrice +
                          tariff.cost +
                          i.servicePriceTotal +
                          i.transferPrice,
                      };
                    }
                  }

                  return i;
                }),
              })
            );

            // Установить флаг complete для текущего шага и перейти к следующему шану
            toNextStep(true);
          }
        } else if (currentStep.name === "Order services") {
          if (allServices && serviceId) {
            dispatch(
              setNewBookings({
                ...newBookings,
                bookings: newBookings.bookings.map((i) => {
                  if (i.tempId === tempBookingId) {
                    // Если сервис еще не добавлен, то добавить, если есть - исключить
                    const servicesIds = !i.service_id.includes(serviceId)
                      ? [...i.service_id, serviceId]
                      : i.service_id.filter((j) => j !== serviceId);
                    const servicePriceTotal = allServices
                      .filter((j) => servicesIds.includes(j._id))
                      .reduce((acc, cur) => {
                        return (acc += cur.price);
                      }, 0);

                    return {
                      ...i,
                      service_id: servicesIds,
                      servicePriceTotal,
                      price:
                        i.roomPrice +
                        i.tariffPrice +
                        servicePriceTotal +
                        i.transferPrice,
                    };
                  }
                  return i;
                }),
              })
            );
          } else if (transferId !== undefined) {
            dispatch(
              setNewBookings({
                ...newBookings,
                bookings: newBookings.bookings.map((i) => {
                  const transferPrice =
                    (transferVariants &&
                      transferVariants.find((j) => j._id === transferId)
                        ?.price) ||
                    0;

                  return {
                    ...i,
                    transfer_id: transferId,
                    transfer_comment: transferComment ? transferComment : "",
                    transferPrice,
                    price:
                      i.roomPrice +
                      i.tariffPrice +
                      i.servicePriceTotal +
                      transferPrice,
                  };
                }),
              })
            );
          }
        } else if (currentStep.name === "Enter guest details") {
          if (guestsDetails) {
            const {
              name,
              lastname,
              surname,
              email,
              phone,
              nationality,
              sendConfirmOnPhone,
              wantToKnowAboutSpecialOffersAndNews,
              arrivalTime,
              departureTime,
              bedTypeId,
              viewFromWindowId,
              comment,
              bookingForWhom,
              paymentMethodId,
            } = guestsDetails;

            const bookingInfo = newBookings.bookings[0]; // берем любой букинг, так как "даты заезда/выезда" и "данные гостей" у них одинаковые
            const bookingUserInfo = bookingInfo.user;

            const prevValues = {
              name: bookingUserInfo.name,
              lastname: bookingUserInfo.lastname,
              surname: bookingUserInfo.surname,
              email: bookingUserInfo.email,
              phone: bookingUserInfo.phone,
              nationality: bookingUserInfo.nationality,
              sendConfirmOnPhone: bookingUserInfo.send_confirm_on_phone,
              wantToKnowAboutSpecialOffersAndNews:
                bookingUserInfo.want_to_know_about_special_offers_and_news,
              arrivalTime: moment(
                bookingInfo.arrival_datetime,
                dateTimeFormat
              ).format("HH:mm"),
              departureTime: moment(
                bookingInfo.departure_datetime,
                dateTimeFormat
              ).format("HH:mm"),
              bedTypeId: bookingInfo.bed_type_id,
              viewFromWindowId: bookingInfo.view_from_window_id,
              comment: bookingInfo.comment,
              bookingForWhom: bookingInfo.booking_for_whom,
            };

            const isCanUpdate = () => {
              if (newBookings.bookings.length === 1) {
                // если одиночное бронирование
                return !isEqual(guestsDetails, prevValues);
              } else if (newBookings.bookings.length > 1) {
                // если не одиночное бронирование
                const excludedKeys = ["bedTypeId", "viewFromWindowId"]; // исключаем эти поля, так как на множественном бронирование их не будет на этом шаге
                return !isEqual(
                  Object.fromEntries(
                    Object.entries(guestsDetails).filter(
                      ([key]) => !excludedKeys.includes(key)
                    )
                  ),
                  Object.fromEntries(
                    Object.entries(prevValues).filter(
                      ([key]) => !excludedKeys.includes(key)
                    )
                  )
                );
              }
            };

            if (isCanUpdate()) {
              dispatch(
                setNewBookings({
                  ...newBookings,
                  bookings: newBookings.bookings.map((i) => {
                    return {
                      ...i,
                      user: {
                        name,
                        lastname,
                        surname,
                        email,
                        phone,
                        nationality,
                        send_confirm_on_phone: sendConfirmOnPhone,
                        want_to_know_about_special_offers_and_news:
                          wantToKnowAboutSpecialOffersAndNews,
                      },
                      arrival_datetime: arrivalTime
                        ? moment(i.arrival_datetime, dateTimeFormat)
                            .set("hours", Number(arrivalTime.split(":")[0]))
                            .set("minutes", Number(arrivalTime.split(":")[1]))
                            .format(dateTimeFormat)
                        : i.arrival_datetime,
                      departure_datetime: departureTime
                        ? moment(i.departure_datetime, dateTimeFormat)
                            .set("hours", Number(departureTime.split(":")[0]))
                            .set("minutes", Number(departureTime.split(":")[1]))
                            .format(dateTimeFormat)
                        : i.departure_datetime,
                      bed_type_id:
                        bedTypeId !== undefined ? bedTypeId : i.bed_type_id,
                      view_from_window_id:
                        viewFromWindowId !== undefined
                          ? viewFromWindowId
                          : i.view_from_window_id,
                      comment,
                      booking_for_whom: bookingForWhom,
                      payment_method_id: paymentMethodId,
                    };
                  }),
                })
              );
            }

            if (!currentStep.isComplete && isSetCompleteStep) {
              setCompleteStep("Enter guest details", true);
            }
          }
        }
      }
    },
    [bookings, roomsCategories, newBookings, transferVariants]
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
      user: {
        name: "",
        lastname: "",
        surname: "",
        phone: "",
        email: "",
        nationality: "",
        send_confirm_on_phone: false,
        want_to_know_about_special_offers_and_news: false,
      },
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
      roomPrice: 0,
      tariffPrice: 0,
      servicePriceTotal: 0,
      transferPrice: 0,
      comment: "",
      booking_for_whom: "for_yourself",
      isRoomCategoryWasChanged: false,
    };
  };

  const updateBookingSteps = useCallback(() => {
    const actionType = newBookings.actionType;
    if (actionType !== "") {
      let steps: BookingStepType[] = [...bookingSteps];
      const rooms = filterParams.rooms;
      const roomsCount = rooms.length;
      const { bookings } = newBookings;

      if (actionType === "addRooms") {
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
              isComplete: true,
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
              isComplete: true,
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
      dispatch(setBookingSteps(steps));
    }
  }, [newBookings.bookings.length, newBookings.actionType]);

  useEffect(() => {
    updateBookingSteps();
  }, [updateBookingSteps]);

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
      dispatch(setNewBookings({ bookings: data, actionType: "addRooms" }));
    }
    // 2. Если в фильтре "Гости" добавили одну или несколько комнат
    else if (rooms.length > bookings.length) {
      const newRooms = rooms.slice(bookings.length);
      // Обновить перечень букингов и установить тип действия для формирования списка шагов
      dispatch(
        setNewBookings({
          bookings: [
            ...newBookings.bookings,
            ...newRooms.map((i) => {
              return createNewBookingDraft({
                tempId: i.id,
                adultsCount: i.adults,
                childrenCount: i.children,
              });
            }),
          ],
          actionType: "addRooms",
        })
      );
    }
    // 3. Если в фильтре "Гости" удалили одну комнату
    else if (rooms.length < bookings.length) {
      const roomsIds = Array.from(rooms, (i) => i.id);
      // Обновить перечень букингов и установить тип действия для формирования списка шагов
      dispatch(
        setNewBookings({
          bookings: newBookings.bookings.filter((i) =>
            roomsIds.includes(i.tempId)
          ),
          actionType: "removeRooms",
        })
      );
    }
  }, [filterParams.rooms]);

  useEffect(() => {
    updateNewBookings();
  }, [updateNewBookings]);

  // Обновить даты новых букингов если был изменен фильтр "Дата заезда и выезда"
  const updateNewBookingsDates = useCallback(
    (newBookings: NewBookingsType) => {
      const { arrival_datetime, departure_datetime } = filterParams;
      const { bookings } = newBookings;

      if (arrival_datetime && departure_datetime) {
        if (bookings.length) {
          dispatch(
            setNewBookings({
              bookings: bookings.map((i) => {
                return {
                  ...i,
                  arrival_datetime: arrival_datetime.format(dateTimeFormat),
                  departure_datetime: departure_datetime.format(dateTimeFormat),
                };
              }),
              actionType: "",
            })
          );
        }
      }
    },
    [filterParams.arrival_datetime, filterParams.departure_datetime]
  );

  useEffect(() => {
    updateNewBookingsDates(newBookings);
  }, [updateNewBookingsDates]);

  // Обновить количество гостей для букингов если был изменен фильтр "Гости"
  const updateNewBookingsGuests = useCallback(
    (newBookings: NewBookingsType) => {
      const { rooms } = filterParams;
      const { bookings } = newBookings;

      if (rooms.length === bookings.length) {
        dispatch(
          setNewBookings({
            bookings: bookings.map((item, i) => {
              return {
                ...item,
                adults_count: rooms[i].adults,
                children_count: rooms[i].children,
              };
            }),
            actionType: "",
          })
        );
      }
    },
    [filterParams.rooms]
  );

  useEffect(() => {
    updateNewBookingsGuests(newBookings);
  }, [updateNewBookingsGuests]);

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

        if (idx >= 0) {
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

        if (idx >= 0) {
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
      if (prevCurIdx !== null && prevCurIdx >= 0) {
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
      if (nextCurIdx !== null) {
        const nextCur = bookingSteps.find((_, idx) => idx === nextCurIdx);
        if (nextCur) {
          let nextStepLabel = "";

          if (cur && cur.isComplete) {
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

  const toSpecificStep = (stepName: BookingStepNameType) => {
    const nextStepIdx = bookingSteps.findIndex((i) => i.name === stepName);
    if (nextStepIdx) {
      dispatch(
        setBookingSteps(
          bookingSteps.map((item, idx) => ({
            ...item,
            isCurrent: idx === nextStepIdx ? true : false,
          }))
        )
      );
    }
  };

  const toPrevStep = useCallback(() => {
    const curIdx = bookingSteps.findIndex((i) => i.isCurrent);

    if (curIdx) {
      const prevCurIdx = curIdx > 0 ? curIdx - 1 : 0;
      if (prevCurIdx !== curIdx) {
        dispatch(
          setBookingSteps(
            bookingSteps.map((item, idx) => ({
              ...item,
              isCurrent: idx === prevCurIdx ? true : false,
              isComplete:
                item.name === "Enter guest details" && item.isComplete
                  ? false
                  : item.isComplete, // убрать статус isComplete=true (чтобы модалка на "Подтверждение бронирования" не реагировал каждый раз на значение true). Значение true можно будет вернуть после повторного нажатия на кнопку "Продолжить" на шаге "Введите данные гостей"
            }))
          )
        );
      }
    }
  }, [bookingSteps]);

  const toNextStep = useCallback(
    (isSetPrevComplete?: boolean) => {
      const curIdx = bookingSteps.findIndex((i) => i.isCurrent);

      if (curIdx >= 0) {
        const nextCurIdx = curIdx < bookingSteps.length - 1 ? curIdx + 1 : null;

        if (nextCurIdx && nextCurIdx !== curIdx) {
          dispatch(
            setBookingSteps(
              bookingSteps.map((item, idx) => ({
                ...item,
                isCurrent: idx === nextCurIdx ? true : false,
                isComplete:
                  isSetPrevComplete && idx === curIdx ? true : item.isComplete,
              }))
            )
          );
        }
      }
    },
    [bookingSteps]
  );

  const setCompleteStep = useCallback(
    (stepName: BookingStepNameType, status: boolean) => {
      dispatch(
        setBookingSteps(
          bookingSteps.map((item, idx) =>
            item.name === stepName ? { ...item, isComplete: status } : item
          )
        )
      );
    },
    []
  );

  // Установить текущий букинг
  useEffect(() => {
    if (bookingProgress.currentStep && newBookings.bookings.length) {
      let a = null;
      // Если бы обновлен payment_method
      if (bookingProgress.currentStep.step?.roomId) {
        a = newBookings.bookings.find(
          (i) => i.tempId === bookingProgress.currentStep.step?.roomId
        );
      } else {
        // Для шага "Enter a guests details", который попросту не привязывается к id бронирования
        if (currentBooking) {
          a = newBookings.bookings.find(
            (i) => i.tempId === currentBooking.tempId
          );
        }
      }
      if (a) {
        dispatch(setCurrentBooking(a));
      }
    }
  }, [bookingProgress.currentStep, newBookings.bookings]);

  // Установить категорию комнаты текущего букинга
  useEffect(() => {
    if (bookingProgress.currentStep && newBookings.bookings.length) {
      const a =
        (roomsCategories &&
          roomsCategories.find(
            (i) =>
              i._id ===
              newBookings.bookings.find(
                (i) => i.tempId === bookingProgress.currentStep.step?.roomId
              )?.room_category_id
          )) ||
        null;

      if (a) {
        dispatch(setCurrentRoomCategory(a));
      }
    }
  }, [bookingProgress.currentStep, newBookings.bookings]);

  console.log("filterParams ", JSON.stringify(filterParams));
  console.log("bookingsSteps ", JSON.stringify(bookingSteps));
  console.log("newBookings ", JSON.stringify(newBookings));
  console.log("bookingProgress ", JSON.stringify(bookingProgress));

  return (
    <BasePageLayout isShowPageTitleBanner>
      <BookingContext.Provider
        value={{
          checkDateAvailable,
          availableRoomCategories,
          updateBookingDraft,
          bookingProgressCurrentStep: bookingProgress.currentStep,
          toPrevStep,
          toNextStep,
          setCompleteStep,
        }}
      >
        <FiltersBar />

        <StepContent
          bookingProgress={bookingProgress}
          isLoadingApiData={isLoadingApiData}
        />
      </BookingContext.Provider>
    </BasePageLayout>
  );
};
