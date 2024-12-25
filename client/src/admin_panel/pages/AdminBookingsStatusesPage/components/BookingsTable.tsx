import React, { MouseEventHandler, useCallback, useEffect } from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Box, Theme, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useTranslation } from "react-i18next";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  BookingType,
  BookingUserInfoType,
} from "../../../../redux/slices/Bookings/types";
import { RoomType } from "../../../../redux/slices/Rooms/types";
import { OpenInNew } from "@mui/icons-material";

export type CategoryRoomsBookingStatusType = {
  isBooked: boolean;
} & { number: number } & { booking: BookingType | undefined };

interface Props {
  data: CategoryRoomsBookingStatusType[];
  isLoading: boolean;
}

export const BookingsTable = (props: Props) => {
  const { data, isLoading } = props;

  const classes = useStyles();
  const theme = useTheme();

  const columns: GridColDef<CategoryRoomsBookingStatusType>[] = [
    {
      field: "isBooked",
      headerName: "Статус",
      width: 170,
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
            <Typography className={classes.statusLabel}>
              {value ? "Забронирован" : "Не забронирован"}
            </Typography>
          </Box>
        );
      },
      sortComparator: (v1: string, v2: string) => v1.localeCompare(v2),
    },
    {
      field: "number",
      headerName: "Номер",
      flex: 1,
      renderCell: (params: any) => {
        const { value }: { value: string } = params;
        return (
          <Typography className={classes.roomNumberLabel}>{value}</Typography>
        );
      },
      sortComparator: (v1: string, v2: string) => v1.localeCompare(v2),
    },
    {
      field: "user",
      headerName: "ФИО",
      width: 200,
      renderCell: (params: any) => {
        const { value }: { value: BookingUserInfoType } = params;
        return (
          <Typography
            className={classes.fullNameLabel}
          >{`${value.lastname} ${value.name} ${value.surname}`}</Typography>
        );
      },
      sortComparator: (v1: BookingUserInfoType, v2: BookingUserInfoType) =>
        `${v1.lastname} ${v1.name} ${v1.surname}`.localeCompare(
          `${v2.lastname} ${v2.name} ${v2.surname}`
        ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 40,
      cellClassName: "actions",
      getActions: ({ row }: { row: CategoryRoomsBookingStatusType }) => {
        return [
          <GridActionsCellItem
            icon={<OpenInNew sx={{ fontSize: "24px" }} />}
            label=""
            onClick={() => null}
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

  return (
    <div className={classes.root}>
      <DataGrid
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

          ".MuiDataGrid-virtualScroller": {
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
            borderRadius: "20px",
            marginBottom: "10px",
            padding: "10px 0",
            border: "1px solid #E5EEFF",
            // width: 'calc(100% - 2px)',

            "& .MuiDataGrid-actionsCell": {
              marginRight: "10px",
            },

            "& .MuiDataGrid-actionsCell .MuiIconButton-root": {
              opacity: 0,
            },

            "&.Mui-hovered, &.Mui-selected, &:hover, &:focus, &.Mui-selected.Mui-hovered":
              {
                border: `1px solid ${theme.palette.primary.main}`,
                filter: "drop-shadow(0px 20px 40px rgba(23, 50, 54, 0.1))",

                "&  .MuiDataGrid-actionsCell .MuiIconButton-root": {
                  opacity: 1,
                },
              },
          },

          "&>.MuiDataGrid-main": {
            "&>.MuiDataGrid-columnHeaders": {
              borderBottom: "none",
              background: "#F1F6FA",
              borderRadius: "10px",
              marginBottom: "10px",
            },

            "& .MuiDataGrid-columnHeader--sortable": {
              outline: "none !important",
              "&:hover": {
                opacity: 0.7,
              },
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: "14px",
              fontWeight: "500",
              color: "#000",
            },

            "& div div div div >.MuiDataGrid-cell": {
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
        }}
      />
    </div>
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
    padding: "9px 10px",
    borderRadius: "20px",
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
    background: theme.palette.background.paper,
    border: "1px solid #D2E1F5",

    "& svg path": {
      fill: theme.palette.primary.main,
    },

    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
      background: theme.palette.primary.main,

      "& svg path": {
        fill: "#29F499",
      },
    },
  },
}));
