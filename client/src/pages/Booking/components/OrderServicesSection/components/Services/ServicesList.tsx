import React, { useCallback, useContext, useEffect } from "react";
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

  if (!bookingServices || !currentRoomCategory) return null;

  return (
    <Stack sx={{ alignItems: "stretch", gap: "24px" }}>
      {bookingServices
        ? bookingServices.map((item, index) => {
            return (
              <ServicesItem
                key={index}
                service={item}
                isIncludes={currentRoomCategory.include_service_id.includes(
                  item._id
                )}
                allServices={bookingServices}
              />
            );
          })
        : null}
    </Stack>
  );
};
