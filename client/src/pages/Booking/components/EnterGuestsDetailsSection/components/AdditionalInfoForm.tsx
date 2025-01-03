import React from "react";
import { Stack } from "@mui/material";
import { FormikProps } from "formik";
import { CustomInput } from "../../../../components/shared/FormElements/CustomInput";
import {
  CustomSelect,
  SelectItemType,
} from "../../../../components/shared/FormElements/CustomSelect";
import { BookingGuestsDetailsType } from "../../../../../redux/slices/Bookings/types";
import { times } from "./constants";
import { CustomButton } from "../../../../components/shared/CustomButton";

interface Props {
  formik: FormikProps<BookingGuestsDetailsType>;
  isEnableSaveButton: boolean;
  updateAdditionalInfoData: () => void;
}

export const AdditionalInfoForm = (props: Props) => {
  const { formik, isEnableSaveButton, updateAdditionalInfoData } = props;

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
            <CustomSelect
              id="arrivalTime"
              name="arrivalTime"
              inputLabel="Время заезда"
              data={times}
              value={[formik.values.arrivalTime]}
              setValue={(val) => formik.setFieldValue("arrivalTime", val)}
              labelPosition={"left"}
              containerStyles={{ flex: 0.5 }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.arrivalTime && Boolean(formik.errors.arrivalTime)
              }
            />

            <CustomSelect
              id="departureTime"
              name="departureTime"
              inputLabel="Время выезда"
              data={times}
              value={[formik.values.departureTime]}
              setValue={(val) => formik.setFieldValue("departureTime", val)}
              labelPosition={"left"}
              containerStyles={{ flex: 0.5 }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.departureTime &&
                Boolean(formik.errors.departureTime)
              }
            />
          </Stack>

          <CustomInput
            id="comment"
            name="comment"
            label="Дополнительный комментарий (при желании)"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.comment && Boolean(formik.errors.comment)}
            helperText={formik.touched.comment && formik.errors.comment}
            multiline
            containerStyles={{ minHeight: "100px" }}
          />
        </Stack>

        <CustomButton
          label={"Сохранить"}
          onClick={updateAdditionalInfoData}
          containerVariant={"contained"}
          disabled={!isEnableSaveButton}
          containerBackgroundColor={"buttonDark"}
          containerStyle={{
            padding: "0 24px",
            // flex: 0.5,
            alignSelf: "flex-start",
          }}
          withoutAnimation
        />
      </form>
    </div>
  );
};
