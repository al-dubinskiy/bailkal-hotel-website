import React from "react";
import { CustomModal } from "../../components/shared/CustomModal/CustomModal";
import { Stack, Typography } from "@mui/material";
import { theme } from "../../../theme";
import { CustomLabelAndDescription } from "../../components/shared/CustomLabelAndDescription";
import { useAppSelector } from "../../../hooks/redux";
import { CreateBookingLocalType } from "../../../redux/slices/Bookings/types";
import { RoomCategoryType } from "../../../redux/slices/RoomsCategories/types";
import { getBookingServicesInfo } from "../utils";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const ConfirmBookingModal = (props: Props) => {
  const { open, setOpen } = props;
  const { currentBooking, currentRoomCategory } = useAppSelector(
    (state) => state.bookings
  );
  const { bookingTariffs } = useAppSelector((state) => state.bookingTariffs);
  const { bookingServices } = useAppSelector((state) => state.bookingServices);

  if (!currentBooking || !currentRoomCategory) return null;

  const BookingShortInfoCard = ({
    booking,
    roomCategory,
  }: {
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
      currentBooking,
    });

    return (
      <Stack
        sx={{
          alignItems: "stretch",
          border: `1px solid ${theme.palette.primary.extraLight}`,
          borderRadius: "16px",
          padding: "24px",
          gap: "10px",
        }}
      >
        <CustomLabelAndDescription
          label={"Номер"}
          description={roomCategory.title}
        />

        <CustomLabelAndDescription
          label={"Общая стоимость"}
          description={`${booking.price} ₽`}
        />

        <CustomLabelAndDescription
          label={"Количество гостей"}
          description={bookingGuestsCount || "Не указано"}
        />

        {bookingTariff ? (
          <>
            <Typography
              variant="label"
              sx={{ textAlign: "center", fontWeight: 600, marginTop: "10px" }}
            >
              Тариф
            </Typography>

            <Typography variant="body">
              {bookingTariff.title}:{" "}
              <span style={{ fontWeight: 600 }}>{bookingTariff.cost} ₽</span>
            </Typography>
          </>
        ) : null}

        {bookingServicesInfo ? (
          <>
            <Typography
              variant="label"
              sx={{ textAlign: "center", fontWeight: 600, marginTop: "10px" }}
            >
              Услуги
            </Typography>

            <Stack sx={{ alignItems: "stretch", gap: "5px" }}>
              {bookingServicesInfo.map((item, index) => {
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
            </Stack>
          </>
        ) : null}

        {/* Специальные пожелания */}
      </Stack>
    );
  };

  return (
    <CustomModal
      modalTitle="Подтверждение бронирование"
      modalContent={
        <Stack sx={{ alignItems: "stretch", gap: "24px" }}>
          <Typography variant="label">Ваше бронирование</Typography>

          <BookingShortInfoCard
            booking={currentBooking}
            roomCategory={currentRoomCategory}
          />
        </Stack>
      }
      actionButtonsVariants="yes_no"
      handleConfirm={() => null}
      open={open}
      setOpen={setOpen}
    />
  );
};
