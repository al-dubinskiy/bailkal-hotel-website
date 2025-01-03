import { Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useMemo } from "react";
import * as yup from "yup";
import { BookingType } from "../../../../redux/slices/Bookings/types";
import { CustomInput } from "../../../../pages/components/shared/FormElements/CustomInput";
import { PhoneOutlined } from "@mui/icons-material";
import { theme } from "../../../../theme";
import {
  CustomSelect,
  SelectItemType,
} from "../../../../pages/components/shared/FormElements/CustomSelect";
import { EmailIcon } from "../../../../assets/icons/EmailIcon";
import {
  countries,
  times,
} from "../../../../pages/Booking/components/EnterGuestsDetailsSection/components/constants";
import { useAppSelector } from "../../../../hooks/redux";
import { CustomCounterButton } from "../../../../pages/components/shared/CustomCounterButton";
import { dateTimeFormat } from "../../../../constants";
import moment from "moment";
import { CustomRangeDatepicker } from "../../../../pages/components/shared/RangeDatepicker/CustomRangeDatepicker";

interface Props {
  booking: BookingType;
}

const validationSchema = yup.object({
  user: yup
    .object({
      name: yup.string().required("Поле обязательно для заполнения"),
      lastname: yup.string().required("Поле обязательно для заполнения"),
      surname: yup.string().required("Поле обязательно для заполнения"),
      phone: yup
        .string()
        .matches(/^\+?[1-9][0-9]{7,14}$/, "Введите корректный номер телефона"),
      email: yup.string().email().required("Поле обязательно для заполнения"),
    })
    .required(),
  adults_count: yup.number(),
  children_count: yup.number(),
  arrival_datetime: yup.string().required("Поле обязательно для заполнения"),
  departure_datetime: yup.string().required("Поле обязательно для заполнения"),
});

export const EditBookingModalContent = (props: Props) => {
  const { booking } = props;
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

  const bookingRoomCategory = useMemo(() => {
    if (roomsCategories) {
      return roomsCategories.find((i) => i._id === booking.room_category_id);
    }
    return null;
  }, [roomsCategories, booking]);

  const roomsList = useMemo((): SelectItemType[] => {
    if (rooms && bookingRoomCategory) {
      return rooms
        .filter((i) => bookingRoomCategory.room_id.includes(i._id))
        .map((item, index) => {
          return {
            id: index + 1,
            label: item.number.toString(),
            value: item._id,
          };
        });
    }
    return [];
  }, [rooms, bookingRoomCategory]);

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
      return roomBedVariants
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
    }
    return [];
  }, [roomBedVariants, bookingRoomCategory]);

  const viewFromWindowSpecialWishList = useMemo((): SelectItemType[] => {
    if (viewsFromRoomWindow && bookingRoomCategory) {
      return viewsFromRoomWindow
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
      return transferVariants
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
    }
    return [];
  }, [transferVariants, transferCars]);

  const formik = useFormik<BookingType>({
    initialValues: booking,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  console.log(formik.values);
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
            id="user.nationality"
            name="user.nationality"
            inputLabel="Гражданство"
            data={countries}
            value={[
              countries.find((i) => i.value === formik.values.user.nationality)
                ?.value || countries[0].value,
            ]}
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
            value={[
              roomCategoriesList.find(
                (i) => i.value === formik.values.room_category_id
              )?.value || roomCategoriesList[0].value,
            ]}
            setValue={(val) => formik.setFieldValue("room_category_id", val)}
            labelPosition={"left"}
            containerStyles={{ flex: 0.5 }}
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
            value={[
              roomsList.find((i) => i.value === formik.values.room_id)?.value ||
                roomsList[0].value,
            ]}
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
            value={[
              bookingTariffsList.find(
                (i) => i.value === formik.values.tariff_id
              )?.value || bookingTariffsList[0].value,
            ]}
            setValue={(val) => formik.setFieldValue("tariff_id", val)}
            labelPosition={"left"}
            containerStyles={{ flex: 0.5 }}
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
            value={bookingServicesList
              .filter((i) => formik.values.service_id.includes(i.value))
              .map((i) => i.value)}
            setValue={(val) => formik.setFieldValue("service_id", val)}
            labelPosition={"left"}
            containerStyles={{ flex: 0.5 }}
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
            value={[
              bedTypeSpecialWishList.find(
                (i) => i.value === formik.values.bed_type_id
              )?.value || bedTypeSpecialWishList[0].value,
            ]}
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
            value={[
              viewFromWindowSpecialWishList.find(
                (i) => i.value === formik.values.view_from_window_id
              )?.value || viewFromWindowSpecialWishList[0].value,
            ]}
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
            value={[
              paymentMethodsList.find(
                (i) => i.value === formik.values.payment_method_id
              )?.value || paymentMethodsList[0].value,
            ]}
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

          <Typography
            variant="label"
            fontWeight={600}
            sx={{ marginTop: "15px", textAlign: "center" }}
          >
            Трансфер
          </Typography>

          <CustomSelect
            id="transfer_id"
            name="transfer_id"
            inputLabel="Вариант трансфера"
            data={transferVariantsList}
            value={[
              transferVariantsList.find(
                (i) => i.value === formik.values.transfer_id
              )?.value || transferVariantsList[0].value,
            ]}
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
            setStartDateDefault={(val) =>
              formik.setFieldValue(
                "arrival_datetime",
                moment(val).format(dateTimeFormat)
              )
            }
            setEndDateDefault={(val) =>
              formik.setFieldValue(
                "departure_datetime",
                moment(val).format(dateTimeFormat)
              )
            }
            inputWithBorder
          />
        </Stack>
      </form>
    </div>
  );
};
