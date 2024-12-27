import { Stack, SxProps } from "@mui/material";
import React, { useState } from "react";
import {
  ToogleButtonModeType,
  ToogleModeButton,
} from "../../../../../../components/shared/ToogleModeButton";
import { TransferDirectionType, TransferVariantType } from "./types";

interface Props {
  transferDirection: TransferDirectionType[];
  setTransferDirection: (val: TransferDirectionType[]) => void;
  containerStyles?: SxProps;
}

export const DirectionStepContent = (props: Props) => {
  const { containerStyles, transferDirection, setTransferDirection } = props;
  //   const [transferDirectionLocal, setTransferDirectionLocal] =
  //     useState<TransferDirectionType[]>(transferDirection);

  return (
    <Stack
      sx={{
        gap: "24px",
        alignItems: "stretch",
        ...containerStyles,
      }}
    >
      <ToogleModeButton
        label="Мне нужен трансфер"
        modes={transferDirection}
        setMode={setTransferDirection}
        isCanUnchecked={false}
      />

      <ToogleModeButton
        modes={transferDirection.find((i) => i.isSelected)?.variants || []}
        setMode={(variants: TransferVariantType[]) =>
          setTransferDirection(
            transferDirection.map((i) =>
              i.isSelected ? { ...i, variants } : i
            )
          )
        }
        buttonsDirection="column"
        isCanUnchecked={false}
      />
    </Stack>
  );
};
