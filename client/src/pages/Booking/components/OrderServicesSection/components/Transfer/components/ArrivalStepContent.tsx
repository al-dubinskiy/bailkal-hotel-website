import { Box, Stack, SxProps, Typography } from "@mui/material";
import React, { useState } from "react";
import { CustomInput } from "../../../../../../components/shared/FormElements/CustomInput";
import { CustomIconLabel } from "../../../../../../components/shared/CustomIconLabel";
import { PeoplesIcon } from "../../../../../../../assets/icons/PeoplesIcon";
import { CustomButton } from "../../../../../../components/shared/CustomButton";
import { theme } from "../../../../../../../theme";

interface Props {
  setComment: (val: string) => void;
  transferPrice: number;
  containerStyles: SxProps;
}

export const ArrivalStepContent = (props: Props) => {
  const { setComment, transferPrice, containerStyles } = props;
  const [input, setInput] = useState<string>("");

  const orderTransfer = () => {
    setComment(input);
    // ...
  };

  return (
    <Stack sx={{ alignItems: "stretch", ...containerStyles }}>
      <CustomInput
        id="comment"
        name="comment"
        placeholder="Введите комментарий"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />

      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CustomIconLabel icon={<PeoplesIcon />} label={"Для всех гостей"} />

        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            alignSelf: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography
              variant="label"
              sx={{
                color: theme.palette.primary.dark,
                fontSize: "20.8px",
              }}
            >
              {transferPrice} ₽
            </Typography>

            <Typography
              variant="someSmall"
              sx={{
                color: theme.palette.gray.light,
              }}
            >
              за поездку
            </Typography>
          </Box>

          <CustomButton
            label={"Заказать"}
            onClick={orderTransfer}
            containerVariant={"contained"}
            containerBackgroundColor={"buttonDark"}
            containerStyle={{ padding: "0 40px" }}
            withoutAnimation
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
