import { Stack } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { CustomInput } from "../../../../components/shared/FormElements/CustomInput";

const validationSchema = yup.object({
  name: yup.string().required("Поле обязательно для заполнения"),
  lastname: yup.string().required("Поле обязательно для заполнения"),
  surname: yup.string().required("Поле обязательно для заполнения"),
  phone: yup
    .string()
    .email("Введите Вашу електронную почту")
    .required("Поле обязательно для заполнения"),
  email: yup
    .string()
    .email("Введите Вашу електронную почту")
    .required("Поле обязательно для заполнения"),
});

interface Props {}

export const UserDataForm = (props: Props) => {
  const {} = props;

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      surname: "",
      phone: "",
      email: "",
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
            />
          </Stack>
        </Stack>
      </form>
    </div>
  );
};
