import React, { useCallback, useEffect } from "react";
import { BookingServiceType } from "../../../../../../redux/slices/BookingServices/types";
import { Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import { GetBookingServices } from "../../../../../../redux/slices/BookingServices/bookingServicesSlice";
import { ServicesItem } from "./ServiceItem/ServiceItem";

interface Props {}

export const ServicesList = (props: Props) => {
  const {} = props;
  const dispatch = useAppDispatch();

  const { bookingServices } = useAppSelector((state) => state.bookingServices);
  const { currentRoomCategory } = useAppSelector((state) => state.bookings);

  const GetBookingsTariffsList = useCallback(() => {
    if (!bookingServices) {
      dispatch(GetBookingServices());
    }
  }, [bookingServices]);

  useEffect(() => {
    GetBookingsTariffsList();
  }, [GetBookingsTariffsList]);

  if (!bookingServices || !currentRoomCategory) return null;

  return (
    <Stack sx={{ alignItems: "stretch", gap: "24px" }}>
      {bookingServices
        ? bookingServices.map((item, index) => {
            return (
              <ServicesItem
                key={index}
                service={item}
                isSelected={currentRoomCategory.include_service_id.includes(
                  item._id
                )}
              />
            );
          })
        : null}
    </Stack>
  );
};
