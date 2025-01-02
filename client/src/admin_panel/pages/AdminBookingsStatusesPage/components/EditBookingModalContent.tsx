import { Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { BookingType } from "../../../../redux/slices/Bookings/types";
import { defaultFormValues } from "./default";
import { CustomInput } from "../../../../pages/components/shared/FormElements/CustomInput";
import { PhoneOutlined } from "@mui/icons-material";
import { theme } from "../../../../theme";
import { CustomSelect } from "../../../../pages/components/shared/FormElements/CustomSelect";
import { EmailIcon } from "../../../../assets/icons/EmailIcon";
import { countries } from "../../../../pages/Booking/components/EnterGuestsDetailsSection/components/constants";

interface Props {
  booking: BookingType | undefined;
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
  const formik = useFormik<BookingType>({
    initialValues: defaultFormValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  console.log(formik.values);
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
            sx={{ textAlign: "center" }}
          >
            Личные данные
          </Typography>

          <CustomInput
            id="name"
            name="name"
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
            id="lastname"
            name="lastname"
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
            id="surname"
            name="surname"
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
            id="phone"
            name="phone"
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
            id="email"
            name="email"
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
            id="nationality"
            name="nationality"
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
            containerStyles={{ flex: 0.5 }}
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
            sx={{ textAlign: "center" }}
          >
            Данные комнаты
          </Typography>
        </Stack>
      </form>
    </div>
  );
};
