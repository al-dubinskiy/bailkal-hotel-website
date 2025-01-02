import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  BookingStepNameType,
  BookingStepType,
  BookingType,
  BookingGuestsDetailsPrimitiveType,
  CreateBookingLocalType,
  RoomGuestsCountType,
  BookingDateTimeType,
  NewBookingsType,
  RoomCategoryPriceType,
} from "../../redux/slices/Bookings/types";
import { RoomCategoryType } from "../../redux/slices/RoomsCategories/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import moment, { Moment } from "moment";
import { dateFormat, dateTimeFormat } from "../../constants";
import {
  getFreeRoomId,
  getRoomCategoryPrice,
  GroupObjectByKey,
  isDateTimeRangeContained,
} from "./utils";
import {
  setBookingSteps,
  setCategoriesAvailableRoomsCount,
  setCurrentBooking,
  setCurrentRoomCategory,
  setNewBookings,
} from "../../redux/slices/Bookings/bookingsSlice";
import BasePageLayout from "../components/BasePageLayout";
import { findLastIndex, isEqual } from "lodash";
import { BookingTariffType } from "../../redux/slices/BookingTariffs/types";
import { BookingServiceType } from "../../redux/slices/BookingServices/types";
import { useGetApiData } from "../../hooks/getApiData";
import { StepContent } from "./components/StepContent";
import { FiltersBar } from "./components/FiltersBar";

