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
import { countries } from "../../../../pages/Booking/components/EnterGuestsDetailsSection/components/constants";
import { useAppSelector } from "../../../../hooks/redux";
import { CustomCounterButton } from "../../../../pages/components/shared/CustomCounterButton";

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
  const { roomGuestsMax } = useAppSelector((state) => state.bookings);

  const roomsList = useMemo((): SelectItemType[] => {
    if (rooms && roomsCategories) {
      const roomsOfCategory = roomsCategories.find(
        (i) => i._id === booking.room_category_id
      );
      if (roomsOfCategory) {
        return rooms
          .filter((i) => roomsOfCategory.room_id.includes(i._id))
          .map((item, index) => {
            return {
              id: index + 1,
              label: item.number.toString(),
              value: item._id,
            };
          });
      }
    }
    return [];
  }, [rooms, roomsCategories]);

  const bookingTariffsList = useMemo((): SelectItemType[] => {
    if (bookingTariffs) {
      return bookingTariffs.map((item, index) => {
        return {
          id: index + 1,
          label: item.title + " - " + item.cost + "₽",
          value: item._id,
        };
      });
    }
    return [];
  }, [bookingTariffs]);

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
            value={
              formik.values.user.nationality
                ? countries.find(
                    (i) => i.value === formik.values.user.nationality
                  ) || countries[0]
                : countries[0]
            }
            setValue={(val) =>
              formik.setFieldValue("user.nationality", val.value)
            }
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
            Данные комнаты
          </Typography>

          <CustomSelect
            id="room_category_id"
            name="room_category_id"
            inputLabel="Категория комнаты"
            data={roomCategoriesList}
            value={
              roomCategoriesList.find(
                (i) => i.value === formik.values.room_category_id
              ) || roomCategoriesList[0]
            }
            setValue={(val) =>
              formik.setFieldValue("room_category_id", val.value)
            }
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
            value={
              roomsList.find((i) => i.value === formik.values.room_id) ||
              roomsList[0]
            }
            setValue={(val) => formik.setFieldValue("room_id", val.value)}
            labelPosition={"left"}
            onBlur={formik.handleBlur}
            error={formik.touched.room_id && Boolean(formik.errors.room_id)}
            helperText={formik.touched.room_id && formik.errors.room_id}
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
            Тариф
          </Typography>

          <CustomSelect
            id="tariff_id"
            name="tariff_id"
            inputLabel="Тариф"
            data={bookingTariffsList}
            value={
              bookingTariffsList.find(
                (i) => i.value === formik.values.tariff_id
              ) || bookingTariffsList[0]
            }
            setValue={(val) => formik.setFieldValue("tariff_id", val.value)}
            labelPosition={"left"}
            containerStyles={{ flex: 0.5 }}
            onBlur={formik.handleBlur}
            error={formik.touched.tariff_id && Boolean(formik.errors.tariff_id)}
            helperText={formik.touched.tariff_id && formik.errors.tariff_id}
          />
        </Stack>
      </form>
    </div>
  );
};
