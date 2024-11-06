import React, { useCallback, useEffect } from "react";
import { CreateRoomCategory } from "../../redux/slices/RoomsCategories/roomsCategoriesSlice";
import { CreateRoom } from "../../redux/slices/Rooms/roomsSlice";
import { useAppDispatch } from "../../redux/store";
import BasePageLayout from "../components/BasePageLayout";
import { Header } from "../components/Header";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const a = useCallback(() => {
    return dispatch(
      CreateRoom({
        room: {
          number: 4,
        },
      })
    );
  }, []);

  useEffect(() => {
    a();
  }, [a]);

  return (
    <BasePageLayout>
      <div>Home Page</div>
    </BasePageLayout>
  );
};
