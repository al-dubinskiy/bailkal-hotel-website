import { Box, Stack, Typography } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { theme } from "../../../../../theme";
import Grid from "@mui/material/Grid2";
import { CustomSimpleImageSlider } from "../../../../components/shared/CustomSimpleSlider.ts/CustomSimpleImageSlider";
import { BookingContext } from "../../../BookingPage";
import {
  deluxeKingRooms,
  deluxeTwinRooms,
  suiteRooms,
} from "../../../../../assets/images";
import { useAppSelector } from "../../../../../hooks/redux";
import {
  getFeatureIcon,
  RoomMainFeatureGridItem,
} from "../../SelectTariffSection/components/RoomCategoryCard/RoomCategoryCard";
import { OneQuestIcon } from "../../../../../assets/icons/OneQuestIcon";
import { RoomSizeIcon } from "../../../../../assets/icons/RoomSizeIcon";
import { RoomsCountIcon } from "../../../../../assets/icons/RoomsCountIcon";
import { CustomButton } from "../../../../components/shared/CustomButton";
import { RoomCategoryType } from "../../../../../redux/slices/RoomsCategories/types";

interface Props {}

export const MoreAdvantageousRoomCategoryCard = (props: Props) => {
  const {} = props;
  const { roomsCategories } = useAppSelector((state) => state.roomsCategories);
  const { roomFeatures } = useAppSelector((state) => state.roomFeatures);
  const { currentRoomCategory: prevRoomCategory } = useAppSelector(
    (state) => state.bookings
  );
  const { availableRoomCategories, roomQuests } = useContext(BookingContext);

  const roomQuestsCount = roomQuests
    ? roomQuests.adults + roomQuests.children
    : null;

  const moreAdvantageousRoomCategory = useMemo(() => {
    if (availableRoomCategories && roomsCategories && prevRoomCategory) {
      // Получаем id доступных категорий комнат
      const ids = Array.from(availableRoomCategories, (i) => i.id);
      // Получаем перечень доступных категорий категорий
      const list = roomsCategories
        .filter((i) => ids.includes(i._id))
        // Выбираем те которые имеют тот же вид из окна, что и у предыдущей категории
        .filter(
          (i) =>
            i.main_view_from_room_window_id ===
            prevRoomCategory.main_view_from_room_window_id
        )
        // Сортируем по цене в порядке возрастания
        .sort(
          (a, b) =>
            a.price_per_night_for_one_quest - b.price_per_night_for_one_quest
        );
      console.log(list.forEach((i) => console.log(JSON.stringify(i))));

      const idx = list.findIndex((i) => i._id === prevRoomCategory?._id);
      // Определяем следующую по списку, категорию
      if (idx !== -1) {
        const item = list.find((_, index) => index === idx + 1);
        if (item) return item;
      }
    }
    return null;
  }, [availableRoomCategories, prevRoomCategory, roomQuestsCount]);

  const roomPrice = useMemo(() => {
    if (moreAdvantageousRoomCategory && roomQuestsCount) {
      return roomQuestsCount > 1
        ? moreAdvantageousRoomCategory.price_per_night_for_two_quest
        : moreAdvantageousRoomCategory.price_per_night_for_one_quest;
    }
    return null;
  }, [roomQuestsCount, moreAdvantageousRoomCategory]);

  const roomPhotos = useMemo(() => {
    if (moreAdvantageousRoomCategory) {
      return moreAdvantageousRoomCategory._id === "672cd21f0ae43935e03a79dd" ||
        moreAdvantageousRoomCategory._id === "672cd2a790ef8a2d0cdfcac3"
        ? deluxeKingRooms
        : moreAdvantageousRoomCategory._id === "672cd30090ef8a2d0cdfcac6" ||
          moreAdvantageousRoomCategory._id === "672cd34e90ef8a2d0cdfcac9"
        ? deluxeTwinRooms
        : moreAdvantageousRoomCategory._id === "672cd65af65cf0e5caff9686" ||
          moreAdvantageousRoomCategory._id === "6757519407763b1fc5c07e72"
        ? suiteRooms
        : [];
    }
    return [];
  }, [moreAdvantageousRoomCategory]);

  const additionaPayment = useMemo(() => {
    if (roomPrice && roomQuestsCount && prevRoomCategory) {
      console.log(
        roomPrice,
        prevRoomCategory.price_per_night_for_one_quest,
        roomQuestsCount
      );
      return (
        roomPrice -
        (roomQuestsCount > 1
          ? prevRoomCategory.price_per_night_for_two_quest
          : prevRoomCategory.price_per_night_for_one_quest)
      );
    }
    return null;
  }, [roomPrice, roomQuestsCount, prevRoomCategory]);

  if (!moreAdvantageousRoomCategory || !additionaPayment) return null;

  return (
    <Stack
      sx={{
        flex: 1,
        borderRadius: "20px",
        background: theme.palette.layoutBackground.light,
        flexDirection: "column",
        alignItems: "stretch",
        gap: "24px",
        paddingBottom: "24px",
        border: "1px solid #DAE8FF",
        position: "relative",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
        }}
      >
        <CustomSimpleImageSlider
          images={roomPhotos}
          containerStyle={{
            width: "412px",
            height: "294px",
            borderRadius: "20px",
          }}
        />

        <Stack
          sx={{
            flex: 1,
            flexDirection: "column",
            alignItems: "stretch",
            position: "relative",
            padding: "24px 24px 0",
          }}
        >
          <Typography variant="h5">
            {moreAdvantageousRoomCategory.title}
          </Typography>

          {roomFeatures ? (
            <Box
              sx={{
                marginTop: "24px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Grid container spacing={2}>
                <RoomMainFeatureGridItem
                  icon={<OneQuestIcon sx={{ fontSize: "16px" }} />}
                  label="Вместимость"
                  value={`до ${moreAdvantageousRoomCategory.guests_capacity}-х мест`}
                  size={{ xs: 12, md: 6 }}
                />
                <RoomMainFeatureGridItem
                  icon={<RoomSizeIcon sx={{ fontSize: "16px" }} />}
                  label="Размер"
                  value={`${moreAdvantageousRoomCategory.square} м²`}
                  size={{ xs: 12, md: 6 }}
                />
                <RoomMainFeatureGridItem
                  icon={<RoomsCountIcon sx={{ fontSize: "16px" }} />}
                  label="Количество комнат"
                  value={moreAdvantageousRoomCategory.room_id.length}
                  size={{ xs: 12, md: 6 }}
                />

                {roomFeatures
                  .filter(
                    (i) =>
                      i.title === "Душ" ||
                      i.title === "Кровать" ||
                      i.title === "Wi-Fi"
                  )
                  .map((item, idx) => {
                    return (
                      <RoomMainFeatureGridItem
                        key={idx}
                        icon={getFeatureIcon(item.title)}
                        label={item.title}
                        value={"Есть"}
                        size={{ xs: 12, md: 6 }}
                      />
                    );
                  })}
              </Grid>
            </Box>
          ) : null}
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
          justifyContent: "flex-end",
          padding: "0 24px",
        }}
      >
        <Typography variant="body" sx={{ color: theme.palette.gray.light }}>
          Всего
        </Typography>

        <Typography
          variant="label"
          sx={{
            color: theme.palette.secondary.main,
            fontSize: "20.8px",
          }}
        >
          + {additionaPayment} ₽
        </Typography>

        <Typography
          variant="body"
          sx={{ color: theme.palette.text.primary, marginRight: "19px" }}
        >
          за 1 ночь
        </Typography>

        <CustomButton
          label={"Да, поменять номер"}
          onClick={() => null}
          containerVariant={"contained"}
          containerStyle={{
            padding: "0 24px",
            background: theme.palette.secondary.main,
            color: theme.palette.text.primary,
          }}
          withoutAnimation
        />
      </Box>
    </Stack>
  );
};
