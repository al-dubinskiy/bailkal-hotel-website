import { Button, Stack, Typography } from "@mui/material";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ToogleButtonModeType,
  ToogleModeButton,
} from "../../../../components/shared/ToogleModeButton";
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
import moment from "moment";
import * as yup from "yup";
import { dateTimeFormat } from "../../../../../constants";
import { BookingContext } from "../../../BookingPage";
import { Transfer } from "../../OrderServicesSection/components/Transfer/Transfer";

interface Props {
  isUpdateBookingsUserInfo: boolean;
  setIsUpdateBookingsUserInfo: (val: boolean) => void;
  isEnableContinueButton: boolean;
  setIsEnableContinueButton: (val: boolean) => void;
}

const validationSchema = yup.object({
  name: yup.string().required("Поле обязательно для заполнения"),
  lastname: yup.string().required("Поле обязательно для заполнения"),
  surname: yup.string().required("Поле обязательно для заполнения"),
  phone: yup
    .string()
    .matches(/^\+?[1-9][0-9]{7,14}$/, "Введите корректный номер телефона"),
  email: yup.string().email().required("Поле обязательно для заполнения"),
});

export const Content = (props: Props) => {
  const {
    isUpdateBookingsUserInfo,
    setIsUpdateBookingsUserInfo,
    isEnableContinueButton,
    setIsEnableContinueButton,
  } = props;
  const { newBookings } = useAppSelector((state) => state.bookings);

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
      comment: a.comment,
      bookingForWhom: a.bookingForWhom,
      paymentMethodId: a.paymentMethodId,
    };
  }, [formik.values]);

  useEffect(() => {
    if (isUpdateBookingsUserInfo) {
      const { step: currentStep } = bookingProgressCurrentStep;
      if (currentStep) {
        updateBookingDraft({
          currentStep,
          guestsDetails: formValues,
          isSetCompleteStep: true,
        });
      }
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

  // Вкл/выкл кнопку для сохранения личных данных гостя
  const isEnableSaveUserDataButton = useMemo(() => {
    const {
      name: curName,
      lastname: curLastname,
      surname: curSurname,
      email: curEmail,
      phone: curPhone,
      nationality: curNationality,
      sendConfirmOnPhone: curSendConfirmOnPhone,
      wantToKnowAboutSpecialOffersAndNews:
        curWantToKnowAboutSpecialOffersAndNews,
    } = formValues;

    const {
      name: prevName,
      lastname: prevLastname,
      surname: prevSurname,
      email: prevEmail,
      phone: prevPhone,
      nationality: prevNationality,
      send_confirm_on_phone: prevSendConfirmOnPhone,
      want_to_know_about_special_offers_and_news:
        prevWantToKnowAboutSpecialOffersAndNews,
    } = bookingUserInfo;

    if (
      curName !== prevName ||
      curLastname !== prevLastname ||
      curSurname !== prevSurname ||
      curEmail !== prevEmail ||
      curPhone !== prevPhone ||
      curNationality !== prevNationality ||
      curSendConfirmOnPhone !== prevSendConfirmOnPhone ||
      curWantToKnowAboutSpecialOffersAndNews !==
        prevWantToKnowAboutSpecialOffersAndNews
    ) {
      return true;
    }

    return false;
  }, [formValues, bookingUserInfo]);

  // Вкл/выкл кнопку для сохранения дополнительных данных
  const isEnableSaveAdditionalInfoButton = useMemo(() => {
    const {
      arrivalTime: curArrivalTime,
      departureTime: curDepartureTime,
      comment: curComment,
    } = formValues;

    const prevArrivalTime = getPrevArrivalTime().value;
    const prevDepartureTime = getPrevDepartureTime().value;
    const { comment: prevComment } = bookingInfo;

    if (
      curArrivalTime !== prevArrivalTime ||
      curDepartureTime !== prevDepartureTime ||
      curComment !== prevComment
    ) {
      return true;
    }

    return false;
  }, [formValues, bookingUserInfo]);

  const updatePaymentMethod = useCallback(
    (paymentMethodId: string) => {
      const a = formik.values;
      const formikValues = {
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
        comment: a.comment,
        bookingForWhom: a.bookingForWhom,
        paymentMethodId: a.paymentMethodId,
      };

      const { step: currentStep } = bookingProgressCurrentStep;
      if (currentStep) {
        updateBookingDraft({
          currentStep,
          guestsDetails: { ...formikValues, paymentMethodId },
          isSetCompleteStep: false,
        });
      }
    },
    [formik.values, updateBookingDraft]
  );

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

      <UserDataForm
        formik={formik}
        updateUserData={() => {
          const { step: currentStep } = bookingProgressCurrentStep;
          if (currentStep) {
            updateBookingDraft({
              currentStep,
              guestsDetails: formValues,
              isSetCompleteStep: false,
            });
          }
        }}
        isEnableSaveButton={isEnableSaveUserDataButton}
      />

      <Typography variant="label" sx={{ fontWeight: 600, alignSelf: "center" }}>
        Дополнительная информация
      </Typography>

      <AdditionalInfoForm
        formik={formik}
        updateAdditionalInfoData={() => {
          const { step: currentStep } = bookingProgressCurrentStep;
          if (currentStep) {
            updateBookingDraft({
              currentStep,
              guestsDetails: formValues,
              isSetCompleteStep: false,
            });
          }
        }}
        isEnableSaveButton={isEnableSaveAdditionalInfoButton}
      />

      <Transfer />

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

        <PaymentMethods
          formik={formik}
          updatePaymentMethod={updatePaymentMethod}
        />
      </Stack>
    </Stack>
  );
};
