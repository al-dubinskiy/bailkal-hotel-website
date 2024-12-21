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
  const bookingUserInfo = newBookings.bookings[0].user; // берем любой букинг, так как "данные гостей" у них одинаковые

  const [bookingForWhom, setBookingForWhom] = useState<ToogleButtonModeType[]>([
    {
      id: "1",
      label: "Для себя",
      value: "for_yourself",
      isSelected: true,
    },
    {
      id: "2",
      label: "Для другого",
      value: "for_another",
      isSelected: false,
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
      sendConfirmOnPhone: bookingUserInfo.sendConfirmOnPhone,
      wantToKnowAboutSpecialOffersAndNews:
        bookingUserInfo.wantToKnowAboutSpecialOffersAndNews,
      arrivalTime: getPrevArrivalTime(),
      departureTime: getPrevDepartureTime(),
      bedTypeSpecialWish: bedSpecialWish[0],
      viewFromWindowSpecialWish: viewsFromWindowSpecialWish[0],
      comment: bookingInfo.comment,
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
    };
  }, [formik.values]);

  const prevValues = useMemo((): BookingGuestsDetailsPrimitiveType => {
    const b = bookingUserInfo;
    const c = bookingInfo;

    return {
      name: b.name,
      lastname: b.lastname,
      surname: b.surname,
      phone: b.phone,
      email: b.email,
      nationality: b.nationality,
      sendConfirmOnPhone: b.sendConfirmOnPhone,
      wantToKnowAboutSpecialOffersAndNews:
        b.wantToKnowAboutSpecialOffersAndNews,
      arrivalTime: moment(c.arrival_datetime, dateTimeFormat).format("HH:mm"),
      departureTime: moment(c.departure_datetime, dateTimeFormat).format(
        "HH:mm"
      ),
      bedTypeId: c.bed_type_id ? c.bed_type_id : "", // выбор "типа кровати" на этом шаге доступен только для одиночного бронирования
      viewFromWindowId: c.view_from_window_id ? c.view_from_window_id : "", // выбор "вид из окна" на этом шаге доступен только для одиночного бронирования
      comment: c.comment,
    };
  }, [bookingInfo, bookingUserInfo]);

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
      if (!isEqual(formValues, prevValues)) {
        const { step: currentStep } = bookingProgressCurrentStep;
        if (currentStep) {
          updateBookingDraft({
            currentStep,
            guestsDetails: formValues,
          });
        }
      }
      setIsUpdateBookingsUserInfo(false);
    }
  }, [isUpdateBookingsUserInfo]);

  useEffect(() => {
    // Если все поля заполнены
    const { name, lastname, surname, email, phone, nationality } = formValues;

    if (
      Object.values({
        name,
        lastname,
        surname,
        email,
        phone,
        nationality,
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
        setMode={setBookingForWhom}
        isCanUnchecked={false}
        helperText={
          "Укажите данные основного гостя. Остальных гостей — при заселении"
        }
      />

      <AuthMethodButtons />

      <UserDataForm
        formik={formik}
        isUpdateBookingsUserInfo={isUpdateBookingsUserInfo}
        setIsUpdateBookingsUserInfo={setIsUpdateBookingsUserInfo}
        isEnableContinueButton={isEnableContinueButton}
        setIsEnableContinueButton={setIsEnableContinueButton}
      />

      <Typography variant="label" sx={{ fontWeight: 600, alignSelf: "center" }}>
        Дополнительная информация
      </Typography>

      <AdditionalInfoForm
        formik={formik}
        bedSpecialWish={bedSpecialWish}
        viewsFromWindowSpecialWish={viewsFromWindowSpecialWish}
        isUpdateBookingsUserInfo={isUpdateBookingsUserInfo}
        setIsUpdateBookingsUserInfo={setIsUpdateBookingsUserInfo}
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

        <PaymentMethods />
      </Stack>
    </Stack>
  );
};
