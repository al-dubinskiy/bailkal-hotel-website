import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { authMethods } from "../../../../../assets/images";

interface Props {}

export const AuthMethodButtons = (props: Props) => {
  const {} = props;

  const authMethodImageStyles: React.CSSProperties = {
    width: "50px",
    height: "50px",
    objectFit: "contain",
    borderRadius: "8px",
  };

  return (
    <Stack
      sx={{
        flexDirection: "row",
        gap: "24px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="label">
        Авторизуйтесь удобным способом — данные заполнятся автоматически. Или
        введите их вручную.
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
          <img src={authMethods.SberBankLogo} style={authMethodImageStyles} />
        </Button>
        <Button onClick={() => null}>
          <img src={authMethods.TBankLogo} style={authMethodImageStyles} />
        </Button>
      </Stack>
    </Stack>
  );
};
