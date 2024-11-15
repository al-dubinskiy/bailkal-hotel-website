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
import { Box, Button, Card, Typography } from "@mui/material";
import { dateTimeFormat } from "../../constants";
import { BookingStepType } from "./types";
import { BookingInfoWidget } from "./components/BookingInfoWidget";
import { GroupObjectByKey } from "./utils";
import { GetRoomsCategories } from "../../redux/slices/RoomsCategories/roomsCategoriesSlice";
import { GetBookings } from "../../redux/slices/Bookings/bookingsSlice";
import BasePageLayout from "../components/BasePageLayout";
import { GetUnavailableBookingDates } from "../../redux/slices/UnavailableBookingDates/unavailableBookingDates";

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
    adults_count: number;
    children_count: number;
  }>({
    arrival_datetime: moment(),
    departure_datetime: moment().add(1, "days"),
    adults_count: 1,
    children_count: 0,
  });
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

  const availableRoomCategories = useMemo(():
    | RoomCategoryPriceType[]
    | null => {
    if (roomsCategories && bookings && unavailableBookingDates) {
      const availableRoomCategories: RoomCategoryPriceType[] = [];

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

      Object.entries(sortedBookings).map((item: any, index) => {
        const bookingCategoryId: string = item[0];
        const bookingsOnCategoryCount = item[1];
        const questsCount =
          filterParams.adults_count + filterParams.children_count;
        // Поиск "категории комнат" по id
        const categoryRoom = roomsCategories.find(
          (roomCategory) => roomCategory._id === bookingCategoryId
        );

        if (categoryRoom) {
          // Получение общего количество комнат на "категорию комнат"
          const categoryRoomCount = categoryRoom.room_id.length;

          // Если в данной "категории комнат" еще есть доступные комнаты
          if (bookingsOnCategoryCount.length < categoryRoomCount) {
            // То записываем данные "категории комнат" в перечень доступных "категорий комнат", а именно id и price (в зав. от кол. гостей)
            availableRoomCategories.push({
              id: categoryRoom._id,
              price:
                questsCount === 1
                  ? categoryRoom.price_per_night_for_one_quest
                  : categoryRoom.price_per_night_for_two_quest,
            });
          }
        }
      });

      return availableRoomCategories;
    } else {
      return null;
    }
  }, [bookings, roomsCategories, unavailableBookingDates]);

  const roomMinPrice = useMemo((): number | null => {
    if (availableRoomCategories && availableRoomCategories.length) {
      const prices = Array.from(availableRoomCategories, (i) => i.price);
      return Math.min(...prices);
    } else return null;
  }, [availableRoomCategories]);

  const checkDateAvailable = ({
    date,
  }: {
    date: string;
  }): { isAvailable: boolean; roomMinPrice: number | null } | null => {
    if (
      unavailableBookingDates &&
      roomMinPrice !== null &&
      availableRoomCategories
    ) {
      return {
        isAvailable:
          !unavailableBookingDates.find((i) => i.date === date) &&
          availableRoomCategories.length > 0,
        roomMinPrice: roomMinPrice,
      };
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

  useEffect(() => {
    checkDateAvailable({
      date: "2024-11-17",
    });
  }, [bookings, roomsCategories, unavailableBookingDates]);

  // Тригер для типа визуального интерфейса 1-го шага
  const isMultiRoomBooking = useMemo(() => {
    if (filterParams.adults_count + filterParams.children_count > 2)
      return true;
    return false;
  }, [filterParams.adults_count, filterParams.children_count]);

  const addBookingBaseInfo = ({
    roomCategoryId,
    allCategoryRoomsIDs,
    bookedCategoryRoomsIDs,
    tariff_id,
    adultsCount,
    childrenCount,
  }: {
    roomCategoryId: string;
    allCategoryRoomsIDs: string[];
    bookedCategoryRoomsIDs: string[];
    tariff_id?: string;
    adultsCount?: number;
    childrenCount?: number;
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
        adults_count: adultsCount ? adultsCount : filterParams.adults_count,
        children_count: childrenCount
          ? childrenCount
          : filterParams.children_count,
        arrival_datetime: filterParams.arrival_datetime.format(dateTimeFormat),
        departure_datetime:
          filterParams.departure_datetime.format(dateTimeFormat),
        tariff_id: tariff_id ? tariff_id : "",
        service_id: [],
        bed_type_id: "",
        view_from_window_id: "",
        payment_method_id: "",
        transfer_id: "",
        transfer_comment: "",
        price: -1,
      };

      if (!isMultiRoomBooking) setNewBookings((prev) => [newBooking]);
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
      steps.push("Select a room");
      const bookingsTotal = newBookings.length;
      Array.from({ length: bookingsTotal }, () => steps.push("Order services"));
      steps.push("Enter guest details");
    }
    return steps;
  }, [newBookings, isMultiRoomBooking]);

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
                      tariff_id: "672bb2c0424b6e7d9c94376a",
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
    <BasePageLayout>
      <Box>
        {roomsCategories && roomsCategories?.length
          ? roomsCategories.map((roomCategory, index) => {
              return (
                <Card key={index}>
                  <Typography>{roomCategory.title}</Typography>
                  {/* Проверка нет ли уже забронированого номера на выбранную дату "заезда" и "выезда" */}
                  {!roomCategory.booked_rooms.findIndex((i) =>
                    moment(i.arrival_datetime).isSame(
                      filterParams.arrival_datetime?.format(dateTimeFormat)
                    )
                  ) &&
                  !roomCategory.booked_rooms.findIndex((i) =>
                    moment(i.departure_datetime).isSame(
                      filterParams.departure_datetime?.format(dateTimeFormat)
                    )
                  ) ? (
                    <Button
                      onClick={() =>
                        addBookingBaseInfo({
                          roomCategoryId: roomCategory._id,
                          allCategoryRoomsIDs: roomCategory.room_id,
                          bookedCategoryRoomsIDs: Array.from(
                            roomCategory.booked_rooms,
                            (i) => i.room_id
                          ),
                        })
                      }
                    >
                      Выбрать
                    </Button>
                  ) : (
                    <Button>Доступные даты для заезда</Button>
                  )}
                </Card>
              );
            })
          : null}
      </Box>
    </BasePageLayout>
  );
};
