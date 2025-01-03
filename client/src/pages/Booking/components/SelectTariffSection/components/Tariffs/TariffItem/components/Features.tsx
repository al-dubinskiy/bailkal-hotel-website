import { LinearProgress, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { CustomIconLabel } from "../../../../../../../components/shared/CustomIconLabel";
import { BreakfastIcon } from "../../../../../../../../assets/icons/BreakfastIcon";
import { UndoIcon } from "../../../../../../../../assets/icons/UndoIcon";
import { PaymentCardIcon } from "../../../../../../../../assets/icons/PaymentCardIcon";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../hooks/redux";
import { GetPaymentMethods } from "../../../../../../../../redux/slices/PaymentMethods/paymentMethodsSlice";
import { UndoTermsPopup } from "./UndoTermsPopup";

interface Props {
  included_breakfast: boolean;
  terms_сancellation: string;
  payment_method_id: string[];
  included_services?: string[];
  payment_and_cancellation_terms?: string[];
}

export const Features = (props: Props) => {
  const { included_breakfast, terms_сancellation, payment_method_id } = props;
  const dispatch = useAppDispatch();
  const { paymentMethods } = useAppSelector((state) => state.paymentMethods);
  const { isLoading: paymentsMethodsIsLoading } = useAppSelector(
    (state) => state.paymentMethods.getPaymentMethods
  );

  return (
    <Stack sx={{ gap: "10px" }}>
      <CustomIconLabel
        icon={<BreakfastIcon sx={{ fontSize: "24px" }} />}
        labelComponent={
          <Typography variant="label">
            Завтрак
            <span
              style={{ marginLeft: "5px", fontWeight: 500, color: "#2F70D9" }}
            >
              {!included_breakfast ? "НЕ" : ""}ВКЛЮЧЕН
            </span>
          </Typography>
        }
      />

      <UndoTermsPopup description={terms_сancellation} />

      <CustomIconLabel
        icon={<PaymentCardIcon sx={{ fontSize: "24px" }} />}
        labelComponent={
          paymentsMethodsIsLoading ? (
            <LinearProgress sx={{ fontSize: "16px" }} />
          ) : paymentMethods && paymentMethods.length ? (
            <Typography variant="label">
              {paymentMethods
                .filter((item) => payment_method_id.includes(item._id))
                .map((i) => i.title)
                .join(", ")}
            </Typography>
          ) : null
        }
      />
    </Stack>
  );
};
