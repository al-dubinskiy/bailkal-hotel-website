import { Box, Button, Stack, Typography } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { theme } from "../../../../../../../theme";
import {
  CheckOutlined,
  DeleteOutline,
  EditOffOutlined,
  EditOutlined,
  RemoveCircleOutline,
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
import {
  CreateTransferVariantType,
  TransferVariantType,
} from "../../../../../../../redux/slices/TransferVariants/types";
import { GetTransferCars } from "../../../../../../../redux/slices/TransferCars/transferCarsSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../hooks/redux";
import { TransportStepContent } from "./TransportStepContent";
import { DirectionStepContent } from "./DirectionStepContent";
import { StepsHeader } from "./StepsHeader";
import {
  TransferDirectionType,
  TransferStepType,
  TransferVariantType as TransferVariantLocalType,
} from "./types";
import { stepsData, transferDirectionData } from "./default";
import { ArrivalStepContent } from "./ArrivalStepContent";
import { GetTransferVariants } from "../../../../../../../redux/slices/TransferVariants/transferVariantsSlice";
import { BookingContext } from "../../../../../BookingPage";

interface Props {}

export const Content = (props: Props) => {
  const {} = props;

  const dispatch = useAppDispatch();
  const { bookingProgressCurrentStep, updateBookingDraft } =
    useContext(BookingContext);
  const { transferCars } = useAppSelector((state) => state.transfersCars);
  const { transferVariants } = useAppSelector(
    (state) => state.transfersVariants
  );

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

  const [steps, setSteps] = useState<TransferStepType[]>(stepsData);

  const [transferDirection, setTransferDirection] = useState<
    TransferDirectionType[]
  >(transferDirectionData);

  const GetTransferCarsList = useCallback(() => {
    if (!transferCars) {
      dispatch(GetTransferCars());
    }
  }, [transferCars]);

  useEffect(() => {
    GetTransferCarsList();
  }, [GetTransferCarsList]);

  const GetTransferVariantsList = useCallback(() => {
    if (!transferVariants) {
      dispatch(GetTransferVariants());
    }
  }, [transferVariants]);

  useEffect(() => {
    GetTransferVariantsList();
  }, [GetTransferVariantsList]);

  const toStep = (step: TransferStepType) => {
    const stepIdx = steps.findIndex((i) => i.id === step.id);
    const currentStepIdx = steps.findIndex((i) => i.isCurrent);
    const lastCompleteIdx = findLastIndex(steps, (i) => i.isComplete);

    if (stepIdx !== -1 && currentStepIdx !== -1) {
      // Если произошло нажатие на предыдущие (пройденные) шаги или на первый шаг, следующий после последнего пройденного
      if (
        stepIdx < currentStepIdx ||
        (lastCompleteIdx !== -1 && lastCompleteIdx + 1 === stepIdx)
      ) {
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
        (transferParams.from_hotel || transferParams.to_hotel) &&
        transferParams.time_from &&
        transferParams.time_to &&
        !steps[0].isComplete &&
        currentIdx === 0
      ) {
        const nextIdx = currentIdx + 1;
        setSteps((prev) =>
          prev.map((i, idx) => ({
            ...i,
            isCurrent: idx === nextIdx ? true : false,
            isComplete: idx === currentIdx ? true : i.isComplete,
          }))
        );
      } else if (
        (!transferParams.from_hotel && !transferParams.to_hotel) ||
        (!transferParams.time_from &&
          !transferParams.time_to &&
          steps[0].isComplete &&
          currentIdx === 0)
      ) {
        setSteps((prev) =>
          prev.map((i, idx) => ({
            ...i,
            isComplete: idx === currentIdx ? false : i.isComplete,
          }))
        );
      }
      // Если на сейчас на втором шаге (когда он еще не isComplete), но уже выбрано один из "видов транспорта", то переходим на третий шаг
      if (transferParams.car_id && !steps[1].isComplete && currentIdx === 1) {
        const nextIdx = currentIdx + 1;
        setSteps((prev) =>
          prev.map((i, idx) => ({
            ...i,
            isCurrent: idx === nextIdx ? true : false,
            isComplete: idx === currentIdx ? true : i.isComplete,
          }))
        );
      } else if (
        !transferParams.car_id &&
        steps[1].isComplete &&
        currentIdx === 1
      ) {
        setSteps((prev) =>
          prev.map((i, idx) => ({
            ...i,
            isComplete: idx === currentIdx ? false : i.isComplete,
          }))
        );
      }
    }
  }, [transferParams]);

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

  const getTransferVariant = (): TransferVariantType | null => {
    if (
      transferVariants &&
      transferParams.time_from &&
      transferParams.time_to &&
      transferParams.car_id
    ) {
      const transfer = transferVariants.find(
        (i) =>
          i.from_hotel === transferParams.from_hotel &&
          i.to_hotel === transferParams.to_hotel &&
          i.time_from === transferParams.time_from &&
          i.time_to === transferParams.time_to
      );

      if (transfer) {
        return transfer;
      }
    }
    return null;
  };

  useEffect(() => {
    const price = getTransferVariant()?.price;
    if (price && price !== transferParams.price) {
      setTransferParams((prev) => ({
        ...prev,
        price,
      }));
    }
  }, [transferVariants, transferParams]);

  const removeTransferDraft = () => {
    setTransferParams({
      from_hotel: false,
      to_hotel: false,
      time_from: "",
      time_to: "",
      price: 0,
      car_id: "",
      comment: "",
    });
    setSteps((prev) =>
      prev.map((i, idx) => ({
        ...i,
        isCurrent: idx === 0 ? true : false,
      }))
    );
  };

  const isExistTransferDraft = useMemo(() => {
    if (
      ((transferParams.from_hotel || transferParams.to_hotel) &&
        transferParams.time_from &&
        transferParams.time_to) ||
      transferParams.car_id ||
      transferParams.comment
    ) {
      return true;
    }
    return false;
  }, [transferParams]);

  const StepContent = ({ step }: { step: TransferStepType }) => {
    return (
      <Stack
        sx={{
          gap: "30px",
          alignItems: "stretch",
          position: "relative",
          zIndex: 1,
        }}
      >
        <StepsHeader step={step} toStep={toStep} editStep={editStep} />

        <Stack sx={{ alignItems: "stretch", paddingLeft: "74px" }}>
          <DirectionStepContent
            transferDirection={transferDirection}
            setTransferDirection={(val) => {
              const selectedType = val.find((i) => i.isSelected);
              const selectedVariant =
                selectedType &&
                selectedType.variants.find(
                  (i: TransferVariantLocalType) => i.isSelected
                );

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
            time_from={transferParams.time_from}
            time_to={transferParams.time_to}
            transferVariants={transferVariants}
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

          <ArrivalStepContent
            setComment={(val) => {
              setTransferParams((prev) => ({
                ...prev,
                comment: val,
              }));
            }}
            setTransfer={(comment) => {
              const transfer = getTransferVariant();
              const { step: currentStep } = bookingProgressCurrentStep;
              if (currentStep && transfer) {
                updateBookingDraft({
                  currentStep,
                  tempBookingId: currentStep.roomId,
                  transferId: transfer._id,
                  transferComment: comment,
                });
              }
            }}
            transferPrice={transferParams.price}
            containerStyles={{
              display: step.isCurrent && step.id === 3 ? "flex" : "none",
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
      {isExistTransferDraft ? (
        <Button
          onClick={removeTransferDraft}
          sx={{ position: "absolute", top: "-24px", right: 0, zIndex: 1 }}
        >
          <DeleteOutline sx={{ fontSize: "24px" }} />
        </Button>
      ) : null}

      {steps.map((item, idx) => {
        return <StepContent key={idx} step={item} />;
      })}
    </Stack>
  );
};
