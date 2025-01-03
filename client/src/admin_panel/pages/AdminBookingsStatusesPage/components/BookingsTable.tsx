import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Box, Stack, Theme, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  BookingType,
  BookingUserInfoType,
} from "../../../../redux/slices/Bookings/types";
import { RoomType } from "../../../../redux/slices/Rooms/types";
import { Close, Edit, OpenInNew } from "@mui/icons-material";
import { dateTimeFormat } from "../../../../constants";
import { CustomModal } from "../../../../pages/components/shared/CustomModal/CustomModal";
import { RoomCategoryType } from "../../../../redux/slices/RoomsCategories/types";
import { CustomLabelAndDescription } from "../../../../pages/components/shared/CustomLabelAndDescription";
import { getBookingServicesInfo } from "../../../../pages/Booking/utils";
import { useAppSelector } from "../../../../hooks/redux";
import { BookingTariffType } from "../../../../redux/slices/BookingTariffs/types";
import { BookingServiceType } from "../../../../redux/slices/BookingServices/types";
import { RoomBedVariantType } from "../../../../redux/slices/RoomBedVariants/types";
import { ViewFromRoomWindowType } from "../../../../redux/slices/ViewsFromRoomWindow/types";
import { TransferVariantType } from "../../../../redux/slices/TransferVariants/types";
import { TransferCarType } from "../../../../redux/slices/TransferCars/types";
import { PaymentMethodType } from "../../../../redux/slices/PaymentMethods/types";

type BookingDateType = { arrival_datetime: string; departure_datetime: string };
type BookingGuestsCountType = { adults_count: number; children_count: number };

export type CategoryRoomsBookingStatusType = {
  id: string;
  isBooked: boolean;
  number: number;
  bookingUser: BookingUserInfoType | undefined;
  bookingGuests: BookingGuestsCountType | undefined;
  bookingDate: BookingDateType | undefined;
} & { booking: BookingType | undefined };

interface Props {
  data: CategoryRoomsBookingStatusType[];
  roomsCategories: RoomCategoryType[] | null;
  bookingTariffs: BookingTariffType[] | null;
  bookingServices: BookingServiceType[] | null;
  roomBedVariants: RoomBedVariantType[] | null;
  viewsFromRoomWindow: ViewFromRoomWindowType[] | null;
  transferVariants: TransferVariantType[] | null;
  transferCars: TransferCarType[] | null;
  paymentMethods: PaymentMethodType[] | null;
  isLoading: boolean;
}

