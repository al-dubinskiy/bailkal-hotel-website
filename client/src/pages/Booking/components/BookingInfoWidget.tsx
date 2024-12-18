import React, { useContext, useMemo } from "react";
import { Box, Button, Stack, SxProps, Typography } from "@mui/material";
import { theme } from "../../../theme";
import { CustomButton } from "../../components/shared/CustomButton";
import { BookingContext } from "../BookingPage";
import { useAppSelector } from "../../../hooks/redux";
import { getBookingServicesInfo } from "../utils";

interface Props {}

export const BookingInfoWidget = (props: Props) => {
  const {} = props;
  const { bookingProgressCurrentStep, toNextStep } = useContext(BookingContext);
  const { bookingTariffs } = useAppSelector((state) => state.bookingTariffs);
  const { bookingServices } = useAppSelector((state) => state.bookingServices);
  const { paymentMethods } = useAppSelector((state) => state.paymentMethods);
  const { roomBedVariants } = useAppSelector((state) => state.roomBedVariants);
  const { viewsFromRoomWindow } = useAppSelector(
    (state) => state.viewsFromRoomWindow
  );
  const { transferVariants } = useAppSelector(
    (state) => state.transfersVariants
  );
  const { transferCars } = useAppSelector((state) => state.transfersCars);
  const {
    currentBooking,
    currentRoomCategory: roomCategory,
    filterParams,
  } = useAppSelector((state) => state.bookings);

  const BookingDateInfo = ({
    dayNumber,
    month,
    weekDay,
    time,
    dateType,
  }: {
    dayNumber: string;
    month: string;
    weekDay: string;
    time: string;
    dateType: "arrival" | "departure";
  }) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: dateType === "arrival" ? "flex-end" : "flex-start",
          height: "max-content",
        }}
      >
        <Typography variant="body">
          <span style={{ fontWeight: 600 }}>{dayNumber}</span> {month}
        </Typography>

        <Typography variant="body">{weekDay}</Typography>

        <Typography variant="body">{time}</Typography>
      </Box>
    );
  };

  const bookingTariff = useMemo(
    () =>
      (currentBooking &&
        bookingTariffs &&
        bookingTariffs.find((i) => i._id === currentBooking.tariff_id)) ||
      null,
    [currentBooking, bookingTariffs]
  );

  const bookingServicesList = useMemo(() => {
    return getBookingServicesInfo({
      bookingServices,
      roomCategory,
      currentBooking,
    });
  }, [currentBooking, bookingServices, roomCategory]);

  const paymentMethod = useMemo(
    () =>
      (currentBooking &&
        paymentMethods &&
        paymentMethods.find(
          (i) => i._id === currentBooking.payment_method_id
        )) ||
      null,
    [currentBooking, paymentMethods]
  );

  const bedTypeSpecialWish = useMemo(
    () =>
      (currentBooking &&
        roomBedVariants &&
        roomBedVariants.find((i) => i._id === currentBooking.bed_type_id)) ||
      null,
    [currentBooking, roomBedVariants]
  );

  const viewsFromRoomWindowSpecialWish = useMemo(
    () =>
      (currentBooking &&
        viewsFromRoomWindow &&
        viewsFromRoomWindow.find(
          (i) => i._id === currentBooking.view_from_window_id
        )) ||
      null,
    [currentBooking, viewsFromRoomWindow]
  );

  const transfer = useMemo(
    () =>
      (currentBooking &&
        transferVariants &&
        transferVariants.find((i) => i._id === currentBooking.transfer_id)) ||
      null,
    [currentBooking, transferVariants]
  );

  const transferCar = useMemo(
    () =>
      (currentBooking &&
        transfer &&
        transferCars &&
        transferCars.find((i) => i._id === transfer.car_id)) ||
      null,
    [currentBooking, transferCars, transfer]
  );

  if (!roomCategory || !currentBooking) return null;

  const bookingGuestsCount =
    currentBooking.children_count == 1
      ? "1 взрослый и 1 ребенок"
      : currentBooking.adults_count == 1
      ? "1 взрослый на одном месте"
      : currentBooking.adults_count == 2
      ? "2 взрослых на одном месте"
      : null;

  const ValueContainer = ({
    children,
    containerStyles,
  }: {
    children: any;
    containerStyles?: SxProps;
  }) => {
    return (
      <Box
        sx={{
          background: theme.palette.primary.extraLight,
          borderRadius: "16px",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
          ...containerStyles,
        }}
      >
        {children}
      </Box>
    );
  };

  return (
    <Stack
      sx={{
        flex: 0.3,
        background: theme.palette.background.paper,
        borderRadius: "16px",
        alignItems: "stretch",
        boxShadow: "0px 3.2px 16px rgba(0, 0, 0, 0.25)",
      }}
    >
      <ValueContainer containerStyles={{ padding: "24px" }}>
        <Typography variant="h7" sx={{ fontWeight: 600, alignSelf: "center" }}>
          Ваше бронирование
        </Typography>
      </ValueContainer>

      <Typography variant="body" sx={{ margin: "10px auto" }}>
        <span style={{ fontWeight: 600 }}>1</span> ночь
      </Typography>

      <ValueContainer>
        <BookingDateInfo
          dayNumber={"15"}
          month={"Октябрь"}
          weekDay={"Вторник"}
          time={"C 15:00"}
          dateType="arrival"
        />

        <Typography variant="label">-</Typography>

        <BookingDateInfo
          dayNumber={"16"}
          month={"Октябрь"}
          weekDay={"Cреда"}
          time={"До 12:00"}
          dateType="departure"
        />
      </ValueContainer>

      <Typography variant="body" sx={{ margin: "10px auto" }}>
        Номер:{" "}
        <span style={{ fontWeight: 600 }}>{currentBooking.roomPrice} ₽</span>
      </Typography>

      <Typography
        variant="label"
        sx={{ fontWeight: 600, margin: "0px auto 0" }}
      >
        {roomCategory.title}
      </Typography>

      <ValueContainer
        containerStyles={{ flexDirection: "column", marginTop: "10px" }}
      >
        {currentBooking.adults_count + currentBooking.children_count ? (
          <Typography variant="label">{bookingGuestsCount}</Typography>
        ) : null}

        {bookingTariff ? (
          <Typography variant="body" sx={{ textAlign: "center" }}>
            {bookingTariff.title}:{" "}
            <span style={{ fontWeight: 600 }}>{bookingTariff.cost} ₽</span>
          </Typography>
        ) : null}
      </ValueContainer>

      {bookingServicesList && bookingServicesList.length ? (
        <>
          <Typography
            variant="label"
            sx={{ textAlign: "center", fontWeight: 600, marginTop: "10px" }}
          >
            Услуги
          </Typography>

          <Box
            sx={{
              background: theme.palette.primary.extraLight,
              borderRadius: "16px",
              padding: "12px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              marginTop: "10px",
            }}
          >
            {bookingServicesList.map((item, index) => {
              return (
                <Typography
                  key={index}
                  variant="body"
                  sx={{ textAlign: "center" }}
                >
                  {item.title}:{" "}
                  <span style={{ fontWeight: 600 }}>
                    {item.price > 0 ? item.price + "₽" : "Вкл"}
                  </span>
                </Typography>
              );
            })}
          </Box>
        </>
      ) : null}

      {bedTypeSpecialWish || viewsFromRoomWindowSpecialWish ? (
        <>
          <Typography
            variant="body"
            sx={{
              textAlign: "center",
              margin: "10px 0px",
              fontWeight: 600,
            }}
          >
            Особые пожелания
          </Typography>

          <ValueContainer containerStyles={{ flexDirection: "column" }}>
            {bedTypeSpecialWish ? (
              <Typography variant="body" sx={{ textAlign: "center" }}>
                Тип кровати:{" "}
                <span style={{ fontWeight: 600 }}>
                  {bedTypeSpecialWish.title}
                </span>
              </Typography>
            ) : null}

            {viewsFromRoomWindowSpecialWish ? (
              <Typography variant="body" sx={{ textAlign: "center" }}>
                Вид из окна:{" "}
                <span style={{ fontWeight: 600 }}>
                  {viewsFromRoomWindowSpecialWish.title}
                </span>
              </Typography>
            ) : null}
          </ValueContainer>
        </>
      ) : null}

      {transfer ? (
        <>
          <Typography
            variant="body"
            sx={{
              textAlign: "center",
              margin: "10px 0px",
              fontWeight: 600,
            }}
          >
            Трансфер
          </Typography>

          <ValueContainer containerStyles={{ flexDirection: "column" }}>
            <Typography variant="body" sx={{ textAlign: "center" }}>
              Направление:{" "}
              <span style={{ fontWeight: 600 }}>
                {transfer.from_hotel
                  ? "В отель"
                  : transfer.to_hotel
                  ? "Из отеля"
                  : ""}
              </span>
            </Typography>

            <Typography variant="body" sx={{ textAlign: "center" }}>
              Время:{" "}
              <span style={{ fontWeight: 600 }}>
                {transfer.time_from + "-" + transfer.time_to}
              </span>
            </Typography>

            <Typography variant="body" sx={{ textAlign: "center" }}>
              Тип транспорта:{" "}
              <span style={{ fontWeight: 600 }}>
                {transferCar
                  ? transferCar.brand + " " + transferCar.model
                  : "Не указано"}
              </span>
            </Typography>

            <Typography variant="body" sx={{ textAlign: "center" }}>
              Цена: <span style={{ fontWeight: 600 }}>{transfer.price} ₽</span>
            </Typography>
          </ValueContainer>
        </>
      ) : null}

      {paymentMethod ? (
        <>
          <Typography
            variant="body"
            sx={{
              textAlign: "center",
              margin: "10px 0px",
              fontWeight: 600,
            }}
          >
            Способ оплаты
          </Typography>

          <ValueContainer>
            <Typography variant="body" sx={{ textAlign: "center" }}>
              {paymentMethod.title}
            </Typography>
          </ValueContainer>
        </>
      ) : null}

      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flex: 0.5,
          }}
        >
          <Typography
            variant="label"
            sx={{
              color: theme.palette.primary.dark,
              fontSize: "20.8px",
            }}
          >
            {currentBooking.price} ₽
          </Typography>
        </Box>

        <CustomButton
          label={"Продолжить"}
          onClick={() => {
            if (
              bookingProgressCurrentStep.step?.name === "Order services" ||
              bookingProgressCurrentStep.step?.isComplete
            ) {
              toNextStep();
            }
          }}
          containerVariant={"contained"}
          disabled={false}
          containerBackgroundColor={"buttonDark"}
          containerStyle={{
            padding: "0 10px",
            flex: 0.5,
          }}
          withoutAnimation
        />
      </Stack>
    </Stack>
  );
};
