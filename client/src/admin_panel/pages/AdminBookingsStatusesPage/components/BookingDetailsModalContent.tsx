import React from "react";

interface Props {}

export const BookingDetailsModalContent = (props: Props) => {
  const row = openBookingDetailsModal.booking;
  const booking = row?.booking || null;
  const user = row?.bookingUser || null;
  const guests = row?.bookingGuests || null;
  const date = row?.bookingDate || null;

  if (booking && user && guests && date) {
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
          label={"Номер"}
          description={row?.number.toString() || "-"}
        />

        <CustomLabelAndDescription
          label={"Категория комнаты"}
          description={roomCategory?.title || "-"}
        />

        <CustomLabelAndDescription
          label={"ФИО"}
          description={`${user.lastname} ${user.name} ${user.surname}`}
        />

        <CustomLabelAndDescription
          label={"Количество гостей"}
          description={getGuestsCount({
            adults_count: guests.adults_count,
            children_count: guests.children_count,
          })}
        />

        <CustomLabelAndDescription
          label={"Дата заезда и выезда"}
          description={`${moment(date.arrival_datetime).format(
            dateTimeFormat
          )} - ${moment(date.departure_datetime).format(dateTimeFormat)}`}
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
            description={transfer.comment || "-"}
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
          label={"Бронирование для: "}
          description={
            booking?.booking_for_whom === "for_yourself"
              ? "Себя"
              : booking?.booking_for_whom === "for_another"
              ? "Другого"
              : "-"
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
