import { Box, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Grid, { GridBaseProps, GridSize } from "@mui/material/Grid2";
import Add from "@mui/icons-material/Add";
import React, {
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CustomSimpleImageSlider } from "../../../../../components/shared/CustomSimpleSlider.ts/CustomSimpleImageSlider";
import { RoomCategoryType } from "../../../../../../redux/slices/RoomsCategories/types";
import {
  deluxeKingRooms,
  deluxeTwinRooms,
  suiteRooms,
} from "../../../../../../assets/images";
import { theme } from "../../../../../../theme";
import { CustomCircleIconButton } from "../../../../../components/shared/CustomCircleIconButton";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import { CustomIconLabel } from "../../../../../components/shared/CustomIconLabel";
import { GetRoomFeatures } from "../../../../../../redux/slices/RoomFeatures/roomFeaturesSlice";
import { OneQuestIcon } from "../../../../../../assets/icons/OneQuestIcon";
import { RoomSizeIcon } from "../../../../../../assets/icons/RoomSizeIcon";
import { RoomsCountIcon } from "../../../../../../assets/icons/RoomsCountIcon";
import { CustomButton } from "../../../../../components/shared/CustomButton";
import { ShowerIcon } from "../../../../../../assets/icons/ShowerIcon";
import { SafeIcon } from "../../../../../../assets/icons/SafeIcon";
import { BalconyIcon } from "../../../../../../assets/icons/BalconyIcon";
import { TwoPersonsBedIcon } from "../../../../../../assets/icons/TwoPersonsBedIcon";
import { WifiIcon } from "../../../../../../assets/icons/WifiIcon";
import { SpecialWishesSelector } from "./components/SpecialWishesSelector";
import { CustomMultiImagePreviewSlider } from "../../../../../components/shared/CustomMultiImagePreviewSlider/CustomMultiImagePreviewSlider";
import { FeatureDetails } from "./components/FeatureDetails";
import { BookingContext } from "../../../../BookingPage";
import { shallowEqual } from "react-redux";

export const RoomMainFeatureGridItem = ({
  icon,
  label,
  value,
  size,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  size?: GridBaseProps["size"];
}) => {
  return (
    <Grid size={size ? size : { xs: 12, md: 6, lg: 4 }}>
      <CustomIconLabel
        icon={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "52px",
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              border: `1px solid ${theme.palette.primary.dark}`,
            }}
          >
            {icon}
          </Box>
        }
        labelComponent={
          <Stack sx={{ flexDirection: "column" }}>
            <Typography variant="label" sx={{ fontWeight: 600 }}>
              {label}
            </Typography>
            <Typography variant="label">{value}</Typography>
          </Stack>
        }
        sx={{ gap: "15px" }}
      />
    </Grid>
  );
};

export const getFeatureIcon = (title: string): ReactNode => {
  return title === "Душ" ? (
    <ShowerIcon sx={{ fontSize: "16px" }} />
  ) : title === "Сейф" ? (
    <SafeIcon sx={{ fontSize: "16px" }} />
  ) : title === "Балкон" ? (
    <BalconyIcon sx={{ fontSize: "16px" }} />
  ) : title === "Wi-Fi" ? (
    <WifiIcon sx={{ fontSize: "16px" }} />
  ) : title === "Кровать" ? (
    <TwoPersonsBedIcon sx={{ fontSize: "16px" }} />
  ) : (
    <div></div>
  );
};

interface Props {}

export const RoomCategoryCard = memo(
  (props: Props) => {
    const {} = props;
    const dispatch = useAppDispatch();

    const { roomFeatures } = useAppSelector((state) => state.roomFeatures);
    const { currentRoomCategory: roomCategory } = useAppSelector(
      (state) => state.bookings
    );

    const [roomDetailsOpen, setRoomDetailsOpen] = useState<boolean>(false);

    // Get data from API
    const GetRoomsFeaturesList = useCallback(() => {
      if (!roomFeatures) {
        dispatch(GetRoomFeatures());
      }
    }, [roomFeatures]);

    useEffect(() => {
      GetRoomsFeaturesList();
    }, [GetRoomsFeaturesList]);

    if (!roomCategory) return null;

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

    const Title = () => {
      return <Typography variant="h5">{roomCategory.title}</Typography>;
    };

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
        <CustomCircleIconButton
          icon={<KeyboardArrowDownIcon />}
          onClick={() => setRoomDetailsOpen((prev) => !prev)}
          sx={{
            position: "absolute",
            top: "24px",
            right: "24px",
            transform: `rotate(${roomDetailsOpen ? 180 : 0}deg)`,
            zIndex: 1,
          }}
        />

        {!roomDetailsOpen ? (
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
              <Title />

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

                  <CustomButton
                    label={`еще ${roomFeatures.length - 3}`}
                    startIcon={
                      <Add
                        sx={{
                          fontSize: "24px",
                          color: theme.palette.primary.dark,
                        }}
                      />
                    }
                    onClick={() => null}
                    containerVariant="outlined"
                    withoutAnimation
                    containerStyle={{
                      border: `1px solid ${theme.palette.primary.dark}`,
                      marginTop: "24px",
                      alignSelf: "center",
                    }}
                  />
                </Box>
              ) : null}
            </Stack>
          </Stack>
        ) : (
          <Stack sx={{ alignItems: "stretch", padding: "24px" }}>
            <Title />
            <CustomMultiImagePreviewSlider images={roomPhotos} />
            <FeatureDetails features_id={roomCategory.feature_id} />
          </Stack>
        )}

        <SpecialWishesSelector />
      </Stack>
    );
  },
  (prevProps, nextProps) =>
    shallowEqual(prevProps, nextProps) ||
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
