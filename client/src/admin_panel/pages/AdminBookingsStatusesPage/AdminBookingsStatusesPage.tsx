import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { CustomButton } from "../../../pages/components/shared/CustomButton";
import { CustomModal } from "../../../pages/components/shared/CustomModal/CustomModal";
import { CreateOrEditBookingModalContent } from "./components/CreateOrEditBookingModalContent";
import { BookingDetailsModalContent } from "./components/BookingDetailsModalContent";
import {
  DeleteBooking,
  resetCreateBookingState,
  resetDeleteBookingState,
  resetUpdateBookingState,
} from "../../../redux/slices/Bookings/bookingsSlice";

type DataListType = {
  roomCategory: RoomCategoryType;
  categoryRoomsBookingStatuses: CategoryRoomsBookingStatusType[];
};

interface SortedBookingType {
  [key: string]: BookingType[];
}

export const AdminBookingsStatusesContext = createContext<{
  setOpenBookingDetailsModal: React.Dispatch<
    React.SetStateAction<{
      booking: BookingType | undefined;
      status: boolean;
    }>
  >;
  setOpenUpdateBookingModal: React.Dispatch<
    React.SetStateAction<{
      booking: BookingType | undefined;
      status: boolean;
    }>
  >;
  setOpenCreateBookingModal: React.Dispatch<
    React.SetStateAction<{
      booking: BookingType | undefined;
      status: boolean;
    }>
  >;
  setOpenDeleteBookingModal: React.Dispatch<
    React.SetStateAction<{
      booking: BookingType | undefined;
      status: boolean;
    }>
  >;
}>({
  setOpenBookingDetailsModal: () => null,
  setOpenUpdateBookingModal: () => null,
  setOpenCreateBookingModal: () => null,
  setOpenDeleteBookingModal: () => null,
});
interface Props {}

