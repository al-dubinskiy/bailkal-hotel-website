import { Stack, Typography } from "@mui/material";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
import {
  LandscapeOutlined,
  WaterOutlined,
  WavesOutlined,
} from "@mui/icons-material";
import { theme } from "../../../../../../../theme";
import { BookingContext } from "../../../../../BookingPage";
import { shallowEqual } from "react-redux";

interface Props {}

export const SpecialWishesSelector = memo((props: Props) => {
  const {} = props;
  const dispatch = useAppDispatch();
  const { updateBookingDraft, bookingProgressCurrentStep } =
    useContext(BookingContext);
  const { currentBooking, currentRoomCategory: roomCategory } = useAppSelector(
    (state) => state.bookings
  );
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
    if (roomCategory && roomBedVariants && currentBooking) {
      if (
        !bedSpecialWish.length ||
        bedSpecialWish.findIndex((i) => i.id === currentBooking.bed_type_id) ===
          -1
      ) {
        const a = roomBedVariants.filter((i) =>
          roomCategory.available_bed_variant_id.includes(i._id)
        );
        setBedSpecialWish(
          a.map((i) => {
            return {
              id: i._id,
              label: i.title,
              value: i._id,
              icon: <TwoPersonsBedIcon sx={{ fontSize: "16px" }} />,
              isSelected: currentBooking.bed_type_id === i._id ? true : false,
            };
          })
        );
      }
    }
  }, [roomCategory, roomBedVariants, currentBooking]);

  useEffect(() => {
    if (roomCategory && viewsFromRoomWindow && currentBooking) {
      const a = viewsFromRoomWindow.filter((i) =>
        roomCategory.additional_view_from_room_window_id.includes(i._id)
      );
      setViewsFromWindowSpecialWish(
        a.map((i) => {
          return {
            id: i._id,
            label: i.title,
            value: i._id,
            icon:
              i.value === "courtyard" ? (
                <CourtyardViewIcon sx={{ fontSize: "16px" }} />
              ) : i.value === "forest" ? (
                <ForestViewIcon sx={{ fontSize: "16px" }} />
              ) : i.value === "mountains" ? (
                <LandscapeOutlined
                  sx={{ color: theme.palette.primary.dark, fontSize: "16px" }}
                />
              ) : i.value === "lake" ? (
                <WavesOutlined
                  sx={{ color: theme.palette.primary.dark, fontSize: "16px" }}
                />
              ) : i.value === "river" ? (
                <WaterOutlined
                  sx={{ color: theme.palette.primary.dark, fontSize: "16px" }}
                />
              ) : (
                <div></div>
              ),
            isSelected:
              currentBooking.view_from_window_id === i._id ? true : false,
          };
        })
      );
    }
  }, [roomCategory, viewsFromRoomWindow, currentBooking]);

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
          setMode={(val) => {
            const selected = val.find(
              (i: ToogleButtonModeType) => i.isSelected
            );
            const { step: currentStep } = bookingProgressCurrentStep;

            if (currentStep) {
              updateBookingDraft({
                currentStep,
                tempBookingId: currentStep.roomId,
                bedTypeId:
                  selected && selected.id !== currentBooking?.bed_type_id
                    ? selected.id
                    : "",
              });
            }
          }}
        />
        <ToogleModeButton
          label="Вид из окна"
          modes={viewsFromWindowSpecialWish}
          setMode={(val) => {
            const selected = val.find(
              (i: ToogleButtonModeType) => i.isSelected
            );
            const { step: currentStep } = bookingProgressCurrentStep;

            if (currentStep) {
              updateBookingDraft({
                currentStep,
                tempBookingId: currentStep.roomId,
                viewFromWindowId:
                  selected &&
                  selected.id !== currentBooking?.view_from_window_id
                    ? selected.id
                    : "",
              });
            }
          }}
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
});