export const BookingsTable = (props: Props) => {
  const {
    data,
    isLoading,
    roomsCategories,
    bookingTariffs,
    bookingServices,
    roomBedVariants,
    viewsFromRoomWindow,
    transferVariants,
    transferCars,
    paymentMethods,
  } = props;

  const [openBookingDetailsModal, setOpenBookingDetailsModal] = useState<{
    booking: CategoryRoomsBookingStatusType | undefined;
    status: boolean;
  }>({ booking: undefined, status: false });
  const classes = useStyles();
  const theme = useTheme();

  const getGuestsCount = (guests: BookingGuestsCountType): string => {
    const { adults_count, children_count } = guests;

    return `
       ${
         adults_count > 0
           ? `${adults_count} взрослы${adults_count === 1 ? "й" : "x"}`
           : ""
       }
        ${children_count > 0 ? ", " : ""}
        ${
          children_count >= 5
            ? `${children_count} детей`
            : children_count > 0
            ? `${children_count} ребен${children_count === 1 ? "ок" : "ка"}`
            : ""
        }
      `;
  };
  const columns: GridColDef<CategoryRoomsBookingStatusType>[] = [
    {
      field: "isBooked",
      headerName: "Статус",
      width: 200,
      renderCell: (params: any) => {
        const { value }: { value: boolean } = params;
        return (
          <Box
            className={classes.statusContainer}
            sx={{
              background: value
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
            }}
          >
            <Typography variant="body">
              {value ? "Забронирован" : "Не забронирован"}
            </Typography>
          </Box>
        );
      },
      sortComparator: (v1: boolean, v2: boolean) => {
        if (v1 === v2) {
          return 0;
        }
        return v1 ? -1 : 1;
      },
    },
    {
      field: "number",
      headerName: "Номер",
      width: 100,
      renderCell: (params: any) => {
        const { value }: { value: string } = params;
        return <Typography variant="body">{value}</Typography>;
      },
      sortComparator: (v1: number, v2: number) =>
        v1.toString().localeCompare(v2.toString()),
    },
    {
      field: "bookingUser",
      headerName: "ФИО",
      flex: 1,
      renderCell: (params: any) => {
        const { value }: { value: BookingUserInfoType | undefined } = params;

        if (!value) return <Typography variant="body">-</Typography>;

        return (
          <Typography variant="body">{`${value.lastname} ${value.name} ${value.surname}`}</Typography>
        );
      },
      sortComparator: (v1: BookingUserInfoType, v2: BookingUserInfoType) => {
        if (v1 && v2) {
          return `${v1.lastname} ${v1.name} ${v1.surname}`.localeCompare(
            `${v2.lastname} ${v2.name} ${v2.surname}`
          );
        }
        return 0;
      },
    },
    {
      field: "bookingGuests",
      headerName: "Количество гостей",
      width: 190,
      renderCell: (params: any) => {
        const { value }: { value: BookingGuestsCountType | undefined } = params;

        if (!value) return <Typography variant="body">-</Typography>;

        const { adults_count, children_count } = value;
        return (
          <Typography variant="body">
            {getGuestsCount({ adults_count, children_count })}
          </Typography>
        );
      },
    },
    {
      field: "bookingDate",
      headerName: "Дата заезда и выезда",
      width: 210,
      renderCell: (params: any) => {
        const { value }: { value: BookingDateType | undefined } = params;

        if (!value) return <Typography variant="body">-</Typography>;

        return (
          <Typography variant="body">
            {`${moment(value.arrival_datetime).format(
              dateTimeFormat
            )} - ${moment(value.departure_datetime).format(dateTimeFormat)}`}
          </Typography>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 150,
      cellClassName: "actions",
      getActions: ({ row }: { row: CategoryRoomsBookingStatusType }) => {
        return [
          <GridActionsCellItem
            icon={
              <Edit
                htmlColor={theme.palette.text.primary}
                sx={{ fontSize: "16px" }}
              />
            }
            label=""
            onClick={() => null}
            className={classes.openDetailsActionButton}
          />,

          <GridActionsCellItem
            icon={
              <Close
                htmlColor={theme.palette.text.primary}
                sx={{ fontSize: "16px" }}
              />
            }
            label=""
            onClick={() => null}
            className={classes.openDetailsActionButton}
          />,
          <GridActionsCellItem
            icon={
              <OpenInNew
                htmlColor={theme.palette.text.primary}
                sx={{ fontSize: "16px" }}
              />
            }
            label=""
            onClick={() =>
              setOpenBookingDetailsModal({
                booking: row,
                status: true,
              })
            }
            className={classes.openDetailsActionButton}
          />,
        ];
      },
    },
  ];

  const SortedDescendingIcon = () => {
    return (
      <Box className={classes.sortIconContainer}>
        <ExpandLessIcon
          htmlColor={theme.palette.text.primary}
          sx={{ fontSize: "15px" }}
        />
        <ExpandMoreIcon
          htmlColor={theme.palette.text.disabled}
          sx={{ fontSize: "15px", marginTop: "-3px" }}
        />
      </Box>
    );
  };

  const SortedAscendingIcon = () => {
    return (
      <Box className={classes.sortIconContainer}>
        <ExpandLessIcon
          htmlColor={theme.palette.text.disabled}
          sx={{ fontSize: "15px" }}
        />
        <ExpandMoreIcon
          htmlColor={theme.palette.text.primary}
          sx={{ fontSize: "15px", marginTop: "-3px" }}
        />
      </Box>
    );
  };

  const UnsortedIcon = () => {
    return (
      <Box className={classes.sortIconContainer}>
        <ExpandLessIcon
          htmlColor={theme.palette.text.disabled}
          sx={{ fontSize: "15px" }}
        />
        <ExpandMoreIcon
          htmlColor={theme.palette.text.disabled}
          sx={{ fontSize: "15px", marginTop: "-3px" }}
        />
      </Box>
    );
  };

  const BookingDetailsModalContent = () => {
    const row = openBookingDetailsModal.booking;
    const booking = row?.booking || null;
    const user = row?.bookingUser || null;
    const guests = row?.bookingGuests || null;
    const date = row?.bookingDate || null;

    if (booking && user && guests && date) {
      const roomCategory =
        (booking.room_category_id &&
          roomsCategories?.find((i) => i._id === booking.room_category_id)) ||
        null;

      const bookingTariff =
        (booking.tariff_id &&
          bookingTariffs?.find((i) => i._id === booking.tariff_id)) ||
        null;

      const bookingServicesInfo = getBookingServicesInfo({
        bookingServices,
        roomCategory,
        currentBooking: booking,
      });

      const bedTypeSpecialWish =
        roomBedVariants?.find((i) => i._id === booking.bed_type_id) || null;

      const viewsFromRoomWindowSpecialWish =
        (booking.view_from_window_id &&
          viewsFromRoomWindow?.find(
            (i) => i._id === booking.view_from_window_id
          )) ||
        null;

      const transfer =
        (booking.transfer_id &&
          transferVariants?.find((i) => i._id === booking.transfer_id)) ||
        null;

      const transferCar =
        (transfer && transferCars?.find((i) => i._id === transfer.car_id)) ||
        null;

      const paymentMethod =
        (booking.payment_method_id &&
          paymentMethods?.find((i) => i._id === booking.payment_method_id)) ||
        null;

      return (
        <Stack sx={{ alignItems: "stretch", gap: "15px" }}>
          <CustomLabelAndDescription
            label={"Номер"}
            description={row?.number.toString() || "-"}
          />

          <CustomLabelAndDescription
            label={"Категория комнаты"}
            description={roomCategory?.title || "-"}
          />

          <CustomLabelAndDescription
            label={"ФИО"}
            description={`${user.lastname} ${user.name} ${user.surname}`}
          />

          <CustomLabelAndDescription
            label={"Количество гостей"}
            description={getGuestsCount({
              adults_count: guests.adults_count,
              children_count: guests.children_count,
            })}
          />

          <CustomLabelAndDescription
            label={"Дата заезда и выезда"}
            description={`${moment(date.arrival_datetime).format(
              dateTimeFormat
            )} - ${moment(date.departure_datetime).format(dateTimeFormat)}`}
          />

          <CustomLabelAndDescription
            label={"Услуги"}
            description={
              bookingServicesInfo?.map((i) => i.title).join(", ") || "-"
            }
          />
          <CustomLabelAndDescription
            label={"Специальные пожелания"}
            description={`${
              bedTypeSpecialWish
                ? "Кровать: " + bedTypeSpecialWish.title + ", "
                : ""
            }${
              viewsFromRoomWindowSpecialWish
                ? "Вид из окна: " +
                  viewsFromRoomWindowSpecialWish.title.toLowerCase()
                : ""
            }`}
          />

          <CustomLabelAndDescription
            label={"Трансфер, время, автомобиль"}
            description={
              transfer && transferCar
                ? `${
                    transfer.from_hotel
                      ? "В отель, "
                      : transfer.to_hotel
                      ? "Из отеля, "
                      : "-"
                  }${transfer.time_from + "-" + transfer.time_to}, ${
                    transferCar
                      ? transferCar.brand + " " + transferCar.model
                      : "Не указано"
                  }`
                : "-"
            }
          />

          {transfer && transferCar ? (
            <CustomLabelAndDescription
              label={"Комментарий трансферу"}
              description={transfer.comment || "-"}
            />
          ) : null}

          <CustomLabelAndDescription
            label={"Способ оплаты"}
            description={paymentMethod?.title || "-"}
          />

          <CustomLabelAndDescription
            label={"Комментарий"}
            description={booking?.comment || "-"}
          />

          <CustomLabelAndDescription
            label={"Бронирование для: "}
            description={
              booking?.booking_for_whom === "for_yourself"
                ? "Себя"
                : booking?.booking_for_whom === "for_another"
                ? "Другого"
                : "-"
            }
          />

          <CustomLabelAndDescription
            label={"Общая стоимость"}
            description={`${booking.price} ₽`}
          />
        </Stack>
      );
    }
    return null;
  };
  return (
    <>
      <div className={classes.root}>
        <DataGrid
          getRowId={(row) => row.id}
          getRowHeight={() => "auto"}
          getEstimatedRowHeight={() => 60}
          disableColumnMenu
          loading={isLoading}
          hideFooterPagination
          hideFooterSelectedRowCount
          rows={data}
          columns={columns}
          initialState={{
            sorting: {
              sortModel: [
                // { field: 'medicalSpecialist', sort: 'asc' },
              ],
            },
          }}
          slots={{
            columnSortedDescendingIcon: SortedDescendingIcon,
            columnSortedAscendingIcon: SortedAscendingIcon,
            columnUnsortedIcon: UnsortedIcon,
          }}
          sx={{
            border: "none",
            flex: 1,

            "& .MuiDataGrid-virtualScroller": {
              overflowX: "hidden",
              minHeight: "50px",

              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                background: theme.palette.primary.main,
                borderRadius: "30px",

                "&:hover": {
                  opacity: 0.7,
                  background: theme.palette.primary.main,
                },
              },
            },

            "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
              {
                outline: "none !important",
              },

            "& .MuiDataGrid-row": {
              background: "#fff !important",
              borderRadius: "16px",
              marginBottom: "10px",
              padding: "10px 0",
              border: "1px solid #E5EEFF",
              // width: 'calc(100% - 2px)',

              "& .MuiDataGrid-actionsCell": {
                marginRight: "10px",
              },

              "&.Mui-hovered, &.Mui-selected, &:hover, &:focus, &.Mui-selected.Mui-hovered":
                {
                  border: `1px solid ${theme.palette.primary.main}`,
                  filter: "drop-shadow(0px 10px 20px rgba(23, 50, 54, 0.1))",
                },
            },

            "& .MuiDataGrid-main": {
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "none",
                borderRadius: "16px",
                marginBottom: "10px",
                overflow: "hidden",
              },

              "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-columnHeader--sortable": {
                outline: "none !important",
                "&:hover": {
                  opacity: 0.7,
                },
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontFamily: "Raleway",
                fontSize: "16px",
                fontWeight: "500",
                color: theme.palette.text.primary,
              },

              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },

              "& div div div div .MuiDataGrid-cell": {
                borderBottom: "none",
                outline: "none",

                "&.actions": {
                  // paddingRight: '20px',
                },
              },
            },

            "& .MuiDataGrid-footerContainer": {
              height: "0px",
              display: "none",
            },

            ".MuiDataGrid-iconButtonContainer": {
              visibility: "visible",

              "& .MuiIconButton-root": {
                padding: "0 !important",
                marginLeft: "8.25px",
              },
            },
            ".MuiDataGrid-sortIcon": {
              opacity: "inherit !important",
            },

            ".MuiDataGrid-cell": {
              border: "none",
            },
          }}
        />
      </div>

      <CustomModal
        modalTitle="Информация о бронировании"
        modalContent={
          <Stack sx={{ alignItems: "stretch", gap: "15px" }}>
            <BookingDetailsModalContent />
          </Stack>
        }
        open={openBookingDetailsModal.status}
        setOpen={() =>
          setOpenBookingDetailsModal({ booking: undefined, status: false })
        }
        modalStyle={{ width: "500px" }}
      />
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "max-content",
    paddingTop: "15px",
    zIndex: 1,
  },
  // Sort icon
  sortIconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 !important",
  },
  // Status column
  statusContainer: {
    padding: "9px 15px",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  statusLabel: {
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "12px",
    letterSpacing: "-0.03em",
    color: "#1e1e1e",
  },
  // Specialty column
  roomNumberLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: theme.palette.text.primary,
    lineHeight: "1.25",
    letterSpacing: "-0.03em",
    overflowWrap: "anywhere",
  },
  // ID service column
  fullNameLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: theme.palette.text.primary,
    lineHeight: "1.25",
    letterSpacing: "-0.03em",
    overflowWrap: "anywhere",
  },
  openDetailsActionButton: {
    width: "40px",
    height: "40px",
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: "100%",
  },
}));
