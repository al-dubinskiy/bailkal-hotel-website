import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AdminBasePageLayout } from "../components/AdminBasePageLayout/AdminBasePageLayout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import { theme } from "../../../theme";
import { CustomCircleIconButton } from "../../../pages/components/shared/CustomCircleIconButton";
import { ExpandMore, KeyboardArrowDown } from "@mui/icons-material";
import { GetRoomsCategories } from "../../../redux/slices/RoomsCategories/roomsCategoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { GroupObjectByKey } from "../../../pages/Booking/utils";
import { GetBookings } from "../../../redux/slices/Bookings/bookingsSlice";
import { RoomCategoryType } from "../../../redux/slices/RoomsCategories/types";
import { BookingType } from "../../../redux/slices/Bookings/types";
import {
  BookingsTable,
  CategoryRoomsBookingStatusType,
} from "./components/BookingsTable";
import { GetRooms } from "../../../redux/slices/Rooms/roomsSlice";
import { GetBookingTariffs } from "../../../redux/slices/BookingTariffs/bookingTariffsSlice";
import { GetBookingServices } from "../../../redux/slices/BookingServices/bookingServicesSlice";
import { GetRoomBedVariants } from "../../../redux/slices/RoomBedVariants/roomBedVariantsSlice";
import { GetViewsFromRoomWindow } from "../../../redux/slices/ViewsFromRoomWindow/viewsFromRoomWindow";
import { GetPaymentMethods } from "../../../redux/slices/PaymentMethods/paymentMethodsSlice";
import { GetTransferVariants } from "../../../redux/slices/TransferVariants/transferVariantsSlice";
import { GetTransferCars } from "../../../redux/slices/TransferCars/transferCarsSlice";
import { GetRoomFeatures } from "../../../redux/slices/RoomFeatures/roomFeaturesSlice";
import { GetRoomFeaturesCategories } from "../../../redux/slices/RoomFeaturesCategories/roomFeaturesSlice";
import { useGetApiData } from "../../../hooks/getApiData";

type DataListType = {
  roomCategory: RoomCategoryType;
  categoryRoomsBookingStatuses: CategoryRoomsBookingStatusType[];
};

interface SortedBookingType {
  [key: string]: BookingType[];
}

interface Props {}

export const AdminBookingsStatusesPage = (props: Props) => {
  const {} = props;

  const { isLoading } = useGetApiData();
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector((state) => state.bookings);
  const { roomsCategories } = useAppSelector((state) => state.roomsCategories);
  const { rooms } = useAppSelector((state) => state.rooms);
  const { bookingTariffs } = useAppSelector((state) => state.bookingTariffs);
  const { bookingServices } = useAppSelector((state) => state.bookingServices);
  const { roomBedVariants } = useAppSelector((state) => state.roomBedVariants);
  const { viewsFromRoomWindow } = useAppSelector(
    (state) => state.viewsFromRoomWindow
  );
  const { paymentMethods } = useAppSelector((state) => state.paymentMethods);
  const { transferVariants } = useAppSelector(
    (state) => state.transfersVariants
  );
  const { transferCars } = useAppSelector((state) => state.transfersCars);

  const sortedBookingsByRoomCategories =
    useMemo((): SortedBookingType | null => {
      if (roomsCategories && bookings) {
        const sortedBookings: SortedBookingType = GroupObjectByKey(
          "room_category_id",
          bookings
        );

        return sortedBookings;
      } else {
        return null;
      }
    }, [bookings, roomsCategories]);

  const dataList = useMemo((): DataListType[] => {
    if (sortedBookingsByRoomCategories && roomsCategories && rooms) {
      const a = Object.entries(sortedBookingsByRoomCategories); // { 0: "a", 1: "b", 2: "c" } => [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

      return roomsCategories.map((i): DataListType => {
        const b = a.find((j) => j[0] === i._id); // find bookings on room category

        return {
          roomCategory: i,
          categoryRoomsBookingStatuses: i.room_id.map((k) => {
            const booking = b && b[1].find((l) => l.room_id === k); // поиск букинга на этот номер
            return {
              id: k,
              isBooked: booking ? true : false, // если есть букинг на эту комнату
              number: rooms.find((p) => p._id === k)?.number || -1,
              booking,
              bookingDate: booking
                ? {
                    arrival_datetime: booking.arrival_datetime,
                    departure_datetime: booking.departure_datetime,
                  }
                : undefined,
              bookingGuests: booking
                ? {
                    adults_count: booking.adults_count,
                    children_count: booking.children_count,
                  }
                : undefined,
              bookingUser: booking ? booking.user : undefined,
            };
          }),
        };
      });
    }
    return [];
  }, [sortedBookingsByRoomCategories, rooms]);

  return (
    <AdminBasePageLayout
      children={dataList.map((item, index) => {
        return (
          <Accordion
            key={index}
            defaultExpanded={index === 0}
            disableGutters={true}
            sx={{
              borderRadius: "16px",
              background: theme.palette.primary.lighter,
            }}
          >
            <AccordionSummary
              expandIcon={
                <CustomCircleIconButton
                  icon={<KeyboardArrowDown />}
                  sx={
                    {
                      // position: "absolute",
                      // top: "24px",
                      // right: "24px",
                      // transform: `rotate(${roomDetailsOpen ? 180 : 0}deg)`,
                      // zIndex: 1,
                    }
                  }
                />
              }
              aria-controls={`panel-${index + 1}-content`}
              id={`panel-${index + 1}-header`}
              sx={{
                "&.MuiAccordionSummary-root": {
                  margin: "24px 0",
                  "& .MuiAccordionSummary-content": {
                    margin: 0,

                    "& .MuiTypography-root": {
                      margin: 0,
                    },
                  },
                },
              }}
            >
              <Typography variant="body" sx={{ margin: "10px auto" }}>
                {item.roomCategory.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              <Stack
                sx={{
                  alignItems: "stretch",
                  padding: "24px",
                  paddingTop: 0,
                }}
              >
                <Stack
                  sx={{
                    alignItems: "stretch",
                    padding: "24px",
                    borderRadius: "16px",
                    background: theme.palette.primary.extraLight,
                  }}
                >
                  <Typography
                    variant="label"
                    sx={{ alignSelf: "flex-start" }}
                  >{`Номера (${item.roomCategory.room_id.length})`}</Typography>

                  <BookingsTable
                    data={item.categoryRoomsBookingStatuses}
                    roomsCategories={roomsCategories}
                    bookingTariffs={bookingTariffs}
                    bookingServices={bookingServices}
                    roomBedVariants={roomBedVariants}
                    viewsFromRoomWindow={viewsFromRoomWindow}
                    transferVariants={transferVariants}
                    transferCars={transferCars}
                    paymentMethods={paymentMethods}
                    isLoading={false}
                  />
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        );
      })}
      pageTitle="Выберите тип номера"
    />
  );
};
