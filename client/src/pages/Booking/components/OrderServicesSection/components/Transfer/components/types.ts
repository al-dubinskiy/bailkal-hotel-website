import { ToogleButtonModeType } from "../../../../../../components/shared/ToogleModeButton";

export type TransferStepType = {
  id: number;
  label: string;
  value: string;
  isCurrent: boolean;
  isComplete: boolean;
};

export type TransferVariantType = ToogleButtonModeType & {
  time_from: string;
  time_to: string;
};

export type TransferDirectionType = ToogleButtonModeType & {
  variants: TransferVariantType[];
};
