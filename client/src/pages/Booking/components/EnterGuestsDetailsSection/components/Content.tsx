import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  ToogleButtonModeType,
  ToogleModeButton,
} from "../../../../components/shared/ToogleModeButton";
import { authMethods } from "../../../../../assets/images";
import { UserDataForm } from "./UserDataForm";
import { AuthMethodButtons } from "./AuthMethodButtons";

interface Props {}

export const Content = (props: Props) => {
  const {} = props;

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

      <UserDataForm />
    </Stack>
  );
};
