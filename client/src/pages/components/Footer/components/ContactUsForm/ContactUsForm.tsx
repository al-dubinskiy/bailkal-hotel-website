import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import { theme } from "../../../../../theme";
import { Input } from "../../../shared/FormElements/Input";

const validationSchema = yup.object({
  name: yup.string().required("Поле обязательно для заполнения"),
  lastname: yup.string().required("Поле обязательно для заполнения"),
  email: yup
    .string()
    .email("Введите Вашу електронную почту")
    .required("Поле обязательно для заполнения"),
});

export const ContactUsForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
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
        <Input
          id="name"
          name="name"
          label="Имя"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <Input
          id="lastname"
          name="lastname"
          label="Фамилия"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
        />

        <Input
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <Button
          variant="contained"
          color={"buttonLight"}
          sx={{ width: "100%" }}
          fullWidth
          type="submit"
        >
          <Typography variant="label">Подписаться</Typography>
        </Button>
      </form>
    </div>
  );
};
