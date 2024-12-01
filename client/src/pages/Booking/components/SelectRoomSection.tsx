import React, { memo, useMemo } from "react";
import { BookingProgressIndicatorBaner } from "./BookingProgressIndicatorBaner";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  BookingProgressType,
  BookingStepType,
  RoomCategoryPriceType,
} from "../BookingPage";
import { useAppSelector } from "../../../hooks/redux";
import {
  deluxeKingRooms,
  deluxeTwinRooms,
  suiteRooms,
} from "../../../assets/images";
import { theme } from "../../../theme";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ShowerIcon } from "../../../assets/icons/ShowerIcon";
import { TwoPersonsBedIcon } from "../../../assets/icons/TwoPersonsBedIcon";
import { BalconyIcon } from "../../../assets/icons/BalconyIcon";
import { WifiIcon } from "../../../assets/icons/WifiIcon";
import { SafeIcon } from "../../../assets/icons/SafeIcon";
import { CustomSimpleImageSlider } from "../../components/shared/CustomSimpleSlider.ts/CustomSimpleImageSlider";
import { CustomCircleIconButton } from "../../components/shared/CustomCircleIconButton";
import { CustomIconLabel } from "../../components/shared/CustomIconLabel";
import { OneQuestIcon } from "../../../assets/icons/OneQuestIcon";
import { RoomSizeIcon } from "../../../assets/icons/RoomSizeIcon";
import { RoomsCountIcon } from "../../../assets/icons/RoomsCountIcon";
import { CustomButton } from "../../components/shared/CustomButton";
import { RoomCategoryType } from "../../../redux/slices/RoomsCategories/types";

interface Props {
  bookingProgress: BookingProgressType;
  prevStepHandler: () => void;
  nextStepHandler: () => void;
  stepsTotal: number;
  currentStepIdx: number;
  availableRoomCategories: RoomCategoryPriceType[] | null;
  roomQuestsCount: number;
  updateNewBookingDraft: ({
    tempBookingId,
    currentStep,
    roomCategory,
  }: {
    tempBookingId: string;
    currentStep: BookingStepType;
    roomCategory: RoomCategoryType;
  }) => void;
}

