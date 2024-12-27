import React, { useEffect } from "react";
import { CustomModal } from "../../components/shared/CustomModal/CustomModal";
import { Stack, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import {
  resetCreateBookingState,
  setBookingSteps,
  setFilterParams,
  setNewBookings,
} from "../../../redux/slices/Bookings/bookingsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useHistory } from "react-router-dom";

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const WishCreateNewBooking = (props: Props) => {
  const { open, setOpen } = props;
  const history = useHistory();

  const dispatch = useAppDispatch();
  const { filterParams, createBooking } = useAppSelector(
    (state) => state.bookings
  );

  const createNewBooking = () => {
    dispatch(setBookingSteps([]));
    dispatch(
      setNewBookings({
        bookings: [],
        actionType: "",
      })
    );
    dispatch(
      setFilterParams({
        ...filterParams,
        rooms: [{ id: uuidv4(), adults: 1, children: 0 }],
      })
    );
    dispatch(resetCreateBookingState());
  };

  return (
    <CustomModal
      modalContent={
        <Stack sx={{ alignItems: "center", marginTop: "50px" }}>
          <Typography variant="label">Бронирование успешно создано!</Typography>
        </Stack>
      }
      actionButtonsVariants="yes_no"
      handleConfirm={createNewBooking}
      handleCancel={() => {
        dispatch(resetCreateBookingState());
        history.push("/");
      }}
      confirmLoading={createBooking.isLoading}
      open={open}
      setOpen={setOpen}
      modalStyle={{ width: "500px" }}
      footerMessage="Желаете создать еще одно бронирование?"
    />
  );
};
