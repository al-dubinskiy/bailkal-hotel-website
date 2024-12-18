import { FormGroup, Stack } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import { CustomInput } from "../../../../components/shared/FormElements/CustomInput";
import {
  CustomSelect,
  SelectItemType,
} from "../../../../components/shared/FormElements/CustomSelect";
import { countries, times } from "./constants";
import { CustomLabelCheckbox } from "../../../../components/shared/FormElements/CustomLabelCheckbox";
import { CourtyardViewIcon } from "../../../../../assets/icons/CourtyardViewIcon";
import { ForestViewIcon } from "../../../../../assets/icons/ForestViewIcon";
import {
  LandscapeOutlined,
  WaterOutlined,
  WavesOutlined,
} from "@mui/icons-material";
import { theme } from "../../../../../theme";
import { useAppSelector } from "../../../../../hooks/redux";
import { TwoPersonsBedIcon } from "../../../../../assets/icons/TwoPersonsBedIcon";

const validationSchema = yup.object({
  arrivalTime: yup
    .object({
      id: yup.number(),
      label: yup.string(),
      value: yup.string(),
    })
    .required("Поле обязательно для заполнения"),
  departureTime: yup
    .object({
      id: yup.number(),
      label: yup.string(),
      value: yup.string(),
    })
    .required("Поле обязательно для заполнения"),
  bedTypeSpecialWish: yup
    .object({
      id: yup.number(),
      label: yup.string(),
      value: yup.string(),
      icon: yup.mixed(),
    })
    .required("Поле обязательно для заполнения"),
  viewFromWindowSpecialWish: yup
    .object({
      id: yup.number(),
      label: yup.string(),
      value: yup.string(),
      icon: yup.mixed(),
    })
    .required("Поле обязательно для заполнения"),
  comment: yup.string(),
});

const defaultSelectItem: SelectItemType = {
  id: 0,
  label: "Не важно",
  value: "not-important",
  icon: null,
};

interface Props {}

export const AdditionalInfoForm = (props: Props) => {
  const {} = props;

  const { currentRoomCategory: roomCategory } = useAppSelector(
    (state) => state.bookings
  );
  const { roomBedVariants } = useAppSelector((state) => state.roomBedVariants);
  const { viewsFromRoomWindow } = useAppSelector(
    (state) => state.viewsFromRoomWindow
  );
  const [bedSpecialWish, setBedSpecialWish] = useState<SelectItemType[]>([
    defaultSelectItem,
  ]);
  const [viewsFromWindowSpecialWish, setViewsFromWindowSpecialWish] = useState<
    SelectItemType[]
  >([defaultSelectItem]);

  useEffect(() => {
    if (roomCategory && roomBedVariants) {
      const a = roomBedVariants.filter((i) =>
        roomCategory.available_bed_variant_id.includes(i._id)
      );
      setBedSpecialWish((prev) => [
        defaultSelectItem,
        ...a.map((i, idx) => {
          return {
            id: idx,
            label: i.title,
            value: i._id,
            icon: <TwoPersonsBedIcon sx={{ fontSize: "16px" }} />,
          };
        }),
      ]);
    }
  }, []);

  useEffect(() => {
    if (roomCategory && viewsFromRoomWindow) {
      const a = viewsFromRoomWindow.filter((i) =>
        roomCategory.additional_view_from_room_window_id.includes(i._id)
      );
      setViewsFromWindowSpecialWish((prev) => [
        defaultSelectItem,
        ...a.map((i, idx) => {
          return {
            id: idx,
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
          };
        }),
      ]);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      arrivalTime: times[0],
      departureTime: times[8],
      bedTypeSpecialWish: bedSpecialWish[0],
      viewFromWindowSpecialWish: viewsFromWindowSpecialWish[0],
      comment: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <Stack sx={{ alignItems: "stretch", gap: "24px" }}>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <CustomSelect
              id="arrivalTime"
              name="arrivalTime"
              inputLabel="Время заезда"
              data={times}
              value={formik.values.arrivalTime}
              setValue={(val) => formik.setFieldValue("arrivalTime", val)}
              labelPosition={"left"}
              containerStyles={{ flex: 0.5 }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.arrivalTime && Boolean(formik.errors.arrivalTime)
              }
            />

            <CustomSelect
              id="departureTime"
              name="departureTime"
              inputLabel="Время выезда"
              data={times}
              value={formik.values.departureTime}
              setValue={(val) => formik.setFieldValue("departureTime", val)}
              labelPosition={"left"}
              containerStyles={{ flex: 0.5 }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.departureTime &&
                Boolean(formik.errors.departureTime)
              }
            />
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <CustomSelect
              id="bedTypeSpecialWish"
              name="bedTypeSpecialWish"
              inputLabel="Кровати"
              data={bedSpecialWish}
              value={formik.values.bedTypeSpecialWish}
              setValue={(val) =>
                formik.setFieldValue("bedTypeSpecialWish", val)
              }
              labelPosition={"left"}
              containerStyles={{ flex: 0.5 }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.bedTypeSpecialWish &&
                Boolean(formik.errors.bedTypeSpecialWish)
              }
            />

            <CustomSelect
              id="viewFromWindowSpecialWish"
              name="viewFromWindowSpecialWish"
              inputLabel="Вид из окна"
              data={viewsFromWindowSpecialWish}
              value={formik.values.viewFromWindowSpecialWish}
              setValue={(val) =>
                formik.setFieldValue("viewFromWindowSpecialWish", val)
              }
              labelPosition={"left"}
              containerStyles={{ flex: 0.5 }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.viewFromWindowSpecialWish &&
                Boolean(formik.errors.viewFromWindowSpecialWish)
              }
            />
          </Stack>

          <CustomInput
            id="comment"
            name="comment"
            label="Дополнительный комментарий (при желании)"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.comment && Boolean(formik.errors.comment)}
            helperText={formik.touched.comment && formik.errors.comment}
            multiline
            containerStyles={{ minHeight: "100px" }}
          />
        </Stack>
      </form>
    </div>
  );
};
