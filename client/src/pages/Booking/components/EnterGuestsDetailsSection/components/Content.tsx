import { Button, Stack, Typography } from "@mui/material";
import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import {
  ToogleButtonModeType,
  ToogleModeButton,
} from "../../../../components/shared/ToogleModeButton";
import { authMethods } from "../../../../../assets/images";
import { UserDataForm } from "./UserDataForm";
import { AuthMethodButtons } from "./AuthMethodButtons";
import { AdditionalInfoForm } from "./AdditionalInfoForm";
import { PaymentMethods } from "./PaymentMethods";
import { useAppSelector } from "../../../../../hooks/redux";
import { useFormik } from "formik";
import { countries, times } from "./constants";
import {
  BookingGuestsDetailsPrimitiveType,
  BookingGuestsDetailsType,
} from "../../../../../redux/slices/Bookings/types";
import {
  LandscapeOutlined,
  WaterOutlined,
  WavesOutlined,
} from "@mui/icons-material";
import { CourtyardViewIcon } from "../../../../../assets/icons/CourtyardViewIcon";
import { ForestViewIcon } from "../../../../../assets/icons/ForestViewIcon";
import { SelectItemType } from "../../../../components/shared/FormElements/CustomSelect";
import { TwoPersonsBedIcon } from "../../../../../assets/icons/TwoPersonsBedIcon";
import { theme } from "../../../../../theme";
import moment from "moment";
import * as yup from "yup";
import { dateTimeFormat } from "../../../../../constants";
import { isEqual } from "lodash";
import { BookingContext } from "../../../BookingPage";

interface Props {
  isUpdateBookingsUserInfo: boolean;
  setIsUpdateBookingsUserInfo: (val: boolean) => void;
  isEnableContinueButton: boolean;
  setIsEnableContinueButton: (val: boolean) => void;
}

const defaultSelectItem: SelectItemType = {
  id: "",
  label: "Не важно",
  value: "not-important",
  icon: null,
};
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

