import { Box, List, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import {
  getFeatureIcon,
  RoomMainFeatureGridItem,
} from "../../SelectTariffSection/components/RoomCategoryCard/RoomCategoryCard";
import { RoomsCountIcon } from "../../../../../assets/icons/RoomsCountIcon";
import { CustomButton } from "../../../../components/shared/CustomButton";
import {
  Add,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import Grid, { GridBaseProps, GridSize } from "@mui/material/Grid2";
import { CustomSimpleImageSlider } from "../../../../components/shared/CustomSimpleSlider.ts/CustomSimpleImageSlider";
import { useAppSelector } from "../../../../../hooks/redux";
import { getRoomCategoryPhotos } from "../../../utils";
import { OneQuestIcon } from "../../../../../assets/icons/OneQuestIcon";
import { RoomSizeIcon } from "../../../../../assets/icons/RoomSizeIcon";
import { theme } from "../../../../../theme";
import { RoomCategoryType } from "../../../../../redux/slices/RoomsCategories/types";
import { CustomMultiImagePreviewSlider } from "../../../../components/shared/CustomMultiImagePreviewSlider/CustomMultiImagePreviewSlider";
import { FeatureDetails } from "../../SelectTariffSection/components/RoomCategoryCard/components/FeatureDetails";
import { CustomCircleIconButton } from "../../../../components/shared/CustomCircleIconButton";
import { DaysList } from "./DaysList";

interface Props {
  roomCategory: RoomCategoryType;
}

export const RoomCategoryDetailsModalContent = (props: Props) => {
  const { roomCategory } = props;
  const daysListRef = useRef<HTMLInputElement | null>(null);
  const { roomFeatures } = useAppSelector((state) => state.roomFeatures);

  if (!roomCategory) return null;

  const roomPhotos = getRoomCategoryPhotos(roomCategory);

  const setScrollForDaysList = (scrollOffset: number) => {
    if (daysListRef && daysListRef.current) {
      daysListRef.current.scrollLeft += scrollOffset;
    }
    return null;
  };

  return (
    <Stack
      sx={{
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        gap: "24px",
      }}
    >
      <Stack
        sx={{
          alignItems: "stretch",
        }}
      >
        <CustomMultiImagePreviewSlider
          images={roomPhotos}
          containerStyle={{ marginTop: 0 }}
        />

        <Stack
          sx={{
            alignItems: "stretch",
            gap: "15px",
            marginBottom: "24px",
          }}
        >
          <Typography variant="label" sx={{ fontWeight: 600 }}>
            Доступные даты для заезда
          </Typography>

          <Box
            sx={{
              position: "relative",
              width: "calc(100% - 48px)",
              marginLeft: "24px",
            }}
          >
            <Box
              ref={daysListRef}
              sx={{
                flex: 1,
                overflowX: "auto",
                scrollBehavior: "smooth",
                marginTop: "10px",

                "::-webkit-scrollbar": {
                  display: "none",
                },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                background: "#F1F6FA",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <DaysList dates={[]} />
            </Box>

            <CustomCircleIconButton
              icon={<KeyboardArrowLeft />}
              onClick={() => setScrollForDaysList(-300)}
              sx={{
                minWidth: "40px",
                width: "40px",
                height: "40px",
                position: "absolute",
                top: "50%",
                left: "-20px",
                zIndex: 1,
                transform: "translate(0, -50%)",
              }}
            />

            <CustomCircleIconButton
              icon={<KeyboardArrowRight />}
              onClick={() => setScrollForDaysList(300)}
              sx={{
                minWidth: "40px",
                width: "40px",
                height: "40px",
                position: "absolute",
                top: "50%",
                right: "-20px",
                zIndex: 1,
                transform: "translate(0, -50%)",
              }}
            />
          </Box>
        </Stack>

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
      </Stack>
    </Stack>
  );
};