// Типы
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
  const {
    bookings,
    newBookings,
    bookingSteps,
    filterParams,
    currentBooking,
    categoriesAvailableRoomsCount,
  } = useAppSelector((state) => state.bookings);

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

  const getCategoriesAvailableRoomsCount = useCallback(
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
        const categoriesAvailableRoomsCount: RoomCategoryPriceType[] = [];

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
                // Подсчет ранее забронированных комнат, диапазону ("дата заезда/выезда")
                // которых принадлежит дата (с фильтра), переданная в ф-цию
                // (а значит на эту дату можно забронировать меньше комнат или вообще ни одной)
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
                ) {
                  bookedOnDateCount += 1;
                }
              });

              // Подсчет новых букингов с "датой заезда/выезда", которая входит в диапазон дат ранее забронированных

              // console.log(categoryRoom.title, bookedOnDateCount, categoryRoomCount);
              // Записываем количество забронированных комнат в данной "категории комнаты"
              categoriesAvailableRoomsCount.push({
                id: categoryRoom._id,
                roomsTotal: categoryRoomCount,
                price: categoryRoom.price_per_night_for_one_quest,
                earlyBookingsCount: bookedOnDateCount,
                newBookingsIds: [],
              });
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
            ? categoriesAvailableRoomsCount.push({
                id: roomCategory._id,
                roomsTotal: roomCategory.room_id.length,
                price: roomCategory.price_per_night_for_one_quest,
                earlyBookingsCount: 0,
                newBookingsIds: [],
              })
            : roomCategory
        );
        return categoriesAvailableRoomsCount;
      }
      return null;
    },
    [unavailableBookingDates, roomsCategories, sortedBookingsByRoomCategories]
  );

  useEffect(() => {
    if (roomsCategories && bookings) {
      const { arrival_datetime, departure_datetime } = filterParams;
      dispatch(
        setCategoriesAvailableRoomsCount(
          getCategoriesAvailableRoomsCount({
            arrival_datetime: arrival_datetime,
            departure_datetime: departure_datetime,
          })
        )
      );
    }
  }, [
    filterParams.arrival_datetime,
    filterParams.departure_datetime,
    roomsCategories,
    bookings,
  ]);

  useEffect(() => {
    if (categoriesAvailableRoomsCount) {
      const { bookings } = newBookings;
      const sortedByRoomCategories: SortedBookingType[] = GroupObjectByKey(
        "room_category_id",
        bookings
      );

      let updatedCategoriesAvailableRoomsCount = [
        ...categoriesAvailableRoomsCount,
      ];

      Object.entries(sortedByRoomCategories).map((item: any, index) => {
        const categoryId: string = item[0];
        const bookingsOnCategory = item[1].map(
          (i: CreateBookingLocalType) => i.tempId
        );

        updatedCategoriesAvailableRoomsCount =
          updatedCategoriesAvailableRoomsCount.map((category) => {
            return {
              ...category,
              newBookingsIds:
                category.id === categoryId // актуализация списка id новых букингов, которые соответствуют данной категории
                  ? bookingsOnCategory.map((i: CreateBookingLocalType) => i)
                  : category.newBookingsIds.reduce(
                      // удалить лишние id
                      (acc: string[], item: string) => {
                        if (!bookingsOnCategory.includes(item)) {
                          acc.push(item);
                        }
                        return acc;
                      },
                      []
                    ),
            };
          });
      });

      if (
        JSON.stringify(updatedCategoriesAvailableRoomsCount) !==
        JSON.stringify(categoriesAvailableRoomsCount)
      ) {
        dispatch(
          setCategoriesAvailableRoomsCount(updatedCategoriesAvailableRoomsCount)
        );
      }
    }
  }, [newBookings.bookings, categoriesAvailableRoomsCount]);

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
        const categoriesAvailableRoomsCount = getCategoriesAvailableRoomsCount({
          arrival_datetime: date,
          departure_datetime: date,
        });

        if (
          categoriesAvailableRoomsCount &&
          categoriesAvailableRoomsCount.length
        ) {
          if (specificRoomCategoryId) {
            const exist = categoriesAvailableRoomsCount.find(
              (i) => i.id === specificRoomCategoryId
            );

            return {
              date,
              isAvailable: exist ? true : false,
              roomMinPrice: exist ? exist.price : -1,
            };
          }
          // Определение минимальной стоимости комнаты
          const prices = Array.from(
            categoriesAvailableRoomsCount,
            (i) => i.price
          );
          const roomMinPrice = Math.min(...prices);

          return {
            date,
            isAvailable:
              !unavailableBookingDates.find(
                (i) => i.date === date.format(dateFormat)
              ) && categoriesAvailableRoomsCount.length > 0,
            roomMinPrice,
          };
        }
      }

      return null;
    },
    [unavailableBookingDates]
  );

  const toSpecificStep = (
    stepName: BookingStepNameType,
    tempBookingId: string
  ) => {
    const nextStepIdx = bookingSteps.findIndex(
      (i) => i.name === stepName && i.roomId === tempBookingId
    );
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
    [bookingSteps]
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
            // Поиск id доступной комнаты для данной категории
            const freeRoomId = getFreeRoomId({
              roomCategory: newRoomCategory,
              bookings,
              newBookings: newBookings.bookings,
            });

            if (freeRoomId) {
              dispatch(
                setNewBookings({
                  ...newBookings,
                  bookings: newBookings.bookings.map((i) => {
                    if (i.tempId === tempBookingId) {
                      return {
                        ...i,
                        room_category_id: newRoomCategory._id,
                        room_id: freeRoomId,
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
            }

            if (tempBookingId) {
              toSpecificStep("Select a tariff", tempBookingId);
            }
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
        if (
          currentStep.name === "Select a room" &&
          roomCategory &&
          tempBookingId
        ) {
          // Поиск id доступной комнаты для данной категории
          const freeRoomId = getFreeRoomId({
            roomCategory,
            bookings,
            newBookings: newBookings.bookings,
          });

          if (freeRoomId) {
            const roomPrice = getRoomCategoryPrice({
              room: filterParams.rooms[0], // при одиночном бронирования только одна комната в списке
              roomCategory,
            });

            dispatch(
              setNewBookings({
                ...newBookings,
                bookings: newBookings.bookings.map((i, index) => {
                  if (i.tempId === tempBookingId) {
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
                    console.log("dfdf", i.transfer_id);
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
        }
      }
    },
    [
      bookings,
      roomsCategories,
      newBookings,
      transferVariants,
      toPrevStep,
      toNextStep,
    ]
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
          rooms.map((item, index) =>
            steps.push({
              roomId: item.id,
              name: "Select a room",
              isCurrent: index === 0 ? true : false, // Делаем активным первый шаг
              isComplete: false,
            })
          );

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
              name: "Select a room",
              isCurrent: false,
              isComplete: false,
            };
          });
          // Получаем индекс последнего вхождения шага "Select a room"
          let lastSelectRoomStepIdx = findLastIndex(
            steps,
            (step) => step.name === "Select a room"
          );
          // Вставляем дополнительный шаг "Select a room" и делаем его "текущим шагом"
          steps.splice(lastSelectRoomStepIdx + 1, 0, ...a);

          const b: BookingStepType[] = newRooms.map((i) => {
            return {
              roomId: i.id,
              name: "Select a tariff",
              isCurrent: false,
              isComplete: false,
            };
          });
          // Получаем индекс последнего вхождения шага "Select a room"
          let lastSelectTariffStepIdx = findLastIndex(
            steps,
            (step) => step.name === "Select a tariff"
          );
          // Вставляем дополнительный шаг "Select a room" и делаем его "текущим шагом"
          steps.splice(lastSelectTariffStepIdx + 1, 0, ...b);

          const c: BookingStepType[] = newRooms.map((i) => {
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
          steps.splice(lastOrderServicesStepIdx + 1, 0, ...c);
        }
        // Если для всех предыдущих новых букингов "категории комнат" уже были выбраны,
        // то убираем для текущего шага статус "текущий шаг"
        // и ставим его для нового шага
        const idx = bookings.findIndex((item, i) => !item.room_category_id);
        if (idx !== -1) {
          steps = steps.map((item, i) => {
            return { ...item, isCurrent: i === idx ? true : false };
          });
        }
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
      const prevRooms = rooms.slice(0, bookings.length);
      const newRooms = rooms.slice(bookings.length);
      // Обновить перечень букингов и установить тип действия для формирования списка шагов
      dispatch(
        setNewBookings({
          bookings: [
            // если во время добавления новой комнаты, было изменено количество гостей для предыдущей комнаты, то обновить значения
            ...newBookings.bookings.map((item, index) => ({
              ...item,
              adults_count: prevRooms[index].adults,
              children_count: prevRooms[index].children,
            })),
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
        const elements = bookingSteps.filter((i) => i.name === "Select a room");
        const idx = elements.findIndex((i) => i.isCurrent);

        if (idx !== -1) {
          curStepLabel =
            elements.length > 1
              ? `Выберите ${idx + 1}-й номер`
              : "Выберите номер";
        }
      } else if (curName === "Select a tariff") {
        const elements = bookingSteps.filter(
          (i) => i.name === "Select a tariff"
        );
        const idx = elements.findIndex((i) => i.isCurrent);

        if (idx !== -1) {
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

        if (idx !== -1) {
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
    if (curIdx !== -1) {
      const prevCurIdx = curIdx > 0 ? curIdx - 1 : null;
      if (prevCurIdx !== null && prevCurIdx >= 0) {
        const prevCur = bookingSteps.find((_, idx) => idx === prevCurIdx);
        if (prevCur) {
          let prevStepLabel = "";
          if (prevCur.name === "Select a room") {
            const elements = bookingSteps.filter(
              (i) => i.name === "Select a room"
            );
            const idx = elements.findIndex((i) => i.roomId === prevCur.roomId);

            if (idx !== -1) {
              prevStepLabel =
                elements.length > 1
                  ? `К выбору ${idx + 1}-ого номера`
                  : "К выбору номера";
            }
          } else if (prevCur.name === "Select a tariff") {
            const elements = bookingSteps.filter(
              (i) => i.name === "Select a tariff"
            );
            const idx = elements.findIndex((i) => i.roomId === prevCur.roomId);
            // Если индекс не равен последнем элементу данного типа шага
            if (idx !== -1) {
              prevStepLabel =
                elements.length > 1
                  ? `К выбору тарифа для ${idx + 1}-го номера`
                  : "К выбору тарифа";
            }
          } else if (prevCur.name === "Order services") {
            const elements = bookingSteps.filter(
              (i) => i.name === "Order services"
            );
            const idx = elements.findIndex((i) => i.roomId === prevCur.roomId);
            // Если индекс не равен последнем элементу данного типа шага
            if (idx !== -1) {
              prevStepLabel =
                elements.length > 1
                  ? `К выбору услуг для ${idx + 1}-го номера`
                  : "К выбору услуг";
            }
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
  console.log(
    "categoriesAvailableRoomsCount ",
    JSON.stringify(categoriesAvailableRoomsCount)
  );

  return (
    <BasePageLayout isShowPageTitleBanner>
      <BookingContext.Provider
        value={{
          checkDateAvailable,
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
