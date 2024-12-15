import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  ToogleButtonModeType,
  ToogleModeButton,
} from "../../../../components/shared/ToogleModeButton";
import { authMethods } from "../../../../../assets/images";

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

  const authMethodImageStyles: React.CSSProperties = {
    width: "50px",
    height: "50px",
    objectFit: "contain",
    borderRadius: "8px",
  };

  return (
    <Stack sx={{ alignItems: "stretch", gap: "48px" }}>
      <Typography variant="label" sx={{ fontWeight: 600, alignSelf: "center" }}>
        Введите свои данные
      </Typography>

      <Stack sx={{ alignItems: "stretch" }}>
        <ToogleModeButton
          label="Я бронирую"
          modes={bookingForWhom}
          setMode={setBookingForWhom}
          isCanUnchecked={false}
          helperText={
            "Укажите данные основного гостя. Остальных гостей — при заселении"
          }
        />

        <Stack
          sx={{
            flexDirection: "row",
            gap: "24px",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "48px",
          }}
        >
          <Typography variant="label">
            Авторизуйтесь удобным способом — данные заполнятся автоматически.
            Или введите их вручную.
          </Typography>

          <Stack
            sx={{
              flexDirection: "row",
              gap: "24px",
              alignItems: "center",
            }}
          >
            <Button onClick={() => null}>
              <img src={authMethods.VkLogo} style={authMethodImageStyles} />
            </Button>
            <Button onClick={() => null}>
              <img
                src={authMethods.SberBankLogo}
                style={authMethodImageStyles}
              />
            </Button>
            <Button onClick={() => null}>
              <img src={authMethods.TBankLogo} style={authMethodImageStyles} />
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
