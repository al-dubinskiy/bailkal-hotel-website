import React, { useContext, useMemo } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { theme } from "../../../theme";
import { CustomButton } from "../../components/shared/CustomButton";
import { BookingContext } from "../BookingPage";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getBookingServicesInfo } from "../utils";
import { ExpandMore } from "@mui/icons-material";

interface Props {
  setIsUpdateBookingsUserInfo?: (val: boolean) => void;
  isEnableContinueButton?: boolean;
  helperText?: string;
}

export const BookingInfoWidget = (props: Props) => {
  const {
    setIsUpdateBookingsUserInfo = () => null,
    isEnableContinueButton = true,
    helperText = "Заполните все данные",
  } = props;
  const dispatch = useAppDispatch();
  const { bookingProgressCurrentStep, toNextStep } = useContext(BookingContext);
  const { roomsCategories } = useAppSelector((state) => state.roomsCategories);
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
  const { newBookings, currentBooking, filterParams } = useAppSelector(
    (state) => state.bookings
  );

  const transfer = transferVariants
    ? transferVariants.find(
        (i) => i._id === newBookings.bookings[0].transfer_id
      ) || null
    : null;

  const transferCar =
    transfer && transferCars
      ? transferCars.find((i) => i._id === transfer.car_id) || null
      : null;

  const paymentMethod = paymentMethods
    ? paymentMethods.find(
        (i) => i._id === newBookings.bookings[0].payment_method_id
      ) || null
    : null;

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

      {newBookings.bookings
        ? newBookings.bookings.map((item, index) => {
            const booking = item;
            const roomCategory = roomsCategories
              ? roomsCategories.find(
                  (roomCategory) => roomCategory._id === item.room_category_id
                ) || null
              : null;

            const bookingGuestsCount =
              booking.children_count == 1
                ? "1 взрослый и 1 ребенок"
                : booking.adults_count == 1
                ? "1 взрослый на одном месте"
                : booking.adults_count == 2
                ? "2 взрослых на одном месте"
                : null;

            const tariff = bookingTariffs
              ? bookingTariffs.find((i) => i._id === booking.tariff_id) || null
              : null;

            const bookingServicesList = getBookingServicesInfo({
              bookingServices,
              roomCategory,
              currentBooking: booking,
            });

            const bedTypeSpecialWish = roomBedVariants
              ? roomBedVariants.find((i) => i._id === booking.bed_type_id) ||
                null
              : null;

            const viewsFromRoomWindowSpecialWish = viewsFromRoomWindow
              ? viewsFromRoomWindow.find(
                  (i) => i._id === booking.view_from_window_id
                ) || null
              : null;

            if (roomCategory && currentBooking) {
              return (
                <Accordion
                  key={index}
                  defaultExpanded={currentBooking.tempId === item.tempId}
                  disableGutters={true}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls={`panel-${index + 1}-content`}
                    id={`panel-${index + 1}-header`}
                    sx={{
                      background: theme.palette.primary.light,
                      "&.MuiAccordionSummary-root": {
                        "& .MuiAccordionSummary-content": {
                          margin: 0,
                        },
                      },
                    }}
                  >
                    <Typography variant="body" sx={{ margin: "10px auto" }}>
                      Номер:{" "}
                      <span style={{ fontWeight: 600 }}>
                        {booking.roomPrice} ₽
                      </span>
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      padding: 0,
                      paddingTop: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                  >
                    <Typography
                      variant="label"
                      sx={{
                        fontWeight: 600,
                        margin: "0px auto 0",
                        alignSelf: "center",
                      }}
                    >
                      {roomCategory.title}
                    </Typography>

                    <ValueContainer
                      containerStyles={{
                        flexDirection: "column",
                        marginTop: "10px",
                      }}
                    >
                      {booking.adults_count + booking.children_count ? (
                        <Typography variant="label">
                          {bookingGuestsCount}
                        </Typography>
                      ) : null}

                      {tariff ? (
                        <Typography variant="body" sx={{ textAlign: "center" }}>
                          {tariff.title}:{" "}
                          <span style={{ fontWeight: 600 }}>
                            {tariff.cost} ₽
                          </span>
                        </Typography>
                      ) : null}
                    </ValueContainer>

                    {bookingServicesList && bookingServicesList.length ? (
                      <>
                        <Typography
                          variant="label"
                          sx={{
                            textAlign: "center",
                            fontWeight: 600,
                            marginTop: "10px",
                          }}
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

                        <ValueContainer
                          containerStyles={{ flexDirection: "column" }}
                        >
                          {bedTypeSpecialWish ? (
                            <Typography
                              variant="body"
                              sx={{ textAlign: "center" }}
                            >
                              Тип кровати:{" "}
                              <span style={{ fontWeight: 600 }}>
                                {bedTypeSpecialWish.title}
                              </span>
                            </Typography>
                          ) : null}

                          {viewsFromRoomWindowSpecialWish ? (
                            <Typography
                              variant="body"
                              sx={{ textAlign: "center" }}
                            >
                              Вид из окна:{" "}
                              <span style={{ fontWeight: 600 }}>
                                {viewsFromRoomWindowSpecialWish.title}
                              </span>
                            </Typography>
                          ) : null}
                        </ValueContainer>
                      </>
                    ) : null}
                  </AccordionDetails>
                </Accordion>
              );
            }
            return null;
          })
        : null}

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
            {newBookings.bookings.reduce((acc, cur) => (acc += cur.price), 0)} ₽
          </Typography>
        </Box>

        <CustomButton
          label={"Продолжить"}
          onClick={() => {
            if (
              bookingProgressCurrentStep.step?.name === "Order services" || // этот шаг не обязательный для прохождения, поэтому можно сразу переходить к следующему шагу
              (bookingProgressCurrentStep.step?.isComplete &&
                bookingProgressCurrentStep.step?.name !== "Enter guest details") // c этого шага по условию isComplete переход на следующий шаг происходит не будет, так как этот шаг последний
            ) {
              toNextStep();
            } else if (
              bookingProgressCurrentStep.step?.name === "Enter guest details"
            ) {
              setIsUpdateBookingsUserInfo(true);
            }
          }}
          containerVariant={"contained"}
          disabled={!isEnableContinueButton}
          containerBackgroundColor={"buttonDark"}
          containerStyle={{
            padding: "0 10px",
            flex: 0.5,
          }}
          withoutAnimation
        />
      </Stack>
      {helperText && !isEnableContinueButton ? (
        <Typography
          variant="small"
          sx={{ margin: "-10px 24px 24px 24px", textAlign: "center" }}
        >
          {helperText}
        </Typography>
      ) : null}
    </Stack>
  );
};
