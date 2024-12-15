import React, { useContext, useMemo } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { theme } from "../../../theme";
import { CustomButton } from "../../components/shared/CustomButton";
import { BookingContext } from "../BookingPage";
import { useAppSelector } from "../../../hooks/redux";

interface Props {}

export const BookingInfoWidget = (props: Props) => {
  const {} = props;
  const { bookingProgressCurrentStep, toNextStep } = useContext(BookingContext);
  const { bookingTariffs } = useAppSelector((state) => state.bookingTariffs);
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

  const bookingGuests = useMemo(() => {
    if (currentBooking) {
      return filterParams.rooms.find((i) => i.id === currentBooking.tempId);
    }
    return false;
  }, [filterParams, currentBooking]);

  const roomCategoryPrice = useMemo(() => {
    if (bookingGuests && roomCategory) {
      const questsTotal = bookingGuests.adults + bookingGuests.children;

      return questsTotal > 1
        ? roomCategory.price_per_night_for_two_quest
        : roomCategory.price_per_night_for_one_quest;
    }
    return 0;
  }, [bookingGuests, roomCategory]);

  if (!bookingGuests) return null;

  if (!roomCategory || !currentBooking) return null;

  const bookingTariff =
    (currentBooking &&
      bookingTariffs &&
      bookingTariffs.find((i) => i._id === currentBooking.tariff_id)) ||
    null;

  const bookingGuestsCount =
    currentBooking.children_count == 1
      ? "1 взрослый и 1 ребенок"
      : currentBooking.adults_count == 1
      ? "1 взрослый на одном месте"
      : currentBooking.adults_count == 2
      ? "2 взрослых на одном месте"
      : null;

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
      <Box
        sx={{
          background: theme.palette.primary.extraLight,
          borderRadius: "16px",
          padding: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h7" sx={{ fontWeight: 600, alignSelf: "center" }}>
          Ваше бронирование
        </Typography>
      </Box>

      <Typography variant="body" sx={{ margin: "10px auto" }}>
        <span style={{ fontWeight: 600 }}>1</span> ночь
      </Typography>

      <Box
        sx={{
          background: theme.palette.primary.extraLight,
          borderRadius: "16px",
          padding: "12px 24px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
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
      </Box>

      <Typography variant="body" sx={{ margin: "10px auto" }}>
        Номер: <span style={{ fontWeight: 600 }}>{roomCategoryPrice} ₽</span>
      </Typography>

      <Typography
        variant="label"
        sx={{ fontWeight: 600, margin: "0px auto 0" }}
      >
        {roomCategory.title}
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
        {bookingGuests ? (
          <Typography variant="label">{bookingGuestsCount}</Typography>
        ) : null}

        {bookingTariff ? (
          <Typography variant="body" sx={{ textAlign: "center" }}>
            {bookingTariff.title}:{" "}
            <span style={{ fontWeight: 600 }}>{bookingTariff.cost} ₽</span>
          </Typography>
        ) : null}
      </Box>

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
            {currentBooking.roomPrice +
              currentBooking.tariffPrice +
              currentBooking.servicePriceTotal}{" "}
            ₽
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
