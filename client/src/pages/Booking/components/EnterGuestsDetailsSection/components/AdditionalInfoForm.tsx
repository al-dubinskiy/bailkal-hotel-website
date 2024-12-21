import { FormGroup, Stack } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import React, { useContext, useEffect, useMemo, useState } from "react";
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
import { dateTimeFormat } from "../../../../../constants";
import moment from "moment";
import { isEqual } from "lodash";
import { BookingContext } from "../../../BookingPage";
import { BookingGuestsDetailsType } from "../../../../../redux/slices/Bookings/types";

// const validationSchema = yup.object({
//   arrivalTime: yup
//     .object({
//       id: yup.number(),
//       label: yup.string(),
//       value: yup.string(),
//     })
//     .required("Поле обязательно для заполнения"),
//   departureTime: yup
//     .object({
//       id: yup.number(),
//       label: yup.string(),
//       value: yup.string(),
//     })
//     .required("Поле обязательно для заполнения"),
//   bedTypeSpecialWish: yup
//     .object({
//       id: yup.number(),
//       label: yup.string(),
//       value: yup.string(),
//       icon: yup.mixed(),
//     })
//     .required("Поле обязательно для заполнения"),
//   viewFromWindowSpecialWish: yup
//     .object({
//       id: yup.number(),
//       label: yup.string(),
//       value: yup.string(),
//       icon: yup.mixed(),
//     })
//     .required("Поле обязательно для заполнения"),
//   comment: yup.string(),
// });

interface Props {
  formik: FormikProps<BookingGuestsDetailsType>;
  bedSpecialWish: SelectItemType[];
  viewsFromWindowSpecialWish: SelectItemType[];
  isUpdateBookingsUserInfo: boolean;
  setIsUpdateBookingsUserInfo: (val: boolean) => void;
}

