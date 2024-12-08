import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useCallback, useEffect, useMemo } from "react";
import { theme } from "../../../../../../../theme";
import { GetRoomFeaturesCategories } from "../../../../../../../redux/slices/RoomFeaturesCategories/roomFeaturesSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../hooks/redux";
import { RoomFeatureType } from "../../../../../../../redux/slices/RoomFeatures/types";
import { CustomIconLabel } from "../../../../../../components/shared/CustomIconLabel";
import { OneQuestIcon } from "../../../../../../../assets/icons/OneQuestIcon";
import { GetRoomFeatures } from "../../../../../../../redux/slices/RoomFeatures/roomFeaturesSlice";

interface Props {
  features_id: string[];
}

export const FeatureDetails = (props: Props) => {
  const { features_id } = props;

  const dispatch = useAppDispatch();
  const { roomFeaturesCategories } = useAppSelector(
    (state) => state.roomFeaturesCategories
  );
  const { roomFeatures } = useAppSelector((state) => state.roomFeatures);

  const GetFeaturesCategoriesList = useCallback(() => {
    if (!roomFeaturesCategories) {
      dispatch(GetRoomFeaturesCategories());
    }
  }, [roomFeaturesCategories]);

  useEffect(() => {
    GetFeaturesCategoriesList();
  }, [GetFeaturesCategoriesList]);

  const GetFeaturesList = useCallback(() => {
    if (!roomFeatures) {
      dispatch(GetRoomFeatures());
    }
  }, [roomFeatures]);

  useEffect(() => {
    GetFeaturesList();
  }, [GetFeaturesList]);

  const roomFeaturesByCategories = useMemo(() => {
    if (!roomFeatures || !roomFeaturesCategories) return [];
    const a = roomFeatures.filter((i) => features_id.includes(i._id));
    const b = roomFeaturesCategories.map((featureCategory) => {
      return {
        title: featureCategory.title,
        items: a.filter(
          (feature) => feature.category_id === featureCategory._id
        ),
      };
    });
    return b.sort((k, l) => k.items.length - l.items.length);
  }, [roomFeatures, roomFeaturesCategories]);

  if (!roomFeaturesCategories || !roomFeatures) return null;

  console.log(roomFeaturesByCategories);
  return (
    <Stack
      sx={{
        background: theme.palette.primary.extraLight,
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      <Grid container spacing={2}>
        {roomFeaturesByCategories.map((featuresByCategory, idx_i) => {
          if (featuresByCategory.items.length) {
            return (
              <Grid key={idx_i} size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                <Typography variant="label" sx={{ fontWeight: "600" }}>
                  {featuresByCategory.title}
                </Typography>

                <Stack sx={{ gap: "5px", marginTop: "10px" }}>
                  {featuresByCategory.items.map((feature, idx_j) => {
                    return (
                      <CustomIconLabel
                        key={idx_j}
                        icon={<OneQuestIcon sx={{ fontSize: "16px" }} />}
                        labelComponent={
                          <Typography variant="label">
                            {feature.title}
                          </Typography>
                        }
                      />
                    );
                  })}
                </Stack>
              </Grid>
            );
          }
        })}
      </Grid>
    </Stack>
  );
};
