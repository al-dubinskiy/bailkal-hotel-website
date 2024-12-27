import React from "react";
import { RoomCategoryType } from "../../../../redux/slices/RoomsCategories/types";
import { CustomModal } from "../../../components/shared/CustomModal/CustomModal";
import { Stack } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { RoomCategoryDetailsModalContent } from "./components/RoomCategoryDetailsModalContent";

interface Props {
  roomCategory: RoomCategoryType;
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const RoomCategoryDetailsModal = (props: Props) => {
  const { roomCategory, open, setOpen } = props;

  return (
    <CustomModal
      modalTitle={roomCategory.title}
      modalContent={
        <RoomCategoryDetailsModalContent roomCategory={roomCategory} />
      }
      open={open}
      setOpen={setOpen}
      modalStyle={{ width: "98%", maxHeight: "98%" }}
      closeIcon={<KeyboardArrowUp />}
    />
  );
};
