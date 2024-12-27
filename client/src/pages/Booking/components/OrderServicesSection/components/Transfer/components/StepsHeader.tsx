import { CheckOutlined, EditOutlined } from "@mui/icons-material";
import React from "react";
import { CustomCircleIconButton } from "../../../../../../components/shared/CustomCircleIconButton";
import { Box, Stack, Typography } from "@mui/material";
import { theme } from "../../../../../../../theme";
import { TransferStepType } from "./types";

interface Props {
  step: TransferStepType;
  toStep: (val: TransferStepType) => void;
  editStep: (val: number) => void;
}

export const StepsHeader = (props: Props) => {
  const { step, toStep, editStep } = props;

  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
      <Box
        sx={{
          width: "50px",
          height: "50px",
          borderRadius: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          background: step.isCurrent
            ? theme.palette.primary.dark
            : theme.palette.layoutBackground.light,
          border: `1px solid ${theme.palette.primary.dark}`,
          marginRight: "14px",
        }}
      >
        <Typography
          variant="label"
          sx={{
            fontSize: "24px",
            fontWeight: step.isCurrent ? 500 : 400,
            color: step.isCurrent
              ? theme.palette.layoutBackground.light
              : theme.palette.primary.dark,
          }}
        >
          {step.id}
        </Typography>
      </Box>

      <Typography
        variant="label"
        sx={{
          fontWeight: step.isCurrent ? 600 : 400,
          "&:hover": {
            cursor: !step.isCurrent ? "pointer" : "default",
            opacity: !step.isCurrent ? 0.7 : 1,
          },
        }}
        onClick={() => toStep(step)}
      >
        {step.label}
      </Typography>

      {step.isComplete ? (
        <>
          <CheckOutlined
            sx={{
              color: theme.palette.primary.dark,
              fontSize: "24px",
              marginLeft: "5px",
            }}
          />

          <CustomCircleIconButton
            icon={<EditOutlined sx={{ fontSize: "16px" }} />}
            onClick={() => editStep(step.id)}
            sx={{
              minWidth: "30px",
              width: "30px",
              height: "30px",
              marginLeft: "10px",
            }}
          />
        </>
      ) : null}
    </Stack>
  );
};