export const SelectRoomSection = memo((props: Props) => {
  const {
    bookingProgress,
    prevStepHandler,
    nextStepHandler,
    stepsTotal,
    currentStepIdx,
    availableRoomCategories,
    roomQuestsCount,
    updateNewBookingDraft,
  } = props;
  const { roomsCategories } = useAppSelector((state) => state.roomsCategories);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "24px",
        margin: "24px 0",
      }}
    >
      <BookingProgressIndicatorBaner
        currentStepLabel={bookingProgress.currentStep.label}
        prevStepLabel={bookingProgress.prevStep.label}
        prevStepHandler={prevStepHandler}
        nextStepLabel={bookingProgress.nextStep.label}
        nextStepHandler={nextStepHandler}
        currentStepIdx={currentStepIdx}
        stepsTotal={stepsTotal}
      />

      <Grid container spacing={2}>
        {availableRoomCategories &&
          roomsCategories &&
          roomsCategories.map((roomCategory, index) => {
            const isRoomExist = availableRoomCategories.findIndex(
              (i) => i.id === roomCategory._id
            );
            const roomPhotos =
              roomCategory._id === "672cd21f0ae43935e03a79dd" ||
              roomCategory._id === "672cd2a790ef8a2d0cdfcac3"
                ? deluxeKingRooms
                : roomCategory._id === "672cd30090ef8a2d0cdfcac6" ||
                  roomCategory._id === "672cd34e90ef8a2d0cdfcac9"
                ? deluxeTwinRooms
                : roomCategory._id === "672cd65af65cf0e5caff9686"
                ? suiteRooms
                : [];

            return (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                <Stack
                  sx={{
                    overflow: "hidden",
                    flexDirection: "column",
                    alignItems: "stretch",
                    flex: 1,
                    borderRadius: "20px",
                    border: `1px solid ${theme.palette.primary.light}`,
                    "&:hover": {
                      border: `1px solid ${theme.palette.primary.dark}`,
                    },
                  }}
                >
                  <Stack sx={{ height: "350px", position: "relative" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        height: "40px",
                        gap: "10px",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "rgba(217,217,217, 0.7)",
                        borderRadius: "10px",
                        padding: "10px",
                        zIndex: 1,
                      }}
                    >
                      <ShowerIcon sx={{ fontSize: "24px" }} />
                      <TwoPersonsBedIcon sx={{ fontSize: "24px" }} />
                      <BalconyIcon sx={{ fontSize: "24px" }} />
                      <WifiIcon sx={{ fontSize: "24px" }} />
                      <SafeIcon sx={{ fontSize: "24px" }} />
                    </Box>

                    <CustomSimpleImageSlider images={roomPhotos} />
                  </Stack>

                  <Stack sx={{ flex: 1, padding: "24px", gap: "24px" }}>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "24px",
                      }}
                    >
                      <Typography variant="h5">{roomCategory.title}</Typography>

                      <CustomCircleIconButton
                        icon={<KeyboardArrowDownIcon />}
                        onClick={() => null}
                      />
                    </Stack>

                    <Stack
                      sx={{
                        flexDirection: "row",
                        gap: "24px",
                        flexWrap: "wrap",
                      }}
                    >
                      <CustomIconLabel
                        icon={<OneQuestIcon sx={{ fontSize: "16px" }} />}
                        labelComponent={
                          <Typography variant="label">до 2 мест</Typography>
                        }
                      />
                      <CustomIconLabel
                        icon={<RoomSizeIcon sx={{ fontSize: "16px" }} />}
                        labelComponent={
                          <Typography variant="label">20 м²</Typography>
                        }
                      />
                      <CustomIconLabel
                        icon={<RoomsCountIcon sx={{ fontSize: "16px" }} />}
                        labelComponent={
                          <Typography variant="label">16 комнат</Typography>
                        }
                      />
                    </Stack>

                    <Stack
                      sx={{
                        flexDirection: isRoomExist ? "row" : "column",
                        alignItems: isRoomExist ? "flex-end" : "stretch",
                        justifyContent: isRoomExist
                          ? "space-between"
                          : "center",
                        gap: "24px",
                      }}
                    >
                      {isRoomExist ? (
                        <Stack
                          sx={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "0px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: theme.palette.secondary.main,
                              }}
                            >
                              <Typography variant="body">-15%</Typography>
                            </Box>

                            <Typography
                              variant="body"
                              sx={{
                                color: theme.palette.gray.light,
                                textDecoration: "line-through",
                              }}
                            >
                              -6600 ₽
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <Typography
                              variant="body"
                              sx={{ color: theme.palette.gray.light }}
                            >
                              от
                            </Typography>

                            <Typography
                              variant="body"
                              sx={{
                                color: theme.palette.primary.dark,
                                fontSize: "20.8px",
                              }}
                            >
                              {roomQuestsCount > 1
                                ? roomCategory.price_per_night_for_two_quest
                                : roomCategory.price_per_night_for_one_quest}
                              ₽
                            </Typography>
                          </Box>
                          <Typography variant="body">
                            1 ночь / {roomQuestsCount} гост
                            {roomQuestsCount > 1 ? "я" : "ь"}
                          </Typography>
                        </Stack>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <Typography
                            variant="label"
                            sx={{
                              fontWeight: "400",
                              color: theme.palette.primary.dark,
                            }}
                          >
                            Ближайшая дата (2 дня подряд)
                          </Typography>
                          <Typography
                            variant="label"
                            sx={{
                              fontWeight: "600",
                              color: theme.palette.primary.dark,
                            }}
                          >
                            14 октября - 16 октября
                          </Typography>
                        </Box>
                      )}

                      {/* Проверка нет ли уже забронированого номера на выбранную дату "заезда" и "выезда" */}
                      {isRoomExist ? (
                        <CustomButton
                          label={"Выбрать"}
                          onClick={() => {
                            const currentStep =
                              bookingProgress.currentStep.step;
                            if (currentStep) {
                              updateNewBookingDraft({
                                currentStep,
                                roomCategory,
                                tempBookingId: currentStep.roomId,
                              });
                            }
                          }}
                          containerVariant="contained"
                          containerBackgroundColor="buttonDark"
                          withoutAnimation
                        />
                      ) : (
                        <CustomButton
                          label={"Доступные даты для заезда"}
                          onClick={() => null}
                          containerVariant="outlined"
                          containerBackgroundColor="buttonLight"
                          withoutAnimation
                        />
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
});
