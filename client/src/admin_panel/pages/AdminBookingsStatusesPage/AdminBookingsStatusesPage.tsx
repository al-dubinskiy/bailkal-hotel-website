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
import { KeyboardArrowDown } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { GroupObjectByKey } from "../../../pages/Booking/utils";
import { RoomCategoryType } from "../../../redux/slices/RoomsCategories/types";
import { BookingType } from "../../../redux/slices/Bookings/types";
import {
  BookingsTable,
  CategoryRoomsBookingStatusType,
} from "./components/BookingsTable";
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
      const bookingsByRoomCategories = Object.entries(
        sortedBookingsByRoomCategories
      ); // { 0: "a", 1: "b", 2: "c" } => [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

      return roomsCategories.map((roomCategory): DataListType => {
        const bookings = bookingsByRoomCategories.find(
          (booking) => booking[0] === roomCategory._id
        ); // find bookings on room category

        return {
          roomCategory,
          categoryRoomsBookingStatuses: roomCategory.room_id.map((roomId) => {
            const bookingsOnRoom = bookings
              ? bookings[1].filter((booking) => booking.room_id === roomId)
              : null; // поиск букинга на этот номер
            console.log("aaa", bookingsOnRoom);

            if (bookingsOnRoom) {
              bookingsOnRoom.map((booking) => {
                return {
                  id: roomId,
                  isBooked: true,
                  roomNumber:
                    rooms.find((room) => room._id === roomId)?.number || -1,
                  booking,
                  bookingDate: {
                    arrival_datetime: booking.arrival_datetime,
                    departure_datetime: booking.departure_datetime,
                  },
                  bookingGuests: {
                    adults_count: booking.adults_count,
                    children_count: booking.children_count,
                  },
                  bookingUser: booking.user,
                };
              });
            }
            return {
              id: roomId,
              isBooked: false, // если есть букинг на эту комнату
              roomNumber:
                rooms.find((room) => room._id === roomId)?.number || -1,
              booking: undefined,
              bookingDate: undefined,
              bookingGuests: undefined,
              bookingUser: undefined,
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
            defaultExpanded={true}
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
                  >{`Номера (${
                    item.categoryRoomsBookingStatuses.filter((i) => i.isBooked)
                      .length
                  } из ${item.roomCategory.room_id.length})`}</Typography>

                  <BookingsTable
                    data={item.categoryRoomsBookingStatuses}
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
