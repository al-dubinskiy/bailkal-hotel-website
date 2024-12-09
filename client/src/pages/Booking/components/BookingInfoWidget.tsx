import React, { useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { theme } from "../../../theme";
import { CustomButton } from "../../components/shared/CustomButton";
import { BookingContext } from "../BookingPage";
import { useAppSelector } from "../../../hooks/redux";

interface Props {
  roomCategoryPrice: number;
}

export const BookingInfoWidget = (props: Props) => {
  const { roomCategoryPrice } = props;
  const { roomQuests, booking, roomCategory } = useContext(BookingContext);
  const { bookingTariffs } = useAppSelector((state) => state.bookingTariffs);

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

  if (!roomCategory || !booking || !roomQuests) return null;

  const bookingTariff =
    (booking &&
      bookingTariffs &&
      bookingTariffs.find((i) => i._id === booking.tariff_id)) ||
    null;

  const bookingQuests =
    booking.children_count == 1
      ? "1 взрослый и 1 ребенок"
      : booking.adults_count == 1
      ? "1 взрослый на одном месте"
      : booking.adults_count == 2
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
        {bookingQuests ? (
          <Typography variant="label">{bookingQuests}</Typography>
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
            {booking.price} ₽
          </Typography>
        </Box>

        <CustomButton
          label={"Продолжить"}
          onClick={() => null}
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
