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

interface Props {}

export const BookingPage = () => {
  const dispatch = useAppDispatch();
  const { roomsCategories } = useAppSelector((state) => state.roomsCategories);
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
  const [bookings, setBookings] = useState<CreateBookingType[]>([]);
  const [currentBookingStepIdx, setCurrentBookingStepIdx] = useState(0);

  // Тригер для типа визуального интерфейса 1-го шага
  const isMultiRoomBooking = useMemo(() => {
    if (filterParams.adults_count + filterParams.children_count > 2)
      return true;
    return false;
  }, [filterParams.adults_count, filterParams.children_count]);

  useEffect(() => {}, []);

  const addBookingBaseInfo = ({
    allCategoryRoomsIDs,
    bookedCategoryRoomsIDs,
    tariffId,
    adultsCount,
    childrenCount,
  }: {
    allCategoryRoomsIDs: string[];
    bookedCategoryRoomsIDs: string[];
    tariffId?: string;
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
        tariff_id: tariffId ? tariffId : "",
        service_id: [],
        bed_type_id: "",
        view_from_window_id: "",
        payment_method_id: "",
        transfer_id: "",
        transfer_comment: "",
        price: -1,
      };

      if (!isMultiRoomBooking) setBookings((prev) => [newBooking]);
      else setBookings((prev) => [...prev, newBooking]);
    }
  };

  const removeBooking = (index: number) => {
    setBookings((prev) => prev.filter((_, idx) => idx !== index));
  };

  const bookingSteps = useMemo((): BookingStepType[] => {
    const steps: BookingStepType[] = [];
    // Для бронирования одного номера
    if (!isMultiRoomBooking) {
      const booking = bookings.length ? bookings[0] : null;
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
      const bookingsTotal = bookings.length;
      Array.from({ length: bookingsTotal }, () => steps.push("Order services"));
      steps.push("Enter guest details");
    }
    return steps;
  }, [bookings, isMultiRoomBooking]);

  // Тип интерфейса для множественного выбора номеров (со списком номеров и тарифов)
  if (isMultiRoomBooking)
    return (
      <Box>
        {roomsCategories && roomsCategories?.length
          ? roomsCategories.map((roomCategory) => {
              return (
                <Button
                  onClick={() =>
                    addBookingBaseInfo({
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
    <Box>
      {roomsCategories && roomsCategories?.length
        ? roomsCategories.map((roomCategory) => {
            return (
              <Card>
                <Typography>Deluxe King c видом на Байкал</Typography>
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
  );
};

// switch (isMultiRoomBooking) {
//   case true:
//     break;
//   case false:
//     break;
//   default:
//     break;
// }
