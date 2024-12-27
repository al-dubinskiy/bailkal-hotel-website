import { Box, Stack, Typography } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { theme } from "../../../../../theme";
import { InfoOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { GetPaymentMethods } from "../../../../../redux/slices/PaymentMethods/paymentMethodsSlice";
import { PaymentMethodType } from "../../../../../redux/slices/PaymentMethods/types";
import { CustomButton } from "../../../../components/shared/CustomButton";
import { BookingContext } from "../../../BookingPage";
import { paymentServices } from "../../../../../assets/images";
import { FormikProps } from "formik";
import {
  BookingGuestsDetailsPrimitiveType,
  BookingGuestsDetailsType,
} from "../../../../../redux/slices/Bookings/types";

export type ItemType = {
  title: string;
  paymentServices: string;
  description: string;
  paymentProcessService: string;
  paymentServicesImage: string;
};

interface Props {
  formik: FormikProps<BookingGuestsDetailsType>;
  updatePaymentMethod: (paymentMethodId: string) => void;
}

export const PaymentMethods = (props: Props) => {
  const { formik, updatePaymentMethod } = props;
  const dispatch = useAppDispatch();
  const { paymentMethods } = useAppSelector((state) => state.paymentMethods);
  const { currentBooking } = useAppSelector((state) => state.bookings);

  const roomPriceTotal = currentBooking
    ? currentBooking.roomPrice +
      currentBooking.servicePriceTotal +
      currentBooking.tariffPrice
    : 0;

  const Card = ({ item }: { item: PaymentMethodType }) => {
    const isSelected = formik.values.paymentMethodId === item._id;

    const paymentSystems = item.paymentSystems?.length
      ? item.paymentSystems.join(", ")
      : "";

    return (
      <Stack
        sx={{
          background: theme.palette.primary.lighter,
          gap: "24px",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="label"
              sx={{ fontWeight: 600, marginBottom: "8px" }}
            >
              {item.title}
            </Typography>

            {paymentSystems ? (
              <Typography variant="small">{paymentSystems} </Typography>
            ) : null}
          </Box>

          {!paymentSystems.length ? null : (
            <img
              src={
                paymentSystems.length < 30
                  ? paymentServices.PaymentServices2
                  : paymentServices.PaymentServices
              }
              style={{
                height: "35px",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "48px",
          }}
        >
          <Typography variant="body">{item.description}</Typography>

          <Stack
            sx={{
              alignItems: "flex-end",
              gap: "10px",
            }}
          >
            <Stack
              sx={{
                alignItems: "flex-end",
                gap: "5px",
              }}
            >
              <Typography variant="label" sx={{ fontWeight: 600 }}>
                Предоплата
              </Typography>

              <Typography
                variant="label"
                sx={{
                  color: theme.palette.primary.dark,
                  fontSize: "20.8px",
                }}
              >
                {roomPriceTotal} ₽
              </Typography>
            </Stack>

            <CustomButton
              label={!isSelected ? "Выбрать" : "Выбрано"}
              onClick={() => {
                formik.setFieldValue("paymentMethodId", item._id);
                updatePaymentMethod(item._id);
              }}
              containerVariant={!isSelected ? "contained" : "outlined"}
              containerBackgroundColor={"buttonDark"}
              containerStyle={{ padding: "0 40px" }}
              withoutAnimation
            />
          </Stack>
        </Box>
      </Stack>
    );
  };

  if (!paymentMethods || !currentBooking) return null;

  return (
    <Stack sx={{ alignItems: "stretch" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "24px",
          borderRadius: "16px",
          gap: "24px",
          backgroundColor: theme.palette.secondary.lighter,
          marginBottom: "24px",
        }}
      >
        <InfoOutlined
          htmlColor={theme.palette.secondary.dark}
          sx={{ fontSize: "24px" }}
        />
        <Typography
          variant="label"
          sx={{
            textDecoration: "underline",
            "&:hover": { cursor: "pointer", opacity: "0.7" },
          }}
          onClick={() => null}
        >
          Правила отмены бронирования
        </Typography>
      </Box>

      <Stack sx={{ alignItems: "stretch", gap: "24px" }}>
        {paymentMethods.map((i) => {
          return <Card key={i._id} item={i} />;
        })}
      </Stack>
    </Stack>
  );
};