export const Content = (props: Props) => {
  const {
    isUpdateBookingsUserInfo,
    setIsUpdateBookingsUserInfo,
    isEnableContinueButton,
    setIsEnableContinueButton,
  } = props;
  const { roomBedVariants } = useAppSelector((state) => state.roomBedVariants);
  const { viewsFromRoomWindow } = useAppSelector(
    (state) => state.viewsFromRoomWindow
  );
  const { currentRoomCategory: roomCategory, newBookings } = useAppSelector(
    (state) => state.bookings
  );

  const { updateBookingDraft, bookingProgressCurrentStep } =
    useContext(BookingContext);

  const bookingInfo = newBookings.bookings[0]; // берем любой букинг, так как "даты заезда/выезда" у них одинаковые
  const bookingUserInfo = bookingInfo.user; // берем любой букинг, так как "данные гостей" у них одинаковые

  const [bookingForWhom, setBookingForWhom] = useState<ToogleButtonModeType[]>([
    {
      id: "1",
      label: "Для себя",
      value: "for_yourself",
      isSelected:
        bookingInfo.booking_for_whom === "for_yourself" ? true : false,
    },
    {
      id: "2",
      label: "Для другого",
      value: "for_another",
      isSelected: bookingInfo.booking_for_whom === "for_another" ? true : false,
    },
  ]);

  const [bedSpecialWish, setBedSpecialWish] = useState<SelectItemType[]>([
    defaultSelectItem,
  ]);

  const [viewsFromWindowSpecialWish, setViewsFromWindowSpecialWish] = useState<
    SelectItemType[]
  >([defaultSelectItem]);

  // Подготовка массива для выпадающего списка "кровать" (спец. предложения)
  useEffect(() => {
    if (roomCategory && roomBedVariants) {
      const a = roomBedVariants.filter((i) =>
        roomCategory.available_bed_variant_id.includes(i._id)
      );
      setBedSpecialWish((prev) => [
        defaultSelectItem,
        ...a.map((i, idx) => {
          return {
            id: i._id,
            label: i.title,
            value: i.title,
            icon: <TwoPersonsBedIcon sx={{ fontSize: "16px" }} />,
          };
        }),
      ]);
    }
  }, []);

  // Подготовка массива для выпадающего списка "вид из окна" (спец. предложения)
  useEffect(() => {
    if (roomCategory && viewsFromRoomWindow) {
      const a = viewsFromRoomWindow.filter((i) =>
        roomCategory.additional_view_from_room_window_id.includes(i._id)
      );
      setViewsFromWindowSpecialWish((prev) => [
        defaultSelectItem,
        ...a.map((i, idx) => {
          return {
            id: i._id,
            label: i.title,
            value: i.title,
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

  // Получить ранее установленное "время заезда"
  const getPrevArrivalTime = () => {
    const a = moment(bookingInfo.arrival_datetime, dateTimeFormat).format(
      "HH:mm"
    );
    return times.find((i) => i.value === a) || times[0];
  };

  // Получить ранее установленное "время выезда"
  const getPrevDepartureTime = () => {
    const a = moment(bookingInfo.departure_datetime, dateTimeFormat).format(
      "HH:mm"
    );
    return times.find((i) => i.value === a) || times[8];
  };

  const formik = useFormik<BookingGuestsDetailsType>({
    initialValues: {
      name: bookingUserInfo.name,
      lastname: bookingUserInfo.lastname,
      surname: bookingUserInfo.surname,
      phone: bookingUserInfo.phone,
      email: bookingUserInfo.email,
      nationality: bookingUserInfo.nationality
        ? countries.find((i) => i.value === bookingUserInfo.nationality) ||
          countries[0]
        : countries[0],
      sendConfirmOnPhone: bookingUserInfo.send_confirm_on_phone,
      wantToKnowAboutSpecialOffersAndNews:
        bookingUserInfo.want_to_know_about_special_offers_and_news,
      arrivalTime: getPrevArrivalTime(),
      departureTime: getPrevDepartureTime(),
      bedTypeSpecialWish: bedSpecialWish[0],
      viewFromWindowSpecialWish: viewsFromWindowSpecialWish[0],
      comment: bookingInfo.comment ? bookingInfo.comment : "",
      bookingForWhom: "for_yourself",
      paymentMethodId: bookingInfo.payment_method_id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const formValues = useMemo((): BookingGuestsDetailsPrimitiveType => {
    const a = formik.values;
    return {
      name: a.name,
      lastname: a.lastname,
      surname: a.surname,
      phone: a.phone,
      email: a.email,
      nationality: a.nationality ? a.nationality.value : "",
      sendConfirmOnPhone: a.sendConfirmOnPhone,
      wantToKnowAboutSpecialOffersAndNews:
        a.wantToKnowAboutSpecialOffersAndNews,
      arrivalTime: a.arrivalTime.value,
      departureTime: a.departureTime.value,
      bedTypeId: a.bedTypeSpecialWish.id.toString(),
      viewFromWindowId: a.viewFromWindowSpecialWish.id.toString(),
      comment: a.comment,
      bookingForWhom: a.bookingForWhom,
      paymentMethodId: a.paymentMethodId,
    };
  }, [formik.values]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      bedTypeSpecialWish:
        bedSpecialWish.find(
          (i) => i.id === newBookings.bookings[0].bed_type_id
        ) || bedSpecialWish[0],
      viewFromWindowSpecialWish:
        viewsFromWindowSpecialWish.find(
          (i) => i.id === newBookings.bookings[0].view_from_window_id
        ) || viewsFromWindowSpecialWish[0],
    });
  }, [bedSpecialWish.length, viewsFromWindowSpecialWish.length]);

  useEffect(() => {
    if (isUpdateBookingsUserInfo) {
      const { step: currentStep } = bookingProgressCurrentStep;
      if (currentStep) {
        updateBookingDraft({
          currentStep,
          guestsDetails: formValues,
        });
      }
      // }
      setIsUpdateBookingsUserInfo(false);
    }
  }, [isUpdateBookingsUserInfo]);

  useEffect(() => {
    const {
      name,
      lastname,
      surname,
      email,
      phone,
      nationality,
      paymentMethodId,
    } = formValues;

    // Если все поля заполнены
    if (
      Object.values({
        name,
        lastname,
        surname,
        email,
        phone,
        nationality,
        paymentMethodId,
      }).every((item) => item)
    ) {
      if (!isEnableContinueButton) {
        setIsEnableContinueButton(true);
      }
    } else {
      if (isEnableContinueButton) {
        setIsEnableContinueButton(false);
      }
    }
  }, [formValues]);

  return (
    <Stack sx={{ alignItems: "stretch", gap: "48px" }}>
      <Typography variant="label" sx={{ fontWeight: 600, alignSelf: "center" }}>
        Введите свои данные
      </Typography>

      <ToogleModeButton
        label="Я бронирую"
        modes={bookingForWhom}
        setMode={(val) => {
          const selected = val.find((i: ToogleButtonModeType) => i.isSelected);
          if (selected) {
            formik.setFieldValue("bookingForWhom", selected.value);
          }
          setBookingForWhom(val);
        }}
        isCanUnchecked={false}
        helperText={
          "Укажите данные основного гостя. Остальных гостей — при заселении"
        }
      />

      <AuthMethodButtons />

      <UserDataForm formik={formik} />

      <Typography variant="label" sx={{ fontWeight: 600, alignSelf: "center" }}>
        Дополнительная информация
      </Typography>

      <AdditionalInfoForm
        formik={formik}
        bedSpecialWish={bedSpecialWish}
        viewsFromWindowSpecialWish={viewsFromWindowSpecialWish}
      />

      <Stack sx={{ gap: "24px" }}>
        <Typography
          variant="label"
          sx={{ fontWeight: 600, alignSelf: "center" }}
        >
          Выберите способ оплаты
        </Typography>

        <Typography variant="label">
          Фактом бронирования вы соглашаетесь с правилами
          онлайн-бронирования, обработкой персональных данных и политикой
          конфиденциальности
        </Typography>

        <PaymentMethods formik={formik} />
      </Stack>
    </Stack>
  );
};
