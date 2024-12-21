import { Box, Button, FormGroup, Stack } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isEqual } from "lodash";
import * as yup from "yup";
import { CustomInput } from "../../../../components/shared/FormElements/CustomInput";
import {
  CustomSelect,
  SelectItemType,
} from "../../../../components/shared/FormElements/CustomSelect";
import { countries } from "./constants";
import { CustomLabelCheckbox } from "../../../../components/shared/FormElements/CustomLabelCheckbox";
import { EmailIcon } from "../../../../../assets/icons/EmailIcon";
import { theme } from "../../../../../theme";
import { Phone, PhoneOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { BookingContext } from "../../../BookingPage";
import {
  BookingGuestsDetailsType,
  BookingUserInfoType,
} from "../../../../../redux/slices/Bookings/types";
import { bookingUserInfoDefault } from "../../../../../redux/slices/Bookings/default";

const validationSchema = yup.object({
  name: yup.string().required("Поле обязательно для заполнения"),
  lastname: yup.string().required("Поле обязательно для заполнения"),
  surname: yup.string().required("Поле обязательно для заполнения"),
  phone: yup
    .string()
    .matches(/^\+?[1-9][0-9]{7,14}$/, "Введите корректный номер телефона")
    .required("Поле обязательно для заполнения"),
  email: yup
    .string()
    .email("Введите корректную электронную почту")
    .required("Поле обязательно для заполнения"),
  nationality: yup
    .object({
      id: yup.number(),
      label: yup.string(),
      value: yup.string(),
    })
    .required("Поле обязательно для заполнения"),
  sendConfirmOnPhone: yup.boolean(),
  wantToKnowAboutSpecialOffersAndNews: yup.boolean(),
});

interface Props {
  formik: FormikProps<BookingGuestsDetailsType>;
  isUpdateBookingsUserInfo: boolean;
  setIsUpdateBookingsUserInfo: (val: boolean) => void;
  isEnableContinueButton: boolean;
  setIsEnableContinueButton: (val: boolean) => void;
}

export const UserDataForm = (props: Props) => {
  const {
    formik,
    isUpdateBookingsUserInfo,
    setIsUpdateBookingsUserInfo,
    isEnableContinueButton,
    setIsEnableContinueButton,
  } = props;
  const dispatch = useAppDispatch();
  const { newBookings } = useAppSelector((state) => state.bookings);
  // const bookingUserInfo = newBookings.bookings[0].user;
  const { updateBookingDraft, bookingProgressCurrentStep } =
    useContext(BookingContext);

  // const formik = useFormik({
  //   initialValues: {
  //     name: bookingUserInfo.name,
  //     lastname: bookingUserInfo.lastname,
  //     surname: bookingUserInfo.surname,
  //     phone: bookingUserInfo.phone,
  //     email: bookingUserInfo.email,
  //     nationality: bookingUserInfo.nationality
  //       ? countries.find((i) => i.value === bookingUserInfo.nationality) ||
  //         countries[0]
  //       : countries[0],
  //     sendConfirmOnPhone: bookingUserInfo.sendConfirmOnPhone,
  //     wantToKnowAboutSpecialOffersAndNews:
  //       bookingUserInfo.wantToKnowAboutSpecialOffersAndNews,
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  // const formValues = useMemo(() => {
  //   const a = formik.values;
  //   return {
  //     name: a.name,
  //     lastname: a.lastname,
  //     surname: a.surname,
  //     phone: a.phone,
  //     email: a.email,
  //     nationality: a.nationality ? a.nationality.value : "",
  //     sendConfirmOnPhone: a.sendConfirmOnPhone,
  //     wantToKnowAboutSpecialOffersAndNews:
  //       a.wantToKnowAboutSpecialOffersAndNews,
  //   };
  // }, [formik.values]);

  // const prevValues = useMemo(() => {
  //   const b = newBookings.bookings[0].user; // берем любой букинг, так как у всех их одинаковые данные клиента
  //   return {
  //     name: b.name,
  //     lastname: b.lastname,
  //     surname: b.surname,
  //     phone: b.phone,
  //     email: b.email,
  //     nationality: b.nationality,
  //     sendConfirmOnPhone: b.sendConfirmOnPhone,
  //     wantToKnowAboutSpecialOffersAndNews:
  //       b.wantToKnowAboutSpecialOffersAndNews,
  //   };
  // }, [newBookings.bookings]);

  // useEffect(() => {
  //   if (isUpdateBookingsUserInfo) {
  //     if (!isEqual(formValues, prevValues)) {
  //       const { step: currentStep } = bookingProgressCurrentStep;
  //       if (currentStep) {
  //         updateBookingDraft({
  //           currentStep,
  //           userInfo: formValues,
  //         });
  //       }
  //     }
  //     setIsUpdateBookingsUserInfo(false);
  //   }
  // }, [isUpdateBookingsUserInfo]);

  // useEffect(() => {
  //   // Если все поля заполнены
  //   if (
  //     Object.values({
  //       ...formValues,
  //       sendConfirmOnPhone: true,
  //       wantToKnowAboutSpecialOffersAndNews: true,
  //     }).every((item) => item)
  //   ) {
  //     if (!isEnableContinueButton) {
  //       setIsEnableContinueButton(true);
  //     }
  //   } else {
  //     if (isEnableContinueButton) {
  //       setIsEnableContinueButton(false);
  //     }
  //   }
  // }, [formValues]);

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
            <CustomInput
              id="name"
              name="name"
              label="Имя"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <CustomInput
              id="lastname"
              name="lastname"
              label="Фамилия"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
            />
          </Stack>

          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <CustomInput
              id="surname"
              name="surname"
              label="Отчество"
              value={formik.values.surname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
              helperText={formik.touched.surname && formik.errors.surname}
            />

            <CustomInput
              id="phone"
              name="phone"
              label="Номер телефона"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              startIcon={
                <PhoneOutlined
                  sx={{
                    "& path": {
                      fill: theme.palette.gray.dark,
                    },
                    fontSize: "24px",
                  }}
                />
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
            <CustomInput
              id="email"
              name="email"
              label="Электронная почта"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              containerStyles={{ flex: 0.5 }}
              startIcon={
                <EmailIcon
                  sx={{
                    "& path": {
                      fill: theme.palette.gray.dark,
                    },
                    fontSize: "24px",
                  }}
                />
              }
            />

            <CustomSelect
              id="nationality"
              name="nationality"
              inputLabel="Гражданство"
              data={countries}
              value={formik.values.nationality}
              setValue={(val) => formik.setFieldValue("nationality", val)}
              labelPosition={"left"}
              containerStyles={{ flex: 0.5 }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nationality && Boolean(formik.errors.nationality)
              }
              helperText={
                formik.touched.nationality?.value &&
                formik.errors.nationality?.value
              }
            />
          </Stack>

          <FormGroup sx={{ display: "flex", flexDirection: "column" }}>
            <CustomLabelCheckbox
              label="Пришлите мне подтверждение на телефон"
              checked={formik.values.sendConfirmOnPhone}
              handleChange={(val) =>
                formik.setFieldValue("sendConfirmOnPhone", val)
              }
              defaultChecked
            />
            <CustomLabelCheckbox
              label="Я хочу узнавать о специальных предложениях и новостях"
              checked={formik.values.wantToKnowAboutSpecialOffersAndNews}
              handleChange={(val) =>
                formik.setFieldValue("wantToKnowAboutSpecialOffersAndNews", val)
              }
              defaultChecked
            />
          </FormGroup>
        </Stack>
      </form>
    </div>
  );
};