export const AdditionalInfoForm = (props: Props) => {
  const {
    formik,
    bedSpecialWish,
    viewsFromWindowSpecialWish,
    isUpdateBookingsUserInfo,
    setIsUpdateBookingsUserInfo,
  } = props;

  const {
    currentRoomCategory: roomCategory,
    // currentBooking,
    newBookings,
  } = useAppSelector((state) => state.bookings);
  // const { roomBedVariants } = useAppSelector((state) => state.roomBedVariants);
  // const { viewsFromRoomWindow } = useAppSelector(
  //   (state) => state.viewsFromRoomWindow
  // );
  // const { updateBookingDraft, bookingProgressCurrentStep } =
  //   useContext(BookingContext);

  // const [bedSpecialWish, setBedSpecialWish] = useState<SelectItemType[]>([
  //   defaultSelectItem,
  // ]);

  // const [viewsFromWindowSpecialWish, setViewsFromWindowSpecialWish] = useState<
  //   SelectItemType[]
  // >([defaultSelectItem]);

  // // Подготовка массива для списка "кровать" (спец. предложения)
  // useEffect(() => {
  //   if (roomCategory && roomBedVariants) {
  //     const a = roomBedVariants.filter((i) =>
  //       roomCategory.available_bed_variant_id.includes(i._id)
  //     );
  //     setBedSpecialWish((prev) => [
  //       defaultSelectItem,
  //       ...a.map((i, idx) => {
  //         return {
  //           id: i._id,
  //           label: i.title,
  //           value: i.title,
  //           icon: <TwoPersonsBedIcon sx={{ fontSize: "16px" }} />,
  //         };
  //       }),
  //     ]);
  //   }
  // }, []);

  // // Подготовка массива для списка "вид из окна" (спец. предложения)
  // useEffect(() => {
  //   if (roomCategory && viewsFromRoomWindow) {
  //     const a = viewsFromRoomWindow.filter((i) =>
  //       roomCategory.additional_view_from_room_window_id.includes(i._id)
  //     );
  //     setViewsFromWindowSpecialWish((prev) => [
  //       defaultSelectItem,
  //       ...a.map((i, idx) => {
  //         return {
  //           id: i._id,
  //           label: i.title,
  //           value: i.title,
  //           icon:
  //             i.value === "courtyard" ? (
  //               <CourtyardViewIcon sx={{ fontSize: "16px" }} />
  //             ) : i.value === "forest" ? (
  //               <ForestViewIcon sx={{ fontSize: "16px" }} />
  //             ) : i.value === "mountains" ? (
  //               <LandscapeOutlined
  //                 sx={{ color: theme.palette.primary.dark, fontSize: "16px" }}
  //               />
  //             ) : i.value === "lake" ? (
  //               <WavesOutlined
  //                 sx={{ color: theme.palette.primary.dark, fontSize: "16px" }}
  //               />
  //             ) : i.value === "river" ? (
  //               <WaterOutlined
  //                 sx={{ color: theme.palette.primary.dark, fontSize: "16px" }}
  //               />
  //             ) : (
  //               <div></div>
  //             ),
  //         };
  //       }),
  //     ]);
  //   }
  // }, []);

  // const getPrevArrivalTime = () => {
  //   if (currentBooking) {
  //     const a = moment(currentBooking.arrival_datetime, dateTimeFormat).format(
  //       "HH:mm"
  //     );
  //     return times.find((i) => i.value === a) || times[0];
  //   }
  //   return times[0];
  // };

  // const getPrevDepartureTime = () => {
  //   if (currentBooking) {
  //     const a = moment(
  //       currentBooking.departure_datetime,
  //       dateTimeFormat
  //     ).format("HH:mm");
  //     return times.find((i) => i.value === a) || times[8];
  //   }
  //   return times[8];
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     arrivalTime: getPrevArrivalTime(),
  //     departureTime: getPrevDepartureTime(),
  //     bedTypeSpecialWish: bedSpecialWish[0],
  //     viewFromWindowSpecialWish: viewsFromWindowSpecialWish[0],
  //     comment: "",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  // useEffect(() => {
  //   formik.setValues({
  //     ...formik.values,
  //     bedTypeSpecialWish:
  //       bedSpecialWish.find(
  //         (i) => i.id === newBookings.bookings[0].bed_type_id
  //       ) || bedSpecialWish[0],
  //     viewFromWindowSpecialWish:
  //       viewsFromWindowSpecialWish.find(
  //         (i) => i.id === newBookings.bookings[0].view_from_window_id
  //       ) || viewsFromWindowSpecialWish[0],
  //   });
  // }, [bedSpecialWish.length, viewsFromWindowSpecialWish.length]);

  // const formValues = useMemo(() => {
  //   const a = formik.values;
  //   return {
  //     arrivalTime: a.arrivalTime.value,
  //     departureTime: a.departureTime.value,
  //     bedTypeId: a.bedTypeSpecialWish.id,
  //     viewFromWindowId: a.viewFromWindowSpecialWish.id,
  //   };
  // }, [formik.values]);

  // const prevValues = useMemo(() => {
  //   const b = newBookings.bookings[0]; // берем любой букинг, так как у всех их одинаковая 'дата бронирования'
  //   return {
  //     arrivalTime: moment(b.arrival_datetime, dateTimeFormat).format("HH:mm"),
  //     departureTime: moment(b.departure_datetime, dateTimeFormat).format(
  //       "HH:mm"
  //     ),
  //     bedTypeId: b.bed_type_id, // выбор "типа кровати" на этом шаге доступен только для одиночного бронирования
  //     viewFromWindowId: b.view_from_window_id, // выбор "вид из окна" на этом шаге доступен только для одиночного бронирования
  //   };
  // }, [newBookings.bookings]);

  // useEffect(() => {
  //   console.log(1);
  //   if (isUpdateBookingsUserInfo) {
  //     console.log(2);

  //     if (!isEqual(formValues, prevValues)) {
  //       console.log(3);

  //       const { step: currentStep } = bookingProgressCurrentStep;
  //       if (currentStep) {
  //         updateBookingDraft({
  //           currentStep,
  //           arrivalTime: formValues.arrivalTime,
  //           departureTime: formValues.departureTime,
  //           bedTypeId: formValues.bedTypeId.toString(),
  //           viewFromWindowId: formValues.viewFromWindowId.toString(),
  //         });
  //       }
  //     }
  //     setIsUpdateBookingsUserInfo(false);
  //   }
  // }, [isUpdateBookingsUserInfo]);

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