export const AdminBookingsStatusesPage = (props: Props) => {
  const {} = props;

  const { isLoading } = useGetApiData();
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector((state) => state.bookings);
  const { roomsCategories } = useAppSelector((state) => state.roomsCategories);
  const { rooms } = useAppSelector((state) => state.rooms);
  const {
    isLoading: updateBookingIsLoading,
    successMessage: updateBookingSuccess,
  } = useAppSelector((state) => state.bookings.updateBooking);
  const {
    isLoading: createBookingIsLoading,
    successMessage: createBookingSuccess,
  } = useAppSelector((state) => state.bookings.createBooking);
  const {
    isLoading: deleteBookingIsLoading,
    successMessage: deleteBookingSuccess,
  } = useAppSelector((state) => state.bookings.deleteBooking);

  const [openBookingDetailsModal, setOpenBookingDetailsModal] = useState<{
    booking: BookingType | undefined;
    status: boolean;
  }>({ booking: undefined, status: false });

  const [openUpdateBookingModal, setOpenUpdateBookingModal] = useState<{
    booking: BookingType | undefined;
    status: boolean;
  }>({ booking: undefined, status: false });

  const [openCreateBookingModal, setOpenCreateBookingModal] = useState<{
    booking: BookingType | undefined;
    status: boolean;
  }>({ booking: undefined, status: false });

  const [openDeleteBookingModal, setOpenDeleteBookingModal] = useState<{
    booking: BookingType | undefined;
    status: boolean;
  }>({ booking: undefined, status: false });

  const [isUpdateBooking, setIsUpdateBooking] = useState<boolean>(false);
  const [isCreateBookingInfo, setIsCreateBookingInfo] =
    useState<boolean>(false);

  const deleteBooking = () => {
    if (openDeleteBookingModal.booking) {
      dispatch(
        DeleteBooking({
          id: openDeleteBookingModal.booking._id,
        })
      );
    }
  };

  useEffect(() => {
    if (updateBookingSuccess) {
      setOpenUpdateBookingModal({ booking: undefined, status: false });
      dispatch(resetUpdateBookingState());
    }
  }, [updateBookingSuccess]);

  useEffect(() => {
    if (createBookingSuccess) {
      setOpenCreateBookingModal({ booking: undefined, status: false });
      dispatch(resetCreateBookingState());
    }
  }, [createBookingSuccess]);

  useEffect(() => {
    if (deleteBookingSuccess) {
      setOpenDeleteBookingModal({ booking: undefined, status: false });
      dispatch(resetDeleteBookingState());
    }
  }, [deleteBookingSuccess]);

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
        const roomsList: CategoryRoomsBookingStatusType[] = [];

        roomCategory.room_id.map((roomId) => {
          const bookingsOnRoom = bookings
            ? bookings[1].filter((booking) => booking.room_id === roomId)
            : null; // поиск букинга на этот номер

          if (bookingsOnRoom && bookingsOnRoom.length) {
            bookingsOnRoom.map((booking) => {
              roomsList.push({
                id: roomsList.length + 1,
                roomId,
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
              });
            });
          } else {
            roomsList.push({
              id: roomsList.length + 1,
              roomId,
              isBooked: false, // если есть букинг на эту комнату
              roomNumber:
                rooms.find((room) => room._id === roomId)?.number || -1,
              booking: undefined,
              bookingDate: undefined,
              bookingGuests: undefined,
              bookingUser: undefined,
            });
          }
        });

        return {
          roomCategory,
          categoryRoomsBookingStatuses: roomsList,
        };
      });
    }
    return [];
  }, [sortedBookingsByRoomCategories, rooms]);

  useEffect(() => {
    console.log(123);
  }, []);
  return (
    <AdminBookingsStatusesContext.Provider
      value={{
        setOpenBookingDetailsModal,
        setOpenUpdateBookingModal,
        setOpenCreateBookingModal,
        setOpenDeleteBookingModal,
      }}
    >
      <>
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
                      <Stack
                        sx={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "24px",
                        }}
                      >
                        <Typography variant="label">{`Количество номеров: ${item.roomCategory.room_id.length}`}</Typography>

                        <Typography variant="label">{`Количество бронирований: ${
                          item.categoryRoomsBookingStatuses.filter(
                            (i) => i.isBooked
                          ).length
                        }`}</Typography>
                      </Stack>

                      <BookingsTable
                        roomCategory={item.roomCategory}
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

        <CustomModal
          modalTitle="Информация о бронировании"
          modalContent={
            <Stack sx={{ alignItems: "stretch" }}>
              <BookingDetailsModalContent
                booking={openBookingDetailsModal.booking}
              />
            </Stack>
          }
          open={openBookingDetailsModal.status}
          setOpen={() =>
            setOpenBookingDetailsModal({ booking: undefined, status: false })
          }
          modalStyle={{ width: "500px" }}
        />

        {openUpdateBookingModal.booking ? (
          <CustomModal
            modalTitle="Редактировать бронирование"
            modalContent={
              <Stack sx={{ alignItems: "stretch" }}>
                <CreateOrEditBookingModalContent
                  booking={openUpdateBookingModal.booking}
                  isUpdateBooking={isUpdateBooking}
                  setIsUpdateBooking={setIsUpdateBooking}
                  mode={"edit"}
                />
              </Stack>
            }
            open={openUpdateBookingModal.status}
            setOpen={() =>
              setOpenUpdateBookingModal({ booking: undefined, status: false })
            }
            modalStyle={{ width: "550px" }}
            actionButtonsVariants="save_cancel"
            handleConfirm={() => setIsUpdateBooking(true)}
            confirmLoading={updateBookingIsLoading}
          />
        ) : null}

        {openCreateBookingModal.booking ? (
          <CustomModal
            modalTitle="Создать бронирование"
            modalContent={
              <Stack sx={{ alignItems: "stretch" }}>
                <CreateOrEditBookingModalContent
                  booking={openCreateBookingModal.booking}
                  isCreateBooking={isCreateBookingInfo}
                  setIsCreateBooking={setIsCreateBookingInfo}
                  mode={"create"}
                />
              </Stack>
            }
            open={openCreateBookingModal.status}
            setOpen={() =>
              setOpenCreateBookingModal({
                booking: undefined,
                status: false,
              })
            }
            modalStyle={{ width: "550px" }}
            actionButtonsVariants="save_cancel"
            handleConfirm={() => setIsCreateBookingInfo(true)}
            confirmLoading={createBookingIsLoading}
          />
        ) : null}

        {openDeleteBookingModal.booking ? (
          <CustomModal
            modalTitle="Удалить бронирование"
            modalContent={
              <Stack sx={{ alignItems: "center", marginTop: "20px" }}>
                <Typography variant="label">
                  Вы подтверждаете удаление этого бронирования?
                </Typography>
              </Stack>
            }
            open={openDeleteBookingModal.status}
            setOpen={() =>
              setOpenDeleteBookingModal({ booking: undefined, status: false })
            }
            modalStyle={{ width: "400px" }}
            actionButtonsVariants="yes_no"
            handleConfirm={deleteBooking}
            confirmLoading={deleteBookingIsLoading}
          />
        ) : null}
      </>
    </AdminBookingsStatusesContext.Provider>
  );
};
