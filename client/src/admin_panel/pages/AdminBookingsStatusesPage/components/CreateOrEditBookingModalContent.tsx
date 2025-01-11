import { Button, FormGroup, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import { BookingType } from "../../../../redux/slices/Bookings/types";
import { CustomInput } from "../../../../pages/components/shared/FormElements/CustomInput";
import { DeleteOutline, PhoneOutlined } from "@mui/icons-material";
import { theme } from "../../../../theme";
import {
  CustomSelect,
  notSelectedValue,
  SelectItemType,
} from "../../../../pages/components/shared/FormElements/CustomSelect";
import { EmailIcon } from "../../../../assets/icons/EmailIcon";
import {
  countries,
  times,
} from "../../../../pages/Booking/components/EnterGuestsDetailsSection/components/constants";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { CustomCounterButton } from "../../../../pages/components/shared/CustomCounterButton";
import { dateTimeFormat } from "../../../../constants";
import moment from "moment";
import { CustomRangeDatepicker } from "../../../../pages/components/shared/RangeDatepicker/CustomRangeDatepicker";
import {
  getPrevArrivalTime,
  getPrevDepartureTime,
} from "../../../../pages/Booking/components/EnterGuestsDetailsSection/components/utils";
import {
  CreateBooking,
  UpdateBooking,
} from "../../../../redux/slices/Bookings/bookingsSlice";
import {
  ToogleButtonModeType,
  ToogleModeButton,
} from "../../../../pages/components/shared/ToogleModeButton";
import {
  checkIsRoomIdFree,
  getFreeRoomId,
} from "../../../../pages/Booking/utils";
import { CustomLabelCheckbox } from "../../../../pages/components/shared/FormElements/CustomLabelCheckbox";
import { getAllObjectValues } from "../../../../pages/utils";

const validationSchema = yup.object({
  room_category_id: yup.string().required("Выберите значение"),
  room_id: yup.string().required("Выберите значение"),
  tariff_id: yup.string().required("Выберите значение"),
  payment_method_id: yup.string().required("Выберите значение"),
  user: yup
    .object({
      name: yup.string().required("Поле обязательно для заполнения"),
      lastname: yup.string().required("Поле обязательно для заполнения"),
      surname: yup.string().required("Поле обязательно для заполнения"),
      phone: yup
        .string()
        .required("Поле обязательно для заполнения")
        .matches(/^\+?[1-9][0-9]{7,14}$/, "Введите корректный номер телефона"),
      email: yup.string().email().required("Поле обязательно для заполнения"),
      nationality: yup.string().required("Поле обязательно для заполнения"),
    })
    .required(),
  adults_count: yup.number(),
  children_count: yup.number(),
  arrival_datetime: yup.string().required("Поле обязательно для заполнения"),
  departure_datetime: yup.string().required("Поле обязательно для заполнения"),
});

interface Props {
  booking: BookingType;
  isUpdateBooking?: boolean;
  setIsUpdateBooking?: (val: boolean) => void;
  isCreateBooking?: boolean;
  setIsCreateBooking?: (val: boolean) => void;
  mode: "edit" | "create";
}

export const CreateOrEditBookingModalContent = (props: Props) => {
  const {
    booking,
    isUpdateBooking,
    setIsUpdateBooking,
    isCreateBooking,
    setIsCreateBooking,
    mode,
  } = props;

  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector((state) => state.bookings);
  const { rooms } = useAppSelector((state) => state.rooms);
  const { roomsCategories } = useAppSelector((state) => state.roomsCategories);
  const { bookingTariffs } = useAppSelector((state) => state.bookingTariffs);
  const { bookingServices } = useAppSelector((state) => state.bookingServices);
  const { roomBedVariants } = useAppSelector((state) => state.roomBedVariants);
  const { viewsFromRoomWindow } = useAppSelector(
    (state) => state.viewsFromRoomWindow
  );
  const { paymentMethods } = useAppSelector((state) => state.paymentMethods);
  const { transferVariants } = useAppSelector(
    (state) => state.transfersVariants
  );
  const { transferCars } = useAppSelector((state) => state.transfersCars);
  const { roomGuestsMax } = useAppSelector((state) => state.bookings);

  const [bookingForWhom, setBookingForWhom] = useState<ToogleButtonModeType[]>([
    {
      id: "1",
      label: "Для себя",
      value: "for_yourself",
      isSelected: booking.booking_for_whom === "for_yourself" ? true : false,
    },
    {
      id: "2",
      label: "Для другого",
      value: "for_another",
      isSelected: booking.booking_for_whom === "for_another" ? true : false,
    },
  ]);

  const bookingRoomCategory = useMemo(() => {
    if (roomsCategories) {
      return roomsCategories.find((i) => i._id === booking.room_category_id);
    }
    return null;
  }, [roomsCategories, booking]);

  const bookingTariffsList = useMemo((): SelectItemType[] => {
    if (bookingTariffs && bookingRoomCategory) {
      return bookingTariffs
        .filter((i) => bookingRoomCategory.available_tariff_id.includes(i._id))
        .map((item, index) => {
          return {
            id: index + 1,
            label: item.title + " - " + item.cost + "₽",
            value: item._id,
          };
        });
    }
    return [];
  }, [bookingTariffs, bookingRoomCategory]);

  const bookingServicesList = useMemo((): SelectItemType[] => {
    if (bookingServices) {
      return bookingServices.map((item, index) => {
        return {
          id: index + 1,
          label: item.title + " - " + item.price + "₽",
          value: item._id,
        };
      });
    }
    return [];
  }, [bookingServices]);

  const roomCategoriesList = useMemo((): SelectItemType[] => {
    if (roomsCategories) {
      return roomsCategories.map((item, index) => {
        return {
          id: index + 1,
          label: item.title,
          value: item._id,
        };
      });
    }
    return [];
  }, [roomsCategories]);

  const bedTypeSpecialWishList = useMemo((): SelectItemType[] => {
    if (roomBedVariants && bookingRoomCategory) {
      const a = roomBedVariants
        .filter((i) =>
          bookingRoomCategory.available_bed_variant_id.includes(i._id)
        )
        .map((item, index) => {
          return {
            id: index + 1,
            label: item.title,
            value: item._id,
          };
        });
      return [notSelectedValue, ...a];
    }
    return [];
  }, [roomBedVariants, bookingRoomCategory]);

  const viewFromWindowSpecialWishList = useMemo((): SelectItemType[] => {
    if (viewsFromRoomWindow && bookingRoomCategory) {
      const a = viewsFromRoomWindow
        .filter((i) =>
          bookingRoomCategory.additional_view_from_room_window_id.includes(
            i._id
          )
        )
        .map((item, index) => {
          return {
            id: index + 1,
            label: item.title,
            value: item._id,
          };
        });

      return [notSelectedValue, ...a];
    }
    return [];
  }, [viewsFromRoomWindow, bookingRoomCategory]);

  const paymentMethodsList = useMemo((): SelectItemType[] => {
    if (paymentMethods) {
      return paymentMethods.map((item, index) => {
        return {
          id: index + 1,
          label: item.title,
          value: item._id,
        };
      });
    }
    return [];
  }, [paymentMethods]);

  const transferVariantsList = useMemo((): SelectItemType[] => {
    if (transferVariants && transferCars) {
      const a = transferVariants
        .map((item, index) => {
          const direction = item.to_hotel
            ? "В отель"
            : item.from_hotel
            ? "Из отеля"
            : "";
          const time = item.time_from + ":" + item.time_to;
          const car = transferCars.find((i) => i._id === item.car_id) || "";
          const price = item.price;

          return {
            id: index + 1,
            label: `${direction + ", "}${time + ", "}${
              car
                ? car.brand +
                  " " +
                  car.model +
                  `, ${car.seats_number + " мест(-о)"}`
                : null
            }${" Стоимость: " + price}₽`,
            value: item._id,
          };
        })
        .sort((a, b) => a.label.localeCompare(b.label));
      return [notSelectedValue, ...a];
    }
    return [];
  }, [transferVariants, transferCars]);

  const formik = useFormik<BookingType>({
    initialValues: booking,
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });

  // На перечень доступных комнат влияет "тип категории" и "дата заезда/выезда"
  const roomsList = useMemo((): SelectItemType[] => {
    if (
      rooms &&
      bookings &&
      roomsCategories &&
      formik.values.room_category_id
    ) {
      const roomCategory = roomsCategories.find(
        (i) => i._id === formik.values.room_category_id
      );
      if (roomCategory) {
        return rooms
          .filter((i) => roomCategory.room_id.includes(i._id))
          .map((room, index) => {
            return {
              id: index + 1,
              label: room.number.toString(),
              value: room._id,
              disabled: !checkIsRoomIdFree({
                roomId: room._id,
                roomCategory,
                bookings,
                arrivalDate: moment(
                  formik.values.arrival_datetime,
                  dateTimeFormat
                ),
                departureDate: moment(
                  formik.values.departure_datetime,
                  dateTimeFormat
                ),
              }),
            };
          });
      }
    }
    return [];
  }, [
    rooms,
    bookings,
    roomsCategories,
    formik.values.room_category_id,
    formik.values.arrival_datetime,
    formik.values.departure_datetime,
  ]);

  const updateBooking = () => {
    dispatch(
      UpdateBooking({
        booking: formik.values,
      })
    );

    setIsUpdateBooking &&
      isUpdateBooking &&
      setIsUpdateBooking(!isUpdateBooking);
  };

  const createBooking = () => {
    const { _id, created_at, updated_at, ...booking } = formik.values;

    dispatch(
      CreateBooking({
        bookings: [booking],
      })
    );

    setIsCreateBooking &&
      isCreateBooking &&
      setIsCreateBooking(!isCreateBooking);
  };

  useEffect(() => {
    if (isUpdateBooking) {
      updateBooking();
    }
  }, [isUpdateBooking]);

  function setAllTouched(obj: any) {
    return Object.keys(obj).reduce((acc: any, key) => {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Если значение - объект, вызываем функцию рекурсивно
        acc[key] = setAllTouched(obj[key]);
      } else {
        // Если значение - примитив, устанавливаем true
        acc[key] = true;
      }
      return acc;
    }, {});
  }

  useEffect(() => {
    if (isCreateBooking && setIsCreateBooking) {
      // Если заполнены не все поля или одно из полей с ошибкой
      if (getAllObjectValues(formik.errors).find((item) => item)) {
        // Подсветить все поля формы с ошибками, после того как будет установлено свойство "нажатого поля" на всех полях формы
        formik.setTouched(setAllTouched(formik.errors));

        setIsCreateBooking(!isCreateBooking);
      } else {
        createBooking();
      }
    }
  }, [isCreateBooking]);

  useEffect(() => {
    const {
      room_category_id,
      tariff_id,
      service_id,
      transfer_id,
      adults_count,
      children_count,
    } = formik.values;
    const guestsCount = adults_count + children_count;
    if (
      roomsCategories &&
      bookingTariffs &&
      bookingServices &&
      transferVariants
    ) {
      // Стоимость комнаты
      let a = roomsCategories.find((i) => i._id === room_category_id);
      const roomPrice = a
        ? guestsCount > 1
          ? a.price_per_night_for_two_quest
          : a.price_per_night_for_one_quest
        : 0;
      // Стоимость тарифа
      const tariffPrice =
        bookingTariffs.find((i) => i._id === tariff_id)?.cost || 0;

      // Стоимость сервисов
      const servicesPrice = bookingServices
        .filter((i) => service_id.includes(i._id))
        .reduce((acc, cur) => {
          return (acc += cur.price);
        }, 0);
      // Стоимость трансфера
      const transferPrice =
        transferVariants.find((i) => i._id === transfer_id)?.price || 0;

      formik.setFieldValue(
        "price",
        roomPrice + tariffPrice + servicesPrice + transferPrice
      );
    }
  }, [formik.values]);

  const removeTransfer = () => {
    formik.setFieldValue("transfer_id", "");
    formik.setFieldValue("transfer_comment", "");
  };

  const setStartDateDefault = useCallback(
    (val: Date) => {
      const newDate = moment(val);
      const year = newDate.get("year");
      const month = newDate.get("month");
      const date = newDate.get("date");

      formik.setFieldValue(
        "arrival_datetime",
        moment(formik.values.arrival_datetime, dateTimeFormat)
          .set("year", year)
          .set("month", month)
          .set("date", date)
          .format(dateTimeFormat)
      );
    },
    [formik.values.arrival_datetime]
  );

  const setEndDateDefault = useCallback(
    (val: Date) => {
      const newDate = moment(val);
      const year = newDate.get("year");
      const month = newDate.get("month");
      const date = newDate.get("date");

      formik.setFieldValue(
        "departure_datetime",
        moment(formik.values.departure_datetime, dateTimeFormat)
          .set("year", year)
          .set("month", month)
          .set("date", date)
          .format(dateTimeFormat)
      );
    },
    [formik.values.departure_datetime]
  );

  if (!roomsCategories) return null;

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <Stack sx={{ alignItems: "stretch", gap: "15px" }}>
          <Typography
            variant="label"
            fontWeight={600}
            sx={{ marginTop: "15px", textAlign: "center" }}
          >
            Личные данные
          </Typography>

          <CustomInput
            id="user.name"
            name="user.name"
            label="Имя"
            value={formik.values.user.name}
            onChange={(val) =>
              formik.setFieldValue("user.name", val.target.value)
            }
            onBlur={formik.handleBlur}
            error={
              formik.touched.user?.name && Boolean(formik.errors.user?.name)
            }
            helperText={formik.touched.user?.name && formik.errors.user?.name}
          />

          <CustomInput
            id="user.lastname"
            name="user.lastname"
            label="Фамилия"
            value={formik.values.user.lastname}
            onChange={(val) =>
              formik.setFieldValue("user.lastname", val.target.value)
            }
            onBlur={formik.handleBlur}
            error={
              formik.touched.user?.lastname &&
              Boolean(formik.errors.user?.lastname)
            }
            helperText={
              formik.touched.user?.lastname && formik.errors.user?.lastname
            }
          />

          <CustomInput
            id="user.surname"
            name="user.surname"
            label="Отчество"
            value={formik.values.user.surname}
            onChange={(val) =>
              formik.setFieldValue("user.surname", val.target.value)
            }
            onBlur={formik.handleBlur}
            error={
              formik.touched.user?.surname &&
              Boolean(formik.errors.user?.surname)
            }
            helperText={
              formik.touched.user?.surname && formik.errors.user?.surname
            }
          />

          <CustomInput
            id="user.phone"
            name="user.phone"
            label="Номер телефона"
            value={formik.values.user.phone}
            onChange={(val) =>
              formik.setFieldValue("user.phone", val.target.value)
            }
            onBlur={formik.handleBlur}
            error={
              formik.touched.user?.phone && Boolean(formik.errors.user?.phone)
            }
            helperText={formik.touched.user?.phone && formik.errors.user?.phone}
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

          <CustomInput
            id="user.email"
            name="user.email"
            label="Электронная почта"
            value={formik.values.user?.email}
            onChange={(val) =>
              formik.setFieldValue("user.email", val.target.value)
            }
            onBlur={formik.handleBlur}
            error={
              formik.touched.user?.email && Boolean(formik.errors.user?.email)
            }
            helperText={formik.touched.user?.email && formik.errors.user?.email}
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
            id="user.nationality"
            name="user.nationality"
            inputLabel="Гражданство"
            data={countries}
            value={
              formik.values.user.nationality
                ? [
                    countries.find(
                      (i) => i.value === formik.values.user.nationality
                    )?.value || countries[0].value,
                  ]
                : ""
            }
            setValue={(val) => formik.setFieldValue("user.nationality", val)}
            labelPosition={"left"}
            onBlur={formik.handleBlur}
            error={
              formik.touched.user?.nationality &&
              Boolean(formik.errors.user?.nationality)
            }
            helperText={
              formik.touched.user?.nationality &&
              formik.errors.user?.nationality
            }
          />

          <Typography
            variant="label"
            fontWeight={600}
            sx={{ marginTop: "15px", textAlign: "center" }}
          >
            Количество гостей
          </Typography>

          <Stack
            sx={{
              flexDirection: "row",
              gap: "24px",
              justifyContent: "space-between",
            }}
          >
            <CustomCounterButton
              label={"Взрослые"}
              minValue={1}
              maxValue={roomGuestsMax - formik.values.children_count}
              value={formik.values.adults_count}
              setValue={(val) => formik.setFieldValue("adults_count", val)}
            />

            <CustomCounterButton
              label={"Дети (до 12 лет)"}
              minValue={0}
              maxValue={roomGuestsMax - formik.values.adults_count}
              value={formik.values.children_count}
              setValue={(val) => formik.setFieldValue("children_count", val)}
            />
          </Stack>

          <Typography
            variant="label"
            fontWeight={600}
            sx={{ marginTop: "15px", textAlign: "center" }}
          >
            Данные комнаты
          </Typography>

          <CustomSelect
            id="room_category_id"
            name="room_category_id"
            inputLabel="Категория комнаты"
            data={roomCategoriesList}
            value={
              roomCategoriesList.length && formik.values.room_category_id
                ? [
                    roomCategoriesList.find(
                      (i) => i.value === formik.values.room_category_id
                    )?.value || roomCategoriesList[0].value,
                  ]
                : ""
            }
            setValue={(val) => formik.setFieldValue("room_category_id", val)}
            labelPosition={"left"}
            onBlur={formik.handleBlur}
            error={
              formik.touched.room_category_id &&
              Boolean(formik.errors.room_category_id)
            }
            helperText={
              formik.touched.room_category_id && formik.errors.room_category_id
            }
          />

          <CustomSelect
            id="room_id"
            name="room_id"
            inputLabel="Номер комнаты"
            data={roomsList}
            value={
              roomsList.length && roomsList.find((i) => i.disabled === false)
                ? [
                    roomsList.find((i) => i.value === formik.values.room_id)
                      ?.value ||
                      roomsList.find((i) => i.disabled === false)?.value ||
                      roomsList[0].value,
                  ]
                : ""
            }
            setValue={(val) => formik.setFieldValue("room_id", val)}
            labelPosition={"left"}
            onBlur={formik.handleBlur}
            error={formik.touched.room_id && Boolean(formik.errors.room_id)}
            helperText={formik.touched.room_id && formik.errors.room_id}
          />

          <CustomSelect
            id="tariff_id"
            name="tariff_id"
            inputLabel="Тариф"
            data={bookingTariffsList}
            value={
              bookingTariffsList.length && formik.values.tariff_id
                ? [
                    bookingTariffsList.find(
                      (i) => i.value === formik.values.tariff_id
                    )?.value || bookingTariffsList[0].value,
                  ]
                : ""
            }
            setValue={(val) => formik.setFieldValue("tariff_id", val)}
            labelPosition={"left"}
            onBlur={formik.handleBlur}
            error={formik.touched.tariff_id && Boolean(formik.errors.tariff_id)}
            helperText={formik.touched.tariff_id && formik.errors.tariff_id}
          />

          <CustomSelect
            id="service_id"
            name="service_id"
            inputLabel="Услуги"
            data={bookingServicesList}
            disabledItems={bookingServicesList.filter((i) =>
              bookingRoomCategory?.include_service_id.includes(
                i.value.toString()
              )
            )}
            value={
              bookingServicesList.length && formik.values.service_id.length
                ? bookingServicesList
                    .filter((i) => formik.values.service_id.includes(i.value))
                    .map((i) => i.value)
                : []
            }
            setValue={(val) => formik.setFieldValue("service_id", val)}
            labelPosition={"left"}
            onBlur={formik.handleBlur}
            error={
              formik.touched.service_id &&
              Boolean(formik.errors.service_id?.toString())
            }
            helperText={
              formik.touched.service_id && formik.errors.service_id?.toString()
            }
            multiple
          />

          <Typography
            variant="label"
            fontWeight={600}
            sx={{ marginTop: "15px", textAlign: "center" }}
          >
            Специальные предложения
          </Typography>

          <CustomSelect
            id="bed_type_id"
            name="bed_type_id"
            inputLabel="Кровать"
            data={bedTypeSpecialWishList}
            value={
              bedTypeSpecialWishList.length && formik.values.bed_type_id
                ? [
                    bedTypeSpecialWishList.find(
                      (i) => i.value === formik.values.bed_type_id
                    )?.value || bedTypeSpecialWishList[0].value,
                  ]
                : ""
            }
            setValue={(val) => formik.setFieldValue("bed_type_id", val)}
            labelPosition={"left"}
            onBlur={formik.handleBlur}
            error={
              formik.touched.bed_type_id &&
              Boolean(formik.errors.bed_type_id?.toString())
            }
            helperText={
              formik.touched.bed_type_id &&
              formik.errors.bed_type_id?.toString()
            }
          />

          <CustomSelect
            id="view_from_window_id"
            name="view_from_window_id"
            inputLabel="Вид из окна"
            data={viewFromWindowSpecialWishList}
            value={
              viewFromWindowSpecialWishList.length &&
              formik.values.view_from_window_id
                ? [
                    viewFromWindowSpecialWishList.find(
                      (i) => i.value === formik.values.view_from_window_id
                    )?.value || viewFromWindowSpecialWishList[0].value,
                  ]
                : ""
            }
            setValue={(val) => formik.setFieldValue("view_from_window_id", val)}
            labelPosition={"left"}
            onBlur={formik.handleBlur}
            error={
              formik.touched.view_from_window_id &&
              Boolean(formik.errors.view_from_window_id?.toString())
            }
            helperText={
              formik.touched.view_from_window_id &&
              formik.errors.view_from_window_id?.toString()
            }
          />

          <CustomSelect
            id="payment_method_id"
            name="payment_method_id"
            inputLabel="Способ оплаты"
            data={paymentMethodsList}
            value={
              paymentMethodsList.length && formik.values.payment_method_id
                ? [
                    paymentMethodsList.find(
                      (i) => i.value === formik.values.payment_method_id
                    )?.value || paymentMethodsList[0].value,
                  ]
                : ""
            }
            setValue={(val) => formik.setFieldValue("payment_method_id", val)}
            labelPosition={"left"}
            onBlur={formik.handleBlur}
            error={
              formik.touched.payment_method_id &&
              Boolean(formik.errors.payment_method_id?.toString())
            }
            helperText={
              formik.touched.payment_method_id &&
              formik.errors.payment_method_id?.toString()
            }
          />

          <Stack
            sx={{
              alignSelf: "center",
              flexDirection: "row",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <Typography
              variant="label"
              fontWeight={600}
              sx={{ textAlign: "center" }}
            >
              Трансфер
            </Typography>

            {formik.values.transfer_id ? (
              <Button onClick={removeTransfer}>
                <DeleteOutline sx={{ fontSize: "24px" }} />
              </Button>
            ) : null}
          </Stack>

          <CustomSelect
            id="transfer_id"
            name="transfer_id"
            inputLabel="Вариант трансфера"
            data={transferVariantsList}
            value={
              transferVariantsList && formik.values.transfer_id
                ? [
                    transferVariantsList.find(
                      (i) => i.value === formik.values.transfer_id
                    )?.value || transferVariantsList[0].value,
                  ]
                : ""
            }
            setValue={(val) => formik.setFieldValue("transfer_id", val)}
            labelPosition={"left"}
            onBlur={formik.handleBlur}
            error={
              formik.touched.transfer_id &&
              Boolean(formik.errors.transfer_id?.toString())
            }
            helperText={
              formik.touched.transfer_id &&
              formik.errors.transfer_id?.toString()
            }
          />

          <CustomInput
            id="transfer_comment"
            name="transfer_comment"
            label="Комментарий трансферу"
            value={formik.values.transfer_comment || ""}
            onChange={(val) =>
              formik.setFieldValue("transfer_comment", val.target.value)
            }
            onBlur={formik.handleBlur}
            error={
              formik.touched.transfer_comment &&
              Boolean(formik.errors.transfer_comment)
            }
            helperText={
              formik.touched.transfer_comment && formik.errors.transfer_comment
            }
          />
          <Typography
            variant="label"
            fontWeight={600}
            sx={{ marginTop: "15px", textAlign: "center" }}
          >
            Время пребывания
          </Typography>

          <CustomRangeDatepicker
            startDateDefault={new Date(formik.values.arrival_datetime)}
            endDateDefault={new Date(formik.values.departure_datetime)}
            setStartDateDefault={setStartDateDefault}
            setEndDateDefault={setEndDateDefault}
            inputWithBorder
            labelStyles={{ textTransform: "normal" }}
          />

          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <CustomSelect
              id="arrival_datetime"
              name="arrival_datetime"
              inputLabel="Время заезда"
              data={times}
              value={[
                getPrevArrivalTime({
                  arrival_datetime: formik.values.arrival_datetime,
                }),
              ]}
              setValue={(val) => {
                if (typeof val === "string") {
                  const hour = Number(val.split(":")[0]);
                  const minute = Number(val.split(":")[1]);

                  formik.setFieldValue(
                    "arrival_datetime",
                    moment(formik.values.arrival_datetime, dateTimeFormat)
                      .set("hour", hour)
                      .set("minute", minute)
                      .format(dateTimeFormat)
                  );
                }
              }}
              labelPosition={"left"}
              containerStyles={{ flex: 0.5 }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.arrival_datetime &&
                Boolean(formik.errors.arrival_datetime)
              }
            />

            <CustomSelect
              id="departure_datetime"
              name="departure_datetime"
              inputLabel="Время выезда"
              data={times}
              value={[
                getPrevDepartureTime({
                  departure_datetime: formik.values.departure_datetime,
                }),
              ]}
              setValue={(val) => {
                if (typeof val === "string") {
                  const hour = Number(val.split(":")[0]);
                  const minute = Number(val.split(":")[1]);

                  formik.setFieldValue(
                    "departure_datetime",
                    moment(formik.values.departure_datetime, dateTimeFormat)
                      .set("hour", hour)
                      .set("minute", minute)
                      .format(dateTimeFormat)
                  );
                }
              }}
              labelPosition={"left"}
              containerStyles={{ flex: 0.5 }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.departure_datetime &&
                Boolean(formik.errors.departure_datetime)
              }
            />
          </Stack>

          <CustomInput
            id="comment"
            name="comment"
            label="Комментарий к бронированию"
            value={formik.values.comment || ""}
            onChange={(val) =>
              formik.setFieldValue("comment", val.target.value)
            }
            multiline
            onBlur={formik.handleBlur}
            error={formik.touched.comment && Boolean(formik.errors.comment)}
            helperText={formik.touched.comment && formik.errors.comment}
          />

          <ToogleModeButton
            label="Бронирование для"
            modes={bookingForWhom}
            setMode={(val) => {
              const selected = val.find(
                (i: ToogleButtonModeType) => i.isSelected
              );
              if (selected) {
                formik.setFieldValue("bookingForWhom", selected.value);
              }
              setBookingForWhom(val);
            }}
            isCanUnchecked={false}
          />

          <CustomInput
            id="price"
            name="price"
            label="Общая стоимость"
            value={formik.values.price.toString() + "₽"}
            onChange={(val) =>
              formik.setFieldValue("price", Number(val.target.value))
            }
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            disabled
          />

          {/* <FormGroup sx={{ display: "flex", flexDirection: "column" }}>
            {mode === "create" ? (
              <CustomLabelCheckbox
                id="user.send_confirm_on_phone"
                name="user.send_confirm_on_phone"
                label="Приcлать подтверждение на телефон"
                checked={formik.values.user.send_confirm_on_phone}
                handleChange={(val) =>
                  formik.setFieldValue("user.send_confirm_on_phone", val)
                }
                defaultChecked
              />
            ) : null}
            <CustomLabelCheckbox
              id="user.want_to_know_about_special_offers_and_news"
              name="user.want_to_know_about_special_offers_and_news"
              label="Оповещать о специальных предложениях и новостях"
              checked={
                formik.values.user.want_to_know_about_special_offers_and_news
              }
              handleChange={(val) =>
                formik.setFieldValue(
                  "user.want_to_know_about_special_offers_and_news",
                  val
                )
              }
              defaultChecked
            />
          </FormGroup> */}
        </Stack>
      </form>
    </div>
  );
};
