import React from "react";
import {
  CategoryRoomsBookingStatusType,
  getGuestsCount,
} from "./BookingsTable";
import { useAppSelector } from "../../../../hooks/redux";
import { getBookingServicesInfo } from "../../../../pages/Booking/utils";
import { CustomLabelAndDescription } from "../../../../pages/components/shared/CustomLabelAndDescription";
import { Stack, Typography } from "@mui/material";
import moment from "moment";
import { dateTimeFormat } from "../../../../constants";
import { BookingType } from "../../../../redux/slices/Bookings/types";

interface Props {
  booking: BookingType | undefined;
}

export const BookingDetailsModalContent = (props: Props) => {
  const { booking } = props;
  const { rooms } = useAppSelector((state) => state.rooms);
  const { roomsCategories } = useAppSelector((state) => state.roomsCategories);
  const { bookingTariffs } = useAppSelector((state) => state.bookingTariffs);
  const { bookingServices } = useAppSelector((state) => state.bookingServices);
  const { roomBedVariants } = useAppSelector((state) => state.roomBedVariants);
  const { viewsFromRoomWindow } = useAppSelector(
    (state) => state.viewsFromRoomWindow
  );
  const { transferVariants } = useAppSelector(
    (state) => state.transfersVariants
  );
  const { transferCars } = useAppSelector((state) => state.transfersCars);
  const { paymentMethods } = useAppSelector((state) => state.paymentMethods);

  if (booking) {
    const roomCategory =
      (booking.room_category_id &&
        roomsCategories?.find((i) => i._id === booking.room_category_id)) ||
      null;

    const bookingTariff =
      (booking.tariff_id &&
        bookingTariffs?.find((i) => i._id === booking.tariff_id)) ||
      null;

    const bookingServicesInfo = getBookingServicesInfo({
      bookingServices,
      roomCategory,
      currentBooking: booking,
    });

    const bedTypeSpecialWish =
      roomBedVariants?.find((i) => i._id === booking.bed_type_id) || null;

    const viewsFromRoomWindowSpecialWish =
      (booking.view_from_window_id &&
        viewsFromRoomWindow?.find(
          (i) => i._id === booking.view_from_window_id
        )) ||
      null;

    const transfer =
      (booking.transfer_id &&
        transferVariants?.find((i) => i._id === booking.transfer_id)) ||
      null;

    const transferCar =
      (transfer && transferCars?.find((i) => i._id === transfer.car_id)) ||
      null;

    const paymentMethod =
      (booking.payment_method_id &&
        paymentMethods?.find((i) => i._id === booking.payment_method_id)) ||
      null;

    return (
      <Stack sx={{ alignItems: "stretch", gap: "15px" }}>
        <CustomLabelAndDescription
          label={"Номер комнаты"}
          description={
            (rooms &&
              rooms
                .find((p) => p._id === booking.room_id)
                ?.number.toString()) ||
            "-"
          }
        />

        <CustomLabelAndDescription
          label={"Категория комнаты"}
          description={roomCategory?.title || "-"}
        />

        <CustomLabelAndDescription
          label={"ФИО"}
          description={`${booking.user.lastname} ${booking.user.name} ${booking.user.surname}`}
        />

        <CustomLabelAndDescription
          label={"Электронная почта"}
          description={booking.user.email}
        />

        <CustomLabelAndDescription
          label={"Номер телефона"}
          description={booking.user.phone}
        />

        <CustomLabelAndDescription
          label={"Количество гостей"}
          description={getGuestsCount({
            adults_count: booking.adults_count,
            children_count: booking.children_count,
          })}
        />

        <CustomLabelAndDescription
          label={"Дата заезда и выезда"}
          description={`${moment(booking.arrival_datetime).format(
            dateTimeFormat
          )} - ${moment(booking.departure_datetime).format(dateTimeFormat)}`}
        />

        <CustomLabelAndDescription
          label={"Тариф"}
          description={bookingTariff?.title || "-"}
        />

        <CustomLabelAndDescription
          label={"Услуги"}
          description={
            bookingServicesInfo?.map((i) => i.title).join(", ") || "-"
          }
        />

        <CustomLabelAndDescription
          label={"Специальные пожелания"}
          description={`${
            bedTypeSpecialWish
              ? "Кровать: " + bedTypeSpecialWish.title + ", "
              : ""
          }${
            viewsFromRoomWindowSpecialWish
              ? "Вид из окна: " +
                viewsFromRoomWindowSpecialWish.title.toLowerCase()
              : ""
          }`}
        />

        <CustomLabelAndDescription
          label={"Трансфер, время, автомобиль"}
          description={
            transfer && transferCar
              ? `${
                  transfer.from_hotel
                    ? "В отель, "
                    : transfer.to_hotel
                    ? "Из отеля, "
                    : "-"
                }${transfer.time_from + "-" + transfer.time_to}, ${
                  transferCar
                    ? transferCar.brand + " " + transferCar.model
                    : "Не указано"
                }`
              : "-"
          }
        />

        {transfer && transferCar ? (
          <CustomLabelAndDescription
            label={"Комментарий трансферу"}
            description={booking.transfer_comment || "-"}
          />
        ) : null}

        <CustomLabelAndDescription
          label={"Способ оплаты"}
          description={paymentMethod?.title || "-"}
        />

        <CustomLabelAndDescription
          label={"Комментарий"}
          description={booking?.comment || "-"}
        />

        <CustomLabelAndDescription
          label={"Бронирование для "}
          description={
            booking?.booking_for_whom === "for_yourself"
              ? "Себя"
              : booking?.booking_for_whom === "for_another"
              ? "Другого"
              : "-"
          }
        />

        <Typography variant="label">Обратная связь</Typography>

        <CustomLabelAndDescription
          label={"Разрешена ли отправка подтверждения на телефон"}
          description={booking.user.send_confirm_on_phone ? "Да" : "Нет"}
        />

        <CustomLabelAndDescription
          label={
            "Разрешена ли email-рассылка специальных предложений и новостей"
          }
          description={
            booking.user.want_to_know_about_special_offers_and_news
              ? "Да"
              : "Нет"
          }
        />

        <CustomLabelAndDescription
          label={"Общая стоимость"}
          description={`${booking.price} ₽`}
        />
      </Stack>
    );
  }
  return null;
};
