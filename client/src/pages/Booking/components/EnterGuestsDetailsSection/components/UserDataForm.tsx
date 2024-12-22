import React from "react";
import { FormGroup, Stack } from "@mui/material";
import { FormikProps } from "formik";
import { CustomInput } from "../../../../components/shared/FormElements/CustomInput";
import { CustomSelect } from "../../../../components/shared/FormElements/CustomSelect";
import { countries } from "./constants";
import { CustomLabelCheckbox } from "../../../../components/shared/FormElements/CustomLabelCheckbox";
import { EmailIcon } from "../../../../../assets/icons/EmailIcon";
import { theme } from "../../../../../theme";
import { PhoneOutlined } from "@mui/icons-material";
import { BookingGuestsDetailsType } from "../../../../../redux/slices/Bookings/types";

interface Props {
  formik: FormikProps<BookingGuestsDetailsType>;
}

export const UserDataForm = (props: Props) => {
  const { formik } = props;

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
