import { Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  ToogleButtonModeType,
  ToogleModeButton,
} from "../../../../../../components/shared/ToogleModeButton";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../hooks/redux";
import { GetRoomFeatures } from "../../../../../../../redux/slices/RoomFeatures/roomFeaturesSlice";
import { GetViewsFromRoomWindow } from "../../../../../../../redux/slices/ViewsFromRoomWindow/viewsFromRoomWindow";
import { GetRoomBedVariants } from "../../../../../../../redux/slices/RoomBedVariants/roomBedVariantsSlice";
import { CourtyardViewIcon } from "../../../../../../../assets/icons/CourtyardViewIcon";
import { ForestViewIcon } from "../../../../../../../assets/icons/ForestViewIcon";
import { TwoPersonsBedIcon } from "../../../../../../../assets/icons/TwoPersonsBedIcon";
import { RoomCategoryType } from "../../../../../../../redux/slices/RoomsCategories/types";

interface Props {
  roomCategory: RoomCategoryType | null;
}

export const SpecialWishesSelector = (props: Props) => {
  const { roomCategory } = props;
  const dispatch = useAppDispatch();
  const { roomFeatures } = useAppSelector((state) => state.roomFeatures);
  const { roomBedVariants } = useAppSelector((state) => state.roomBedVariants);
  const { viewsFromRoomWindow } = useAppSelector(
    (state) => state.viewsFromRoomWindow
  );
  const [bedSpecialWish, setBedSpecialWish] = useState<ToogleButtonModeType[]>(
    []
  );
  const [viewsFromWindowSpecialWish, setViewsFromWindowSpecialWish] = useState<
    ToogleButtonModeType[]
  >([]);

  // Get data from API
  const GetRoomsCategoriesList = useCallback(() => {
    if (!roomFeatures) {
      dispatch(GetRoomFeatures());
    }
  }, [roomFeatures]);

  useEffect(() => {
    GetRoomsCategoriesList();
  }, [GetRoomsCategoriesList]);

  const GetRoomBedVariantsList = useCallback(() => {
    if (!roomBedVariants) {
      dispatch(GetRoomBedVariants());
    }
  }, [roomBedVariants]);

  useEffect(() => {
    GetRoomBedVariantsList();
  }, [GetRoomBedVariantsList]);

  const GetRoomViewsFromWindowList = useCallback(() => {
    if (!viewsFromRoomWindow) {
      dispatch(GetViewsFromRoomWindow());
    }
  }, [viewsFromRoomWindow]);

  useEffect(() => {
    GetRoomViewsFromWindowList();
  }, [GetRoomViewsFromWindowList]);

  useEffect(() => {
    if (roomCategory && roomBedVariants) {
      setBedSpecialWish(
        roomCategory.available_bed_variant_id.map((id: string) => {
          return {
            label: roomBedVariants.find((i) => i._id === id)?.title || "",
            value: id,
            icon: <TwoPersonsBedIcon sx={{ fontSize: "16px" }} />,
            isSelected: false,
          };
        })
      );
    }
  }, [roomCategory, roomBedVariants]);

  useEffect(() => {
    if (roomCategory && viewsFromRoomWindow) {
      setViewsFromWindowSpecialWish(
        viewsFromRoomWindow.slice(0, 2).map((i) => {
          return {
            label: i.title,
            value: i._id,
            icon:
              i.title === "Вид во двор" ? (
                <CourtyardViewIcon sx={{ fontSize: "16px" }} />
              ) : i.title === "Вид на лес" ? (
                <ForestViewIcon sx={{ fontSize: "16px" }} />
              ) : (
                <div></div>
              ),
            isSelected: false,
          };
        })
      );
    }
  }, [roomCategory, viewsFromRoomWindow]);

  return (
    <Stack
      sx={{
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        padding: "0 24px",
      }}
    >
      <Typography
        variant="label"
        fontWeight={600}
        textAlign={"center"}
        flex={1}
        marginBottom={"15px"}
      >
        Особые пожелания *
      </Typography>

      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: { xs: "100%", md: "90%" },
          flexWrap: "wrap",
          columnGap: "24px",
          rowGap: "15px",
        }}
      >
        <ToogleModeButton
          label="Кровати"
          modes={bedSpecialWish}
          setMode={setBedSpecialWish}
        />
        <ToogleModeButton
          label="Вид из окна"
          modes={viewsFromWindowSpecialWish}
          setMode={setViewsFromWindowSpecialWish}
        />
      </Stack>

      <Typography
        variant="small"
        sx={{ margin: { xs: "10px auto 0", md: "10px 0 0" } }}
      >
        <span
          style={{
            fontSize: "16px",
          }}
        >
          *
        </span>
        Выполнение особых пожеланий не гарантируется
      </Typography>
    </Stack>
  );
};
