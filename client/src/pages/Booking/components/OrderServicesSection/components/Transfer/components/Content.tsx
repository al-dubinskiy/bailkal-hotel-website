import { Box, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { theme } from "../../../../../../../theme";
import {
  CheckOutlined,
  EditOffOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { CustomCircleIconButton } from "../../../../../../components/shared/CustomCircleIconButton";
import {
  ToogleButtonModeType,
  ToogleModeButton,
} from "../../../../../../components/shared/ToogleModeButton";
import { findLast, findLastIndex } from "lodash";
import { PeoplesIcon } from "../../../../../../../assets/icons/PeoplesIcon";
import { CustomIconLabel } from "../../../../../../components/shared/CustomIconLabel";
import { CustomButton } from "../../../../../../components/shared/CustomButton";
import { CreateTransferVariantType } from "../../../../../../../redux/slices/TransferVariants/types";
import { GetTransferCars } from "../../../../../../../redux/slices/TransferCars/transferCarsSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../hooks/redux";
import { TransportStepContent } from "./TransportStepContent";
import { DirectionStepContent } from "./DirectionStepContent";
import { StepsHeader } from "./StepsHeader";

export type TransferVariantType = ToogleButtonModeType & {
  time_from: string;
  time_to: string;
};
export type TransferDirectionType = ToogleButtonModeType & {
  variants: TransferVariantType[];
};

export type TransferStepType = {
  id: number;
  label: string;
  value: string;
  isCurrent: boolean;
  isComplete: boolean;
};

interface Props {}

export const Content = (props: Props) => {
  const {} = props;

  const dispatch = useAppDispatch();
  const { transferCars } = useAppSelector((state) => state.transfersCars);
  const [transferParams, setTransferParams] =
    useState<CreateTransferVariantType>({
      from_hotel: false,
      to_hotel: false,
      time_from: "",
      time_to: "",
      price: 0,
      car_id: "",
      comment: "",
    });

  const [steps, setSteps] = useState<TransferStepType[]>([
    {
      id: 1,
      label: "Направление",
      value: "direction",
      isCurrent: true,
      isComplete: false,
    },
    {
      id: 2,
      label: "Транспорт",
      value: "transport",
      isCurrent: false,
      isComplete: false,
    },
    {
      id: 3,
      label: "Прибытие",
      value: "arrival",
      isCurrent: false,
      isComplete: false,
    },
  ]);

  const [transferDirection, setTransferDirection] = useState<
    TransferDirectionType[]
  >([
    {
      id: "1",
      label: "В отель",
      value: "to_hotel",
      variants: [
        {
          id: "1.1",
          label: 'Трансфер из Аэропорта в Отель "Байкал" с 06:00 до 22:00',
          value: "from_airport_in_hotel_variant_1",
          time_from: "06:00",
          time_to: "22:00",
          isSelected: false,
        },
        {
          id: "1.2",
          label: 'Трансфер из Аэропорта в Отель "Байкал" с 22:00 до 06:00',
          value: "from_airport_in_hotel_variant_2",
          time_from: "22:00",
          time_to: "06:00",
          isSelected: false,
        },
      ],
      isSelected: true,
    },
    {
      id: "2",
      label: "Из отеля",
      value: "from_hotel",
      variants: [
        {
          id: "1.1",
          label: 'Трансфер из Аэропорта из Отеля "Байкал" с 06:00 до 22:00',
          value: "to_airport_from_hotel_variant_1",
          time_from: "06:00",
          time_to: "22:00",
          isSelected: false,
        },
        {
          id: "1.2",
          label: 'Трансфер из Аэропорта из Отеля "Байкал" с 22:00 до 06:00',
          value: "to_airport_from_hotel_variant_2",
          time_from: "22:00",
          time_to: "06:00",
          isSelected: false,
        },
      ],
      isSelected: false,
    },
  ]);

  const GetTransferCarsList = useCallback(() => {
    if (!transferCars) {
      dispatch(GetTransferCars());
    }
  }, [transferCars]);

  useEffect(() => {
    GetTransferCarsList();
  }, [GetTransferCarsList]);

  const toStep = (step: TransferStepType) => {
    const stepIdx = steps.findIndex((i) => i.id === step.id);
    const lastCompleteIdx = findLastIndex(steps, (i) => i.isComplete);

    if (step.isComplete || (stepIdx !== -1 && lastCompleteIdx !== -1)) {
      // Если произошло нажатие на предыдущие (пройденные) шаги или на первый шаг, следующий после последнего пройденного
      if (step.isComplete || lastCompleteIdx + 1 === stepIdx) {
        setSteps((prev) =>
          prev.map((i) => ({
            ...i,
            isCurrent: i.id === step.id ? true : false,
          }))
        );
      }
    }
  };

  const editStep = (stepId: number) => {
    setSteps((prev) =>
      prev.map((i) => ({
        ...i,
        isCurrent: i.id === stepId ? true : false,
      }))
    );
  };

  useEffect(() => {
    const currentIdx = steps.findIndex((i) => i.isCurrent);
    if (currentIdx !== -1) {
      // Если на сейчас на первом шаге (когда он еще не isComplete), но уже выбрано одно из "направлений трансфера", то переходим на второй шаг
      if (
        currentIdx === 0 &&
        !steps[0].isComplete &&
        transferDirection.find((i) => i.variants.find((j) => j.isSelected))
      ) {
        const nextIdx = currentIdx + 1;
        setSteps((prev) =>
          prev.map((i, idx) => ({
            ...i,
            isCurrent: idx === nextIdx ? true : false,
            isComplete: idx === currentIdx ? true : i.isComplete,
          }))
        );
      }
    }
  }, [transferDirection]);

  useEffect(() => {
    if (transferDirection) {
      setTransferDirection((prev) =>
        prev.map((i) => {
          // Установка выбранного типа направления маршрута для переключателя

          const updated = {
            ...i,
            isSelected:
              (i.value === "from_hotel" && transferParams.from_hotel) ||
              (i.value === "to_hotel" && transferParams.to_hotel)
                ? true
                : false,
            // Установка выбранного времени маршрута для переключателя
            variants: i.variants.map((j) => ({
              ...j,
              isSelected:
                ((i.value === "from_hotel" && transferParams.from_hotel) ||
                  (i.value === "to_hotel" && transferParams.to_hotel)) &&
                j.time_from === transferParams.time_from &&
                j.time_to === transferParams.time_to
                  ? true
                  : false,
            })),
          };

          return updated;
        })
      );
    }
  }, [
    transferParams.from_hotel,
    transferParams.to_hotel,
    transferParams.time_from,
    transferParams.time_to,
  ]);

  const StepContent = ({ step }: { step: TransferStepType }) => {
    return (
      <Stack
        sx={{
          gap: "30px",
          alignItems: "stretch",
          zIndex: 1,
        }}
      >
        <StepsHeader step={step} toStep={toStep} editStep={editStep} />

        <Stack sx={{ alignItems: "stretch", paddingLeft: "74px" }}>
          <DirectionStepContent
            transferDirection={transferDirection}
            setTransferDirection={(val) => {
              // console.log(val);
              const selectedType = val.find((i) => i.isSelected);
              const selectedVariant =
                selectedType && selectedType.variants.find((i) => i.isSelected);

              if (selectedType) {
                setTransferParams((prev) => ({
                  ...prev,
                  from_hotel:
                    selectedType.value === "from_hotel" ? true : false,
                  to_hotel: selectedType.value === "to_hotel" ? true : false,
                  time_from: selectedVariant ? selectedVariant.time_from : "",
                  time_to: selectedVariant ? selectedVariant.time_to : "",
                }));
              }
            }}
            containerStyles={{
              display: step.isCurrent && step.id === 1 ? "flex" : "none",
            }}
          />

          <TransportStepContent
            transferCars={transferCars}
            selectedCarId={transferParams.car_id}
            setSelectedCardId={(id) =>
              setTransferParams((prev) => ({
                ...prev,
                car_id: id,
              }))
            }
            containerStyles={{
              display: step.isCurrent && step.id === 2 ? "flex" : "none",
            }}
          />
        </Stack>
      </Stack>
    );
  };

  return (
    <Stack
      sx={{
        alignItems: "stretch",
        gap: "24px",
        position: "relative",
        "&:before": {
          content: "''",
          width: 2.5,
          height: "100%",
          position: "absolute",
          zIndex: 0,
          top: 0,
          left: "24.25px",
          background: theme.palette.primary.dark,
        },
      }}
    >
      {steps.map((item, idx) => {
        return <StepContent key={idx} step={item} />;
      })}
    </Stack>
  );
};
