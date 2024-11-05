import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CreateRoomCategory } from "../../redux/slices/RoomsCategories/roomsCategoriesSlice";
import { CreateRoom } from "../../redux/slices/Rooms/roomsSlice";
import { useAppDispatch } from "../../redux/store";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const a = useCallback(() => {
    return dispatch(
      CreateRoom({
        room: {
          number: 1,
        },
      })
    );
  }, []);

  useEffect(() => {
    a();
  }, [a]);

  return <div>HomePage</div>;
};
