import React, { useContext, useEffect, useMemo } from "react";
import { CustomModal } from "../../components/shared/CustomModal/CustomModal";
import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { theme } from "../../../theme";
import { CustomLabelAndDescription } from "../../components/shared/CustomLabelAndDescription";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  CreateBookingLocalType,
  CreateBookingType,
} from "../../../redux/slices/Bookings/types";
import { RoomCategoryType } from "../../../redux/slices/RoomsCategories/types";
import { getBookingServicesInfo } from "../utils";
import {
  CreateBooking,
  resetCreateBookingState,
} from "../../../redux/slices/Bookings/bookingsSlice";
import { BookingContext } from "../BookingPage";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const ConfirmBookingModal = (props: Props) => {
  const { open, setOpen } = props;
  const dispatch = useAppDispatch();
  const { newBookings, createBooking } = useAppSelector(
    (state) => state.bookings
  );
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

  const transfer = transferVariants
    ? transferVariants.find(
        (i) => i._id === newBookings.bookings[0].transfer_id
      ) || null
    : null;

  const transferCar =
    transfer && transferCars
      ? transferCars.find((i) => i._id === transfer.car_id) || null
      : null;
  const { bookingProgressCurrentStep, setCompleteStep } =
    useContext(BookingContext);

  const BookingShortInfoCard = ({
    index,
    booking,
    roomCategory,
  }: {
    index: number;
    booking: CreateBookingLocalType;
    roomCategory: RoomCategoryType;
  }) => {
    const bookingGuestsCount =
      booking.children_count == 1
        ? "1 взрослый и 1 ребенок"
        : booking.adults_count == 1
        ? "1 взрослый на одном месте"
        : booking.adults_count == 2
        ? "2 взрослых на одном месте"
        : null;

    const bookingTariff =
      (booking &&
        bookingTariffs &&
        bookingTariffs.find((i) => i._id === booking.tariff_id)) ||
      null;

    const bookingServicesInfo = getBookingServicesInfo({
      bookingServices,
      roomCategory,
      currentBooking: booking,
    });

    const bedTypeSpecialWish = useMemo(
      () =>
        (roomBedVariants &&
          roomBedVariants.find((i) => i._id === booking.bed_type_id)) ||
        null,
      [booking, roomBedVariants]
    );

    const viewsFromRoomWindowSpecialWish = useMemo(
      () =>
        (viewsFromRoomWindow &&
          viewsFromRoomWindow.find(
            (i) => i._id === booking.view_from_window_id
          )) ||
        null,
      [booking, viewsFromRoomWindow]
    );

    return (
      <Stack
        sx={{
          alignItems: "stretch",
          border: `1px solid ${theme.palette.primary.light}`,
          borderRadius: "16px",
          padding: "24px",
          gap: "15px",
        }}
      >
        <CustomLabelAndDescription
          label={`${index > 0 ? index + 1 + " " : ""}Номер`}
          description={roomCategory.title}
        />

        <CustomLabelAndDescription
          label={"Количество гостей"}
          description={bookingGuestsCount || "Не указано"}
        />

        {bookingTariff ? (
          <Stack sx={{ gap: "5px" }}>
            <Typography
              variant="label"
              sx={{ fontWeight: 600, marginTop: "5px" }}
            >
              Тариф
            </Typography>

            <Typography variant="body">
              {bookingTariff.title}:{" "}
              <span style={{ fontWeight: 600 }}>{bookingTariff.cost} ₽</span>
            </Typography>
          </Stack>
        ) : null}

        {bookingServicesInfo ? (
          <Stack sx={{ gap: "5px" }}>
            <Typography
              variant="label"
              sx={{ fontWeight: 600, marginTop: "5px" }}
            >
              Услуги
            </Typography>

            <Stack sx={{ alignItems: "stretch", gap: "5px" }}>
              {bookingServicesInfo.map((item, index) => {
                return (
                  <Typography
                    key={index}
                    variant="body"
                    sx={{ textAlign: "center", alignSelf: "flex-start" }}
                  >
                    {item.title}:{" "}
                    <span style={{ fontWeight: 600, alignSelf: "flex-start" }}>
                      {item.price > 0 ? item.price + "₽" : "Вкл"}
                    </span>
                  </Typography>
                );
              })}
            </Stack>
          </Stack>
        ) : null}

        {bedTypeSpecialWish || viewsFromRoomWindowSpecialWish ? (
          <Stack sx={{ gap: "10px" }}>
            <Typography
              variant="label"
              sx={{ textAlign: "center", fontWeight: 600 }}
            >
              Специальные пожелания
            </Typography>

            <Grid container spacing={"24px"}>
              {bedTypeSpecialWish ? (
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomLabelAndDescription
                    label={"Тип кровати"}
                    description={bedTypeSpecialWish.title}
                  />
                </Grid>
              ) : null}

              {viewsFromRoomWindowSpecialWish ? (
                <Grid size={{ xs: 12, md: 6 }}>
                  <CustomLabelAndDescription
                    label={"Вид из окна"}
                    description={viewsFromRoomWindowSpecialWish.title}
                  />
                </Grid>
              ) : null}
            </Grid>
          </Stack>
        ) : null}

        <CustomLabelAndDescription
          label={"Общая стоимость"}
          description={`${booking.price} ₽`}
          containerStyle={{ marginTop: "10px" }}
        />
      </Stack>
    );
  };

  const createNewBooking = () => {
    dispatch(
      CreateBooking({
        bookings: newBookings.bookings.map((i: CreateBookingLocalType) => {
          let booking: CreateBookingType = {
            room_id: i.room_id,
            room_category_id: i.room_category_id,
            user: i.user,
            adults_count: i.adults_count,
            children_count: i.children_count,
            arrival_datetime: i.arrival_datetime,
            departure_datetime: i.departure_datetime,
            tariff_id: i.tariff_id,
            service_id: i.service_id,
            payment_method_id: i.payment_method_id,
            price: i.price,
            booking_for_whom: i.booking_for_whom,
          };
          if (i.bed_type_id) {
            booking = { ...booking, bed_type_id: i.bed_type_id };
          }
          if (i.view_from_window_id) {
            booking = {
              ...booking,
              view_from_window_id: i.view_from_window_id,
            };
          }
          if (i.transfer_id) {
            booking = { ...booking, transfer_id: i.transfer_id };
          }
          if (i.transfer_comment) {
            booking = { ...booking, transfer_comment: i.transfer_comment };
          }
          if (i.comment) {
            booking = { ...booking, comment: i.comment };
          }
          return booking;
        }),
      })
    );
  };

  if (!roomsCategories) return null;

  return (
    <CustomModal
      modalTitle="Подтверждение бронирование"
      modalContent={
        <Stack sx={{ alignItems: "stretch", gap: "15px" }}>
          <Stack sx={{ alignItems: "stretch", gap: "10px" }}>
            {newBookings.bookings.map((item, index) => {
              const roomCategory = roomsCategories.find(
                (i) => i._id === item.room_category_id
              );
              if (roomCategory) {
                return (
                  <BookingShortInfoCard
                    key={index}
                    index={index}
                    booking={item}
                    roomCategory={roomCategory}
                  />
                );
              }
              return null;
            })}

            {transfer ? (
              <Stack sx={{ gap: "10px", marginBottom: "24px" }}>
                <Typography
                  variant="label"
                  sx={{ textAlign: "center", fontWeight: 600 }}
                >
                  Трансфер
                </Typography>

                <Grid container spacing={"24px"}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomLabelAndDescription
                      label={"Направление"}
                      description={
                        transfer.from_hotel
                          ? "В отель"
                          : transfer.to_hotel
                          ? "Из отеля"
                          : ""
                      }
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomLabelAndDescription
                      label={"Время"}
                      description={transfer.time_from + "-" + transfer.time_to}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomLabelAndDescription
                      label={"Тип транспорта"}
                      description={
                        transferCar
                          ? transferCar.brand + " " + transferCar.model
                          : "Не указано"
                      }
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <CustomLabelAndDescription
                      label={"Цена"}
                      description={transfer.price + "₽"}
                    />
                  </Grid>
                </Grid>
              </Stack>
            ) : null}
          </Stack>
        </Stack>
      }
      actionButtonsVariants="yes_no"
      handleConfirm={createNewBooking}
      handleCancel={() => {
        if (
          bookingProgressCurrentStep.step?.name === "Enter guest details" &&
          bookingProgressCurrentStep.step.isComplete
        ) {
          setCompleteStep("Enter guest details", false);
        }
      }}
      confirmLoading={createBooking.isLoading}
      open={open}
      setOpen={setOpen}
      modalStyle={{ width: "500px" }}
      footerMessage="Вы подтверждаете данное бронирование?"
    />
  );
};
