import { Box, Stack } from "@mui/material";
import React, { useContext } from "react";
import {
  getFeatureIcon,
  RoomMainFeatureGridItem,
} from "../../SelectTariffSection/components/RoomCategoryCard/RoomCategoryCard";
import { RoomsCountIcon } from "../../../../../assets/icons/RoomsCountIcon";
import Grid from "@mui/material/Grid2";
import { useAppSelector } from "../../../../../hooks/redux";
import { getRoomCategoryPhotos } from "../../../utils";
import { OneQuestIcon } from "../../../../../assets/icons/OneQuestIcon";
import { RoomSizeIcon } from "../../../../../assets/icons/RoomSizeIcon";
import { CustomMultiImagePreviewSlider } from "../../../../components/shared/CustomMultiImagePreviewSlider/CustomMultiImagePreviewSlider";
import { FeatureDetails } from "../../SelectTariffSection/components/RoomCategoryCard/components/FeatureDetails";
import { AvailableDaysList } from "./AvailableDaysList";
import { PriceBottomBar } from "./PriceBottomBar";
import { SelectRoomContext } from "../../SelectRoomSection";

interface Props {}

export const RoomCategoryDetailsModalContent = (props: Props) => {
  const {} = props;
  const { roomCategory } = useContext(SelectRoomContext);
  const { roomFeatures } = useAppSelector((state) => state.roomFeatures);

  if (!roomCategory) return null;

  const roomPhotos = getRoomCategoryPhotos(roomCategory);

  return (
    <Stack
      sx={{
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        gap: "24px",
        position: "relative",
        paddingBottom: roomCategory.isRoomCategoryAvailable ? "144px" : 0,
      }}
    >
      <CustomMultiImagePreviewSlider
        images={roomPhotos}
        containerStyle={{ marginTop: 0 }}
      />

      {!roomCategory.isRoomCategoryAvailable ? <AvailableDaysList /> : null}

      <Stack
        sx={{
          alignItems: "stretch",
          width: "75%",
        }}
      >
        {roomFeatures ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "24px",
            }}
          >
            <Grid container spacing={2}>
              <RoomMainFeatureGridItem
                icon={<OneQuestIcon sx={{ fontSize: "16px" }} />}
                label="Вместимость"
                value={`до ${roomCategory.guests_capacity}-х мест`}
              />
              <RoomMainFeatureGridItem
                icon={<RoomSizeIcon sx={{ fontSize: "16px" }} />}
                label="Размер"
                value={`${roomCategory.square} м²`}
              />
              <RoomMainFeatureGridItem
                icon={<RoomsCountIcon sx={{ fontSize: "16px" }} />}
                label="Количество комнат"
                value={roomCategory.room_id.length}
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
                    />
                  );
                })}
            </Grid>
          </Box>
        ) : null}
      </Stack>

      <FeatureDetails features_id={roomCategory.feature_id} />

      {roomCategory.isRoomCategoryAvailable ? <PriceBottomBar /> : null}
    </Stack>
  );
};
